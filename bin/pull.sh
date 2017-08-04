# The purpose of this script is to pull the LAS source form github and prepare it for installation

# Install with:
# curl -s https://raw.githubusercontent.com/Live-API/LAS/eaf117a133d9625e44e60a4281866421e3b56e2e/bin/pull.sh | bash -s 

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
    sudo apt-get install -y git-all
  else
    # Enterprise Linus (e.g. Amazon Linux)
    if hash yum 2>/dev/null; then
      echo "Installing Node with yum"
      sudo yum -y install git
    fi
  fi
fi

# Clone the repo
echo "Cloning git repo"
git clone -b one-click-install --single-branch https://github.com/live-api/las --depth 1

sudo bin/start.sh