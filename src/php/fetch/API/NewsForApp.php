<?php
$appID = 2369390; // ID du jeu Far Cry 6
$language = "french"; // Langue souhaitée

$url = "https://store.steampowered.com/api/appdetails/?appids=$appID&l=$language";
$response = file_get_contents($url);
echo $response;