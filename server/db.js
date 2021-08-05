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
const hset = promisify(client.hset).bind(client);

module.exports = {
  client,
  smembers,
  hgetall,
  hset,
};

// Product;
// client.hmset(
//   "product:Cool#Ring#1",
//   "name",
//   "Cool Ring 1",
//   "category",
//   "Rings",
//   "desc",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel.",
//   "SKU",
//   "crwrawm-8",
//   "price",
//   30,
//   "image",
//   "https://drive.google.com/uc?export=view&id=1wooI2NrwQwMSm1Z7cOhkK2TsoG1Ut0CR",
//   "created:at",
//   new Date().toLocaleDateString()
// );

// client.hmset(
//   "product:Cool#Ring#2",
//   "name",
//   "Cool Ring 2",
//   "category",
//   "Rings",
//   "desc",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel.",
//   "SKU",
//   "crwrawm-7",
//   "price",
//   28,
//   "image",
//   "https://drive.google.com/uc?export=view&id=1wooI2NrwQwMSm1Z7cOhkK2TsoG1Ut0CR",
//   "created:at",
//   new Date().toLocaleDateString()
// );

// client.hmset(
//   "product:Cool#Ring#3",
//   "name",
//   "Cool Ring 3",
//   "category",
//   "Rings",
//   "desc",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel.",
//   "SKU",
//   "crwrawm-5",
//   "price",
//   22,
//   "image",
//   "https://drive.google.com/uc?export=view&id=1wooI2NrwQwMSm1Z7cOhkK2TsoG1Ut0CR",
//   "created:at",
//   new Date().toLocaleDateString()
// );

// client.hmset(
//   "product:Cool#Ring#4",
//   "name",
//   "Cool Ring 4",
//   "category",
//   "Rings",
//   "desc",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel.",
//   "SKU",
//   "crwrawm-9",
//   "price",
//   35,
//   "image",
//   "https://drive.google.com/uc?export=view&id=1wooI2NrwQwMSm1Z7cOhkK2TsoG1Ut0CR",
//   "created:at",
//   new Date().toLocaleDateString()
// );

// client.hmset(
//   "product:Cool#Ring#5",
//   "name",
//   "Cool Ring 5",
//   "category",
//   "Rings",
//   "desc",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel.",
//   "SKU",
//   "crwrawm-6",
//   "price",
//   28,
//   "image",
//   "https://drive.google.com/uc?export=view&id=1wooI2NrwQwMSm1Z7cOhkK2TsoG1Ut0CR",
//   "created:at",
//   new Date().toLocaleDateString()
// );

// client.hmset(
//   "product:Cool#Ring#6",
//   "name",
//   "Cool Ring 6",
//   "category",
//   "Rings",
//   "desc",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel.",
//   "SKU",
//   "crwrawm-8",
//   "price",
//   30,
//   "image",
//   "https://drive.google.com/uc?export=view&id=1wooI2NrwQwMSm1Z7cOhkK2TsoG1Ut0CR",
//   "created:at",
//   new Date().toLocaleDateString()
// );

// client.hmset(
//   "product:Cool#Ring#7",
//   "name",
//   "Cool Ring 7",
//   "category",
//   "Rings",
//   "desc",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel.",
//   "SKU",
//   "crwrawm-7",
//   "price",
//   28,
//   "image",
//   "https://drive.google.com/uc?export=view&id=1wooI2NrwQwMSm1Z7cOhkK2TsoG1Ut0CR",
//   "created:at",
//   new Date().toLocaleDateString()
// );

// client.hmset(
//   "product:Cool#Ring#8",
//   "name",
//   "Cool Ring 8",
//   "category",
//   "Rings",
//   "desc",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel.",
//   "SKU",
//   "crwrawm-8",
//   "price",
//   30,
//   "image",
//   "https://drive.google.com/uc?export=view&id=1wooI2NrwQwMSm1Z7cOhkK2TsoG1Ut0CR",
//   "created:at",
//   new Date().toLocaleDateString()
// );

// client.hmset(
//   "product:Cool#Ring#9",
//   "name",
//   "Cool Ring 9",
//   "category",
//   "Rings",
//   "desc",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel.",
//   "SKU",
//   "crwrawm-6",
//   "price",
//   22,
//   "image",
//   "https://drive.google.com/uc?export=view&id=1wooI2NrwQwMSm1Z7cOhkK2TsoG1Ut0CR",
//   "created:at",
//   new Date().toLocaleDateString()
// );

// client.hmset(
//   "product:Cool#Ring#10",
//   "name",
//   "Cool Ring 10",
//   "category",
//   "Rings",
//   "desc",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel.",
//   "SKU",
//   "crwrawm-5",
//   "price",
//   20,
//   "image",
//   "https://drive.google.com/uc?export=view&id=1wooI2NrwQwMSm1Z7cOhkK2TsoG1Ut0CR",
//   "created:at",
//   new Date().toLocaleDateString()
// );

// client.sadd([
//   "product",
//   "product:Cool#Ring#1",
//   "product",
//   "product:Cool#Ring#2",
//   "product",
//   "product:Cool#Ring#3",
//   "product",
//   "product:Cool#Ring#4",
//   "product",
//   "product:Cool#Ring#5",
//   "product",
//   "product:Cool#Ring#6",
//   "product",
//   "product:Cool#Ring#7",
//   "product",
//   "product:Cool#Ring#8",
//   "product",
//   "product:Cool#Ring#9",
//   "product",
//   "product:Cool#Ring#10",
// ]);
