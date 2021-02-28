import redis from 'redis';
import config from '../config';
import { promisify } from 'util';

const client: any = redis.createClient(config.redisUrl);
client.on('error', console.error);

['get', 'set', 'del'].map(key => {
    client[`${key}Async`] = promisify(client[key]).bind(client);
});

export default client;