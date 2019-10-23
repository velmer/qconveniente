import redis, { RedisClient, ClientOpts } from "redis";

/**
 * Wrapper de um Singleton do Cliente Redis, para permitir que todos os Models
 * (Schemas) tenham acesso ao mesmo Cliente.
 */
export default class RedisClientSingletonWrapper {

    private static redisClientInstance: RedisClient;

    private constructor() { }

    /**
     * Configura Cliente Redis, o qual deve ser configurado uma única vez.
     */
    public static configuraCliente(port: number, host?: string, options?: ClientOpts) {
        if (RedisClientSingletonWrapper.redisClientInstance != null) {
            throw new Error("A instância do Redis já foi configurada.");
        }
        RedisClientSingletonWrapper.redisClientInstance = redis.createClient(port, host, options);
    }

    /**
     * Retorna a instância do Cliente Redis. Caso a mesma não tenha sido
     * configurada anteriormente, lança um erro.
     */
    public static getInstance(): RedisClient {
        if (RedisClientSingletonWrapper.redisClientInstance == null) {
            throw new Error("A instância do Redis ainda não foi configurada.");
        }
        return RedisClientSingletonWrapper.redisClientInstance;
    }

}