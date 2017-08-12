# The purpose of this script is to install Certbot and generate SSL certs

#!/bin/bash
mkdir -p ssl/public

# Install Certbot/Letsencrypt
# Mac OS
if hash brew 2>/dev/null; then
  echo "Installing Certbot with homebrew"
  brew install certbot
else
  # Ubuntu/Debian
  if hash apt-get 2>/dev/null; then
    echo "Installing Certbot with apt-get"
    sudo apt-get update
    sudo apt-get install software-properties-common
    sudo add-apt-repository ppa:certbot/certbot
    sudo apt-get update
    sudo apt-get install certbot

  else
    # Enterprise Linux (e.g. Amazon Linux)
    if hash yum 2>/dev/null; then
      echo "Installing Certbot with yum"
      mkdir certbot
      cd certbot
      wget https://dl.eff.org/certbot-auto
      chmod a+x certbot-auto
    fi
  fi
fi

# Generate certs
./certbot/certbot-auto --webroot -w ./ssl/public -d liveapi.beekley.xyz

cd ..
