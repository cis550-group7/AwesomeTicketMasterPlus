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

async function createNewUser(req, res) {
    connection.query(`
    INSERT INTO Users (name, username, password, dob, email) 
    VALUES (
        ${req.body.name},
        ${req.body.username},
        ${req.body.password},
        ${req.body.dob},
        ${req.body.email}); 
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
    SELECT f.userId, f.artistId, a.name, a.images, a.popularity
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
        ${req.body.userId},
        ${req.body.artistId});
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
    WHERE userId = ${req.body.userId}
    AND artistID = ${req.body.artistId};
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
    SELECT r.timePlaced, r.userId, r.eventId, 
    e.name, e.date, e.time, v.name,
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
        ${req.body.userId},
        ${req.body.eventId});
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
    DELETE FROM Reservations
    WHERE userId = ${req.body.userId}
    AND eventId = ${req.body.eventId};
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

async function getEvent(req, res) {
    connection.query(`
    SELECT *
    FROM Events e
    JOIN Venues v
    ON e.venues = v.id
    WHERE e.id = ${req.query.id}
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

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
    connection.query(`SELECT id, name, date
    FROM Events
    WHERE DATEDIFF(CURDATE(), date) <= 30 
    AND DATEDIFF(CURDATE(), date) >= 0
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

// async function getEventById(req, res) {
//     if (req.query.id && !isNaN(req.query.id)){
//         connection.query(`SELECT E.id AS EventId, E.name as EventName, images, priceFrom, priceTo, date, time, address, city, state, postalCode, country
//         FROM Events E 
//         JOIN Venues V ON E.venues = V.id
//         WHERE E.id = ${req.query.id}`, function (error, results, fields) {

//             if (error) {
//                 console.log(error)
//                 res.json({ error: error })
//             } else {
//                 res.json({ results: results })
//             } 
//         });

//     } else if(!req.query.id){
//         console.log("Error! Id was not provided!")
//         res.json({ error: "Error! Id was not provided!" })
//     } else{
//         if (error) {
//             console.log(error)
//             res.json({ error: error })
//         } 
//     }
// }

async function search_events(req, res) {
    const eventName = req.query.Name ? req.query.Name: ''
    const country = req.query.Country ? req.query.Country: ''
    connection.query(`SELECT E.name as EventName, images, priceFrom, priceTo, date, time, address, city, state, postalCode, country
        FROM Events E 
        JOIN Venues V ON E.venues = V.id
        WHERE TRIM(LOWER(country)) LIKE TRIM(LOWER('%${country}%')) 
        AND TRIM(LOWER(E.name)) LIKE TRIM(LOWER('%${eventName}%')) 
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

// ********************************************
//             ARTIST-SPECIFIC ROUTES
// ********************************************
// async function getArtistById(req, res) {
//     // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests
//     if (req.query.id && !isNaN(req.query.id)){
//         connection.query(`SELECT *
//         FROM Artists A
//         WHERE A.id = ${req.query.id}`, function (error, results, fields) {

//             if (error) {
//                 console.log(error)
//                 res.json({ error: error })
//             } else {
//                 res.json({ results: results })
//             } 
//         });

//     } else if(!req.query.id){
//         console.log("Error! Id was not provided!")
//         res.json({ error: "Error! Id was not provided!" })
//     } else{
//         if (error) {
//             console.log(error)
//             res.json({ error: error })
//         } 
//     }
// }

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
    connection.query(`SELECT S.id, S.name, S.uri
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
