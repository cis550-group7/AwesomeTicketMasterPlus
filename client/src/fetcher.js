import config from './config.json'

const getUser = async (username) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/user?username=${username}`, {
        method: 'GET',
    })
    return res.json()
}

const createNewUser = async (name, username, password, dob, email) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/user/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify(
            {
                name: name,
                username: username,
                password: password,
                dob: dob,
                email: email
            }
        )
    })
    return res.json()
}

const getFollows = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/follows?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

//followArtist

//unfollowArtist

const getReservations = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/reservations?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

//reserveEvent

//unreserveEvent

const getArtist = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artist?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getArtistsByName = async (name) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artists?name=${name}`, {
        method: 'GET',
    })
    return res.json()
}

const getSongs = async (name) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs?name=${name}`, {
        method: 'GET',
    })
    return res.json()
}

const getEvent = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/events?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getEventsByName = async (name) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/events?name=${name}`, {
        method: 'GET',
    })
    return res.json()
}

// const getEventSearch = async (name, country, artist, price_high, price_low, page, pagesize) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/events?Name=${name}&Country=${country}&Artist=${artist}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

const getVenue = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/venue?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getVenuesByName = async (name) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/venues?name=${name}`, {
        method: 'GET',
    })
    return res.json()
}

const getPopularArtists = async (N) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artists/topPopular?N=${N}`, {
        method: 'GET',
    })
    return res.json()
}

const getArtistsByNumEvents = async (N) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artists/mostEvents?N=${N}`, {
        method: 'GET',
    })
    return res.json()
}

const getUpcomingEvents = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/events/upcoming`, {
        method: 'GET',
    })
    return res.json()
}

const search_events = async (eventName, country) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/events/search?Name=${eventName}&Country=${country}`, {
        method: 'GET',
    })
    return res.json()
}


const rankArtistByEventCounts = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/rank`, {
        method: 'GET',
    })
    return res.json()
}

const getArtistSongs = async (artist) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs/${artist}`, {
        method: 'GET',
    })
    return res.json()
}

const getArtistEvents = async (artist) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/events/${artist}`, {
        method: 'GET',
    })
    return res.json()
}

const getArtistSearch = async (id, name, genres, external_urls, popularity) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${id}&Nationality=${name}&Club=${genres}&RatingLow=${external_urls}&RatingHigh=${popularity}}`, {
        method: 'GET',
    })
    return res.json()
}
export {
    getUser,
    createNewUser,
    getFollows,
    getReservations,
    getArtist,
    getArtistsByName,
    getSongs,
    getEvent,
    getEventsByName,
    // getEventSearch,
    getVenue,
    getVenuesByName,
    getPopularArtists,
    getArtistsByNumEvents,
    getUpcomingEvents,
    search_events,
    rankArtistByEventCounts,
    getArtistSongs,
    getArtistEvents,
    getArtistSearch
}