import { MongoClient } from "mongodb";

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

// ===========================
// QUERY 3: Count Documents for a Specific User
// Count how many shows the user "ethan07" has attended.
// Uses $match to find the user, then $project with $size
// to count the attendance array length.
// ===========================
// Run with: node queries/query3_count_user_shows.js

const pipeline = [
  { $match: { username: "ethan07" } },
  {
    $project: {
      username: 1,
      showsAttended: { $size: "$attendance" }
    }
  }
];

const client = await MongoClient.connect("mongodb://localhost:27017/");
const coll = client.db("showtracker").collection("users");
const cursor = coll.aggregate(pipeline);
const result = await cursor.toArray();
console.log(result);
await client.close();