import React from 'react'
import { useGetPlayerStatisticsQuery } from '../../features/users/UsersApiSlice';
import { GAMEMODES } from '../../config/gamemodes';
import { LOBBYTYPES } from '../../config/lobbyTypes';
import { HERODATA } from '../../config/heroData';
import useAuth from '../../hooks/useAuth';
import { PieChart, Pie, Tooltip } from 'recharts';
import { CONSTANTS } from '../../config/CONSTANTS';
import { RANKS, customRound, findRank } from '../../config/ranks';

const PlayerStatistics = () => {

    
    const {userID, username, status, dotaID} = useAuth()
    
    // this is where i call the database to get the last 20 matches.
    const {
        data: statistics,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPlayerStatisticsQuery({
        id: dotaID
    })


    //
    var content;

    if (isLoading) {
        content = (<p>Loading Recent Matches</p>)
    }
    if (isSuccess) {

        // Pi chart All Time Data
        const piChartAllTimeData = [
            { name: 'Win', matches: statistics.wins, fill: CONSTANTS.COLORS.RADIANTGREEN },
            { name: 'Loss', matches: statistics.losses, fill: CONSTANTS.COLORS.DIRERED },
            
        ];

        // Pi chart Recent Data
        const piChartRecentData = [
            { name: 'Win', matches: statistics.recentWins, fill: CONSTANTS.COLORS.RADIANTGREEN },
            { name: 'Loss', matches: statistics.recentLosses, fill: CONSTANTS.COLORS.DIRERED },
            
        ];
    
        // calculate the average rank medal for recent matches
        let aveBracket = Math.floor(statistics.recentMatchAverageRank/10)
        let aveStar = customRound(statistics.recentMatchAverageRank % 10, [1,2,3,4,5])


        let foundRank = findRank(aveBracket);
 
        content = (
            <div className='player-statistics'>
                <section>
                    <h2>All Time</h2>
                    <article>
                        <PieChart width={200} height={200}>
                            <Pie data={piChartAllTimeData} nameKey="name" dataKey="matches" outerRadius={50}  label={({ name }) => name}  />
                            <Tooltip />

                        </PieChart>

                        <h2>Win% {Math.round((statistics.winrate*100 + Number.EPSILON) * 100) / 100}%</h2>
                    </article>
                </section>

                <section>
                    <h2>Recent (20 Matches)</h2>
                    <article>
                        <PieChart width={200} height={200}>
                            <Pie data={piChartRecentData} nameKey="name" dataKey="matches" outerRadius={50}  label={({ name }) => name}  />
                            <Tooltip />

                        </PieChart>

                        
                        <h2>Win% {Math.round((statistics.recentWinRate*100 + Number.EPSILON) * 100) / 100}%</h2>
                        
                    </article>
                </section>

                <div className='ranks'>

                    <section>
                        <h2>Current Rank</h2>
                        <article>
                            <img className='average-rank' src={`${foundRank.imageLocation}/SeasonalRank${aveBracket}-${aveStar}.webp`}></img>
                        </article>
                    </section>

                    <section>
                        <h2>Average Rank (last 20)</h2>
                        <article>
                            <img className='average-rank' src={`${foundRank.imageLocation}/SeasonalRank${aveBracket}-${aveStar}.webp`}></img>
                        </article>
                    </section>
                
                </div>

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

export default PlayerStatistics