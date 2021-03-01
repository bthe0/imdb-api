import { Request, Response } from 'express';
import { Episode, Series } from '../modules/db';
import { getTopSeriesEpisodes } from '../modules/imdb';
import redis from '../modules/redis';
import { POPULAR_SERIES_CACHE_KEY, TOP_EPISODES_CACHE_KEY } from '../constants';

class EpisodesService {
    private updateAnalytics(seriesId: number) {
        Promise.all([
            Series.findOneAndUpdate({
                seriesId
            }, {
                $inc: {
                    accessCount: 1
                }
            }),
            redis.delAsync(POPULAR_SERIES_CACHE_KEY)
        ]);
    }

    private async fetchTopEpisodes(seriesId: number) {
        const { seriesName, episodes } = await getTopSeriesEpisodes(seriesId);

        await Promise.all([
            Series.create({
                seriesId,
                seriesName
            }),
            Episode.insertMany(episodes)
        ]);
    }

    public async getTopEpisodes(req: Request, res: Response) {
        const seriesId = +req.params.seriesId;
        let episodes = await redis.getAsync(TOP_EPISODES_CACHE_KEY(seriesId));

        if (!episodes) {
            episodes = await Episode.getTopEpisodes(seriesId);

            if (!episodes.length) {
                try {
                    await this.fetchTopEpisodes(seriesId);
                } catch(e) {
                    return res.json({
                        episodes: []
                    });
                }

                episodes = await Episode.getTopEpisodes(seriesId);
                await redis.setAsync(TOP_EPISODES_CACHE_KEY(seriesId), JSON.stringify(episodes));
            }
        } else {
            episodes = JSON.parse(episodes);
        }

        this.updateAnalytics(seriesId);
        res.json({ episodes });
    }
}

export default new EpisodesService();