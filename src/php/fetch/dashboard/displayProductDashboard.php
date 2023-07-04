<?php
require_once "../../Classes/Product.php";
$search = isset($_GET['search']) ? htmlspecialchars($_GET['search']) : '';
$categories = isset($_GET['categories']) ? htmlspecialchars($_GET['categories']) : '';
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 5;
$product = new Product();
$displayProduct = $product->getProductDashboard($search, $categories, $limit);
$count = $product->countTotalProduct();

header("Content-Type: application/json");
echo json_encode(["status" => "success", "message" => "Produit trouvé", "displayProducts" => $displayProduct, "count" => $count]);