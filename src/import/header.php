
<nav class="py-2 bg-[#0E1217] border-b-[1px] border-b-[#a8b3cf33]">
    <div class="flex items-center justify-around">
        <div>
            <ul class="flex space-x-4 text-white">
                <li>
                    <a href="index.php">Home</a>
                </li>
                <li>
                    <a href="boutique.php">Produits</a>
                </li>
            </ul>
        </div>
        <div class="w-[50%]">
            <div id="serachBarFormHeaderContainer" class="flex items-center space-x-2 px-2 py-1 rounded-lg bg-[#2D323C] hover:bg-[#464c51] border-l-4 border-[#a8b3cfa3] hover:border-[#A87EE6FF]">
                <div class="flex">
                    <svg width="20" height="20" viewBox="0 0 24 24" stroke="#a8b3cf" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M15.9414 15.4585L20.0004 19.5M11 6.5C13.2091 6.5 15 8.29086 15 10.5M18 10.5C18 6.63401 14.866 3.5 11 3.5C7.13401 3.5 4 6.63401 4 10.5C4 14.366 7.13401 17.5 11 17.5C14.866 17.5 18 14.366 18 10.5Z"></path></svg>
                </div>
                <form action="" method="post" id="searchBarFormHeader" class="w-full">
                    <input type="text" name="search_bar_form" id="search_bar_form" placeholder="Rechercher un produit" class="w-full bg-[#2D323C] hover:bg-[#464c51]">
                </form>
            </div>
            <div id="ContainerSearchBarResultHeader"></div>
        </div>
        <div>
            <ul class="flex">
                <?php if (isset($_SESSION['id'])) { ?>
                    <div class="relative">
                        <button type="button" id="buttonProfilHeader" class="py-1 px-2 rounded-lg bg-[#1C1F26] text-white font-semibold flex items-center justify-between">
                            <span id="infoUserNavBar" class="flex items-center space-x-2"><?= $_SESSION['login'] ?></span>
                        </button>
                        <ul id="menuProfilHeader" class="absolute right-0 w-36 mt-0.5  bg-[#1C1F26] rounded-lg border-[1px] border-[#a8b3cf33] shadow-lg z-10 hidden">
                            <li>
                                <button type="button" id="buttonLogoutHeader" class="block hover:bg-[#2D323C] hover:rounded-t-lg flex w-full">
                                    <a href="profil.php" class="block py-2 px-4 flex items-center justify-between w-full">
                                        <svg width="22" height="22" viewBox="0 0 24 24" stroke="#a8b3cf" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M11.9997 13.5C8.5419 13.5 5.63061 15.84 4.76307 19.0229C4.4726 20.0886 5.39517 21 6.49974 21H17.4997C18.6043 21 19.5269 20.0886 19.2364 19.0229C18.3689 15.84 15.4576 13.5 11.9997 13.5Z"></path><path d="M15.4997 7C15.4997 8.933 13.9327 10.5 11.9997 10.5C10.0667 10.5 8.49974 8.933 8.49974 7C8.49974 5.067 10.0667 3.5 11.9997 3.5C13.9327 3.5 15.4997 5.067 15.4997 7Z"></path></svg>
                                        <span class="text-[#a8b3cf] font-meduim text-[0.9em]">Votre profil</span>
                                    </a>
                                </button>
                            </li>
                            <li>
                                <button type="button" id="buttonLogoutHeader" class="block hover:bg-[#2D323C] flex w-full">
                                    <a href="deconnexion.php" class="block py-2 px-4 flex items-center justify-between w-full">
                                        <svg width="22" height="22" viewBox="0 0 24 24" stroke="#a8b3cf" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M7.00019 7H5.50004M7.00019 7H8.50004M7.00019 7V13.5M12.0003 17V21M12.0003 17H10.5M12.0003 17C14.7619 17 17.0005 14.7613 17.0005 11.9998V10.5M8.50004 7L8.49985 3M8.50004 7H13.5M15.4999 5L15.4998 3M5 19L19 5"></path></svg>
                                        <span class="text-[#a8b3cf] font-meduim text-[0.9em]">Déconnexion</span>
                                    </a>
                                </button>
                            </li>
                            <li>
                                <button type="button" id="buttonLogoutHeader" class="block hover:bg-[#2D323C] hover:rounded-b-lg flex w-full">
                                    <a href="dashboard.php" class="block py-2 px-4 flex items-center justify-between w-full">
                                        <svg width="22" height="22" viewBox="0 0 24 24" stroke="#a8b3cf" fill="none" stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 16.5C3.5 15.3954 4.39543 14.5 5.5 14.5H7.5C8.60457 14.5 9.5 15.3954 9.5 16.5V18.5C9.5 19.6046 8.60457 20.5 7.5 20.5H5.5C4.39543 20.5 3.5 19.6046 3.5 18.5V16.5Z"></path><path d="M14.5 16.5C14.5 15.3954 15.3954 14.5 16.5 14.5H18.5C19.6046 14.5 20.5 15.3954 20.5 16.5V18.5C20.5 19.6046 19.6046 20.5 18.5 20.5H16.5C15.3954 20.5 14.5 19.6046 14.5 18.5V16.5Z"></path><path d="M3.5 5.5C3.5 4.39543 4.39543 3.5 5.5 3.5H7.5C8.60457 3.5 9.5 4.39543 9.5 5.5V7.5C9.5 8.60457 8.60457 9.5 7.5 9.5H5.5C4.39543 9.5 3.5 8.60457 3.5 7.5V5.5Z"></path><path d="M14.5 5.5C14.5 4.39543 15.3954 3.5 16.5 3.5H18.5C19.6046 3.5 20.5 4.39543 20.5 5.5V7.5C20.5 8.60457 19.6046 9.5 18.5 9.5H16.5C15.3954 9.5 14.5 8.60457 14.5 7.5V5.5Z"></path></svg>
                                        <span class="text-[#a8b3cf] font-meduim text-[0.9em]">Dashboard</span>
                                    </a>
                                </button>
                            </li>
                        </ul>
                    </div>
                <?php } else { ?>
                <li>
                    <button type="button" id="buttonLoginHeader"
                            class="py-[5px] px-2 rounded-lg bg-[#F5F8FC] flex items-center ease-in duration-300 border-[1px] border-[#52586633] hover:border-[#525866] hover:shadow-[0 0 10px 0 #525866]">
                        <span class="text-[#525866] font-semibold text-[0.8em]">Login</span>
                    </button>
                </li>
                <li>
                    <button type="button" id="buttonRegisterHeader"
                            class="py-[5px] px-2 rounded-lg bg-[#F5F8FC] flex items-center ease-in duration-300 border-[1px] border-[#52586633] hover:border-[#525866] hover:shadow-[0 0 10px 0 #525866]">
                        <span class="text-[#525866] font-semibold text-[0.8em]">Register</span>
                    </button>
                </li>
            <?php } ?>
            </ul>
        </div>
    </div>
</nav>
