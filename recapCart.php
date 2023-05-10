<?php
session_start();
?>
<?php if (isset($_SESSION['id'])) { ?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/styles/style.css">
        <link rel="icon" href="public/images/icones/in-game-logo.png">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.11.0/lottie.min.js" integrity="sha512-XCthc/WzPfa+oa49Z3TI6MUK/zlqd67KwyRL9/R19z6uMqBNuv8iEnJ8FWHUFAjC6srr8w3FMZA91Tfn60T/9Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <!-- Script JS -->
    <script defer type="module" src="src/scripts/recapCart.js"></script>

    <title>Guest - Recap</title>
</head>
<body>
<header class="w-full">
    <?php require_once "src/import/header.php"; ?>
</header>
<main class="bg-[#181920]">
    <div id="containerLoginRegisterForm"></div>
    <section>
        <div id="containerMessageCart"></div>
    </section>
    <section class="flex justify-between items-start h-[90vh] lg:pt-[6%]">
        <div id="cartPlusInfoShipping" class="ml-[8%] w-full lg:mr-10">
            <div id="containerInfoShipping"></div>
            <div id="containerCart" class="pt-[3%]"></div>
        </div>
        <div id="containerPayment" class="h-3/4"></div>
    </section>
</main>
<footer class="w-full">
    <?php require_once "src/import/footer.php"; ?>
</footer>
</body>
</html>

<?php } else {
header("Location: index.php");
} ?>
