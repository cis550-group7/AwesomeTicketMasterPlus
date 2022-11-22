SHOW DATABASES;
CREATE DATABASE TICKETMASTERPLUS_DB;
USE TICKETMASTERPLUS_DB;

CREATE TABLE Artists
(
	id		int,
	name		varchar(25),
	genres		varchar(255),
	images		varchar(255),
	uri		varchar(255),
	external_urls	varchar(255),
	popularity	int,
	PRIMARY KEY (id)
);

CREATE TABLE Venues
(
	id		varchar(25),
	name		varchar(25),
	url		varchar(255),
	address		varchar(255),
	city		varchar(25),
	state		varchar(25),
	country		varchar(25),
	postalCode	int,
	PRIMARY KEY (id)
);

CREATE TABLE Events
(
	id		varchar(25),
	name		varchar(25),
	products	varchar(25),
	images		varchar(255),
	url		varchar(255),
	date		varchar(25),
	time		varchar(25),
	priceFrom	varchar(25),
	priceTo		varchar(25),
	venues		varchar(25),
	PRIMARY KEY (id),
	FOREIGN KEY (venues) REFERENCES Venues(id)
);

CREATE TABLE Songs
(
	id		int,
	artistId	int,
	name		varchar(25),
	url		varchar(255),
	image		varchar(255),
	PRIMARY KEY (id, artistId),
	FOREIGN KEY (artistId) REFERENCES Artists(id)
);

CREATE TABLE Users
(
	id		int,
	name		varchar(25),
	username	varchar(25),
	password	varchar(25),
	dob		varchar(25),
	email		varchar(25),
	PRIMARY KEY (id)
);

CREATE TABLE Reservation
(
	userId		int,
	eventId		varchar(25),
	timePlaced	varchar(25),
	FOREIGN KEY (userId) REFERENCES Users(id),
	FOREIGN KEY (eventId) REFERENCES Events(id)
);

CREATE TABLE Participation
(
	artistId	int,
	eventId		varchar(25),
	FOREIGN KEY (artistId) REFERENCES Artists(id),
	FOREIGN KEY (eventId) REFERENCES Events(id)
);

CREATE TABLE Follow
(
	userId		int,
	artistId	int,
	FOREIGN KEY (artistId) REFERENCES Artists(id),
	FOREIGN KEY (userId) REFERENCES Users(id)
)


