export default {
    imdbApiKey: 'aad4af3de308e323dbe5260140a4126f',
    port: 8080,
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/db',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379'
};