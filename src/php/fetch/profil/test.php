<?php
session_start();
require_once "../../Classes/Client.php"; // On inclut la classe Client


$client = new Client();
$clients = $client->validPassword("lion@gmail.com");
if ($clients === true) {
    echo "true";
} else {
    echo "false";
}