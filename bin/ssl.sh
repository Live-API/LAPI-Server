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
    # Enterprise Linus (e.g. Amazon Linux)
    if hash yum 2>/dev/null; then
      echo "Installing Certbot with yum"
      yum -y install yum-utils
      yum-config-manager --enable rhui-REGION-rhel-server-extras rhui-REGION-rhel-server-optional
      sudo yum install certbot
    fi
  fi
fi

# Generate certs
letsencrypt --webroot -w ./ssl/public -d liveapi.beekley.xyz
