const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

//I don't know if I configured this correctly; check config.json
const connection = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    port: config.port,
    database: config.rds_db
});
connection.connect();


// ********************************************
//              Route Handlers 
// ********************************************

async function getUser(req, res) {
    connection.query(`
    SELECT *
    FROM Users
    WHERE username = ${req.query.username}
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function createNewUser(req, res) {
    console.log(req.body);
    connection.query(`
    INSERT INTO Users (name, username, password, dob, email) 
        VALUES (
            ${JSON.stringify(req.body.name)},
            ${JSON.stringify(req.body.username)},
            ${JSON.stringify(req.body.password)},
            ${JSON.stringify(req.body.dob)},
            ${JSON.stringify(req.body.email)}); 
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function getFollows(req, res) {
    connection.query(`
    SELECT f.userId, a.id, a.name, a.images, genres, popularity, external_urls
    FROM Follow f
    JOIN Artists a ON f.artistId = a.id
    WHERE f.userId = ${req.query.id}
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function followArtist(req, res) {
    connection.query(`
    INSERT INTO Follow (userId, artistId) 
    VALUES (
        ${JSON.stringify(req.body.userId)},
        ${JSON.stringify(req.body.artistId)});
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function unfollowArtist(req, res) {
    connection.query(`
    DELETE FROM Follow
    WHERE userId = ${JSON.stringify(req.body.userId)}
    AND artistID = ${JSON.stringify(req.body.artistId)};
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function getReservations(req, res) {
    connection.query(`
    SELECT r.timePlaced, r.userId, r.eventId AS eventId, 
    e.name AS eventName, e.date, e.time, v.name AS venueName,
    v.address, v.city, v.state, v.country, v.postalCode
    FROM Reservation r
    JOIN Events e ON r.eventId = e.id
    JOIN Venues v ON e.venues = v.id
    WHERE r.userId = ${req.query.id}
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function reserveEvent(req, res) {
    connection.query(`
    INSERT INTO Reservation (userId, eventId) 
    VALUES (
        ${JSON.stringify(req.body.userId)},
        ${JSON.stringify(req.body.eventId)});
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function unreserveEvent(req, res) {
    connection.query(`
    DELETE FROM Reservation
    WHERE userId = ${JSON.stringify(req.body.userId)}
    AND eventId = ${JSON.stringify(req.body.eventId)};
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function getArtist(req, res) {
    connection.query(`
    SELECT *
    FROM Artists
    WHERE id = ${req.query.id}
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function getArtistsByName(req, res) {
    connection.query(`
    SELECT *
    FROM Artists
    WHERE TRIM(LOWER(name)) LIKE TRIM(LOWER('%${req.query.name}%'))
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function getSongs(req, res) {
    connection.query(`
    SELECT *
    FROM Songs
    WHERE TRIM(LOWER(name)) LIKE TRIM(LOWER('%${req.query.name}%'))
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// async function getEvent(req, res) {
//     connection.query(`
//     SELECT *
//     FROM Events e
//     JOIN Venues v
//     ON e.venues = v.id
//     WHERE e.id = ${req.query.id}
//     `, function (error, results, fields) {
//         if (error) {
//             console.log(error)
//             res.json({ error: error })
//         } else if (results) {
//             res.json({ results: results })
//         }
//     });
// }

async function getEventsByName(req, res) {
    connection.query(`
    SELECT *
    FROM Events
    WHERE TRIM(LOWER(name)) LIKE TRIM(LOWER('%${req.query.name}%'))
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function getVenue(req, res) {
    connection.query(`
    SELECT *
    FROM Venues
    WHERE id = ${req.query.id}
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function getVenuesByName(req, res) {
    connection.query(`
    SELECT *
    FROM Venues
    WHERE TRIM(LOWER(name)) LIKE TRIM(LOWER('%${req.query.name}%'))
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route 1 for Homepage: Get top N artists with the most popularity
async function getPopularArtists(req, res) {
    connection.query(`
    SELECT *
    FROM Artists
    LIMIT ${req.query.N}`, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route 1 for Homepage: Get top N artists with the most events
async function getArtistsByNumEvents(req, res) {
    connection.query(`
    SELECT a.name, p.artistId, COUNT(*) AS event_num, popularity
    FROM Participation p
    JOIN Artists a ON a.id = p.artistId
    GROUP BY p.artistId
    ORDER BY event_num DESC, popularity DESC
    LIMIT ${req.query.N}`, function (error, results, fields) {
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
    connection.query(`SELECT e.id, e.name, e.url, ROUND(priceFrom) AS priceFrom, ROUND(priceTo) AS priceTo, DATE(date) AS date, time, v.name AS venue
    FROM Events e
    JOIN Venues v on e.venues = v.id
    WHERE DATEDIFF(date, CURDATE()) <= 30
    AND DATEDIFF(date, CURDATE()) >= 0
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

async function getEvent(req, res) {
    if (req.query.id && !isNaN(req.query.id)){
        connection.query(`SELECT E.id AS EventId, E.name as EventName, E.url as url, images, priceFrom, priceTo, date, time, address, city, state, postalCode, country
        FROM Events E 
        JOIN Venues V ON E.venues = V.id
        WHERE E.id = ${req.query.id}`, function (error, results, fields) {

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
    const eventName = req.query.Name ? req.query.Name: ''
    const country = req.query.Country ? req.query.Country: ''
    connection.query(`SELECT E.id as EventId, E.name as EventName, images, priceFrom, priceTo, date, time, address, city, state, postalCode, country
        FROM Events E 
        JOIN Venues V ON E.venues = V.id
        WHERE TRIM(LOWER(country)) LIKE TRIM(LOWER('%${country}%')) 
        AND TRIM(LOWER(E.name)) LIKE TRIM(LOWER('%${eventName}%')) 
            AND DATEDIFF(date, CURDATE()) <= 30 AND DATEDIFF(date, CURDATE()) >= 0
        ORDER BY date ASC`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
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
    connection.query(`WITH TEMP AS (
        SELECT artistId, COUNT(*) AS numEvents
        FROM Participation 
        GROUP BY artistId)
        SELECT A.name, A.images, A.genres, A.popularity, T.numEvents
        FROM Artists A JOIN TEMP T ON T.artistId = A.id
        ORDER BY numEvents`, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function getArtistSongs(req, res) {
    const artistId = req.params.artist ? req.params.artist: ''
    connection.query(`SELECT S.id, S.name, S.external_urls, S.duration_ms
        FROM Songs S
        JOIN Artists A ON A.Id = S.ArtistId
        WHERE A.id = ${artistId}
        `, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
}

async function getArtistEvents(req, res){
    const artistId = req.params.artist ? req.params.artist: ''
    connection.query(`SELECT E.id, E.name, E.date, E.time, E.images, E.priceFrom, E.priceTo, E.venues
    FROM Artists A 
    JOIN Participation P ON A.id = P.artistId 
    JOIN Events E ON E.id = P.eventID
    WHERE A.id = ${artistId}
    `, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}


module.exports = {
    getUser,
    createNewUser,

    getEvent,
    getEventsByName,

    getVenue,
    getVenuesByName,

    getArtist,
    getArtistsByName,

    getSongs,

    getFollows,
    followArtist,
    unfollowArtist,

    getReservations,
    reserveEvent,
    unreserveEvent,

    getPopularArtists,
    getArtistsByNumEvents,
    getUpcomingEvents,
    search_events,

    rankArtistByEventCounts,
    getArtistSongs,
    getArtistEvents
}
