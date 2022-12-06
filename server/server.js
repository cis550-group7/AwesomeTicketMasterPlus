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

// Route 2 - register as GET 
app.post('/follow/', routes.createNewUser)









app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
