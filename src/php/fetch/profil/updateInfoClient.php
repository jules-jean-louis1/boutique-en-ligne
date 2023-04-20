<?php
session_start();
require_once "../../Classes/Client.php";


$success = 1;
if (empty(trim($_POST['nom_client'])) || empty(trim($_POST['prenom_client'])) || empty(trim($_POST['adresse_client'])) || empty(trim($_POST['ville_client'])) || empty(trim($_POST['code_postal_client'])) || empty(trim($_POST['pays_client']))) {
    $success = 0;
    header("Content-Type: application/json");
    echo json_encode(['status' => 'error', 'message' => "Veuillez remplir tous les champs"]);
    exit();
} else {
    if (isset($_POST['nom_client'])) {
        $nom_client = htmlspecialchars($_POST['nom_client']);
        if (strlen($nom_client) < 2 && strlen($nom_client) > 20) {
            $success = 0;
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => "Le nom doit contenir entre 2 et 20 caractères"]);
            exit();
        } else {
            $client = new Client();
            $client->modifyClientField($_SESSION['id'], 'nom', 'nom_client', $nom_client);
            $success = 1;
        }
    }
    if (isset($_POST['prenom_client'])) {
        $prenom_client = htmlspecialchars($_POST['prenom_client']);
        if (strlen($prenom_client) < 2 && strlen($prenom_client) > 20) {
            $success = 0;
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => "Le prénom doit contenir entre 2 et 20 caractères"]);
            exit();
        } else {
            $client = new Client();
            $client->modifyClientField($_SESSION['id'], 'prenom', 'prenom_client', $prenom_client);
            $success = 1;
        }
    }
    if (!empty($_POST['mobile_client'])) {
        $mobile_client = htmlspecialchars($_POST['mobile_client']);
        $rex = "/^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/";
        if (preg_match($rex, $mobile_client) == false) {
            $success = 0;
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => "Le numéro de téléphone n'est pas valide"]);
            exit();
        } else {
            $client = new Client();
            $client->modifyClientField($_SESSION['id'], 'mobile', 'mobile_client', $mobile_client);
            $success = 1;
        }
    }
    if (isset($_POST['pays_client'])) {
        $pays_client = htmlspecialchars($_POST['pays_client']);
        if (strlen($pays_client) < 2 && strlen($pays_client) > 30) {
            $success = 0;
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => "Le pays doit contenir entre 2 et 30 caractères"]);
            exit();
        } else {
            $client = new Client();
            $client->modifyClientField($_SESSION['id'], 'pays', 'pays_client', $pays_client);
            $success = 1;
        }
    }
    if (isset($_POST['ville_client'])) {
        $ville_client = htmlspecialchars($_POST['ville_client']);
        if (strlen($ville_client) <2 && strlen($ville_client) > 60) {
            $success = 0;
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => "La ville doit contenir entre 2 et 60 caractères"]);
            exit();
        } else {
            $client = new Client();
            $client->modifyClientField($_SESSION['id'], 'ville', 'ville_client', $ville_client);
            $success = 1;
        }
    }
    if (isset($_POST['adresse_client'])) {
        $adresse_client = htmlspecialchars($_POST['adresse_client']);
        $rex = "/^\d+\s[a-zA-Z]+.*$/";
        if (strlen($adresse_client) < 2 && strlen($adresse_client) > 150) {
            $success = 0;
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => "L'adresse doit contenir entre 2 et 150 caractères"]);
            exit();
        }
        if (preg_match($rex, $adresse_client)) {
            $client = new Client();
            $client->modifyClientField($_SESSION['id'], 'adresse', 'adresse_client', $adresse_client);
            $success = 1;
        } else {
            $success = 0;
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => "L'adresse n'est pas valide"]);
            exit();
        }
    }
    if (isset($_POST['code_postal_client'])) {
        $code_postal_client = htmlspecialchars($_POST['code_postal_client']);
        $rex = "/^[0-9]{5}$/";
        if (preg_match($rex, $code_postal_client) === false) {
            $success = 0;
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => "Le code postal n'est pas valide"]);
            exit();
        } else {
            $client = new Client();
            $client->modifyClientField($_SESSION['id'], 'code_postal', 'code_postal_client', $code_postal_client);
            $success = 1;
        }
    }
}

if ($success == 1) {
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => "Les informations ont été modifiées avec succès"]);
}
