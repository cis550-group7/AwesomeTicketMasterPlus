const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route 1 - register as GET 
app.get('/users', routes.getUser)

// Route 2 - register as GET 
app.post('/user/', routes.createNewUser)

// Route 3 - register as GET 
app.get('/artist', routes.getArtist)

// Route 4 - register as GET 
app.get('/artists/', routes.getArtistsByName)

// Route 5 - register as GET 
app.get('/event', routes.getEvent)

// Route 6 - register as GET 
app.get('/events/', routes.getEventsByName)

// Route 7 - register as GET 
app.get('/venue', routes.getVenue)

// Route 8 - register as GET 
app.get('/venues/', routes.getVenuesByName)

// Route 9 - register as GET 
app.get('/follows', routes.getFollows)

// Route 10 - register as GET 
app.post('/follow/', routes.followArtist)

// Route 11 - register as GET 
app.get('/reservations', routes.getReservations)

// Route 12 - register as GET 
app.post('/reservation/', routes.reserveEvent)

// Route 13 - register as GET 
app.delete('/reservation/', routes.unreserveEvent)

// Route 14 - register as GET 
app.get('/song', routes.getSongs)

// Route 15 - register as GET 
app.get('/topArtists/', routes.getPopularArtists)

// Route 16 - register as GET 
app.get('/upcomingEvents/', routes.getUpcomingEvents)

// Route 17 - register as GET 
app.get('/search/events', routes.search_events)

// Route 18 - register as GET 
app.get('/artists/rank', routes.rankArtistByEventCounts)

// Route 19 - register as GET 
app.get('/artist', routes.getArtistByName)

// Route 20 - register as GET 
app.get('/artist/songs', routes.getArtistSongs)

// Route 20 - register as GET 
app.get('/artist/events', routes.getArtistEvents)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
