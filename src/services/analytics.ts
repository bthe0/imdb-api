import { Request, Response } from 'express';
import { Series } from '../modules/db';
import redis from '../modules/redis';
import { POPULAR_SERIES_CACHE_KEY } from '../constants';

class AnalyticsService {
    public async getPopularSeries(req: Request, res: Response) {
        let series = await redis.getAsync(POPULAR_SERIES_CACHE_KEY);

        if (!series) {
            series = await Series.getPopularSeries();
            await redis.setAsync(POPULAR_SERIES_CACHE_KEY, JSON.stringify(series));
        } else {
            series = JSON.parse(series);
        }

        res.json({ series });
    }
}

export default new AnalyticsService();