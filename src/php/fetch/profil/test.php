<?php
session_start();
require_once "../../Classes/Product.php";
require_once "../../Classes/Avis.php";
require_once "../../Classes/Cart.php";
require_once "../../Classes/Client.php";

/*$errors = [];
$success = [];

$nameProduct = '';
$descriptionProduct = '';
$priceProduct = '';
$quantityProduct = '';
$realeaseDateProduct = '';
$idSubCategory = '';
$_FILES['imageProduct']['name'] = '';*/

/*if (isset($_POST['nameProduct'])) {
    /*$nameProduct = htmlspecialchars($_POST['nameProduct']);
    $descriptionProduct = htmlspecialchars($_POST['descriptionProduct']);
    $priceProduct = $_POST['priceProduct'];
    $quantityProduct = $_POST['stockProduct'];
    $realeaseDateProduct = htmlspecialchars($_POST['releasedDate']);
    $idSubCategory = intval($_POST['subCategoryId']);*/
/*
    // Vérification des champs obligatoires
    if (empty($nameProduct) && empty($descriptionProduct) && empty($priceProduct) && empty($quantityProduct) && empty($realeaseDateProduct) && empty($_FILES['imageProduct']['name']) && empty($idSubCategory)) {
        $errors[] = "Veuillez remplir tous les champs.";
    }
    // Vérification du nom
    if (strlen($nameProduct) > 255) {
        $errors[] = "Le nom du produit ne doit pas dépasser 255 caractères.";
    }

    // Vérification de la quantité
    if (!is_numeric($quantityProduct)) {
        $errors[] = "La quantité doit être un nombre.";
    }

    // Vérification du prix
    if (!preg_match('/^\d+(\.\d{1,2})?$/', $priceProduct)) {
        $errors[] = "Le prix doit être un nombre avec 2 décimales maximum.";
    }

    // Vérification du type et de la taille de l'image
    if ($_FILES['imageProduct']['error'] != UPLOAD_ERR_NO_FILE) {
        $imgInfo = getimagesize($_FILES['imageProduct']['tmp_name']);
        if ($imgInfo === false) {
            $errors[] = "Erreur lors de la lecture de l'image.";
        } else {
            $allowedTypes = array(IMAGETYPE_JPEG, IMAGETYPE_PNG, IMAGETYPE_GIF);
            if (!in_array($imgInfo[2], $allowedTypes)) {
                $errors[] = "Le format de l'image n'est pas supporté.";
            }
            $maxFileSize = 900 * 1024; // 900 ko
            if ($_FILES['imageProduct']['size'] > $maxFileSize) {
                $errors[] = "L'image est trop grande.";
            }
        }
    }
    // Si toutes les vérifications ont été passées, on ajoute le produit
    if (empty($errors)) {
        $filename = $_FILES['imageProduct']['name'];
        $tempname = $_FILES['imageProduct']['tmp_name'];
        $folder = "../../../images/products/".$filename;
        if (file_exists($folder)) {
            $errors[] = "L'image existe déjà.";
        } else {
            move_uploaded_file($tempname, $folder);
            $products = new Product();
            $addProduct = $products->addProduct($nameProduct, $descriptionProduct, $priceProduct, $quantityProduct, $filename, $realeaseDateProduct, $idSubCategory);
            $success[] = "Produit ajouté.";
        }
    }
}

if (!empty($errors)) {
    header("Content-Type: application/json");
    echo json_encode(['status' => 'error', 'message' => $errors]);
} elseif (!empty($success)) {
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => $success]);
} else {
    $errors[] = "Le produit n'a pas été ajouté.";
    header("Content-Type: application/json");
    echo json_encode(['status' => 'error', 'message' => $errors]);
}*/
require_once "../../Classes/Catalogue.php";
require_once "../../Classes/Categories.php";


/*$test = new Catalogue();
//$result = $test->test('', 'DESC_rating', '');
$p = $test->getProductsCatalogue('1', '', '', '1', '6');
//var_dump($result);
var_dump($p);*/

/*$p = new Product();
$products = $p->getDateOfReleasedProduct();
var_dump($products);*/
/*$_GET['page'] = '';
$_GET['Date'] = '1';

if (isset($_GET['page']) && !empty(trim($_GET['page'])) || isset($_GET['Date']) && !empty(trim($_GET['Date']))) {
    echo "isset";
} else {
    echo "not isset";
}*/

/*$product = new Product();
$displaySubCategories = $product->getDateOfReleasedProduct('1', '');
var_dump($displaySubCategories);*/

$clients = new Client();
$displayClients = $clients->login('Jules', 'gr3at@3wd');
var_dump($displayClients);





