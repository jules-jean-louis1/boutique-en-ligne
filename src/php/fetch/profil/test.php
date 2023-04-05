<?php
session_start();
require_once "../../Classes/Client.php"; // On inclut la classe Client


$client = new Client();
$clients = $client->modifyLogin("Lionel", $_SESSION['id']);
if ($clients === true) {
    echo "ok";
} else {
    echo "pas ok";
}