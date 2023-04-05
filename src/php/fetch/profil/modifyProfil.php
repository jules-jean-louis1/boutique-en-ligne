<?php
session_start();
require_once "../../Classes/Client.php"; // On inclut la classe Client

/*$login = htmlspecialchars($_POST['login']);
$email = htmlspecialchars($_POST['email']);
$password = htmlspecialchars($_POST['password']);
$passwordConfirm = htmlspecialchars($_POST['passwordConfirm']);
$nom = htmlspecialchars($_POST['surname']);
$prenom = htmlspecialchars($_POST['firstname']);
$phone = htmlspecialchars($_POST['phone']);
$adresse = htmlspecialchars($_POST['address']);
$ville = htmlspecialchars($_POST['city']);
$codePostal = htmlspecialchars($_POST['zipcode']);
$pays = htmlspecialchars($_POST['country']);*/


if (!empty($_POST['login'])) {
    $login = htmlspecialchars($_POST['login']);
    if ($login == $_SESSION['login']) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Vous utilisez déjà ce login']);
    }
    if ($login !== $_SESSION['login']) {
        if (strlen($login) < 3) {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => 'Le login doit contenir au moins 3 caractères']);
            die();
        }
        if (strlen($login) > 20) {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => 'Le login doit contenir au plus 20 caractères']);
            die();
        }
        $client = new Client();
        if ($client->checkLogin($login) === true) {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => 'Ce login est déjà utilisé']);
            die();
        } else {
            $client->modifyLogin($_SESSION['id'], $login);
            header("Content-Type: application/json");
            echo json_encode(['status' => 'success', 'message' => 'Votre login a bien été modifié']);
            die();
        }
    }
}

if (!empty($_POST['email'])) {
    $email = htmlspecialchars($_POST['email']);
    if ($email !== $_SESSION['email']) {
        $client = new Client();
        if ($client->validEmail($email) === false) {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => 'Cette adresse email n\'est pas valide']);
            die();
        }
        if ($client->lenghtEmail($email) === true) {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => 'Cette adresse email est trop longue']);
            die();
        }
        if ($client->checkEmail($email) === true) {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => 'Cette adresse email est déjà utilisée']);
            die();
        } else {
            $client->modifyEmail($email, $_SESSION['id']);
            header("Content-Type: application/json");
            echo json_encode(['status' => 'success', 'message' => 'Votre adresse email a bien été modifiée']);
            die();
        }
    } else {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Vous utilisez déjà cette adresse email']);
        die();
    }
}
/*
if(!empty($password) && !empty($passwordConfirm)) {
    if ($password !== $passwordConfirm) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Les mots de passe ne correspondent pas']);
        die();
    }
    if (strlen($password) < 8) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Le mot de passe doit contenir au moins 8 caractères']);
        die();
    }
    if (strlen($password) > 16) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Le mot de passe doit contenir au moins 16 caractères']);
        die();
    }
    $client = new Client();
    if ($client->validPassword($password) === true) {
        $client->modifyPassword($password, $_SESSION['id']);
        header("Content-Type: application/json");
        echo json_encode(['status' => 'success', 'message' => 'Votre mot de passe a bien été modifié']);
        die();
    } else {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial']);
        die();
    }
}