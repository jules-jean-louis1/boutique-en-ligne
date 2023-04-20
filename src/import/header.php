
<nav class="py-2 bg-[#0E1217] border-b-[1px] border-b-[#a8b3cf33]">
    <div class="flex items-center justify-around">
        <div>
            <ul class="flex space-x-4 items-center text-white">
                <li>
                    <a href="index.php">Game<b class="text-lg text-[#A87EE6FF] ml-0.5">+</b></a>
                </li>
                <li>
                    <a href="catalogue.php">Catalogue</a>
                </li>
            </ul>
        </div>
        <div class="w-[50%]">
            <div class="group hover:bg-[#464c51] rounded-lg">
                <div id="serachBarFormHeaderContainer" class="flex items-center space-x-2 px-2 py-1 rounded-lg bg-[#2D323C] border-l-4 border-[#a8b3cfa3] hover:border-[#A87EE6FF]">
                    <div class="flex">
                        <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 pointer-events-none reply_svg"><path d="M10 3a7 7 0 016.068 10.492 2.813 2.813 0 012.076.67l.157.147 1.872 1.871a2.823 2.823 0 01-3.852 4.125l-.14-.132-1.872-1.872a2.817 2.817 0 01-.818-2.234A7 7 0 1110 3zm7.24 12.37a1.323 1.323 0 00-1.967 1.763l.096.108 1.872 1.871c.241.242.552.37.868.386h.135l.135-.014a1.324 1.324 0 00.83-2.136l-.097-.107-1.871-1.872zM10 4.5a5.5 5.5 0 00-.221 10.996L10 15.5l.221-.004A5.5 5.5 0 0010 4.5z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                    </div>
                    <form action="" method="post" id="searchBarFormHeader" class="w-full">
                        <input type="text" name="search_bar_form" id="search_bar_form" placeholder="Rechercher un produit" class="w-full bg-[#2D323C] text-[#a8b3cf]">
                    </form>
                </div>
                <div id="containerSearchBarResultHeader"></div>
            </div>
        </div>
        <div>
            <ul class="flex">
                <?php if (isset($_SESSION['id'])) { ?>
                    <div class="flex items-center space-x-4">
                        <div>
                            <a href="cart.php">
                                <button type="button" id="cartHeader"
                                        class="flex items-center rounded-lg bg-[#1C1F26] py-1 px-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" stroke="#a8b3cf" fill="none"
                                         stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 5L4.87153 5.62385C5.56699 5.85566 6.07989 6.44939 6.2082 7.17114L7.30668 13.3501C7.47638 14.3046 8.30628 15 9.2758 15H16.896C17.7868 15 18.5702 14.4109 18.8174 13.5551L20.2619 8.55508C20.6313 7.27618 19.6716 6 18.3404 6H9M10 18.5C10 19.3284 9.32843 20 8.5 20C7.67157 20 7 19.3284 7 18.5C7 17.6716 7.67157 17 8.5 17C9.32843 17 10 17.6716 10 18.5ZM18 18.5C18 19.3284 17.3284 20 16.5 20C15.6716 20 15 19.3284 15 18.5C15 17.6716 15.6716 17 16.5 17C17.3284 17 18 17.6716 18 18.5Z"></path>
                                    </svg>
                                    <span id="notifCartHeader"></span>
                                </button>
                            </a>
                        </div>
                        <div class="relative">
                            <button type="button" id="buttonProfilHeader"
                                    class="py-1 px-2 rounded-lg bg-[#1C1F26] text-white font-semibold flex items-center justify-between">
                                <span id="infoUserNavBar"
                                      class="flex items-center space-x-2"><?= $_SESSION['login'] ?></span>
                            </button>
                            <ul id="menuProfilHeader"
                                class="absolute right-0 w-36 mt-0.5  bg-[#1C1F26] rounded-lg border-[1px] border-[#a8b3cf33] shadow-lg z-10 hidden">
                                <li>
                                    <button type="button" id="buttonLogoutHeader"
                                            class="block hover:bg-[#2D323C] hover:rounded-t-lg flex w-full">
                                        <a href="profil.php"
                                           class="block py-2 px-4 flex items-center justify-between w-full">
                                            <svg width="22" height="22" viewBox="0 0 24 24" stroke="#a8b3cf" fill="none"
                                                 stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.9997 13.5C8.5419 13.5 5.63061 15.84 4.76307 19.0229C4.4726 20.0886 5.39517 21 6.49974 21H17.4997C18.6043 21 19.5269 20.0886 19.2364 19.0229C18.3689 15.84 15.4576 13.5 11.9997 13.5Z"></path>
                                                <path d="M15.4997 7C15.4997 8.933 13.9327 10.5 11.9997 10.5C10.0667 10.5 8.49974 8.933 8.49974 7C8.49974 5.067 10.0667 3.5 11.9997 3.5C13.9327 3.5 15.4997 5.067 15.4997 7Z"></path>
                                            </svg>
                                            <span class="text-[#a8b3cf] font-meduim text-[0.9em]">Votre profil</span>
                                        </a>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" id="buttonLogoutHeader"
                                            class="block hover:bg-[#2D323C] flex w-full">
                                        <a href="deconnexion.php"
                                           class="block py-2 px-4 flex items-center justify-between w-full">
                                            <svg width="22" height="22" viewBox="0 0 24 24" stroke="#a8b3cf" fill="none"
                                                 stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.00019 7H5.50004M7.00019 7H8.50004M7.00019 7V13.5M12.0003 17V21M12.0003 17H10.5M12.0003 17C14.7619 17 17.0005 14.7613 17.0005 11.9998V10.5M8.50004 7L8.49985 3M8.50004 7H13.5M15.4999 5L15.4998 3M5 19L19 5"></path>
                                            </svg>
                                            <span class="text-[#a8b3cf] font-meduim text-[0.9em]">Déconnexion</span>
                                        </a>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" id="buttonLogoutHeader"
                                            class="block hover:bg-[#2D323C] hover:rounded-b-lg flex w-full">
                                        <a href="dashboard.php"
                                           class="block py-2 px-4 flex items-center justify-between w-full">
                                            <svg width="22" height="22" viewBox="0 0 24 24" stroke="#a8b3cf" fill="none"
                                                 stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.5 16.5C3.5 15.3954 4.39543 14.5 5.5 14.5H7.5C8.60457 14.5 9.5 15.3954 9.5 16.5V18.5C9.5 19.6046 8.60457 20.5 7.5 20.5H5.5C4.39543 20.5 3.5 19.6046 3.5 18.5V16.5Z"></path>
                                                <path d="M14.5 16.5C14.5 15.3954 15.3954 14.5 16.5 14.5H18.5C19.6046 14.5 20.5 15.3954 20.5 16.5V18.5C20.5 19.6046 19.6046 20.5 18.5 20.5H16.5C15.3954 20.5 14.5 19.6046 14.5 18.5V16.5Z"></path>
                                                <path d="M3.5 5.5C3.5 4.39543 4.39543 3.5 5.5 3.5H7.5C8.60457 3.5 9.5 4.39543 9.5 5.5V7.5C9.5 8.60457 8.60457 9.5 7.5 9.5H5.5C4.39543 9.5 3.5 8.60457 3.5 7.5V5.5Z"></path>
                                                <path d="M14.5 5.5C14.5 4.39543 15.3954 3.5 16.5 3.5H18.5C19.6046 3.5 20.5 4.39543 20.5 5.5V7.5C20.5 8.60457 19.6046 9.5 18.5 9.5H16.5C15.3954 9.5 14.5 8.60457 14.5 7.5V5.5Z"></path>
                                            </svg>
                                            <span class="text-[#a8b3cf] font-meduim text-[0.9em]">Dashboard</span>
                                        </a>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                <?php } else { ?>
                    <div class="flex items-center space-x-2">
                        <li>
                            <div>
                                <a href="cart.php">
                                    <button type="button" id="cartHeader"
                                            class="flex items-center rounded-lg bg-[#1C1F26] py-1 px-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" stroke="#a8b3cf" fill="none"
                                             stroke-linejoin="round" stroke-width="1.5" stroke-linecap="round"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 5L4.87153 5.62385C5.56699 5.85566 6.07989 6.44939 6.2082 7.17114L7.30668 13.3501C7.47638 14.3046 8.30628 15 9.2758 15H16.896C17.7868 15 18.5702 14.4109 18.8174 13.5551L20.2619 8.55508C20.6313 7.27618 19.6716 6 18.3404 6H9M10 18.5C10 19.3284 9.32843 20 8.5 20C7.67157 20 7 19.3284 7 18.5C7 17.6716 7.67157 17 8.5 17C9.32843 17 10 17.6716 10 18.5ZM18 18.5C18 19.3284 17.3284 20 16.5 20C15.6716 20 15 19.3284 15 18.5C15 17.6716 15.6716 17 16.5 17C17.3284 17 18 17.6716 18 18.5Z"></path>
                                        </svg>
                                        <span id="notifCartHeader"></span>
                                    </button>
                                </a>
                            </div>
                        </li>
                        <li>
                            <button type="button" id="buttonLoginHeader"
                                    class="py-[5px] px-2 rounded-lg bg-[#1C1F26] flex items-center ease-in duration-300 border-[1px] border-[#a8b3cf33]">
                                <span class="text-[#a8b3cf] font-meduim text-[0.8em]">Connexion</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" id="buttonRegisterHeader"
                                    class="py-[5px] px-2 rounded-lg bg-[#A87EE6FF] flex items-center ease-in duration-300 border-[1px] border-[#52586633] hover:border-[#525866] hover:shadow-[0 0 10px 0 #525866]">
                                <span class="text-[#fff] font-semibold text-[0.8em]">S'inscrire</span>
                            </button>
                        </li>
                    </div>
            <?php } ?>
            </ul>
        </div>
    </div>
</nav>
