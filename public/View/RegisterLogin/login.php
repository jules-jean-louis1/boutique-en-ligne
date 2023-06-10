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