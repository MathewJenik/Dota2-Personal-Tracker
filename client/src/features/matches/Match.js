import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { selectMatchById, selectMatchByMatchId, useGetMatchByIDQuery } from './MatchApiSlice';
import { HERODATA } from '../../config/heroData';
import { ITEMDATA } from '../../config/itemData';

const Match = () => {
    const { match_id } = useParams();
    const navigate = useNavigate();

    const { data: matchData, isSuccess, isError, isLoading, error } = useGetMatchByIDQuery(match_id);

    
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error?.data.message}</p>;
    }

    if (!isSuccess ) {
        return <p>Match not found</p>;
    }


    if (isSuccess) {

        console.log("MATCH DATA: ", matchData)

        const players = matchData.players;

        var radiantPlayers = [];
        var direPlayers = [];

        var radiantHeroes = [];
        var direHeroes = [];

        const itemDataArray = Object.values(ITEMDATA);

        players.forEach(player => {

            var backpack = [itemDataArray.find(item => item.id === player.backpack_0) || {dname: "empty"},
            itemDataArray.find(item => item.id === player.backpack_1) || {dname: "empty"},
            itemDataArray.find(item => item.id === player.backpack_2) || {dname: "empty"}]
            
            if (player.isRadiant == true) {


                /*
                */
                radiantPlayers.push(
                    <img className={"match-hero-icons"} src={`/assets/images/heroes/${HERODATA[player.hero_id].imagePath}`} alt={`${HERODATA[player.hero_id].name}`}></img>
                
                )
                
                radiantHeroes.push(
                    <div className='match-hero-sliver'>
                        <img className={"match-hero-icons"} src={`/assets/images/heroes/${HERODATA[player.hero_id].imagePath}`} alt={`${HERODATA[player.hero_id].name}`}></img>
                        <p>{player.kills}/{player.deaths}/{player.assists}</p>
                        {
                            // items
                        }


                        {(itemDataArray.find(item => item?.id === player.item_0)?.dname) == "empty" ? (<></>) : (
                            <img className={"match-item-icons"} src={`/assets/images/items/${
                                `${itemDataArray.find(item => item.id === player.item_0).dname.split(' ').join('_')}_icon`
                            }.webp`} alt={`${itemDataArray.find(item => item.id === player.item_0).dname.split(' ').join('_')}_icon.webp`}></img>
                            
                        )} 

                        {(itemDataArray.find(item => item?.id === player.item_1)?.dname) == "empty" ? (<></>) : (
                            <img className={"match-item-icons"} src={`/assets/images/items/${
                                `${itemDataArray.find(item => item.id === player.item_1).dname.split(' ').join('_')}_icon`
                            }.webp`} alt={`${itemDataArray.find(item => item.id === player.item_1).dname.split(' ').join('_')}_icon.webp`}></img>
                            
                        )} 

                        
                        {(itemDataArray.find(item => item?.id === player.item_2)?.dname) == "empty" ? (<></>) : (
                            <img className={"match-item-icons"} src={`/assets/images/items/${
                                `${itemDataArray.find(item => item.id === player.item_2).dname.split(' ').join('_')}_icon`
                            }.webp`} alt={`${itemDataArray.find(item => item.id === player.item_2).dname.split(' ').join('_')}_icon.webp`}></img>
                            
                        )} 
                        
                        {(itemDataArray.find(item => item?.id === player.item_3)?.dname) == "empty" ? (<></>) : (
                            <img className={"match-item-icons"} src={`/assets/images/items/${
                                `${itemDataArray.find(item => item.id === player.item_3).dname.split(' ').join('_')}_icon`
                            }.webp`} alt={`${itemDataArray.find(item => item.id === player.item_3).dname.split(' ').join('_')}_icon.webp`}></img>
                            
                        )} 
                        
                        {(itemDataArray.find(item => item?.id === player.item_4)?.dname) == "empty" ? (<></>) : (
                            <img className={"match-item-icons"} src={`/assets/images/items/${
                                `${itemDataArray.find(item => item.id === player.item_4).dname.split(' ').join('_')}_icon`
                            }.webp`} alt={`${itemDataArray.find(item => item.id === player.item_4).dname.split(' ').join('_')}_icon.webp`}></img>
                            
                        )} 
                        {(itemDataArray.find(item => item?.id === player.item_5)?.dname) == "empty" ? (<></>) : (
                            <img className={"match-item-icons"} src={`/assets/images/items/${
                                `${itemDataArray.find(item => item.id === player.item_5).dname.split(' ').join('_')}_icon`
                            }.webp`} alt={`${itemDataArray.find(item => item.id === player.item_5).dname.split(' ').join('_')}_icon.webp`}></img>
    
                        )} 

                        
                        {
                            // backpacked items
                        }
                        <p>backpack:</p>
                        <div className=''>

                            {(backpack.find(item => item?.id === player.backpack_0)?.dname) == "empty" ? (<></>) : (
                            <img className={"match-item-icons greyed"} src={`/assets/images/items/${

                                `${backpack.find(item => item?.id === player.backpack_0)?.dname.split(' ').join('_')}_icon`
                            }.webp`} alt={`${backpack.find(item => item?.id === player.backpack_0)?.dname.split(' ').join('_')}_icon.webp`}></img>
                            
                            )} 

                            {(backpack.find(item => item?.id === player.backpack_1)?.dname) == "empty" ? (<></>) : (
                                <img className={"match-item-icons greyed"} src={`/assets/images/items/${

                                    `${backpack.find(item => item?.id === player.backpack_1)?.dname.split(' ').join('_')}_icon`
                                    }.webp`} alt={`${backpack.find(item => item?.id === player.backpack_1)?.dname.split(' ').join('_')}_icon.webp`}></img>
                                    
                            )} 

                            {(backpack.find(item => item?.id === player.backpack_2)?.dname) == "empty" ? (<></>) : (
                                <img className={"match-item-icons greyed"} src={`/assets/images/items/${

                                    `${backpack.find(item => item?.id === player.backpack_2)?.dname.split(' ').join('_')}_icon`
                                    }.webp`} alt={`${backpack.find(item => item?.id === player.backpack_2)?.dname.split(' ').join('_')}_icon.webp`}></img>
            
        
                            )} 

                        </div>
                        {
                            // equipped neutral items
                        }
                        
                        <p>Neutral: </p>
                        <div className='neutral-item'>
                        {(itemDataArray.find(item => item?.id === player.item_neutral)?.dname) == "empty" ? (<></>) : (
                                <img className={"match-item-icons greyed"} src={`/assets/images/items/${

                                    `${itemDataArray.find(item => item?.id === player.item_neutral)?.dname.split(' ').join('_')}_icon`
                                    }.webp`} alt={`${itemDataArray.find(item => item?.id === player.item_neutral)?.dname.split(' ').join('_')}_icon.webp`}></img>
            
        
                            )} 
                        </div>

                    </div>
                )
                
            } else {
                
                console.log("HERO ID: ", player)
                direPlayers.push(
                    <img className={"match-hero-icons"} src={`/assets/images/heroes/${HERODATA[player.hero_id]?.imagePath}`} alt={`${HERODATA[player.hero_id].name}`}></img>
                    
                )

                direHeroes.push(
                    <div className='match-hero-sliver'>
                        <img className={"match-hero-icons"} src={`/assets/images/heroes/${HERODATA[player.hero_id].imagePath}`} alt={`${HERODATA[player.hero_id].name}`}></img>
                        <p>{player.kills}/{player.deaths}/{player.assists}</p>
                        {
                            // items
                        }


                        {(itemDataArray.find(item => item?.id === player.item_0)?.dname) == "empty" ? (<></>) : (
                            <img className={"match-item-icons"} src={`/assets/images/items/${
                                `${itemDataArray.find(item => item.id === player.item_0).dname.split(' ').join('_')}_icon`
                            }.webp`} alt={`${itemDataArray.find(item => item.id === player.item_0).dname.split(' ').join('_')}_icon.webp`}></img>
                            
                        )} 

                        {(itemDataArray.find(item => item?.id === player.item_1)?.dname) == "empty" ? (<></>) : (
                            <img className={"match-item-icons"} src={`/assets/images/items/${
                                `${itemDataArray.find(item => item.id === player.item_1).dname.split(' ').join('_')}_icon`
                            }.webp`} alt={`${itemDataArray.find(item => item.id === player.item_1).dname.split(' ').join('_')}_icon.webp`}></img>
                            
                        )} 

                        
                        {(itemDataArray.find(item => item?.id === player.item_2)?.dname) == "empty" ? (<></>) : (
                            <img className={"match-item-icons"} src={`/assets/images/items/${
                                `${itemDataArray.find(item => item.id === player.item_2).dname.split(' ').join('_')}_icon`
                            }.webp`} alt={`${itemDataArray.find(item => item.id === player.item_2).dname.split(' ').join('_')}_icon.webp`}></img>
                            
                        )} 
                        
                        {(itemDataArray.find(item => item?.id === player.item_3)?.dname) == "empty" ? (<></>) : (
                            <img className={"match-item-icons"} src={`/assets/images/items/${
                                `${itemDataArray.find(item => item.id === player.item_3).dname.split(' ').join('_')}_icon`
                            }.webp`} alt={`${itemDataArray.find(item => item.id === player.item_3).dname.split(' ').join('_')}_icon.webp`}></img>
                            
                        )} 
                        
                        {(itemDataArray.find(item => item?.id === player.item_4)?.dname) == "empty" ? (<></>) : (
                            <img className={"match-item-icons"} src={`/assets/images/items/${
                                `${itemDataArray.find(item => item.id === player.item_4).dname.split(' ').join('_')}_icon`
                            }.webp`} alt={`${itemDataArray.find(item => item.id === player.item_4).dname.split(' ').join('_')}_icon.webp`}></img>
                            
                        )} 
                        {(itemDataArray.find(item => item?.id === player.item_5)?.dname) == "empty" ? (<></>) : (
                            <img className={"match-item-icons"} src={`/assets/images/items/${
                                `${itemDataArray.find(item => item.id === player.item_5).dname.split(' ').join('_')}_icon`
                            }.webp`} alt={`${itemDataArray.find(item => item.id === player.item_5).dname.split(' ').join('_')}_icon.webp`}></img>
    
                        )} 

                        
                        {
                            // backpacked items
                        }
                        <p>backpack:</p>
                        <div className=''>

                            {(backpack.find(item => item?.id === player.backpack_0)?.dname) == "empty" ? (<></>) : (
                            <img className={"match-item-icons greyed"} src={`/assets/images/items/${

                                `${backpack.find(item => item?.id === player.backpack_0)?.dname.split(' ').join('_')}_icon`
                            }.webp`} alt={`${backpack.find(item => item?.id === player.backpack_0)?.dname.split(' ').join('_')}_icon.webp`}></img>
                            
                            )} 

                            {(backpack.find(item => item?.id === player.backpack_1)?.dname) == "empty" ? (<></>) : (
                                <img className={"match-item-icons greyed"} src={`/assets/images/items/${

                                    `${backpack.find(item => item?.id === player.backpack_1)?.dname.split(' ').join('_')}_icon`
                                    }.webp`} alt={`${backpack.find(item => item?.id === player.backpack_1)?.dname.split(' ').join('_')}_icon.webp`}></img>
                                    
                            )} 

                            {(backpack.find(item => item?.id === player.backpack_2)?.dname) == "empty" ? (<></>) : (
                                <img className={"match-item-icons greyed"} src={`/assets/images/items/${

                                    `${backpack.find(item => item?.id === player.backpack_2)?.dname.split(' ').join('_')}_icon`
                                    }.webp`} alt={`${backpack.find(item => item?.id === player.backpack_2)?.dname.split(' ').join('_')}_icon.webp`}></img>
            
        
                            )} 

                        </div>
                        {
                            // equipped neutral items
                        }
                        
                        <p>Neutral: </p>
                        <div className='neutral-item'>
                        {(itemDataArray.find(item => item?.id === player.item_neutral)?.dname) == "empty" ? (<></>) : (
                                <img className={"match-item-icons greyed"} src={`/assets/images/items/${

                                    `${itemDataArray.find(item => item?.id === player.item_neutral)?.dname.split(' ').join('_')}_icon`
                                    }.webp`} alt={`${itemDataArray.find(item => item?.id === player.item_neutral)?.dname.split(' ').join('_')}_icon.webp`}></img>
            
        
                            )} 
                        </div>

                    </div>
                )
                
            }
        });
        console.log("PLAYEES RESUL: ", radiantPlayers)

        //<img src={`/assets/images/heroes/${HERODATA[match.matchDetails.players[match.playerIndex].hero_id].imagePath}`} alt={`${HERODATA[match.matchDetails.players[match.playerIndex].hero_id].name}`}></img>

        return (
            <div className='match-container'>
                {matchData.radiant_win ? (<h1 className='radiant-victory'>Radiant Victory</h1>) : (<h1 className='dire-victory'>Dire Victory</h1>)}
                <p>Match ID: {matchData.match_id}</p>
                <div className='scoring'>
                    
                    { // display the 5 radiant team members here
                    radiantPlayers}

                    
                    <p className='radiant'>{matchData.radiant_score}</p>
                    <p>:</p>
                    <p className='dire'>{matchData.dire_score}</p>
    
                    {
                        // display the 5 dire team members here
                        direPlayers
                    }
                </div>
                <p></p>
    
                <div className='match-details'>

                    <h2 className='radiant'>Radiant</h2>

                    {
                        radiantHeroes
                    }

                    <h2 className='dire'>Dire</h2>

                    {
                        direHeroes
                    }

                </div>
    
            </div>
        );
    }

    
};

export default Match;
