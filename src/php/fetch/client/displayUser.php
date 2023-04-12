<?php
session_start();
require_once "../../Classes/Client.php";

$users = new Client();
$displayUsers = $users->getAllUsers();
$displayUsers = json_encode($displayUsers);
print_r($displayUsers);