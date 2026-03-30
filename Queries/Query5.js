import { MongoClient } from "mongodb";

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

// ===========================
// QUERY 5: Top 5 Most Attended Shows
// Uses $unwind to flatten user attendance,
// $group to count attendees per show,
// $sort and $limit for top 5,
// and $lookup to join with the shows collection
// for full show details.
// ===========================
// Run with: node queries/query5_top_attended_shows.js

const pipeline = [
  { $unwind: "$attendance" },
  {
    $group: {
      _id: "$attendance.showId",
      attendeeCount: { $sum: 1 },
      venueName: { $first: "$attendance.venueName" },
      date: { $first: "$attendance.date" }
    }
  },
  { $sort: { attendeeCount: -1 } },
  { $limit: 5 },
  {
    $lookup: {
      from: "shows",
      localField: "_id",
      foreignField: "_id",
      as: "showDetails"
    }
  },
  { $unwind: "$showDetails" },
  {
    $project: {
      _id: 0,
      venueName: 1,
      date: 1,
      attendeeCount: 1,
      genre: "$showDetails.genre",
      artists: "$showDetails.featuredArtists.name"
    }
  }
];

const client = await MongoClient.connect("mongodb://localhost:27017/");
const coll = client.db("showtracker").collection("users");
const cursor = coll.aggregate(pipeline);
const result = await cursor.toArray();
console.log(result);
await client.close();