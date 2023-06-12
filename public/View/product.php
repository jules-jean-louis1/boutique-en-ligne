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
    <title>Produit</title>
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
            <h1><?php echo $gameDetails['name']; ?></h1>
            <img src="<?php echo $gameDetails['header_image']; ?>" alt="Image du jeu <?php echo $gameDetails['name']; ?>">
            <p><?php echo $gameDetails['short_description']; ?></p>
            <p><?php echo $gameDetails['detailed_description']; ?></p>
            <p><?php echo $gameDetails['release_date']['date']; ?></p>
            <p><?php echo $gameDetails['price_overview']['final_formatted']; ?></p>
        </div>
    </div>
</main>
<footer class="w-full">
    <?php require_once "public/View/import/footer.php"; ?>
</footer>
</body>
</html>