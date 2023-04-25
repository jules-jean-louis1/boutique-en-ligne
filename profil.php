<?php
session_start();
if (isset($_SESSION['login']) != null) { ?>

<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/styles/style.css">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Script JS -->
    <script defer type="module" src="src/scripts/profil.js"></script>
    <title>Profil</title>
</head>
<body>
<header class="w-full">
    <?php require_once "src/import/header.php"; ?>
</header>
<main class="bg-[#0E1217]">
    <article class="flex flex-col items-center">
        <section id="containerFormCommandeInfo"></section>
        <div id="containerFormProfil">
            <button type="button" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    id="buttonFormProfilInfo">Modifier mes informations
            </button>
            <button type="button" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    id="buttonFormCommandeInfo">Mes commandes
            </button>
        </div>
        <section id="itemsModifProfil" class="flex justify-center w-full hidden">
            <div id="containerFormProfilInfo" class="flex justify-between"></div>
        </section>
        <section class="flex justify-center w-full">
            <div id="containerCommande" class="hidden w-[80%]"></div>
        </section>
        <section>
            <div id="containerDeleteProfil"></div>
        </section>
    </article>
</main>
</body>
</html>
<?php } else {
    header("Location: index.php");
} ?>