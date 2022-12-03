const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

//I don't know if I configured this correctly; check config.json
const connection = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    port: config.port,
});
connection.connect();


// ********************************************
//              Route Handlers 
// ********************************************

//Route 1 for Homepage: Get top 100 artists with the most events
async function getPopularArtists(req, res) {
    connection.query(`SELECT a.name, p.artistId, COUNT(*) AS event_num
    FROM Participation p
    JOIN Artists a ON a.id = p.artistId
    GROUP BY p.artistId
    ORDER BY event_num DESC`, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route 2 for Homepage: Upcoming events in 30 days
async function getUpcomingEvents(req, res) {
    connection.query(`SELECT id, name, date
    FROM Events
    WHERE DATEDIFF(CURDATE(), date) <= 30 AND DATEDIFF(CURDATE(), date) >= 0
    ORDER BY date ASC;`, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

module.exports = {
    getPopularArtists,
    getUpcomingEvents,
}