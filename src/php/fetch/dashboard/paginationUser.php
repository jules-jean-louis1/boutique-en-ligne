<?php

session_start();
require_once "../../Classes/Client.php";

if (isset($_GET['order'])) {
    $order = htmlspecialchars($_GET['order']);
    $search = htmlspecialchars($_GET['search']);
    $users = new Client();
    $displayUsers = $users->numberOfPagesForUser($search, $order);
    $data = ['pages' => range(1, $displayUsers)];
    $json = json_encode($data);
    header("Content-Type: application/json");
    echo $json;
}