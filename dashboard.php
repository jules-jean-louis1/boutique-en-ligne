<?php
session_start();
if ($_SESSION['type_compte'] === 'administrateur') {?>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/styles/style.css">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Script JS -->
    <script defer type="module" src="src/scripts/dashboard.js"></script>
    <title>Dashboard</title>
</head>
<body>
<header class="w-full">
    <?php require_once "src/import/header.php"; ?>
</header>
<main>
    <div id="containerSeeProduct">
        <button type="button" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" id="buttonSeeProduct">Voir les produits</button>
    </div>
    <div id="containerSeeCategories">
        <button type="button" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" id="buttonSeeCategories">Gérer les catégories</button>
    </div>
    <div id="containerMessage">
        <div id="message"></div>
    </div>
    <div id="containerAddProduct"></div>
    <div id="containerInfo">
        <div id="containerCatAndSubCat">
            <div id="containerCat">
                <div id="dislpayInfoProduct"></div>
                <div id="containerAddCategory">
                </div>
            </div>
            <div id="containerSubCat">
                <div id="containerAddSubCategory">
                </div>
            </div>
        </div>
    </div>
</main>
</body>
</html>
<?php } else {
    header("Location: index.php");
} ?>