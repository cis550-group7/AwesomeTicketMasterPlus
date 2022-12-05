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

async function getUser(req, res) {
    connection.query(`
    SELECT *
    FROM Users
    WHERE id == ${req.query.id}
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
    VALUES 
        ${req.body.name},
        ${req.body.username},
        ${req.body.password},
        ${req.body.dob},
        ${req.body.email},; 
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
    SELECT *
    FROM Follow f
    JOIN Artists a ON f.artistId = a.id
    WHERE f.userId == ${req.query.id}
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
    VALUES 
        ${req.body.userId},
        ${req.body.artistId};
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
    SELECT *
    FROM Reservation r
    JOIN Events e a ON r.eventId = e.id
    WHERE r.userId == ${req.query.id}
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
    VALUES 
        ${req.body.userId},
        ${req.body.eventId};
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
    WHERE id == ${req.query.id}
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function getArtistByName(req, res) {
    connection.query(`
    SELECT *
    FROM Artists
    WHERE TRIM(LOWER(name)) LIKE '%TRIM(LOWER(${req.query.name}))%'
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
    WHERE artist_id == ${req.query.id}
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
    WHERE e.id == ${req.query.id}
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
    WHERE TRIM(LOWER(name)) LIKE '%TRIM(LOWER(${req.query.name}))%'
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
    WHERE id == ${req.query.id}
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
    WHERE TRIM(LOWER(name)) LIKE '%TRIM(LOWER(${req.query.name}))%'
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

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
    getUser,
    createNewUser,

    getEvent,
    getEventsByName,

    getVenue,
    getVenuesByName,

    getArtist,
    getArtistByName,

    getSongs,

    getFollows,
    followArtist,
    unfollowArtist,

    getReservations,
    reserveEvent,
    unreserveEvent,
    
    getPopularArtists,
    getUpcomingEvents,
}