<?php
session_start();
require_once "../../Classes/Client.php"; // On inclut la classe Client

if (isset($_POST['login'])) {
    $login = htmlspecialchars($_POST['login']);
    $password = htmlspecialchars($_POST['password']);

    if (!empty($login) && !empty($password)) {
        $client = new Client();
        if ($client->login($login, $password) === true) {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'success', 'message' => 'Vous êtes connecté']);
        } else {
            header("Content-Type: application/json");
            echo json_encode(['status' => 'error', 'message' => 'Login ou mot de passe incorrect']);
        }
    } else {
        header("Content-Type: application/json");
        echo json_encode(['status' => 'error', 'message' => 'Veuillez remplir tous les champs']);
    }
    die();
}
?>

<form action="" method="post" id="login-form" class="rounded-lg h-full max-h-[calc(100vh-2.5rem)]
                mobileL:h-[40rem] mobileL:max-h-[calc(100vh-5rem)]
                w-[26.25rem] px-4 py-5 flex flex-col space-y-2">
    <div id="containerCloseDialog" class="flex flex-row justify-between items-center">
        <p>
            <span class="text-lg font-bold">Connectez-vous sur Blog</span>
        </p>
        <button type="button" id="closeDialog" class="py-2 px-4 hover:bg-slate-200 rounded-full">&times;</button>
    </div>
    <div class="flex flex-col">
        <label for="login" class="px-[4px] py-[3px]">Login / E-mail</label>
        <input type="text" name="login" id="login" placeholder="Entrez votre login ou E-mail" class="p-2 bg-[#52586633] rounded-[8px] text-sm">
    </div>
    <div class="flex flex-col">
        <label for="password" class="px-[4px] py-[3px]">Mot de passe</label>
        <input type="password" name="password" id="password" placeholder="Entrez votre mot de passe" class="p-2 bg-[#52586633] rounded-[8px] text-sm">
    </div>
    <div id="containerMessageProfil" class="h-[65px] w-full">
        <div id="errorMsg" class="w-full"></div>
    </div>
    <div id="containerSubmit">
        <button type="submit" name="submit" id="submit" class="p-2 rounded-lg bg-[#AC1DE4] font-semibold text-white">Connexion</button>
    </div>
</form>
