<?php
session_start();
require_once "../../Classes/Avis.php";
require_once "../../Classes/Product.php";

if (isset($_POST['title_avis'])) {
    $title = htmlspecialchars($_POST['title_avis']);
    $content = htmlspecialchars($_POST['content_avis']);
    $note = intval($_POST['note_avis']);
    $id_user = $_SESSION['id'];
    $id_product = intval($_POST['id_product']);
    if (empty($title) || empty($content) || empty($note)) {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'error',
            'message' => 'Veuillez remplir tous les champs',
        ]);
    } else {
        if (strlen($title) > 100) {
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'error',
                'message' => 'Le titre de votre avis ne doit pas dépasser 50 caractères',
            ]);
            exit();
        } else if ($note === '') {
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'error',
                'message' => 'Veuillez attribuer une note à votre avis',
            ]);
            exit();
        } else {
            $rating = new Product();
            $avis = new Avis();
            $avis->addAvis($title, $content, $note, $id_user, $id_product);
            $rating->updateProductRating($id_product);
            header("Content-Type: application/json");
            echo json_encode([
                'status' => 'success',
                'message' => 'Votre avis a bien été ajouté',
            ]);
        }
    }
}