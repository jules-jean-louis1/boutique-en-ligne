<?php
session_start();

if (isset($_SESSION['id'])) {
    header("Content-Type: application/json");
    echo json_encode([
        'status' => 'success',
        'message' => 'Vous êtes connecté',
        'id' => $_SESSION['id'],
    ]);
} else {
    header("Content-Type: application/json");
    echo json_encode([
        'status' => 'error',
        'message' => 'Vous n\'êtes pas connecté',
    ]);
}