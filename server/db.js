const redis = require("redis");
const client = redis.createClient({
  url: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS,
});

const { promisify } = require("util");

client.on("error", function (err) {
  console.log("ERROR ", err);
});

client.on("connect", function () {
  console.log("connected");
});

const smembers = promisify(client.smembers).bind(client);
const hgetall = promisify(client.hgetall).bind(client);
const hget = promisify(client.hget).bind(client);
const hmset = promisify(client.hmset).bind(client);
const hset = promisify(client.hset).bind(client);
const del = promisify(client.del).bind(client);

module.exports = {
  client,
  smembers,
  hgetall,
  hget,
  hmset,
  hset,
};

// Product
// client.hmset(
//   "product:Ring#4",
//   "name",
//   "Ring 4",
//   "category",
//   "rings",
//   "desc",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel.",
//   "price",
//   1,
//   "image",
//   "https://lightroom.adobe.com/v2c/catalogs/5a0da799f1d1439dbc1917e4d4eed40c/assets/af64561048e2457e94904aea349154af/revisions/b7ec7154e2ef4192b25aaf1126958ad1/renditions/1a9db2ab746c4f73630c70a0d118b4ce",
//   "created:at",
//   new Date().toLocaleDateString()
// );

// client.sadd([
//   "product",
//   "product:Bracelet#1",
//   "product:Bracelet#2",
//   "product:Bracelet#3",
//   "product:Bracelet#4",
//   "product:Bracelet#5",
//   "product:Bracelet#6",
//   "product:Bracelet#7",
//   "product:Bracelet#8",
//   "product:Bracelet#9",
//   "product:Bracelet#10",
//   "product:Pendant#1",
//   "product:Pendant#2",
//   "product:Pendant#3",
//   "product:Pendant#4",
//   "product:Pendant#5",
//   "product:Ring#1",
//   "product:Ring#2",
//   "product:Ring#3",
//   "product:Ring#4",
//   "product:Ring#5",
//   "product:Ring#6",
//   "product:Ring#7",
//   "product:Ring#8",
//   "product:Ring#9",
//   "product:Ring#10",
//   "product:Ring#11",
// ]);

// (async function () {
//   hset(
//     "product:Ring#2",
//     "image",
//     "https://lightroom.adobe.com/v2c/catalogs/5a0da799f1d1439dbc1917e4d4eed40c/assets/ce2320f70f054128836380bc97403200/revisions/787ff38efdca45768732d96f985d7ac8/renditions/209410946a6acfdf3082fa598dabc2cd"
//   );
// })();
