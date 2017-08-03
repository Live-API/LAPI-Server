# The purpose of this script is to install the dependencies of LAS from npm, then start the server

#!/bin/bash

# If given a -f argument to force (re)install
FORCE_REINSTALL="false"
while getopts ":f:" opt; do
  case $opt in
    :)
      echo "Force installing..."
      FORCE_REINSTALL="true"
      ;;
  esac
done

# If no .LAS_status file, or force reinstall is selected
if [ "$FORCE_REINSTALL" == "true" ] || [ ! -f .LAS_status ]; then
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
fi

# Start server
echo Starting LiveAPI Server
npm start

exit
