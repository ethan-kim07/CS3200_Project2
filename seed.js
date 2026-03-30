// ShowTracker MongoDB Seed Script
// Run with: mongosh showtracker seed.js
// This will drop the existing database and repopulate it with test data.

db.dropDatabase();

// ===========================
// ARTISTS (10)
// ===========================
const artists = [
  {
    name: "The Strokes",
    genre: "Rock",
    biography: "American rock band formed in New York City in 1998.",
    songs: [
      { songId: ObjectId(), title: "Someday" },
      { songId: ObjectId(), title: "Reptilia" },
      { songId: ObjectId(), title: "Last Nite" },
      { songId: ObjectId(), title: "Is This It" }
    ]
  },
  {
    name: "Phoebe Bridgers",
    genre: "Indie",
    biography: "American singer-songwriter known for melancholic indie rock.",
    songs: [
      { songId: ObjectId(), title: "Motion Sickness" },
      { songId: ObjectId(), title: "Kyoto" },
      { songId: ObjectId(), title: "Garden Song" },
      { songId: ObjectId(), title: "I Know the End" }
    ]
  },
  {
    name: "Clairo",
    genre: "Indie Pop",
    biography: "American singer-songwriter known for bedroom pop and indie music.",
    songs: [
      { songId: ObjectId(), title: "Bags" },
      { songId: ObjectId(), title: "Sofia" },
      { songId: ObjectId(), title: "Amoeba" },
      { songId: ObjectId(), title: "Pretty Girl" }
    ]
  },
  {
    name: "Tyler, the Creator",
    genre: "Hip-Hop",
    biography: "American rapper, singer, and record producer from Los Angeles.",
    songs: [
      { songId: ObjectId(), title: "EARFQUAKE" },
      { songId: ObjectId(), title: "See You Again" },
      { songId: ObjectId(), title: "NEW MAGIC WAND" },
      { songId: ObjectId(), title: "RUNNING OUT OF TIME" }
    ]
  },
  {
    name: "Radiohead",
    genre: "Alternative",
    biography: "English rock band formed in Oxfordshire in 1985.",
    songs: [
      { songId: ObjectId(), title: "Creep" },
      { songId: ObjectId(), title: "Karma Police" },
      { songId: ObjectId(), title: "No Surprises" },
      { songId: ObjectId(), title: "Everything in Its Right Place" }
    ]
  },
  {
    name: "SZA",
    genre: "R&B",
    biography: "American singer-songwriter known for neo-soul and R&B.",
    songs: [
      { songId: ObjectId(), title: "Kill Bill" },
      { songId: ObjectId(), title: "Good Days" },
      { songId: ObjectId(), title: "Kiss Me More" },
      { songId: ObjectId(), title: "Snooze" }
    ]
  },
  {
    name: "Tame Impala",
    genre: "Psychedelic Rock",
    biography: "Australian psychedelic music project led by Kevin Parker.",
    songs: [
      { songId: ObjectId(), title: "The Less I Know the Better" },
      { songId: ObjectId(), title: "Let It Happen" },
      { songId: ObjectId(), title: "Feels Like We Only Go Backwards" },
      { songId: ObjectId(), title: "Borderline" }
    ]
  },
  {
    name: "Billie Eilish",
    genre: "Pop",
    biography: "American singer-songwriter who rose to fame as a teenager.",
    songs: [
      { songId: ObjectId(), title: "bad guy" },
      { songId: ObjectId(), title: "Happier Than Ever" },
      { songId: ObjectId(), title: "everything i wanted" },
      { songId: ObjectId(), title: "ocean eyes" }
    ]
  },
  {
    name: "Mac DeMarco",
    genre: "Indie Rock",
    biography: "Canadian singer-songwriter known for laid-back jangle pop.",
    songs: [
      { songId: ObjectId(), title: "Chamber of Reflection" },
      { songId: ObjectId(), title: "My Old Man" },
      { songId: ObjectId(), title: "Freaking Out the Neighborhood" },
      { songId: ObjectId(), title: "Still Beating" }
    ]
  },
  {
    name: "Kendrick Lamar",
    genre: "Hip-Hop",
    biography: "American rapper and songwriter from Compton, California.",
    songs: [
      { songId: ObjectId(), title: "HUMBLE." },
      { songId: ObjectId(), title: "Alright" },
      { songId: ObjectId(), title: "DNA." },
      { songId: ObjectId(), title: "Money Trees" }
    ]
  }
];

