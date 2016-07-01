# Ramble - write what you like

Members:\n
- Anthony Casson\n
- Ron Oh\n
- Courtney Lane\n
- Yunjoo Kim\n

##Project Overview

The goal of the project was to create a well-tested, multi-resource REST API with a team\n
of developers and deploy using Heroku.

##The App

Ramble, inspired by personal diaries and journals, is a content management system (CMS)\n
designed for writing privately.

##Current Endpoints

###User

- POST /signup
- GET /signin
- PUT /update/password
- DEL /delete

###Entry

- POST /entry
- GET /entry/:id
- GET /entries
- PUT /entry/:id
- DEL /entry/:id

###Challenge

- POST /challenges
- GET /challenges/id
- GET /challenges
- PUT /challenges/:id
- DEL /challenges/:id

##Testing Emphasis

The project includes integration testing for 100% of the API.
