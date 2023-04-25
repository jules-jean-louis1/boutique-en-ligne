<?php
session_start();
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
<header class="w-full">
    <?php require_once "src/import/header.php"; ?>
</header>
<main class="bg-[#242629]">
    <div id="containerLoginRegisterForm"></div>
    <section id="containerMessageAddCart"></section>
    <section class="flex justify-between lg:pt-6 lg:mx-[4%]">
        <div id="displayFilterCatalogue" class="bg-[#1e1e1f] p-2 lg:h-[35rem] h-[70vh] fixed"></div>
        <div id="displayFiltreProduct" class="flex flex-col w-full justify-center ml-60">
            <div id="displayProduct" class="flex flex-wrap justify-center w-full h-full"></div>
            <div id="displayPages" class="flex justify-center">
                <ul id="displayPagesCatalogue" class="flex justify-center space-x-2"></ul>
            </div>
        </div>
    </section>
</main>
<footer class="w-full">
    <?php require_once "src/import/footer.php"; ?>
</footer>
</body>
</html>