db.artists.insertMany(artists);
const insertedArtists = db.artists.find().toArray();
print("Inserted " + insertedArtists.length + " artists");


// ===========================
// VENUES (used for embedding in shows)
// ===========================
const venues = [
  { name: "Madison Square Garden", city: "New York", state: "NY", capacity: 20000, genreTags: ["Rock", "Pop", "Hip-Hop"] },
  { name: "Forest Hills Stadium", city: "Queens", state: "NY", capacity: 14000, genreTags: ["Indie", "Alternative", "Rock"] },
  { name: "The Bowery Ballroom", city: "New York", state: "NY", capacity: 575, genreTags: ["Indie", "Rock", "Punk"] },
  { name: "Brooklyn Steel", city: "Brooklyn", state: "NY", capacity: 1800, genreTags: ["Indie", "Electronic", "Hip-Hop"] },
  { name: "Radio City Music Hall", city: "New York", state: "NY", capacity: 6015, genreTags: ["Pop", "R&B", "Jazz"] },
  { name: "The Beacon Theatre", city: "New York", state: "NY", capacity: 2894, genreTags: ["Rock", "Alternative", "Folk"] },
  { name: "Terminal 5", city: "New York", state: "NY", capacity: 3000, genreTags: ["Electronic", "Hip-Hop", "Rock"] },
  { name: "Webster Hall", city: "New York", state: "NY", capacity: 1500, genreTags: ["Indie", "Pop", "Electronic"] }
];


// ===========================
// SHOWS (15)
// ===========================

// Helper: pick random songs from an artist for a setlist
function makeSetlist(artist, count) {
  const songs = artist.songs.slice(0, count);
  return songs.map((s, i) => ({
    order: i + 1,
    songTitle: s.title,
    artistName: artist.name
  }));
}

// Helper: make a featured artist reference
function makeRef(artist) {
  return { artistId: artist._id, name: artist.name };
}

