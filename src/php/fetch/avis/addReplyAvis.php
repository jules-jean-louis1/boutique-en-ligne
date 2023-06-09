<?php
session_start();
require_once "../../Classes/Avis.php";

if (isset($_POST['content'])) {
    $produit_id = htmlspecialchars($_POST['produit_id'], ENT_QUOTES, 'UTF-8');
    $parent_id = htmlspecialchars($_POST['parent_id'], ENT_QUOTES, 'UTF-8');
    $content = htmlspecialchars($_POST['content'], ENT_QUOTES, 'UTF-8');

    $produit_id = intval($produit_id);
    $parent_id = intval($parent_id);
    $content = trim($content);
    $user_id = $_SESSION['id'];

    // Vérification des valeurs reçues
    if (empty($content) || empty($produit_id) || empty($parent_id) || empty($user_id)) {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'error',
            'message' => 'Une erreur est survenue',
        ]);
        exit();
    }

    // Limite de taille pour le contenu
    if (strlen($content) > 1200) {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'tooLong',
            'message' => 'Votre commentaire ne doit pas dépasser les 500 caractères',
        ]);
        exit();
    }

    // Utilisation de requêtes préparées pour ajouter le commentaire
    $avis = new Avis();
    $avis->addReplyAvis($produit_id, $content, $parent_id, $user_id);

    header("Content-Type: application/json");
    echo json_encode([
        'status' => 'success',
        'message' => 'Votre réponse a bien été ajoutée',
    ]);
}
