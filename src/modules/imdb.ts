import axios from 'axios';
import config from "../config";

const client = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: config.imdbApiKey
    }
});

export const getSeriesSeasonEpisodes = async (seriesId: number, seasonNumber: number) => {
    const { data: season } = await client.get(`/tv/${seriesId}/season/${seasonNumber}`);
    const { episodes } = season;

    return (episodes || []).map((episode: any) => ({
        episodeName: episode.name,
        seriesId,
        averageVotes: episode.vote_average
    }));
};

export const getTopSeriesEpisodes = async (seriesId: number) => {
    const { data: tvSeries } = await client.get(`/tv/${seriesId}`);
    const { name, seasons } = tvSeries;
    const promises = [];

    for (const season of seasons) {
        promises.push(getSeriesSeasonEpisodes(seriesId, season.season_number));
    }

    const episodes = await Promise.all(promises);
    return {
        seriesName: name,
        episodes: [].concat(...episodes)
    };
};

