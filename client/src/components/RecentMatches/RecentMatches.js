import React from 'react'
import { useGetRecentMatchesQuery } from '../../features/dotaAPI/dotaAPISlice';
import { GAMEMODES } from '../../config/gamemodes';
import { LOBBYTYPES } from '../../config/lobbyTypes';
import { HERODATA } from '../../config/heroData';
import useAuth from '../../hooks/useAuth';
import { findRank } from '../../config/ranks';
import { useNavigate } from 'react-router-dom';

const RecentMatches = ({dota_id}) => {
    
    
    const {userID, username, status, dotaID} = useAuth()
    console.log("DOTA ID IS : ", dotaID)
    // this is where i call the database to get the last 20 matches.
    const {
        data: matches,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRecentMatchesQuery({
        dota_id: dotaID
    })

    //
    console.log("MATCHES RESULT : ", matches)
    console.log(error)
    var content;

    const navigate = useNavigate();

    const onNavigateToMatch = (matchID) => {
        //console.log("NAVIGATE CLICK: ", matchID);
        navigate(`/match/${matchID}`)
    }


    if (isLoading) {
        content = (<p>Loading Recent Matches</p>)
    }
    if (isSuccess) {
        // restructure the data into an array of matches and an array of
        // player index that matches the current player id
        console.log("MATCH: ", matches)
        console.log("DOTA ID: ", dotaID)
        const playerMatches = matches.matches.map((match) => {
            
            const playerIndex = match.players.findIndex((player) => player.account_id == dotaID);
            
            //const averageRank = PlayerMatch.find({Match_ID: match.match_id})

            console.log("PLAYER INDEX: ", playerIndex)
            return {
                matchDetails: match,
                playerIndex: playerIndex,
                
            };
        });

        // sort the matches to have recent matches first:
        playerMatches.sort((a, b) => b.matchDetails.start_time - a.matchDetails.start_time);

        // calculate the average rank medal for recent matches
        //let aveBracket = Math.floor(statistics.recentMatchAverageRank/10)
        //let aveStar = customRound(statistics.recentMatchAverageRank % 10, [1,2,3,4,5])

        //let foundRank = findRank(aveBracket);

        content = (
            <div className='recent-match-container'>
                {playerMatches.map((match, index) => (
                <div className='match-sliver' key={index} onClick={() => onNavigateToMatch(match.matchDetails.match_id)}>
                    
                    {
                    // TODO, restructure the matches into a seperate array on load,
                    // then create a seperate array which has the player index (can use a dictionary/map)
                    // which will have the match data in the first isntance then the player in the second
                    // then use that here
                    //console.log("HEROS TUFF", HERODATA[match.matchDetails.players[match.playerIndex].hero_id], " | " , match.matchDetails.players[match.playerIndex].hero_id)
                    }
                    <div className='primary-details'>
                        <img src={`/assets/images/heroes/${HERODATA[match.matchDetails.players[match.playerIndex].hero_id].imagePath}`} alt={`${HERODATA[match.matchDetails.players[match.playerIndex].hero_id].name}`}></img>
                        
                    </div>

                    <table>
                        {/*
                        <tr>
                            <th><h2>Game Mode</h2></th>
                            <th><h2>Lobby Type</h2></th>
                        </tr>
                */}
                        
                        <tr>
                            <th>
                                <p>{`${match.matchDetails.players[match.playerIndex].kills}`}/{`${match.matchDetails.players[match.playerIndex].deaths}`}/{`${match.matchDetails.players[match.playerIndex].assists}`}</p>
                                <h1 className={match.matchDetails.players[match.playerIndex].win ? 'match-win' : 'match-loss'}>{`${match.matchDetails.players[match.playerIndex].win ? 'Win' : 'Loss'}`}</h1>
                            </th>
                            <th>
                                <h2>{GAMEMODES[match.matchDetails.game_mode] || `Unknown (${match.matchDetails.game_mode})`}</h2>
                            </th>
                            <th>
                                <h2>{LOBBYTYPES[match.matchDetails.lobby_type] || `Unknown (${match.matchDetails.lobby_type})`}</h2>
                            </th>

                            <th>
                                <img className='average-rank' 
                                src={`${findRank(Math.floor(match.matchDetails.averageRank/10)).imageLocation}/SeasonalRank${
                                    Math.floor(match.matchDetails.averageRank/10)}-${
                                    (match.matchDetails.averageRank%10)}.webp`}></img>
                                <h2></h2>
                            </th>
                        </tr>
                    </table>
                    {/* Render match details here */}
                </div>
            ))}

        </div>
        )
    }
    if (isError) {
        content = (
            <div>ERRRO: {error.message}</div>
        )
    }

    return content;

}

export default RecentMatches