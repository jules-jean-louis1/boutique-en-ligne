<?php
session_start();
require_once "../../Classes/Client.php";
$verifyInfoUsers = new Client();
$verify = $verifyInfoUsers->verifyIfUsersInfoExists($_SESSION['id']);
$info = $verifyInfoUsers->getUserInfo($_SESSION['id']);
header("Content-Type: application/json");
echo json_encode([
    'status' => 'true',
    'verify' => $verify,
    'info' => $info,
]);