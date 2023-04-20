<?php
session_start();
?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/styles/style.css">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Script JS -->
    <script defer type="module" src="src/scripts/recapCart.js"></script>
    <title>Guest - Recap</title>
</head>
<body>
<header class="w-full">
    <?php require_once "src/import/header.php"; ?>
</header>
<main class="bg-[#262628]">
    <section>
        <div id="containerMessageCart"></div>
    </section>
    <section>
        <div id="containerCart"></div>
        <div id="containerPayment"></div>
    </section>
</main>
<footer class="w-full">
    <?php require_once "src/import/footer.php"; ?>
</footer>
</body>
</html>
