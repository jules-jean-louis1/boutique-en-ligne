<?php
session_start();
if ($_SESSION['type_compte'] === 'administrateur') {?>
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
    <script defer type="module" src="src/scripts/dashboard.js"></script>
    <title>Dashboard</title>
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
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M3.67709 8.5L8.70966 3.47186C9.05795 3.17747 9.50825 3 10 3H19C20.1046 3 21 3.89543 21 5V14C21 14.5763 20.7563 15.0956 20.3663 15.4606L15.3229 20.5M15.3229 8.5L20.3229 3.5M5 21H14C15.1046 21 16 20.1046 16 19V10C16 8.89543 15.1046 8 14 8H5C3.89543 8 3 8.89543 3 10V19C3 20.1046 3.89543 21 5 21Z"></path></svg>
            <span>Produits</span>
        </button>
        <button type="button" class="bg-[#A87EE6FF] hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2" id="buttonSeeCommandes">
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M20 7H4V17.78C4 18.919 4 19.4885 4.22517 19.9219C4.41492 20.2872 4.71276 20.5851 5.07805 20.7748C5.51153 21 6.08102 21 7.22 21H16.78C17.919 21 18.4885 21 18.9219 20.7748C19.2872 20.5851 19.5851 20.2872 19.7748 19.9219C20 19.4885 20 18.919 20 17.78V7Z"></path><path d="M16.4717 3H7.52831C7.21 3 7.05084 3 6.90657 3.04459C6.78413 3.08243 6.6701 3.14346 6.5707 3.22434C6.45356 3.31965 6.36528 3.45208 6.18871 3.71693L4 7H20L17.8113 3.71693C17.6347 3.45208 17.5464 3.31965 17.4293 3.22434C17.3299 3.14346 17.2159 3.08243 17.0934 3.04459C16.9492 3 16.79 3 16.4717 3Z"></path><path d="M8 10C9.44434 13.6108 14.5557 13.6108 16 10"></path></svg>
            <span>Commandes</span>
        </button>
        <button type="button" class="bg-[#A87EE6FF] hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2" id="buttonSeeCategories">
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="#fff" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M7 5C5.89543 5 5 5.89543 5 7V20.1121C5 21.0614 6.19882 21.4765 6.78587 20.7305L8.14754 19M17 18.5V20.1121C17 21.0614 15.8012 21.4765 15.2141 20.7305L11.7859 16.3737C11.5857 16.1193 11.2928 15.9921 11 15.9921"></path><path d="M7 5C7 3.89543 7.89543 3 9 3H17C18.1046 3 19 3.89543 19 5V18.1121C19 19.0614 17.8012 19.4765 17.2141 18.7305L13.7859 14.3737C13.3855 13.8649 12.6145 13.8649 12.2141 14.3737L8.78587 18.7305C8.19882 19.4765 7 19.0614 7 18.1121V5Z"></path></svg>
            <span>Catégories</span>
        </button>
        <button type="button" class="bg-[#A87EE6FF] hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2" id="buttonSeeUsers">
            <img src="public/images/icones/handle-account.svg" alt="user" class="w-6 h-6">
            <span>Utilisateurs</span>
        </button>
    </div>
    <div id="containerMessage">
        <div id="message"></div>
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
