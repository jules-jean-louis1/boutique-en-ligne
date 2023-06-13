<?php
$initialPrice = $gameDetails['price_overview']['initial'];
$finalPrice = $gameDetails['price_overview']['final'];
$discountPercentage = round(($initialPrice - $finalPrice) / $initialPrice * 100);
?>

<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/wellgames/public/style/index.css';?>">
    <link rel="icon" href="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/wellgames/public/images/logo/wg_logo.png';?>">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Script JS -->
    <script defer type="module" src="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/wellgames/public/script/product_script.js';?>"></script>
    <title><?= $gameDetails['name'] . ' - WellGames' ; ?></title>
</head>
<body>
<header class="w-full">
    <?php require_once "public/View/import/header.php"; ?>
</header>
<main class=" pb-12">
    <div id="containerLoginRegisterForm"></div>
    <section id="containerMessageCart"></section>
    <div id="DetailGames">
        <div class="text-white">
            <div class="flex">
                <div id="background_img_banner">
                    <img src="<?php echo $gameDetails['screenshots'][0]['path_full']; ?>" alt="Image du jeu <?php echo $gameDetails['name']; ?>" class="absolute z-[-10]">
                </div>
                <div class="lg:pt-20 w-10/12 mx-auto">
                    <div class="flex lg:flex-row lg:space-x-8 justify-between">
                        <div>
                            <img src="<?php echo $gameDetails['header_image']; ?>" alt="Image du jeu <?php echo $gameDetails['name']; ?>" class="rounded-lg">
                        </div>
                        <div class="flex flex-col justify-between items-center rounded-lg">
                            <div class="p-4 backdrop-blur-2xl">
                                <h1 class="text-xl font-bold"><?php echo $gameDetails['name']; ?></h1>
                                <p><?= $gameDetails['genres'][0]['description']; ?></p>
                                <div class="w-full">
                                    <?php if ($initialPrice === $finalPrice) : ?>
                                        <p class="text-4xl"><?php echo $gameDetails['price_overview']['final_formatted']; ?></p>
                                    <?php else: ?>
                                        <div class="flex justify-center items-end gap-4 w-11/12">
                                            <p class="line-through"><?php echo $gameDetails['price_overview']['initial_formatted']; ?></p>
                                            <p class="text-[#a87ee6]">-<?php echo $discountPercentage; ?>%</p>
                                            <p class="text-4xl"><?php echo $gameDetails['price_overview']['final_formatted']; ?></p>
                                        </div>
                                    <?php endif; ?>
                                    <form action="" method="post" id="addToCart" class="w-full">
                                        <div class="flex items-center w-full p-2">
                                            <select name="platforms" class="p-3 bg-transparent border border-white rounded-l-[14px]">
                                                <?php if ($gameDetails['platforms']['windows']) : ?>
                                                    <option value="windows">Windows</option>
                                                <?php endif; ?>
                                                <?php if ($gameDetails['platforms']['mac']) : ?>
                                                    <option value="mac">Mac</option>
                                                <?php endif; ?>
                                                <?php if ($gameDetails['platforms']['linux']) : ?>
                                                    <option value="linux">Linux</option>
                                                <?php endif; ?>
                                            </select>
                                            <select name="version" class="p-3 bg-transparent border border-white rounded-r-[14px]">
                                                <?php foreach ($gameDetails['package_groups'][0]['subs'] as $edition) : ?>
                                                    <option value="<?php echo $edition['packageid']; ?>">
                                                        <?php echo $edition['option_text']; ?>
                                                    </option>
                                                <?php endforeach; ?>
                                            </select>
                                        </div>
                                        <div class="flex space-x-4 w-full items-center">
                                            <button id="buyInstant" class="p-2 rounded-[14px] bg-[#a87ee6] font-semibold text-white" type="button">Acheter maintenant</button>
                                            <button id="addToCart" class="p-2 rounded-[14px] bg-[#a87ee6] font-semibold text-white" type="submit">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                                                    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                                                    <path d="M17 17h-11v-14h-2"/>
                                                    <path d="M6 5l14 1l-1 7h-13"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between lg:space-x-8">
                        <div class="flex flex-col w-1/2">
                            <h2>À propos du jeu</h2>
                            <p><?php echo $gameDetails['short_description']; ?></p>
                        </div>
                        <div class="flex justify-end flex-col ml-12 w-2/3">
                            <p class="flex gap-2">
                                <span>Développeur:</span>
                                <span><?= $gameDetails['developers'][0]?></span>
                            </p>
                            <p class="flex gap-2">
                                <span>Editeur:</span>
                                <span><?= $gameDetails['publishers'][0]?></span>
                            </p>
                            <p class="flex gap-2">
                                <span>Date de parution:</span>
                                <span><?= $gameDetails['release_date']['date']?></span>
                            </p>
                            <p class="flex gap-2">
                                <span>Tags:</span>
                                <span id="containerCategories">
                                    <?php foreach ($gameDetails['categories'] as $category) : ?>
                                        <span class=""><?= $category['description']?></span>
                                    <?php endforeach; ?>
                                    <button id="showAllCategories" class="text-[#a87ee6]">Voir plus</button>
                                </span>
                        </div>
                    </div>
                    <p><?php echo $gameDetails['detailed_description']; ?></p>
                </div>
            </div>
        </div>
    </div>
</main>
<footer class="w-full">
    <?php require_once "public/View/import/footer.php"; ?>
</footer>
</body>
</html>