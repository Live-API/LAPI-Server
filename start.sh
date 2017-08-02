# The purpose of this script is to install the dependencies of LAS from npm, then start the server

#!/bin/bash

# Check if directory is empty, or if the user would like to install in an directory
# Assuming that if node_modules exists, the app is installed
if [ ! -d "node_modules" ]; then
  target='./'
  if find "$target" -mindepth 1 -print -quit | grep -q .; then
    echo "The current directory is not empty. Would you like to install anyway? (y/n)"
    while :
      do
        read INPUT_STRING
        case $INPUT_STRING in
        y)
          break
          ;;
        n)
          echo "Exiting..."
          exit
          ;;
        *)
          echo "Sorry, I don't understand"
          echo "The current directory is not empty. Would you like to install anyway? (y/n)"
          ;;
        esac
      done
  fi
fi
# Install NodeJS (use https://gist.github.com/isaacs/579814)

# Install npm (probably included with Node)

# Install npm dependencies
echo Installing dependencies from npm
npm install
npm install webpack -g

# Build bundles
echo Bundling React components
webpack

# Start server
echo Starting LiveAPI Server
npm start
