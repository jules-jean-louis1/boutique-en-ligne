<?php
session_start();
require_once "src/php/fetch/produit/bestSales.php";
?>

<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/styles/index.css">
    <link rel="icon" href="public/images/icones/wg_logo.png">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Script JS -->
    <script defer type="module" src="src/scripts/index.js"></script>
    <title>WellGames - Accueil</title>
</head>
<body>
    <header class="w-full">
        <?php require_once "src/import/header.php"; ?>
    </header>
    <main class="bg-[#242629] pb-12">
        <div id="containerLoginRegisterForm"></div>
        <section id="containerMessageCart"></section>
        <section>
            <div id="background_img_banner" class="max-h-[450px]"></div>
        </section>
        <section class="flex flex-col justify-center items-center">
            <div class="flex flex-col justify-center lg:w-7/12 w-11/12">
                <div id="containerTitleProduct" class="flex items-center justify-between w-full py-4">
                    <h2 class="text-center text-2xl text-white">Tendances</h2>
                    <a href="catalogue.php">
                        <button type="button"
                                class="bg-slate-600/40 hover:bg-slate-800/40 text-white font-bold py-2 px-4 rounded-[14px] border-[1px] border-[#a8b3cf33]"
                                id="buttonTendances">Voir plus
                        </button>
                    </a>
                </div>
                <div id="containerProduits" class="flex flex-wrap justify-between w-full h-full"></div>
            </div>
        </section>
        <section class="flex flex-col justify-center items-center">
            <div class="flex flex-col justify-center lg:w-7/12 w-11/12">
                <div id="containerTitleCategories" class="flex items-center justify-between w-full py-4">
                    <h2 class="text-center text-2xl text-white">Catégories</h2>
                    <a href="catalogue.php">
                        <button type="button"
                                class="bg-slate-600/40 hover:bg-slate-800/40 text-white font-bold py-2 px-4 rounded-[14px] border-[1px] border-[#a8b3cf33]"
                                id="buttonTendances">Voir plus
                        </button>
                    </a>
                </div>
                <div id="displayCategories" class="flex flex-wrap justify-between w-full h-full"></div>
            </div>
        </section>
        <section>
            <div class="flex justify-center">
                <div id="lastAvisClient" class="w-2/3 flex justify-around my-8"></div>
            </div>
        </section>
        <section id="bestSalesGames" class="flex justify-center">
            <div class="flex flex-col justify-center lg:w-7/12 w-11/12">
                <div id="containerTitleCategories" class="flex items-center justify-between w-full py-4">
                    <h2 class="text-center text-2xl text-white">Meilleures ventes</h2>
                    <a href="catalogue.php">
                        <button type="button" class="bg-slate-600/40 hover:bg-slate-800/40 text-white font-bold py-2 px-4 rounded-[14px] border-[1px] border-[#a8b3cf33]" id="buttonTendances">Voir plus</button>
                    </a>
                </div>
                <div id="displayBestSales" class="flex flex-wrap justify-between w-full h-full">
                    <?php foreach ($bestSales as $product) { ?>
                        <div id="itemsProductContainer" class="w-60 flex justify-center mx-2">
                            <a href="produit.php?id=<?= $product['id_product'] ?>">
                                <div id="wapperProduct" class="p-4">
                                    <div id="itemsImgProduct">
                                        <div id="priceProduct" class="absolute mt-2 ml-2 rounded-full text-white bg-slate-900/90 w-fit p-1">
                                            <p><?= $product['price_product'] ?> €</p>
                                        </div>
                                        <img src="src/images/products/<?= $product['img_product'] ?>" alt="<?= $product['name_product'] ?>" class="rounded-lg h-fit lg:h-72">
                                    </div>
                                    <div id="TitleProduct" class="flex items-center w-full justify-between">
                                        <div id="containerTitleProduct" class="flex flex-col items-start">
                                            <p class="font-bold text-white"><?= $product['name_product'] ?></p>
                                            <p class="font-light text-[#a8b3cf]"><?= $product['name_subcategories'] ?></p>
                                        </div>
                                        <div id="containerButtonAddToCart">
                                            <form action="" method="post" id="formAddToCart_<?= $product['id_product'] ?>">
                                                <input type="hidden" name="id_product" value="<?= $product['id_product'] ?>">
                                                <input type="hidden" name="name_product" value="<?= $product['name_product'] ?>">
                                                <button id="buttonAddToCart_<?= $product['id_product'] ?>" class="text-white rounded-full" type="submit">
                                                    <svg width="40" height="40" viewBox="0 0 24 24" stroke="#a87ee6" fill="none" stroke-linejoin="round" stroke-width="1.105263157894737" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.99999 12H12M12 12H17M12 12V6.99999M12 12V17M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z"></path>
                                                    </svg>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    <?php } ?>
                </div>
            </div>
        </section>
    </main>
    <footer class="w-full">
        <?php require_once "src/import/footer.php"; ?>
    </footer>
</body>
</html>
