<?php
session_start();
require_once "../../Classes/Client.php"; // On inclut la classe Client

$client = new Client();
$clients = $client->getClientInfo($_SESSION['id']);
print_r($clients);
?>