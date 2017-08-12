# The purpose of this script is to generate self-signed SSL certs

#!/bin/bash

mkdir ssl

#Change to your company details
country=US
state=CA
locality=LosAngeles
organization=LiveAPI
organizationalunit=IT
email=test@test.com

openssl req -x509 -newkey rsa:2048 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes -subj "/C=$country/ST=$state/L=$locality/O=$organization/OU=$organizationalunit/CN=$commonname/emailAddress=$email"
