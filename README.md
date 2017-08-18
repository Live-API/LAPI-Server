# LAS
LiveAPI Server

## Installation
LiveAPI server can be installed in one shell command:

`sudo curl -s https://raw.githubusercontent.com/live-API/LAPI-Server/master/bin/pull.sh | bash -s`

This command pulls a shell script (`./bin/pull.sh` of this repository), which installs git and clones the latest version of the LiveAPI master into a `./las` directory. This script then executes another shell script (`./bin/start.sh`), which installs the other prerequisates and starts the server. This method is currently supported on Mac OS, Ubuntu and Amazon Linux.

LiveAPI server can be also installed manually using the following steps.

1. Install git, NodeJS and MongoDB
2. Clone this repository
3. Run `npm install` in the cloned folder
4. Run `npm start`
