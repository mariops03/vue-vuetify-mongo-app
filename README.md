# Vue Express App

This is a project created with Vue.js, Vuetify, and MongoDB. It's a web application about gym exercises.

## About the Project

The application is designed to help users manage their gym exercises. It allows users to search for exercises, as well as add or remove them. Whether you're a gym enthusiast looking to track your progress, or a beginner trying to get a handle on different exercises, this application has features to assist you.

The project is divided into two main parts: the server and the web.

## Server

The server uses MongoDB, Express, and Mongoose for the connection with the database, which is hosted online. It also uses JWT for user authentication.

## Web

The web part of the project uses Vue along with Vuetify. It also uses a Pinia store to manage the application state.

## Project Setup

To set up the project on your local machine, follow these steps:

1. **Clone the Repository**

First, you need to clone the repository to your local machine. You can do this using the following command in your terminal:

```
git clone https://github.com/mariops03/vue_express_app.git
```

2. **Install Web Dependencies**

Once you've cloned the repository, navigate to the project directory and install the necessary dependencies with the following command:

```
cd web npm install
```

3. **Install Server Dependencies**

Stay in the same directory and install the necessary server dependencies with the following command:

```
cd ../server npm install
```

## Development

To compile and hot-reload for development, run:
```
npm run start
```

This command will start both the server and the web application. The server will be started with `node src/index.js` in the `server` directory, and the web application will be started with `npm run serve` in the `web` directory.


## Linting

To lint and fix files, run:
```
npm run lint
```
