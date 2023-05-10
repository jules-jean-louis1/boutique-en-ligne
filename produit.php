<?php
session_start();

?>

<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/styles/style.css">
    <link rel="icon" href="public/images/icones/in-game-logo.png">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Script JS -->
    <script defer type="module" src="src/scripts/produit.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title></title>
</head>
<body>
    <header class="w-full">
        <?php require_once "src/import/header.php"; ?>
    </header>
    <main class="bg-[#242629]">
        <div id="containerLoginRegisterForm"></div>
        <div id="containerDialogAvis"></div>
        <section id="containerMessageAddCart"></section>
        <section id="containerInformationProduits" class="xl:pt-12 pt-2"></section>
        <section id="containerSimilarProduct"></section>
        <section class="mt-12">
            <h2 class="text-center text-2xl text-white">Ajouter un avis sur ce produit</h2>
            <div id="containerAddAvis"></div>
        </section>
        <section class="my-6">
            <div id="containerAvisClients" class="flex flex-col items-center"></div>
        </section>
    </main>
    <footer class="w-full">
        <?php require_once "src/import/footer.php"; ?>
    </footer>
</body>
</html>
