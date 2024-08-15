# Book Store API

This is a Train Service Management System built with Node.js, Express and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Project Setup](#project-setup)
- [Run the server](#run-the-server)
- [Postman Collection](#postman-collection)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/shifat0/train-service-management.git
cd train-service-management
```

2. Install the dependencies:

```bash
npm install
```

## Project Setup

1. create .env file. Below a .env example is given:

   MONGO_URL=mongodb://localhost:27017/train-service-management
   PORT=5000
   API=/api/v1
   JWT_SECRET_KEY=YOUR_SECRET_KEY
   JWT_EXPIRES_IN=EXPIRE_TIME

## Run the server

```bash
npm start
```

Now open your terminal to see if the server is running and databse is connected. Also you can go to http://localhost:5000 to see if server is running or not.

## Postman Collection

Postman collection is given with the project. Import that collection to yout postman and test api endpoints.

add environments to your postman:
Variable: local_dev, Value: http://localhost:5000/api/v1
and accessToken Variable will be automatically added after login
