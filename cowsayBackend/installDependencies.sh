#!/bin/bash
sudo apt update 
sudo apt upgrade -y
sudo apt install fortune cowsay
echo "\$cowsay = \"$(which cowsay)\";" >> commandLocations.php
echo "\$fortune = \"$(which fortune)\";" >> commandLocations.php
echo ":)"