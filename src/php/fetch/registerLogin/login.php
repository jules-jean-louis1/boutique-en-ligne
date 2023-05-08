<?php
session_start();
require_once "../../Classes/Client.php"; // On inclut la classe Client
require_once "../../Classes/Cart.php"; // On inclut la classe Cart

function verifyField($field)
{
    if (isset($_POST[$field]) && !empty(trim($_POST[$field]))) {
        return $_POST[$field];
    } else {
        return false;
    }
}
if (isset($_POST['login'])) {
    $error = [];
    $login = htmlspecialchars($_POST['login']);
    $password = htmlspecialchars($_POST['password']);

    if (!verifyField('login')) {
        $error['login'] = "Veuillez entrer un login / email";
    }
    if (!verifyField('password')) {
        $error['password'] = "Veuillez entrer un mot de passe";
    }
    if (empty($error)) {
        $client = new Client();
        if ($client->login($login, $password) === true) {
            // On vérifie si le cookie 'cart' existe et le décode en tableau associatif
            if (isset($_COOKIE['cart']) && !empty($_COOKIE['cart'])) {
                // Vérifier si l'utilisateur a déjà un panier
                $cart = new Cart();
                $cartExist = $cart->verifyIfCartExist($_SESSION['id']);
                $cartData = json_decode($_COOKIE['cart'], true);
                // Si FALSE, on crée un panier
                if ($cartExist === false) {
                    $cart->createCart($_SESSION['id']);
                    if (isset($_COOKIE["cart"])) {
                        $cartData = json_decode($_COOKIE["cart"], true);
                        if (is_array($cartData) && count($cartData) > 0) {
                            foreach ($cartData as $product) {
                                $id = $product['id'];
                                $quantity = $product['quantity'];
                                $cart->AddProductToClientCart($_SESSION['id'], $id, $quantity);
                            }
                        }
                        // Détruire la variable du cookie
                        setcookie('cart', '', time() - 3600, '/');
                        unset($_COOKIE["cart"]);
                    }
                } else {
                    if (isset($_COOKIE["cart"])) {
                        $cartData = json_decode($_COOKIE["cart"], true);
                        if (is_array($cartData) && count($cartData) > 0) {
                            foreach ($cartData as $product) {
                                $id = $product['id'];
                                $quantity = $product['quantity'];
                                $cart->AddProductToClientCart($_SESSION['id'], $id, $quantity);
                            }
                        }
                        // Détruire la variable du cookie
                        setcookie('cart', '', time() - 3600, '/');
                        unset($_COOKIE["cart"]);
                    }
                }
            }
            $error['success'] = "Vous êtes connecté";
        } else {
            $error['error'] = "Login ou mot de passe incorrect";
        }
    }
    header('Content-Type: application/json');
    echo json_encode($error);
    die();
}
?>

<form action="" method="post" id="login-form" class="rounded-lg h-full max-h-[calc(100vh-2.5rem)]
                mobileL:h-[40rem] mobileL:max-h-[calc(100vh-5rem)]
                w-[26.25rem] px-4 py-5 flex flex-col justify-around text-white">
    <div class="relative">
        <input type="text" name="login" id="login" placeholder="Entrez votre login ou Email" class="px-2.5 pt-4 pb-1 text-white bg-[#31333a] hover:bg-[#21262D] rounded-[14px] textField_border focus:outline-none w-full">
        <label for="login" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Nom d'utilisateur / Email</label>
        <small id="errorLogin" class="flex items-center h-4 text-red-500 px-2 my-1 "></small>
    </div>
    <div class="relative">
        <input type="password" name="password" id="password" placeholder="Entrez votre mot de passe" class="px-2.5 pt-4 pb-1 text-white bg-[#31333a] hover:bg-[#21262D] rounded-[14px] textField_border focus:outline-none w-full">
        <label for="password" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Mot de passe</label>
        <small id="errorPassword" class="flex items-center h-4 text-red-500 px-2 my-1 "></small>
    </div>
    <div id="containerMessageProfil" class="h-[65px] w-full">
        <div id="errorMsg" class="w-full"></div>
    </div>
    <div id="containerSubmit" class="w-full">
        <button type="submit" name="submit" id="submit" class="p-2 rounded-[14px] bg-[#a87ee6] font-semibold text-white w-full">Connexion</button>
    </div>
</form>
