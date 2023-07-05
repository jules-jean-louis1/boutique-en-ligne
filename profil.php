<?php
session_start();
if (isset($_SESSION['login']) != null) { ?>

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
    <script defer type="module" src="src/scripts/profil.js"></script>
    <title>Profil</title>
</head>
<body>
<header class="w-full">
    <?php require_once "src/import/header.php"; ?>
</header>
<main class="bg-[#242629]">
    <article class="flex flex-col items-center">
        <section id="containerInfoUsers" class="pt-6"></section>
        <div id="containerFormProfil" class="pt-4 flex items-center space-x-2">
            <button type="button" class="flex items-center justify-center bg-[#2D323C] hover:bg-[#a87ee6] text-white font-bold py-2 px-4 rounded-[14px] border border-[#a8b3cf33]"
                    id="buttonFormProfilInfo">
                <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 pointer-events-none text-theme-label-secondary">
                    <path d="M12 3a3 3 0 012.758 1.817l.067.171.035.106.04-.02a3.004 3.004 0 013.151.29l.169.137.144.135a3.001 3.001 0 01.645 3.284l-.082.18-.023.039.108.036a3.003 3.003 0 011.964 2.446l.019.203L21 12a3 3 0 01-1.817 2.758l-.171.067-.107.035.021.04a3.004 3.004 0 01-.29 3.151l-.137.169-.135.144a3.001 3.001 0 01-3.284.645l-.18-.082-.04-.023-.035.108a3.003 3.003 0 01-2.446 1.964l-.203.019L12 21a3 3 0 01-2.758-1.817l-.067-.172-.036-.106-.039.021a3.004 3.004 0 01-3.151-.29L5.78 18.5l-.144-.135a3.001 3.001 0 01-.645-3.284l.082-.18.022-.04-.107-.035a3.003 3.003 0 01-1.964-2.446l-.019-.203L3 12a3 3 0 011.817-2.758l.172-.067.105-.036-.02-.039a3.004 3.004 0 01.29-3.151L5.5 5.78l.135-.144a3.001 3.001 0 013.284-.645l.18.082.039.022.036-.107a3.003 3.003 0 012.446-1.964l.203-.019L12 3zm0 1.5a1.5 1.5 0 00-1.493 1.356L10.5 6v1.229c-.188.059-.371.129-.55.209l-.262.127-.87-.868a1.5 1.5 0 00-2.224 2.007l.103.114.868.87c-.09.172-.17.35-.24.534l-.096.279L6 10.5a1.5 1.5 0 00-.144 2.993L6 13.5h1.229c.06.188.129.372.209.55l.127.262-.868.87a1.5 1.5 0 001.06 2.56l.144-.006c.287-.028.567-.138.803-.33l.114-.103.87-.868c.172.09.35.17.534.24l.279.096L10.5 18a1.5 1.5 0 001.356 1.493L12 19.5l.144-.007a1.5 1.5 0 001.35-1.349L13.5 18v-1.229c.188-.06.372-.129.55-.209l.262-.127.87.868c.293.293.677.44 1.06.44l.144-.007a1.5 1.5 0 001.02-2.44l-.103-.114-.868-.87c.09-.172.17-.35.24-.533l.096-.279H18l.144-.007a1.5 1.5 0 000-2.986L18 10.5h-1.229a4.964 4.964 0 00-.209-.55l-.127-.262.868-.87a1.5 1.5 0 00-2.007-2.224l-.114.103-.87.868c-.172-.09-.35-.17-.533-.24L13.5 7.23V6A1.5 1.5 0 0012 4.5zM12 9a3 3 0 110 6 3 3 0 010-6zm0 1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="currentcolor" fill-rule="evenodd"></path>
                </svg>
                Détails du compte
            </button>
            <button type="button" class="flex items-center justify-center bg-[#2D323C] hover:bg-[#a87ee6] text-white font-bold py-2 px-4 rounded-[14px] border border-[#a8b3cf33]"
                    id="buttonFormCommandeInfo">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-bag" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z"/>
                    <path d="M9 11v-5a3 3 0 0 1 6 0v5"/>
                </svg>
                Mes commandes
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