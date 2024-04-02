const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const UserVerification = require('../models/UserVerification')


// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).json({message: 'All Fields Are Required.'})
    }

    const foundUser = await User.findOne({username}).exec()
    

    console.log("FOUND USER: ", foundUser)

    if (!foundUser || !foundUser.active) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) {
        return res.status(401).json({message: "Unauthorized"})
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "roles": foundUser.roles,
                "userID": foundUser._id,
                "dotaID": foundUser.DotaID
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m'}
    )

    const refreshToken = jwt.sign(
        {"username": foundUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    )

    // Create a secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: true, // accessible only by web server
        secure: false,
        sameSite: 'None',
        
        maxAge: 7*24*60*60*1000 // cookie expirey: set to match refreshToken
    })

    // Send accessToken containing username and roles
    res.json({accessToken})
    res.send('Login successful');
    console.log("ACCESS TOKEN: ", accessToken)
    console.log("FOUND USER: ", foundUser)

})


// @desc Refresh
// @route Get /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    // do stuff

    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) {
                return res.status(403).json({message: "Forbidden"})

            }

            const foundUser = await User.findOne({username:decoded.username}).exec()
            console.log(foundUser)
            if (!foundUser) {
                return res.status(401).json({message: 'Unauthorized'})
            }

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles,
                        "userID": foundUser._id,
                        "dotaID": foundUser.DotaID
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '15m'}
            )

            res.json({accessToken})
        })
    )
}


// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    // do stuff

    const cookies = req.cookies
    console.log(req.cookies);
    if (!cookies?.jwt) {
        // return no content
        return res.sendStatus(204) 
    }

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})

    res.json({message: 'Cookie cleared'})

}



// @desc Verify the user email.
// @route POST /verify
// @access Public
const verify = asyncHandler(async (req, res) => {
    
    const {verificationToken} = req.params;

    if (!verificationToken) {
        return res.status(400).json({message: 'Missing Verification Token.'})
    }

    // search for the user verificaiton that matches the key.
    const foundUserVerification = await UserVerification.findOne({verificationToken}).exec()
    

    console.log("FOUND USER: ", foundUserVerification)

    if (!foundUserVerification) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    // once its been found, set the user status to verified.
    const username = foundUserVerification.username;
    const foundUser = await User.findOne({username}).exec()

    console.log("USER FOUND: ", foundUser)
    
    foundUser.accountVerified = true;

    const updatedUser = await foundUser.save();

    //const foundUser = await User.findOne({foundUserVerification.username}).exec()

    res.send('Verification Completed');

})


module.exports = {
    login,
    refresh,
    logout,
    verify
}