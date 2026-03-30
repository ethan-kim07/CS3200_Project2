import { MongoClient } from "mongodb";

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

// ===========================
// QUERY 2: Complex Search Criterion
// Find shows that are either "Rock" or "Indie" genre
// AND have a ticket price under $60.
// Uses $and with a nested $or.
// ===========================
// Run with: node queries/query2_complex_search.js

const filter = {
  $and: [
    {
      $or: [
        { genre: "Rock" },
        { genre: "Indie" }
      ]
    },
    { ticketPrice: { $lt: 60 } }
  ]
};

const projection = {
  date: 1,
  genre: 1,
  ticketPrice: 1,
  "venue.name": 1
};

const client = await MongoClient.connect("mongodb://localhost:27017/");
const coll = client.db("showtracker").collection("shows");
const cursor = coll.find(filter).project(projection);
const result = await cursor.toArray();
console.log(result);
await client.close();