import mongoose from 'mongoose';

const { Schema } = mongoose;

const Series = new Schema({
    seriesName: {
        type: String,
        required: true
    },
    seriesId: {
        type: String,
        required: true
    },
    accessCount: {
        type: Number,
        default: 0
    }
});

Series.statics.getPopularSeries = function() {
    return this.aggregate([
        {
            $sort: {
                accessCount: -1
            }
        },
        {
            $limit: 5
        },
        {
            $project: {
                _id: 0,
                seriesName: 1,
                accessCount: 1
            }
        }
    ]);
}

export default Series;