SHOW DATABASES;
CREATE DATABASE TICKETMASTERPLUS_DB;
USE TICKETMASTERPLUS_DB;

CREATE TABLE Artists
(
	id		int,
	name		varchar(255),
	genres		varchar(255),
	images		varchar(2083),
	uri		varchar(2083),
	external_urls	varchar(2083),
	popularity	int,
	PRIMARY KEY (id)
);

CREATE TABLE Venues
(
	id		varchar(255),
	name		varchar(255),
	url		varchar(2083),
	address		varchar(255),
	city		varchar(255),
	state		varchar(255),
	country		varchar(255),
	postalCode	int,
	PRIMARY KEY (id)
);

CREATE TABLE Events
(
	id		varchar(255),
	name		varchar(255),
	products	varchar(255),
	images		varchar(2083),
	url		varchar(2083),
	date		DATE,
	time		TIME,
	priceFrom	DECIMAL(10, 2),
	priceTo		DECIMAL(10, 2),
	venues		varchar(255),
	PRIMARY KEY (id),
	FOREIGN KEY (venues) REFERENCES Venues(id)
);

CREATE TABLE Songs
(
	id		int,
	artistId	int,
	name		varchar(255),
	url		varchar(2083),
	PRIMARY KEY (id, artistId),
	FOREIGN KEY (artistId) REFERENCES Artists(id)
);

CREATE TABLE Users
(
	id		int,
	name		varchar(255),
	username	varchar(255),
	password	varchar(255),
	dob		DATE,
	email		varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE Reservation
(
	userId		int,
	eventId		varchar(255),
	timePlaced	TIMESTAMP,
	FOREIGN KEY (userId) REFERENCES Users(id),
	FOREIGN KEY (eventId) REFERENCES Events(id)
);

CREATE TABLE Participation
(
	artistId	int,
	eventId		varchar(255),
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


