<?php
session_start();
require_once "../../Classes/Client.php";

$client = new Client();
if (isset($_SESSION['id'])) {
    $id = $_SESSION['id'];
    $result = $client->getAllInfoForProfil($id);
    $result = json_encode($result);
    echo $result;
} else {
    echo "Vous n'êtes pas connecté";
}