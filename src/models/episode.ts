import mongoose from 'mongoose';

const { Schema } = mongoose;

const Episode = new Schema({
    episodeName: {
        type: String,
        required: true
    },
    seriesId: {
        type: Number,
        ref: 'Series'
    },
    averageVotes: {
        type: Number
    }
});

Episode.statics.getTopEpisodes = function(seriesId) {
    return this.aggregate([
        {
            $match: {
                seriesId
            }
        },
        {
            $sort: {
                averageVotes: -1
            }
        },
        {
            $limit: 20
        },
        {
            $project: {
                _id: 0,
                episodeName: 1,
                averageVotes: 1
            }
        }
    ]);
};

export default Episode;
