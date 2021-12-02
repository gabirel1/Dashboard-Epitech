import axios, { AxiosResponse } from 'axios';
import express from 'express';
import { LeagueOfLegendsProfileData, LeagueOfLegendsGameData } from '../../database/interfaces';

class LeagueOfLegends {
    async getUserProfile(req: express.Request, res: express.Response) {
        try {
            const { api_key, summoner_name, region } = req.body;
            let summoner_id: string = '';
            let profileIconURL: string = '';
            let summonerLevel: number = 0;
            let summonerName: string = '';
            let gameData: Array<LeagueOfLegendsGameData> = [];
            
            const firstURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_name}?api_key=${api_key}`;
            
            console.debug("firstURL: ", firstURL);
            let response: AxiosResponse = await axios({
                method: 'get',
                url: firstURL,
            });
            if (response.status === 200) {
                summoner_id = response.data['id'];
                profileIconURL = `https://ddragon.leagueoflegends.com/cdn/11.23.1/img/profileicon/${response.data['profileIconId']}.png`;
                summonerLevel = response.data['summonerLevel'];
                summonerName = response.data['name'];
            }
            const secondURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner_id}?api_key=${api_key}`;
            console.debug("secondURL: ", secondURL);
            let response2: AxiosResponse = await axios({
                method: 'get',
                url: secondURL,
            });
            if (response2.status == 200) {
                if (response2.data.length > 0) {
                    gameData = response2.data.map((data: any) => {
                        return {
                            queueType: data.queueType,
                            tier: data.tier,
                            rank: data.rank,
                            wins: data.wins,
                            losses: data.losses,
                            leaguePoints: data.leaguePoints,
                            winRate: data.wins / (data.wins + data.losses),
                        };
                    });
                    if (gameData.length == 1 && gameData[0].queueType == 'RANKED_SOLO_5x5') {
                        gameData[1] = {
                            queueType: 'RANKED_FLEX_SR',
                            tier: 'UNRANKED',
                            rank: 'UNRANKED',
                            wins: 0,
                            losses: 0,
                            leaguePoints: 0,
                            winRate: 0,
                        };
                    }
                    else if (gameData.length == 1 && gameData[0].queueType == 'RANKED_FLEX_SR') {
                        gameData[1] = {
                            queueType: 'RANKED_SOLO_5x5',
                            tier: 'UNRANKED',
                            rank: 'UNRANKED',
                            wins: 0,
                            losses: 0,
                            leaguePoints: 0,
                            winRate: 0,
                        };
                    }
                }
                else {
                    gameData = [
                        {
                            queueType: 'RANKED_FLEX_SR',
                            tier: 'UNRANKED',
                            rank: 'UNRANKED',
                            wins: 0,
                            losses: 0,
                            leaguePoints: 0,
                            winRate: 0,
                        },
                        {
                            queueType: 'RANKED_SOLO_5x5',
                            tier: 'UNRANKED',
                            rank: 'UNRANKED',
                            wins: 0,
                            losses: 0,
                            leaguePoints: 0,
                            winRate: 0,
                        },
                    ];
                }
                console.debug("setting profile");
                let profile: LeagueOfLegendsProfileData = {
                    summonerName,
                    summonerLevel,
                    profileIconURL,
                    gameData,
                };
                console.debug("profile: ", profile);
                return res.status(200).json(profile);
            }
            else {
                return res.status(response2.status).json({
                    error: 'Error getting user profile',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

export default new LeagueOfLegends();