<?php
session_start();
require_once "../../Classes/Product.php";

$errors = [];
$succes = [];


if (isset($_POST['nameProduct'])) {


    $nameProduct = htmlspecialchars($_POST['nameProduct']);
    $descriptionProduct = htmlspecialchars($_POST['descriptionProduct']);
    $priceProduct = intval($_POST['priceProduct']);
    $quantityProduct = intval($_POST['stockProduct']);
    $realeaseDateProduct = htmlspecialchars($_POST['releasedDate']);
    $imgProduct = $_FILES['imageProduct'];
    $idSubCategory = intval($_POST['subCategoryId']);

    if ($_SESSION['type_compte'] === 'administrateur') {
        if (!empty($nameProduct) && !empty($descriptionProduct) && !empty($priceProduct) && !empty($quantityProduct) && !empty($realeaseDateProduct) && !empty($imgProduct) && !empty($idSubCategory)) {

            $products = new Product();

            $allowedTypes = array(IMAGETYPE_JPEG, IMAGETYPE_PNG, IMAGETYPE_GIF);
            $detectedType = exif_imagetype($_FILES['imageProduct']['tmp_name']);
            $maxFileSize = 900 * 1024; // 900 ko
            $filename = $_FILES['imageProduct']['name'];
            $tempname = $_FILES['imageProduct']['tmp_name'];
            $folder = "../../../images/products/".$filename;

            if (in_array($detectedType, $allowedTypes) && $_FILES['imageProduct']['size'] <= $maxFileSize) {
                if (file_exists($folder)) {
                    $errors[] = "L'image existe déjà";
                } else {
                    move_uploaded_file($tempname, $folder);
                    $addProduct = $products->addProduct($nameProduct, $descriptionProduct, $priceProduct, $quantityProduct, $realeaseDateProduct, $filename, $idSubCategory);
                    $succes[] = "Produit ajouté";
                }
            } else {
                $errors[] = "L'image n'est pas au bon format ou sa taille dépasse 900 ko";
            }
        } else {
            $errors[] = "Veuillez remplir tous les champs";
        }
    } else {
        $errors[] = "Vous n'avez pas les droits pour ajouter un produit";
    }
}

if (!empty($errors)) {
    header("Content-Type: application/json");
    echo json_encode(['status' => 'error', 'message' => $errors]);
} elseif (!empty($success)) {
    header("Content-Type: application/json");
    echo json_encode(['status' => 'success', 'message' => $success]);
} else {
    $errors[] = "Le produit n'a pas été ajouté";
    header("Content-Type: application/json");
    echo json_encode(['status' => 'error', 'message' => $errors]);
}

