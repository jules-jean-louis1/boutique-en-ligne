<?php

require_once "src/php/Classes/Product.php";

if (isset($_GET['id'])) {
    $id = intval(htmlspecialchars($_GET['id']));
    $product = new Product();
    $images = $product->getProductImageById($id);
    /*header("Content-Type: application/json");
    echo json_encode(["status" => "success", "images" => $images]);*/
}
