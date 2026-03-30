# ShowTracker MongoDB Collection Definitions

This document defines the three main collections used in the ShowTracker MongoDB database. Each collection includes a description of its structure, embedding decisions, and example documents.

---

## Show Collection

The Show collection is the central entity of ShowTracker. Each document represents a single live performance event.

- **Venue** is embedded (1:1) since a show happens at exactly one venue and venue info is always accessed alongside the show.
- **Setlist** entries are embedded (1:0..\*) as an ordered array of songs performed at the show.
- **Featured artists** are embedded references (1:1..\*) containing the artist's ObjectId for cross-collection lookups, plus a denormalized name for display without needing a lookup.

### Example 1: Single-artist concert

```json
{
  "_id": "ObjectId('664a1f2e3b1a4c5d6e7f8a01')",
  "date": "2025-06-15",
  "ticketPrice": 45.00,
  "genre": "Rock",
  "venue": {
    "name": "Madison Square Garden",
    "city": "New York",
    "state": "NY",
    "capacity": 20000,
    "genreTags": ["Rock", "Pop", "Hip-Hop"]
  },
  "setlist": [
    { "order": 1, "songTitle": "Someday", "artistName": "The Strokes" },
    { "order": 2, "songTitle": "Reptilia", "artistName": "The Strokes" },
    { "order": 3, "songTitle": "Last Nite", "artistName": "The Strokes" }
  ],
  "featuredArtists": [
    {
      "artistId": "ObjectId('664a1f2e3b1a4c5d6e7f8b01')",
      "name": "The Strokes"
    }
  ]
}
```

### Example 2: Multi-artist event

```json
{
  "_id": "ObjectId('664a1f2e3b1a4c5d6e7f8a02')",
  "date": "2025-08-20",
  "ticketPrice": 85.00,
  "genre": "Indie",
  "venue": {
    "name": "Forest Hills Stadium",
    "city": "Queens",
    "state": "NY",
    "capacity": 14000,
    "genreTags": ["Indie", "Alternative", "Rock"]
  },
  "setlist": [
    { "order": 1, "songTitle": "Motion Sickness", "artistName": "Phoebe Bridgers" },
    { "order": 2, "songTitle": "Kyoto", "artistName": "Phoebe Bridgers" },
    { "order": 3, "songTitle": "Bags", "artistName": "Clairo" },
    { "order": 4, "songTitle": "Sofia", "artistName": "Clairo" }
  ],
  "featuredArtists": [
    {
      "artistId": "ObjectId('664a1f2e3b1a4c5d6e7f8b02')",
      "name": "Phoebe Bridgers"
    },
    {
      "artistId": "ObjectId('664a1f2e3b1a4c5d6e7f8b03')",
      "name": "Clairo"
    }
  ]
}
```

---

## User Collection

The User collection stores user accounts and their concert activity.

- **Attendance** records are embedded (1:0..\*) since reviews and ratings only make sense in the context of a specific user's experience at a show.
- Each attendance entry contains denormalized show info (`date`, `venueName`) so the app can display a user's concert history without additional lookups.
- `showId` is kept as a reference for navigating to the full Show document when needed.

### Example 1: Active user with attendance history

```json
{
  "_id": "ObjectId('664a1f2e3b1a4c5d6e7f8c01')",
  "username": "ethan07",
  "email": "ethan@example.com",
  "password": "hashed_password_here",
  "attendance": [
    {
      "showId": "ObjectId('664a1f2e3b1a4c5d6e7f8a01')",
      "date": "2025-06-15",
      "venueName": "Madison Square Garden",
      "rating": 5,
      "review": "Incredible energy. The Strokes played all the hits."
    },
    {
      "showId": "ObjectId('664a1f2e3b1a4c5d6e7f8a02')",
      "date": "2025-08-20",
      "venueName": "Forest Hills Stadium",
      "rating": 4,
      "review": "Great lineup, but the sound mixing could have been better."
    }
  ]
}
```

### Example 2: New user with no attendance

```json
{
  "_id": "ObjectId('664a1f2e3b1a4c5d6e7f8c02')",
  "username": "concertfan99",
  "email": "fan99@example.com",
  "password": "hashed_password_here",
  "attendance": []
}
```

---

## Artist Collection

The Artist collection stores artist profiles and their song catalogs.

- **Songs** are embedded (1:0..\*) since a song belongs to exactly one artist (per the design decision from Project 1) and is always accessed in the context of that artist.
- Each song has a `songId` for potential individual referencing and a `title`.

### Example 1

```json
{
  "_id": "ObjectId('664a1f2e3b1a4c5d6e7f8b01')",
  "name": "The Strokes",
  "genre": "Rock",
  "biography": "American rock band formed in New York City in 1998.",
  "songs": [
    { "songId": "ObjectId('664a1f2e3b1a4c5d6e7f8d01')", "title": "Someday" },
    { "songId": "ObjectId('664a1f2e3b1a4c5d6e7f8d02')", "title": "Reptilia" },
    { "songId": "ObjectId('664a1f2e3b1a4c5d6e7f8d03')", "title": "Last Nite" }
  ]
}
```

### Example 2

```json
{
  "_id": "ObjectId('664a1f2e3b1a4c5d6e7f8b02')",
  "name": "Phoebe Bridgers",
  "genre": "Indie",
  "biography": "American singer-songwriter known for melancholic indie rock.",
  "songs": [
    { "songId": "ObjectId('664a1f2e3b1a4c5d6e7f8d04')", "title": "Motion Sickness" },
    { "songId": "ObjectId('664a1f2e3b1a4c5d6e7f8d05')", "title": "Kyoto" },
    { "songId": "ObjectId('664a1f2e3b1a4c5d6e7f8d06')", "title": "Garden Song" }
  ]
}
```