import { MongoClient } from "mongodb";

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

// ===========================
// QUERY 1: Aggregation Framework
// Average attendance rating per venue.
// Uses $unwind to flatten the attendance array,
// $group to calculate the average rating per venue,
// and $sort to order by highest rated.
// ===========================
// Run with: node queries/query1_avg_rating_per_venue.js

const pipeline = [
  { $unwind: "$attendance" },
  {
    $group: {
      _id: "$attendance.venueName",
      avgRating: { $avg: "$attendance.rating" },
      totalVisits: { $sum: 1 }
    }
  },
  { $sort: { avgRating: -1 } }
];

const client = await MongoClient.connect("mongodb://localhost:27017/");
const coll = client.db("showtracker").collection("users");
const cursor = coll.aggregate(pipeline);
const result = await cursor.toArray();
console.log(result);
await client.close();