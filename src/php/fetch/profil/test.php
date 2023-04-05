<?php
session_start();
require_once "../../Classes/Client.php"; // On inclut la classe Client


$client = new Client();
$clients = $client->validPhone("0710256889");
if ($clients === true) {
    echo "true";
} else {
    echo "false";
}