const shows = [
  {
    date: new Date("2025-01-18"),
    ticketPrice: 55.00,
    genre: "Rock",
    venue: venues[0],
    setlist: makeSetlist(insertedArtists[0], 4),
    featuredArtists: [makeRef(insertedArtists[0])]
  },
  {
    date: new Date("2025-02-14"),
    ticketPrice: 40.00,
    genre: "Indie",
    venue: venues[2],
    setlist: makeSetlist(insertedArtists[1], 4),
    featuredArtists: [makeRef(insertedArtists[1])]
  },
  {
    date: new Date("2025-03-08"),
    ticketPrice: 85.00,
    genre: "Indie",
    venue: venues[1],
    setlist: [
      ...makeSetlist(insertedArtists[1], 2),
      ...makeSetlist(insertedArtists[2], 2).map((s, i) => ({ ...s, order: i + 3 }))
    ],
    featuredArtists: [makeRef(insertedArtists[1]), makeRef(insertedArtists[2])]
  },
  {
    date: new Date("2025-03-22"),
    ticketPrice: 95.00,
    genre: "Hip-Hop",
    venue: venues[0],
    setlist: makeSetlist(insertedArtists[3], 4),
    featuredArtists: [makeRef(insertedArtists[3])]
  },
  {
    date: new Date("2025-04-05"),
    ticketPrice: 70.00,
    genre: "Alternative",
    venue: venues[5],
    setlist: makeSetlist(insertedArtists[4], 4),
    featuredArtists: [makeRef(insertedArtists[4])]
  },
  {
    date: new Date("2025-04-19"),
    ticketPrice: 60.00,
    genre: "R&B",
    venue: venues[4],
    setlist: makeSetlist(insertedArtists[5], 4),
    featuredArtists: [makeRef(insertedArtists[5])]
  },
  {
    date: new Date("2025-05-10"),
    ticketPrice: 75.00,
    genre: "Psychedelic Rock",
    venue: venues[3],
    setlist: makeSetlist(insertedArtists[6], 4),
    featuredArtists: [makeRef(insertedArtists[6])]
  },
  {
    date: new Date("2025-05-31"),
    ticketPrice: 110.00,
    genre: "Pop",
    venue: venues[0],
    setlist: makeSetlist(insertedArtists[7], 4),
    featuredArtists: [makeRef(insertedArtists[7])]
  },
  {
    date: new Date("2025-06-15"),
    ticketPrice: 35.00,
    genre: "Indie Rock",
    venue: venues[7],
    setlist: makeSetlist(insertedArtists[8], 4),
    featuredArtists: [makeRef(insertedArtists[8])]
  },
  {
    date: new Date("2025-07-04"),
    ticketPrice: 120.00,
    genre: "Hip-Hop",
    venue: venues[0],
    setlist: [
      ...makeSetlist(insertedArtists[9], 3),
      ...makeSetlist(insertedArtists[3], 2).map((s, i) => ({ ...s, order: i + 4 }))
    ],
    featuredArtists: [makeRef(insertedArtists[9]), makeRef(insertedArtists[3])]
  },
  {
    date: new Date("2025-07-20"),
    ticketPrice: 45.00,
    genre: "Indie Pop",
    venue: venues[2],
    setlist: makeSetlist(insertedArtists[2], 4),
    featuredArtists: [makeRef(insertedArtists[2])]
  },
  {
    date: new Date("2025-08-09"),
    ticketPrice: 65.00,
    genre: "Alternative",
    venue: venues[6],
    setlist: [
      ...makeSetlist(insertedArtists[4], 2),
      ...makeSetlist(insertedArtists[6], 2).map((s, i) => ({ ...s, order: i + 3 }))
    ],
    featuredArtists: [makeRef(insertedArtists[4]), makeRef(insertedArtists[6])]
  },
  {
    date: new Date("2025-08-30"),
    ticketPrice: 50.00,
    genre: "R&B",
    venue: venues[3],
    setlist: makeSetlist(insertedArtists[5], 3),
    featuredArtists: [makeRef(insertedArtists[5])]
  },
  {
    date: new Date("2025-09-14"),
    ticketPrice: 90.00,
    genre: "Rock",
    venue: venues[5],
    setlist: [
      ...makeSetlist(insertedArtists[0], 3),
      ...makeSetlist(insertedArtists[8], 2).map((s, i) => ({ ...s, order: i + 4 }))
    ],
    featuredArtists: [makeRef(insertedArtists[0]), makeRef(insertedArtists[8])]
  },
  {
    date: new Date("2025-10-01"),
    ticketPrice: 100.00,
    genre: "Pop",
    venue: venues[4],
    setlist: [
      ...makeSetlist(insertedArtists[7], 2),
      ...makeSetlist(insertedArtists[5], 2).map((s, i) => ({ ...s, order: i + 3 }))
    ],
    featuredArtists: [makeRef(insertedArtists[7]), makeRef(insertedArtists[5])]
  }
];

db.shows.insertMany(shows);
const insertedShows = db.shows.find().toArray();
print("Inserted " + insertedShows.length + " shows");


// ===========================
// USERS (10)
// ===========================

// Helper: make an attendance record
function makeAttendance(show, rating, review) {
  return {
    showId: show._id,
    date: show.date,
    venueName: show.venue.name,
    rating: rating,
    review: review
  };
}

const reviews = [
  "Amazing show, would definitely go again!",
  "Great energy from the crowd and the performers.",
  "Solid performance but the venue was too crowded.",
  "One of the best concerts I've ever been to.",
  "Good setlist but the sound quality could be better.",
  "Incredible night, every song was a hit.",
  "Fun experience, though the opening act was weak.",
  "The artist really knows how to work a crowd.",
  "Exceeded my expectations in every way.",
  "Decent show, nothing too special.",
  "Unforgettable night with friends.",
  "The acoustics in this venue are perfect.",
  "A bit overpriced for what it was.",
  "Would have liked a longer setlist.",
  "Absolutely electric atmosphere."
];

function randomReview() {
  return reviews[Math.floor(Math.random() * reviews.length)];
}

