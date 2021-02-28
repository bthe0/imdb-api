import mongoose from 'mongoose';
import config from '../config';
import EpisodeSchema from '../models/episode';
import SeriesSchema from '../models/series';

mongoose.connect(config.mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
});

mongoose.connection.on('error', console.error);

export const Series: any = mongoose.model('Series', SeriesSchema);
export const Episode: any = mongoose.model('Episode', EpisodeSchema);
