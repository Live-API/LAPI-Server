# The purpose of this script is to pull the LAS source form github and prepare it for installation

#!/bin/bash

# Create a LAS directory
INSTALL_DIR='LiveAPI'
mkdir $INSTALL_DIR
cd $INSTALL_DIR

# Install git

# Mac OS
if hash brew 2>/dev/null; then
  echo "Installing Node with homebrew"
  brew install git
else
  # Ubuntu/Debian
  if hash apt-get 2>/dev/null; then
    echo "Installing Node with apt-get"
    sudo apt-get install git-all
  else
    # Enterprise Linus (e.g. Amazon Linux)
    if hash yum 2>/dev/null; then
      echo "Installing Node with yum"
      sudo yum install git
    fi
  fi
fi

# Clone the repo
echo "Cloning git repo"
git -b one-click-install --single-branch clone https://github.com/live-api/las --depth 1

sudo bin/start.sh