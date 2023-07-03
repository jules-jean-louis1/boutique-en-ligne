<?php
session_start();

?>

<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/styles/style.css">
    <link rel="icon" href="public/images/icones/wg_logo.png">
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
    <main class="bg-[#181920]">
        <div id="apiSteam"></div>
        <div id="containerLoginRegisterForm"></div>
        <div id="containerDialogAvis"></div>
        <section id="containerMessageAddCart"></section>
        <section>
            <div id="banner_img_container" class="w-full"></div>
            <div id="containerInformationProduits" class="xl:pt-12 pt-2 relative z-[1]"></div>
        </section>
        <section id="wapperImagesProduct" class="flex justify-center py-6 relative z-[1]">
            <div class="w-8/12">
                <h2 class="text-2xl text-white flex items-center py-4">
                    <span class="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-photo" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M15 8h.01"/>
                            <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"/>
                            <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"/>
                            <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"/>
                        </svg>
                    </span>
                    <span>
                        Visuels
                    </span>
                </h2>
                <div id="containerImagesProducts" class="flex flex-row gap-4 w-full h-[400px]"></div>
            </div>
        </section>
        <section class="flex justify-center py-6 relative z-[1]">
            <div class="w-8/12">
                <h2 class="text-2xl text-white flex items-center py-4">
                    <span class="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trending-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M3 17l6 -6l4 4l8 -8"/>
                          <path d="M14 7l7 0l0 7"/>
                        </svg>
                    </span>
                    <span>
                        Jeux tendances
                    </span>
                </h2>
                <div id="containerSimilarProduct" class="flex justify-center"></div>
            </div>
        </section>
        <section class="mt-12">
            <h2 class="text-center text-2xl text-white">Ajouter un avis sur ce produit</h2>
            <div id="containerAddAvis"></div>
        </section>
        <section class="py-8">
            <div class="flex flex-col items-center">
                <h2 class="text-2xl text-white">Avis clients</h2>
                <div id="containerAvisClients" class="w-10/12"></div>
            </div>
        </section>
    </main>
    <footer class="w-full">
        <?php require_once "src/import/footer.php"; ?>
    </footer>
</body>
</html>
