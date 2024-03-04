
// Function to save JWT token to localStorage
export const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('jwt', token);
};

// Function to retrieve JWT token from localStorage
export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('jwt');
};

// Function to remove JWT token from localStorage
export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('jwt');
};

// When user logs in successfully, save token to localStorage
export const handleLogin = (token) => {
    saveTokenToLocalStorage(token);
    // Additional login logic
};

// When user logs out, remove token from localStorage
export const handleLogout = () => {
    removeTokenFromLocalStorage();
    // Additional logout logic
};

