#!/bin/bash
sudo apt update 
sudo apt upgrade -y
sudo apt install fortune cowsay
echo "<?php" > commandLocations.php
echo "" >> commandLocations.php
echo "\$cowsay = \"$(which cowsay)\";" >> commandLocations.php
echo "\$fortune = \"$(which fortune)\";" >> commandLocations.php
echo ":)"