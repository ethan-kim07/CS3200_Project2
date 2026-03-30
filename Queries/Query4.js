import { MongoClient } from "mongodb";

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

// ===========================
// QUERY 4: Update Document Based on Query Parameter
// Add an "active" field to all artists in the "Rock" genre
// and set it to false (disabling them).
// Then re-enable The Strokes by setting active back to true.
// ===========================
// Run with: node queries/query4_update_active.js

const client = await MongoClient.connect("mongodb://localhost:27017/");
const coll = client.db("showtracker").collection("artists");

// Disable all Rock artists
const disableResult = await coll.updateMany(
  { genre: "Rock" },
  { $set: { active: false } }
);
console.log("Disabled Rock artists:", disableResult.modifiedCount);

// Re-enable The Strokes
const enableResult = await coll.updateOne(
  { name: "The Strokes" },
  { $set: { active: true } }
);
console.log("Re-enabled The Strokes:", enableResult.modifiedCount);

// Verify the changes
const cursor = coll.find(
  { genre: "Rock" },
  { projection: { name: 1, active: 1 } }
);
const result = await cursor.toArray();
console.log("Rock artists after update:");
console.log(result);

await client.close();