<?php
include_once "commandLocations.php";
system($fortune." -s |".$cowsay, $retval);
