# The purpose of this script is to install the dependencies of LAS from npm, then start the server

#!/bin/bash

# Install in LAPI_server folder
INSTALL_PATH="LAPI_server"

# If given a directory with the -p flag, install in that directory
while getopts ":p:" opt; do
  case $opt in
    p)
      echo "Installing in folder: $OPTARG"
      INSTALL_PATH=$OPTARG
      ;;
    :)
      echo "Please specify a path when using the path (-p) flag. Exiting..." >&2
      exit
      ;;
    \?)
      echo "Invalid option: -$OPTARG" 
      ;;
  esac
done

mkdir -p $INSTALL_PATH
cd $INSTALL_PATH

# Install NodeJS (use https://gist.github.com/isaacs/579814)

# Install npm (probably included with Node)

# Install npm dependencies
echo Installing dependencies from npm
npm install
npm install webpack -g

# Add/update hidden status file
touch .LAS_status
echo "Latest Update:" > .LAS_status
echo `date` > .LAS_status

# Build bundles
echo Bundling React components
webpack

# Start server
echo Starting LiveAPI Server
npm start
