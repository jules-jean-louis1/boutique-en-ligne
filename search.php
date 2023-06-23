<?php
session_start();
require_once "./src/php/Classes/Product.php";
if (isset($_GET['search_bar_form'])) {
    $query = htmlspecialchars(trim($_GET['search_bar_form']));
    $product = new Product();
    $products = $product->searchProduct($query);
    $result = $products;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/styles/index.css">
    <link rel="icon" href="public/images/icones/in-game-logo.png">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Script JS -->
    <script defer type="module" src="src/scripts/search.js"></script>
    <title>Recherche pour <?php echo $_GET['search_bar_form'];?></title>
</head>
<body>
<header class="w-full">
    <?php require_once "src/import/header.php"; ?>
</header>
<main class="bg-[#242629] pb-12">
    <div id="containerLoginRegisterForm"></div>
    <section id="containerMessageCart"></section>
    <section class="pt-4">
        <div>
            <p class="text-white text-2xl font-bold">
                Résultats pour <?php echo $_GET['search_bar_form'];?>
            </p>
        </div>
        <div class="flex xl:flex-row xl:justify-between flex-col xl:pt-6 xl:mx-[4%]">
            <div class="flex flex-wrap justify-center w-full h-full">
                <?php foreach ($result as $item) :?>
                    <div id="itemsProductContainer" class="w-80 flex justify-center mx-8">
                        <a href="produit.php?id=<?=$item['id_product'];?>">
                            <div id="wapperProduct" class="p-4">
                                <div id="itemsImgProduct">
                                    <div id="priceProduct" class="absolute mt-2 ml-2 rounded-full text-white bg-slate-900/90 w-fit p-1 hover:bg-[#a87ee6]">
                                        <p><?=$item['price_product'];?> €</p>
                                    </div>
                                    <img src="src/images/products/<?=$item['img_product'];?>" alt="<?=$item['name_product'];?>" class="rounded-lg h-fit lg:h-72">
                                </div>
                                <div id="TitleProduct" class="flex items-center w-full justify-between">
                                    <div id="containerTitleProduct" class="flex flex-col items-start">
                                        <p class="font-bold text-white"><?= $item['name_product'];?></p>
                                        <p class="font-light text-[#a8b3cf]"><?=$item['name_subcategories'];?></p>
                                    </div>
                                    <div id="containerButtonAddToCart">
                                        <form action="" method="post" id="formAddToCart_<?=$item['id_product'];?>">
                                            <input type="hidden" name="id_product" value="<?=$item['id_product'];?>">
                                            <input type="hidden" name="name_product" value="<?= $item['name_product'];?>">
                                            <button id="buttonAddToCart_${product.id_product}" class="text-white rounded-full" type="submit">
                                                <svg width="40" height="40" viewBox="0 0 24 24" stroke="#a87ee6" fill="none" stroke-linejoin="round" stroke-width="1.105263157894737" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M6.99999 12H12M12 12H17M12 12V6.99999M12 12V17M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z"></path></svg>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                <?php endforeach;?>
            </div>
        </div>
    </section>
</main>
<footer class="w-full">
    <?php require_once "src/import/footer.php"; ?>
</footer>
</body>
