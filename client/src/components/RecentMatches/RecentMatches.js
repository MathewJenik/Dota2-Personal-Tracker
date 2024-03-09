import React from 'react'
import { useGetRecentMatchesQuery } from '../../features/dotaAPI/dotaAPISlice';
import { GAMEMODES } from '../../config/gamemodes';

const RecentMatches = ({dota_id}) => {
  
    // this is where i call the database to get the last 20 matches.
    const {
        data: matches,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRecentMatchesQuery({
        dota_id: 963664657
    })

    //
    console.log("MATCHES RESULT : ", matches)
    console.log(error)
    var content;

    if (isLoading) {
        content = (<p>Loading Recent Matches</p>)
    }
    if (isSuccess) {
        content = (
            <div className='recent-match-container'>
                {matches.matches.map((match, index) => (
                <div className='match-sliver' key={index}>
                    
                    {GAMEMODES[match.game_mode] || `Unknown (${match.game_mode})`}
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