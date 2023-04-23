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
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/styles/style.css">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Script JS -->
    <script defer type="module" src="src/scripts/catalogue.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>Catalogue</title>
</head>
<body>
    <!--<div class="container mx-aut">
        <img src="../../../images/products/2077-jaquette-avant.gif" alt="" class="absolute">
        <div class="">
            <div class="w-full flex items-center py-3 px-2 space-x-3 bg-opacity-50 backdrop-filter backdrop-blur-lg hover:bg-opacity-75 hover:saturate-100 rounded-[14px] bg-[#cbf4f0] text-[#000] border-l-[3px] border-[#23a094]">
                <svg width="25" height="25" viewBox="0 0 24 24" stroke="#23a094" fill="#fff" class="p-0.5 bg-white rounded-full" stroke-linejoin="round" stroke-width="1.736842105263158" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M16.253 10.1109L11.8891 14.4749C11.4986 14.8654 10.8654 14.8654 10.4749 14.4749L7.99999 12M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"></path></svg>
                <small class="text-lg">Produit ajouté au panier</small>
            </div>
        </div>

    </div>-->
    <div>
        <div class="card">
            <div class="card-content">
                <h3 class="card-title">I know exactly what I'm doing</h3>
                <h4 class="card-subtitle"></h4>
            </div>
            <i class="fa-solid fa-hat-witch card-icon"></i>
        </div>
    </div>
    <div>
        <style>
            :root {
                --border: rgb(3, 169, 244);

                --g1: rgb(98, 0, 234);
                --g2: rgb(236, 64, 122);
                --g3: rgb(253, 216, 53);
            }

            body {
                background-color: rgb(10, 10, 10);
                display: grid;
                height: 100vh;
                margin: 0px;
                padding: 0px;
                place-items: center;
            }

            .card {
                aspect-ratio: 1.3 / 1;
                border: 0.5vmin solid var(--border);
                cursor: pointer;
                position: relative;
                width: 56vmin;
            }

            .card:hover:before {
                background-position: 100% 100%;
                transform: scale(1.08, 1.03);
            }

            .card:hover > .card-content {
                background-position: -10% 0%;
            }

            .card:hover > .card-icon {
                color: white;
            }

            .card:hover > .card-content > .card-subtitle > .card-subtitle-word {
                opacity: 1;
                transform: translateY(0%);
                transition: opacity 0ms, transform 200ms cubic-bezier(.90, .06, .15, .90);
            }

            .card:before {
                background: linear-gradient(
                        130deg,
                        transparent 0% 33%,
                        var(--g1) 66%,
                        var(--g2) 83.5%,
                        var(--g3) 100%
                );
                background-position: 0% 0%;
                background-size: 300% 300%;
                content: "";
                height: 100%;
                left: 0px;
                pointer-events: none;
                position: absolute;
                top: 0px;
                transition: background-position 350ms ease, transform 350ms ease;
                width: 100%;
                z-index: 1;
            }

            .card-content {
                background-image: radial-gradient(
                        rgba(255, 255, 255, 0.2) 8%,
                        transparent 8%
                );
                background-position: 0% 0%;
                background-size: 5vmin 5vmin;
                height: calc(100% - 10vmin);
                padding: 5vmin;
                position: relative;
                transition: background-position 350ms ease;
                width: calc(100% - 10vmin);
                z-index: 2;
            }

            .card-title,
            .card-subtitle {
                color: white;
                font-family: "Anek Latin", sans-serif;
                font-weight: 400;
                margin: 0px;
            }

            .card-title {
                font-size: 6vmin;
            }

            .card-subtitle {
                font-size: 3vmin;
                margin-top: 2vmin;
            }

            .card-subtitle-word {
                display: inline-block;
                margin: 0vmin 0.3vmin;
                opacity: 0;
                position: relative;
                transform: translateY(40%);
                transition: none;
            }

            .card-icon {
                bottom: 0px;
                color: rgba(255, 255, 255, 0.5);
                font-size: 7vmin;
                left: 0px;
                margin: 5vmin;
                position: absolute;
                transition: color 250ms ease;
                z-index: 2;
            }

            /* -- YouTube Link Styles -- */

            #source-link {
                top: 60px;
            }

            #source-link > i {
                color: rgb(94, 106, 210);
            }

            #yt-link {
                top: 10px;
            }

            #yt-link > i {
                color: rgb(239, 83, 80);
            }

            .meta-link {
                align-items: center;
                backdrop-filter: blur(3px);
                background-color: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
                cursor: pointer;
                display: inline-flex;
                gap: 5px;
                left: 10px;
                padding: 10px 20px;
                position: fixed;
                text-decoration: none;
                transition: background-color 350ms, border-color 350ms;
                z-index: 10000;
            }

            .meta-link:hover {
                background-color: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .meta-link > i, .meta-link > span {
                height: 20px;
                line-height: 20px;
            }

            .meta-link > span {
                color: white;
                font-family: "Anek Latin", sans-serif;
                transition: color 600ms;
            }
        </style>
    </div>
    <script>
        const subtitle = document.getElementsByClassName("card-subtitle")[0];

        const createWord = (text, index) => {
            const word = document.createElement("span");

            word.innerHTML = `${text} `;

            word.classList.add("card-subtitle-word");

            word.style.transitionDelay = `${index * 40}ms`;

            return word;
        }

        const addWord = (text, index) => subtitle.appendChild(createWord(text, index));

        const createSubtitle = text => text.split(" ").map(addWord);

        createSubtitle("But in a much more real sense, I have no idea what I'm doing.");
    </script>





