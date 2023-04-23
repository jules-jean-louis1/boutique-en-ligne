<?php
session_start();

?>

<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/styles/index.css">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Script JS -->
    <script defer type="module" src="src/scripts/index.js"></script>
    <title>Acceuil</title>
</head>
<body>
    <header class="w-full">
        <?php require_once "src/import/header.php"; ?>
    </header>
    <main class="bg-[#0E1217] mb-10">
        <section>
            <div id="background_img_banner" class="max-h-[500px]"></div>
        </section>
        <section class="flex flex-col justify-center items-center">
            <div class="flex flex-col justify-center lg:w-7/12 w-11/12">
                <div id="containerTitleProduct" class="flex items-center justify-between w-full py-4">
                    <h2 class="text-center text-2xl text-white">Tendances</h2>
                    <button type="button"
                            class="bg-slate-600/40 hover:bg-slate-800/40 text-white font-bold py-2 px-4 rounded-[14px] border-[1px] border-[#a8b3cf33]"
                            id="buttonTendances">Voir plus
                    </button>
                </div>
                <div id="containerProduits" class="flex flex-wrap justify-between w-full h-full"></div>
            </div>
        </section>
        <section></section>
        <section class="flex flex-col justify-center items-center">
            <div class="flex flex-col justify-center lg:w-7/12 w-11/12">
                <div id="containerTitleCategories" class="flex items-center justify-between w-full py-4">
                    <h2 class="text-center text-2xl text-white">Catégories</h2>
                    <button type="button"
                            class="bg-slate-600/40 hover:bg-slate-800/40 text-white font-bold py-2 px-4 rounded-[14px] border-[1px] border-[#a8b3cf33]"
                            id="buttonTendances">Voir plus
                    </button>
                </div>
                <div id="displayCategories" class="flex flex-wrap justify-between w-full h-full"></div>
            </div>
        </section>
        <section>
            <div id="lastAvisClient"></div>
        </section>
    </main>
    <footer class="w-full">
        <?php require_once "src/import/footer.php"; ?>
    </footer>
</body>
</html>
