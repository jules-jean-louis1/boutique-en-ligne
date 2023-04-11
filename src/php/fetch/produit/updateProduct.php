<?php
session_start();

require_once "../../Classes/Product.php";

var_dump($_POST);
var_dump($_FILES);
if (isset($_POST['updateNameProduct'])) {

    $id_product = intval($_GET['id_produits']);
    $name = htmlspecialchars($_POST['updateNameProduct']);
    $description = htmlspecialchars($_POST['updateDescriptionProduct']);
    $price = htmlspecialchars($_POST['updatePriceProduct']);
    $quantite = htmlspecialchars($_POST['updateQuantiteProduct']);
    $date_released = intval($_POST['updateReleasedDateProduct']);
    $subCategoryId = intval($_POST['subCategoryId']);

    $imgIfEmpty = htmlspecialchars($_POST['updateImgProductName']);
    // Verifier que tous les champs sont remplis
    if (empty($name) && empty($description) && empty($price) && empty($quantite) && empty($date_released) && empty($subCategoryId)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'EmptyFields', 'message' => 'Veuillez remplir tous les champs']);
        exit();
    } else {
        $product = new Product();

        if (strlen($name) > 255 && strlen($name) < 3) {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'NameLength', 'message' => 'Le nom doit contenir entre 3 et 255 caractères']);
            exit();
        }
        if (strlen($description) < 3) {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'DescriptionLength', 'message' => 'La description doit contenir au moins 3 caractères']);
            exit();
        }
        if (strlen($price) <= 4) {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'PriceLength', 'message' => 'Le prix doit contenir au moins 4 caractère']);
            exit();
        }
        if (!is_numeric($quantite)) {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'QuantiteLength', 'message' => 'La quantité doit être un nombre']);
            exit();
        }
        if (!preg_match('/^\d+(\.\d{1,2})?$/', $price)) {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'PriceFormat', 'message' => 'Le prix doit être au format 00.00']);
            exit();
        }
        if (isset($_FILES['updateImgProduct']['name'])) {
            // Vérification du type et de la taille de l'image
            $allowedTypes = array(IMAGETYPE_JPEG, IMAGETYPE_PNG, IMAGETYPE_GIF);
            $detectedType = exif_imagetype($_FILES['updateImgProduct']['tmp_name']);
            $maxFileSize = 900 * 1024; // 900 ko
            if (!in_array($detectedType, $allowedTypes) || $_FILES['updateImgProduct']['size'] > $maxFileSize) {
                header("Content-Type: application/json");
                echo json_encode(['status' => 'ImageError', 'message' => 'L\'image doit être au format jpg, png ou gif et ne doit pas dépasser 900 ko']);
                exit();
            } else {
                $filename = $_FILES['updateImgProduct']['name'];
                $tempname = $_FILES['updateImgProduct']['tmp_name'];
                $folder = "../../../images/products/".$filename;

                move_uploaded_file($tempname, $folder);
                $product->updateProduct($name, $description, $price, $quantite, $filename, $date_released, $subCategoryId, $id_product);
                header("Content-Type: application/json");
                echo json_encode(['status' => 'success', 'message' => 'Le produit a bien été modifié']);
                exit();
            }
        } else {
            $product->updateProduct($name, $description, $price, $quantite, $imgIfEmpty, $date_released, $subCategoryId, $id_product);;
            header("Content-Type: application/json");
            echo json_encode(['status' => 'success', 'message' => 'Le produit a bien été modifié']);
            exit();
        }

    }
    if (empty($name)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'EmptyName', 'message' => 'Veuillez remplir le champ nom']);
        exit();
    }
    if (empty($description)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'EmptyDescription', 'message' => 'Veuillez remplir le champ description']);
        exit();
    }
    if (empty($price)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'EmptyPrice', 'message' => 'Veuillez remplir le champ prix']);
        exit();
    }
    if (empty($quantite)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'EmptyQuantite', 'message' => 'Veuillez remplir le champ quantité']);
        exit();
    }
    if (empty($date_released)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'EmptyDateReleased', 'message' => 'Veuillez remplir le champ date de sortie']);
        exit();
    }
    if (empty($subCategoryId)) {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'EmptySubCategoryId', 'message' => 'Veuillez remplir le champ sous-catégorie']);
        exit();
    }

}