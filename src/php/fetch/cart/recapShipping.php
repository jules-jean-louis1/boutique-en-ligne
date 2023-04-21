<?php
session_start();
require_once "../../Classes/Client.php";

$id = $_SESSION['id'];
$users = new Client();
$displayUsers = $users->getShippingInfo($id);
header("Content-Type: application/json");
echo json_encode(['status' => true, 'info' => $displayUsers,]);