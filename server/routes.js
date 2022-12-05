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

// ********************************************
//             EVENT-SPECIFIC ROUTES
// ********************************************

async function getEventById(req, res) {
    if (req.query.id && !isNaN(req.query.id)){
        connection.query(`SELECT E.id AS EventId, E.name as EventName, images, priceFrom, priceTo, date, time, address, city, state, postalCode, country
        FROM Events E 
        JOIN Venues V ON E.venues = V.id
        WHERE EventId = ${req.query.id}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else {
                res.json({ results: results })
            } 
        });

    } else if(!req.query.id){
        console.log("Error! Id was not provided!")
        res.json({ error: "Error! Id was not provided!" })
    } else{
        if (error) {
            console.log(error)
            res.json({ error: error })
        } 
    }
}

async function search_events(req, res) {
    const pageSize = req.query.pagesize ? req.query.pagesize : 10
    const eventName = req.query.Name ? req.query.Name: ''
    const country = req.query.Country ? req.query.Country: ''

    if (req.query.page && !isNaN(req.query.page)) {

        const offsetNum  = (req.query.page - 1) * pageSize

        connection.query(`SELECT E.name as EventName, images, priceFrom, priceTo, date, time, address, city, state, postalCode, country
        FROM Events E 
        JOIN Venues V ON E.venues = V.id
        WHERE country LIKE '%${country}%' AND EventName LIKE '%${eventName}%' 
            AND DATEDIFF(CURDATE(), date) <= 30 AND DATEDIFF(CURDATE(), date) >= 0
        ORDER BY date ASC
        LIMIT ${pageSize} OFFSET ${offsetNum}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
   
    } else {
        connection.query(`SELECT E.name as EventName, images, priceFrom, priceTo, date, time, address, city, state, postalCode, country
        FROM Events E 
        JOIN Venues V ON E.venues = V.id
        WHERE country LIKE '%${country}%' AND EventName LIKE '%${eventName}%' 
            AND DATEDIFF(CURDATE(), date) <= 30 AND DATEDIFF(CURDATE(), date) >= 0
        ORDER BY date ASC`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

// ********************************************
//             ARTIST-SPECIFIC ROUTES
// ********************************************
async function getArtistById(req, res) {
    // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests
    if (req.query.id && !isNaN(req.query.id)){
        connection.query(`SELECT *
        FROM Artists A
        WHERE A.id = ${req.query.id}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else {
                res.json({ results: results })
            } 
        });

    } else if(!req.query.id){
        console.log("Error! Id was not provided!")
        res.json({ error: "Error! Id was not provided!" })
    } else{
        if (error) {
            console.log(error)
            res.json({ error: error })
        } 
    }
}

async function rankArtistByEventCounts(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {

        const offsetNum  = (req.query.page - 1) * pageSize

        connection.query(`WITH TEMP AS (
        SELECT artistId, COUNT(*) AS numEvents
        FROM Participation 
        GROUP BY artistId)
        SELECT A.name, A.images, A.genres, A.popularity, T.numEvents
        FROM Artists A JOIN TEMP T ON T.artistId = A.id
        LIMIT ${pageSize} OFFSET ${offsetNum}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
   
    } else {
        connection.query(`WITH TEMP AS (
            SELECT artistId, COUNT(*) AS numEvents
            FROM Participation 
            GROUP BY artistId)
            SELECT A.name, A.images, A.genres, A.popularity, T.numEvents
            FROM Artists A JOIN TEMP T ON T.artistId = A.id`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

async function getArtistByName(req, res) {
    const artistName = req.query.Name ? req.query.Name: ''

    if (req.query.page && !isNaN(req.query.page)) {

        const offsetNum  = (req.query.page - 1) * pageSize

        connection.query(`SELECT *
        FROM Artists A
        WHERE A.name LIKE '%${artistName}%' 
        LIMIT ${pageSize} OFFSET ${offsetNum}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
   
    } else {
        connection.query(`SELECT *
        FROM Artists A
        WHERE A.name LIKE '%${artistName}%'`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

async function getArtistSongs(req, res) {
    const artistName = req.query.Name ? req.query.Name: ''

    if (req.query.page && !isNaN(req.query.page)) {

        const offsetNum  = (req.query.page - 1) * pageSize

        connection.query(`SELECT S.id, S.name, S.url
        FROM Songs S
        JOIN Artists A ON A.Id = S.ArtistId
        WHERE A.Name = ${artistName}
        LIMIT ${pageSize} OFFSET ${offsetNum}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
   
    } else {
        connection.query(`SELECT S.id, S.name, S.url
        FROM Songs S
        JOIN Artists A ON A.Id = S.ArtistId
        WHERE A.Name = ${artistName}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

async function getArtistEvents(req, res){
    const artistName = req.query.Name ? req.query.Name: ''
    if (req.query.page && !isNaN(req.query.page)) {

        const offsetNum  = (req.query.page - 1) * pageSize

        connection.query(`SELECT E.id, E.name, E.date, E.time, E.images, E.priceFrom, E.priceTo, E.venues
        FROM Artists A 
        JOIN Participation P ON A.id = P.artistId 
        JOIN Events E ON E.id = P.eventID
        WHERE A.Name = ${artistName}
        LIMIT ${pageSize} OFFSET ${offsetNum}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
   
    } else {
        connection.query(`SELECT E.id, E.name, E.date, E.time, E.images, E.priceFrom, E.priceTo, E.venues
        FROM Artists A 
        JOIN Participation P ON A.id = P.artistId 
        JOIN Events E ON E.id = P.eventID
        WHERE A.Name = ${artistName}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}


module.exports = {
    getPopularArtists,
    getUpcomingEvents,
    getEventById,
    search_events,
    getArtistById,
    rankArtistByEventCounts,
    getArtistByName,
    getArtistSongs,
    getArtistEvents
}