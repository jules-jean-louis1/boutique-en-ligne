<?php
session_start();
require_once "../../Classes/Client.php";
require_once "../../Classes/Product.php";

$idArray = $_GET['id'];
$quantityArray = $_GET['quantity'];
$valide = true;
if (isset($_SESSION['id'])) {
    $product = new Product();
    foreach ($idArray as $key => $id) {
        $quantity = $quantityArray[$key];
        // Appelez la fonction verifyStockProduct avec les valeurs actuelles
        $isAvailable = $product->verifyStockProduct((int)$id, (int)$quantity);
        // Traitez le résultat de la vérification
        if ($isAvailable) {
            $valide = true;
        } else {
            $getProduct = $product->getProductById($id);
            $name = $getProduct[0]['name_product'];
            $img = $getProduct[0]['img_product'];
            $price = $getProduct[0]['price_product'];
            $infoProduct[] = [
                'id_product' => $id,
                'name_product' => $name,
                'price_product' => $price,
                'quantity_product' => $quantity,
                'img_product' => $img,
            ];
            $valide = false;
        }
    }
    if ($valide) {
        $verifyInfoUsers = new Client();
        $verify = $verifyInfoUsers->verifyIfUsersInfoExists($_SESSION['id']);
        $info = $verifyInfoUsers->getUserInfo($_SESSION['id']);
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'true',
            'verify' => $verify,
            'info' => $info,
        ]);
    } else {
        header("Content-Type: application/json");
        echo json_encode([
            'status' => 'error',
            'message' => 'Produit non disponible en quantité suffisante',
            'infoProduct' => $infoProduct,
        ]);
    }
}
