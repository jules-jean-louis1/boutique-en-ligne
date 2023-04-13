<?php

session_start();
require_once "../../Classes/Client.php";


if (isset($_GET['order'])) {
    $order = htmlspecialchars($_GET['order']);
    $search = htmlspecialchars($_GET['search']);
    $page = intval($_GET['page']);
    $users = new Client();
    $displayUsers = $users->getUserInfoByPages($page, $search, $order);
    if (empty($displayUsers)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Aucun utilisateur trouvé']);
        exit();
    } else {
        $displayUsers = json_encode($displayUsers);
        header("Content-Type: application/json");
        echo json_encode(['status' => 'success', 'message' => 'Utilisateurs récupérés avec succès', 'users' => $displayUsers]);
    }
}