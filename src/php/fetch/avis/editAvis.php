<?php
session_start();
require_once "../../Classes/Avis.php";
require_once "../../Classes/Product.php";

if (isset($_GET['id_avis'])){
    if (empty($_POST['title_avis']) || empty($_POST['content_avis']) || empty($_POST['note_avis'])) {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'error',
            'message' => 'Veuillez remplir tous les champs',
        ]);
    } else {
        $id_avis = intval($_GET['id_avis']);
        $id_product = intval($_POST['id_product']);
        $note = intval($_POST['note_avis']);
        $title = htmlspecialchars($_POST['title_avis']);
        $content = htmlspecialchars($_POST['content_avis']);
        $avis = new Avis();
        $avis->editAvis($title, $content, $note, $id_avis);
        $rating = new Product();
        $rating->updateProductRating($id_product);
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'success',
            'message' => 'Votre avis a bien été modifié',
        ]);
    }
}