const users = [
  {
    username: "ethan07",
    email: "ethan@example.com",
    password: "hashed_pw_001",
    attendance: [
      makeAttendance(insertedShows[0], 5, "Incredible energy. The Strokes played all the hits."),
      makeAttendance(insertedShows[2], 4, "Great lineup, but the sound mixing could have been better."),
      makeAttendance(insertedShows[4], 5, "Radiohead never disappoints. Phenomenal show."),
      makeAttendance(insertedShows[9], 5, "Kendrick and Tyler together was unreal.")
    ]
  },
  {
    username: "concertfan99",
    email: "fan99@example.com",
    password: "hashed_pw_002",
    attendance: [
      makeAttendance(insertedShows[1], 4, randomReview()),
      makeAttendance(insertedShows[5], 5, randomReview()),
      makeAttendance(insertedShows[7], 3, randomReview())
    ]
  },
  {
    username: "musiclover22",
    email: "musiclover22@example.com",
    password: "hashed_pw_003",
    attendance: [
      makeAttendance(insertedShows[3], 5, randomReview()),
      makeAttendance(insertedShows[6], 4, randomReview()),
      makeAttendance(insertedShows[8], 4, randomReview()),
      makeAttendance(insertedShows[10], 3, randomReview()),
      makeAttendance(insertedShows[14], 5, randomReview())
    ]
  },
  {
    username: "indiekid",
    email: "indiekid@example.com",
    password: "hashed_pw_004",
    attendance: [
      makeAttendance(insertedShows[1], 5, randomReview()),
      makeAttendance(insertedShows[2], 5, randomReview()),
      makeAttendance(insertedShows[8], 4, randomReview()),
      makeAttendance(insertedShows[10], 5, randomReview())
    ]
  },
  {
    username: "bassguy",
    email: "bassguy@example.com",
    password: "hashed_pw_005",
    attendance: [
      makeAttendance(insertedShows[0], 4, randomReview()),
      makeAttendance(insertedShows[4], 5, randomReview()),
      makeAttendance(insertedShows[11], 4, randomReview()),
      makeAttendance(insertedShows[13], 5, randomReview())
    ]
  },
  {
    username: "showhopper",
    email: "showhopper@example.com",
    password: "hashed_pw_006",
    attendance: [
      makeAttendance(insertedShows[0], 3, randomReview()),
      makeAttendance(insertedShows[1], 4, randomReview()),
      makeAttendance(insertedShows[3], 5, randomReview()),
      makeAttendance(insertedShows[5], 4, randomReview()),
      makeAttendance(insertedShows[7], 5, randomReview()),
      makeAttendance(insertedShows[9], 5, randomReview()),
      makeAttendance(insertedShows[12], 3, randomReview())
    ]
  },
  {
    username: "nycsounds",
    email: "nycsounds@example.com",
    password: "hashed_pw_007",
    attendance: [
      makeAttendance(insertedShows[5], 5, randomReview()),
      makeAttendance(insertedShows[14], 4, randomReview())
    ]
  },
  {
    username: "vibesonly",
    email: "vibesonly@example.com",
    password: "hashed_pw_008",
    attendance: [
      makeAttendance(insertedShows[6], 5, randomReview()),
      makeAttendance(insertedShows[11], 3, randomReview()),
      makeAttendance(insertedShows[12], 4, randomReview())
    ]
  },
  {
    username: "newuser2025",
    email: "newuser@example.com",
    password: "hashed_pw_009",
    attendance: []
  },
  {
    username: "livemusic_addict",
    email: "livemusic@example.com",
    password: "hashed_pw_010",
    attendance: [
      makeAttendance(insertedShows[2], 4, randomReview()),
      makeAttendance(insertedShows[7], 5, randomReview()),
      makeAttendance(insertedShows[9], 5, randomReview()),
      makeAttendance(insertedShows[13], 4, randomReview()),
      makeAttendance(insertedShows[14], 5, randomReview())
    ]
  }
];

db.users.insertMany(users);
print("Inserted " + users.length + " users");

print("\n=== Database seeded successfully ===");
print("Collections: artists (" + insertedArtists.length + "), shows (" + insertedShows.length + "), users (" + users.length + ")");