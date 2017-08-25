# LiveAPI
Successful apps are built on data. As developers, we don’t always have access to the data that would help make our app successful. While the internet is a nearly-bottomless source of public data in the form of websites, that data is not always structured or available programmatically through an API. Time spent building an extraction algorithm and server is time not spent building your app.

We’re developing LiveAPI, a developer tool to turn any website’s public data into an API in a few minutes. LiveAPI has two parts: a Chrome Extension to select data to extract and a user-hostable server that extracts data and serves up the user-created API endpoints.

The following three-part guide that walks through how to get started and use LiveAPI.

* [Part 1: Installation](https://medium.com/@brett.beekley/using-liveapi-part-1-installation-ba1aa13bc73b)
* [Part 2: Authentication](https://medium.com/@pennwu/liveapi-a-visual-data-extraction-tool-part-2-17a1d32b2d52)
* [Part 3: Using the Chrome Extension](https://medium.com/@melissjs/liveapi-a-visual-data-extraction-tool-part-3-e9d60c9ab28d)

## Installation
LiveAPI server can be installed in one shell command:

`sudo curl -s https://raw.githubusercontent.com/live-API/LAPI-Server/master/bin/pull.sh | bash -s`

This command pulls a shell script (`./bin/pull.sh` of this repository), which installs git and clones the latest version of the LiveAPI master into a `./las` directory. This script then executes another shell script (`./bin/start.sh`), which installs the other prerequisates and starts the server. This method is currently supported on Mac OS, Ubuntu and Amazon Linux.

LiveAPI server can be also installed manually using the following steps.

1. Install git, NodeJS and MongoDB
2. Clone this repository
3. Run `npm install` in the cloned folder
4. Run `npm run update`
5. To start the server in the future, run `npm start`
