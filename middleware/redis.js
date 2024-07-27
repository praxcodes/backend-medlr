const redis=require('redis');

require('dotenv').config();
const hash=require("object-hash")

let client=undefined;
async function initialiseRedisClient(){
let redisURL=process.env.REDIS_URI
if(redisURL){
client= redis.createClient({url: redisURL}).on("err",(e)=>{
    console.error(`Failed to create the redis client with error:`);
    console.error(e);
})
try {
    //connect to redis server 
    await client.connect();
    console.log("Conencted to redis client successfully");
} catch (error) {
    console.error(error)
}
}
}

function requestToKey(req){
    const reqDataToHash = {
        query: req.query,
        body: req.body,
    };
    return `${req.path}@${hash.sha1(reqDataToHash)}`;

}

function isRedisWorking() {
    // verify wheter there is an active connection
    // to a Redis server or not
    return !!client?.isOpen;
  }

  async function writeData(key, data, options) {
    if (isRedisWorking()) {
      try {
        // write data to the Redis cache
        await client.set(key, data, options);
      } catch (e) {
        console.error(`Failed to cache data for key=${key}`, e);
      }
    }
  }
  async function readData(key) {
    let cachedValue = undefined;
  
    if (isRedisWorking()) {
      // try to get the cached response from redis
      cachedValue = await client.get(key);
      if (cachedValue) {
          return cachedValue;
      }
    }
  }
  function redisCacheMiddleware(
    options = {
      EX: 21600, // 6h
    }
  ) {
    return async (req, res, next) => {
      if (isRedisWorking()) {
        const key = requestToKey(req);
        // if there is some cached data, retrieve it and return it
        const cachedValue = await readData(key);
        if (cachedValue) {
          try {
            // if it is JSON data, then return it
            return res.json(JSON.parse(cachedValue));
          } catch {
            // if it is not JSON data, then return it
            return res.send(cachedValue);
          }
        } else {
          // override how res.send behaves
          // to introduce the caching logic
          const oldSend = res.send;
          res.send = function (data) {
            // set the function back to avoid the 'double-send' effect
            res.send = oldSend;
  
            // cache the response only if it is successful
            if (res.statusCode.toString().startsWith("2")) {
              writeData(key, data, options).then();
            }
  
            return res.send(data);
          };
  
          // continue to the controller function
          next();
        }
      } else {
        // proceed with no caching
        next();
      }
    };
  }

module.exports= {initialiseRedisClient,client, redisCacheMiddleware}



