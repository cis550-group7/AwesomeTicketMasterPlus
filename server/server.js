const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route 1 - Description: Returns a row of users
app.get('/user', routes.getUser)

// Route 2 - Description: Create a user with the request body information
app.post('/user/', routes.createNewUser)

// Route 3 - Description: Returns an artist with the provided id 
app.get('/artist', routes.getArtist)

// Route 4 - Description: Returns a list of artists through fuzzy search by name. For example, Tayler Swift will be included in the response with input “swift”. 
app.get('/artists', routes.getArtistsByName)

// Route 5 - Description: Returns an event with the provided id 
// app.get('/event', routes.getEvent)

// Route 6 - Description: Returns a list of events through fuzzy search by name.
app.get('/events', routes.getEvent)

// Route 7 - Description: Returns a venue with the provided id
app.get('/venue', routes.getVenue)

// Route 8 - Description: Returns a list of venues through fuzzy search by name.
app.get('/venues', routes.getVenuesByName)

// Route 9 - Description: Returns a list of artists that the provided user is following
app.get('/follows', routes.getFollows)

// Route 10 - Description: A user follows an artist
app.post('/follow/', routes.followArtist)

// Route 11 - Description: Returns a user’s reserved events 
app.get('/reservations', routes.getReservations)

// Route 12 - Description: A user reserves an event 
app.post('/reservation/', routes.reserveEvent)

// Route 13 - Description: A user cancels an event 
app.delete('/reservation/', routes.unreserveEvent)

// Route 14 - Description: Returns a song with the provided id
app.get('/songs', routes.getSongs)

// Route 15 - Description: For Homepage: Returns top 100 artists with the most events
app.get('/artists/topPopular', routes.getPopularArtists)

// Route 16 - Description: For Homepage: Returns top 100 artists with the most events
app.get('/artists/mostEvents', routes.getArtistsByNumEvents)

// Route 17 - Description: for Homepage: Returns upcoming events in 30 days 
app.get('/events/upcoming', routes.getUpcomingEvents)

// Route 18 - Description: Returns an array of selected attributes for upcoming events in 30 days that match the search query; rank events by dates
app.get('/events/search', routes.search_events)

// Route 19 - Description: Returns an array of selected attributes for artist; rank artists by event counts
app.get('/rank', routes.rankArtistByEventCounts)

// Route 20 - Description: Search songs by the provided artist name 
app.get('/songs/:artist', routes.getArtistSongs)

// Route 21 - Description: Search events participated by a given artist
app.get('/events/:artist', routes.getArtistEvents)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
