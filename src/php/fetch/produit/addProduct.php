<?php
session_start();
require_once "../../Classes/Product.php";

if (isset($_POST['nameProduct'])) {

    $nameProduct = htmlspecialchars($_POST['nameProduct']);
    $descriptionProduct = htmlspecialchars($_POST['descriptionProduct']);
    $priceProduct = intval($_POST['priceProduct']);
    $quantityProduct = intval($_POST['quantityProduct']);
    $realeaseDateProduct = htmlspecialchars($_POST['realeaseDateProduct']);
    $idSubCategory = intval($_POST['idSubCategory']);

}

