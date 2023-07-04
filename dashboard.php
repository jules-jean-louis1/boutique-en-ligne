<?php
session_start();
if ($_SESSION['type_compte'] === 'administrateur') {?>
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
    <script defer type="module" src="src/scripts/dashboard.js"></script>
    <title>Dashboard - WellGames</title>
</head>
<body>
<header class="w-full">
    <?php require_once "src/import/header.php"; ?>
</header>
<main class="">
    <article>
        <section>
            <div id="containerDialogFormUpdateProduct"></div>
        </section>
    </article>
    <div id="containerButtonAction" class="flex justify-center space-x-5 lg:pt-[3%] pt-[6%]">
        <button type="button" class="bg-[#A87EE6FF] hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2" id="buttonSeeProduct">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-gamepad-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 5h3.5a5 5 0 0 1 0 10h-5.5l-4.015 4.227a2.3 2.3 0 0 1 -3.923 -2.035l1.634 -8.173a5 5 0 0 1 4.904 -4.019h3.4z" />
                <path d="M14 15l4.07 4.284a2.3 2.3 0 0 0 3.925 -2.023l-1.6 -8.232" />
                <path d="M8 9v2" />
                <path d="M7 10h2" />
                <path d="M14 10h2" />
            </svg>
            <span>Produits</span>
        </button>
        <button type="button" class="bg-[#A87EE6FF] hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2" id="buttonSeeCommandes">
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M20 7H4V17.78C4 18.919 4 19.4885 4.22517 19.9219C4.41492 20.2872 4.71276 20.5851 5.07805 20.7748C5.51153 21 6.08102 21 7.22 21H16.78C17.919 21 18.4885 21 18.9219 20.7748C19.2872 20.5851 19.5851 20.2872 19.7748 19.9219C20 19.4885 20 18.919 20 17.78V7Z"></path><path d="M16.4717 3H7.52831C7.21 3 7.05084 3 6.90657 3.04459C6.78413 3.08243 6.6701 3.14346 6.5707 3.22434C6.45356 3.31965 6.36528 3.45208 6.18871 3.71693L4 7H20L17.8113 3.71693C17.6347 3.45208 17.5464 3.31965 17.4293 3.22434C17.3299 3.14346 17.2159 3.08243 17.0934 3.04459C16.9492 3 16.79 3 16.4717 3Z"></path><path d="M8 10C9.44434 13.6108 14.5557 13.6108 16 10"></path></svg>
            <span>Commandes</span>
        </button>
        <button type="button" class="bg-[#A87EE6FF] hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2" id="buttonSeeCategories">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-tag" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
                <path d="M4 7v3.859c0 .537 .213 1.052 .593 1.432l8.116 8.116a2.025 2.025 0 0 0 2.864 0l4.834 -4.834a2.025 2.025 0 0 0 0 -2.864l-8.117 -8.116a2.025 2.025 0 0 0 -1.431 -.593h-3.859a3 3 0 0 0 -3 3z" />
            </svg>
            <span>Catégories</span>
        </button>
        <button type="button" class="bg-[#A87EE6FF] hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2" id="buttonSeeUsers">
            <img src="public/images/icones/handle-account.svg" alt="user" class="w-6 h-6">
            <span>Utilisateurs</span>
        </button>
    </div>
    <div class="flex justify-center">
        <div id="containerMessage" class="h-10 w-fit my-2">
            <div id="message"></div>
        </div>
    </div>
    <div id="containerAddProduct"></div>
    <div id="containerInfo">
        <div id="containerCatAndSubCat">
            <div id="containerCat">
                <div id="dislpayInfoProduct"></div>
                <div id="containerAddCategory">
                </div>
            </div>
        </div>
    </div>
    <div id="containerModifyProduct"></div>
</main>
</body>
</html>
<?php } else {
    header("Location: index.php");
} ?>
