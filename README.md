# Ramble - write what you like

Members:
- Anthony Casson
- Ron Oh
- Cortney Lane
- Yunjoo Kim

##Project Overview

The goal of the project was to create a well-tested, multi-resource REST API with a team
of developers and deploy using Heroku.

##The App

Ramble, inspired by personal diaries and journals, is a content management system (CMS)
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
