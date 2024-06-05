import Redis from "ioredis"

//type redis or null, when null redis client === null
let redisClient: Redis | null = null;

// returns type Redis
export const getRedisClient = (): Redis => {
    if (!redisClient) {
        // check if env variables set, if not, use default
        redisClient = process.env.REDIS_HOST && process.env.REDIS_PORT ? 
        new Redis({
            host: process.env.REDIS_HOST,
            port: (process.env.REDIS_PORT as unknown as number),
        })
        :
        new Redis({
            host: "localhost",
            port: 5002,
        })
    }
    return redisClient
}