<?php
session_start();
require_once "../../Classes/Client.php";

$id = $_SESSION['id'];
$users = new Client();
$displayUsers = $users->getUser($id);
$displayUsers = json_encode($displayUsers);
echo $displayUsers;