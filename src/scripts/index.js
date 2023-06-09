import { displayError} from './function/function.js';
import { displaySuccess} from './function/function.js';
import {Login} from './function/function.js';
import { loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import {cartHeader} from './function/function.js';
import {searchHeader} from './function/function.js';

const btnRegister = document.querySelector('#buttonRegisterHeader');
const btnLogin = document.querySelector('#buttonLoginHeader');
const buttonProfilHeader = document.getElementById("buttonProfilHeader");
const menuProfilHeader = document.getElementById("menuProfilHeader");
const profilInfoHeader = document.getElementById("infoUserNavBar");
const SearchBarHeader = document.querySelector("#search_bar_form");
const FormSearchBarHeader = document.getElementById("searchBarFormHeader");

// Ajout d'un écouteur d'événement sur le clic du bouton
if (buttonProfilHeader) {
    buttonProfilHeader.addEventListener("click", function(event) {
        // Empêche la propagation de l'événement pour éviter la fermeture immédiate du menu
        event.stopPropagation();
        // Ajout ou suppression de la classe "hidden" sur la liste ul
        menuProfilHeader.classList.toggle("hidden");
    });

// Ajout d'un écouteur d'événement sur le document entier pour fermer le menu lors d'un clic à l'extérieur
    document.addEventListener("click", function(event) {
        // Si l'élément cliqué n'est ni le bouton de profil ni le menu
        if (!event.target.closest("#buttonProfilHeader") && !event.target.closest("#menuProfilHeader")) {
            // Ajout de la classe "hidden" sur la liste ul
            menuProfilHeader.classList.add("hidden");
        }
    });
}
cartHeader();
// Fonction pour lancer la recherche

// Fonction pour afficher les infos de l'utilisateur dans le header
async function displayUserInfoHeader() {
    await fetch('src/php/fetch/client/displayUserById.php')
        .then(response => response.json())
        .then(data => {
            for (const user of data) {
            profilInfoHeader.innerHTML = `
            <p>${user.login_users}</p>
            <img src="src/images/avatars/${user.avatar_users}" alt="${user.avatar_users}" class="h-6 rounded-full">
            `;
            }
        });
}
FormSearchBarHeader.addEventListener('keyup', (ev) => {
    ev.preventDefault();
    searchHeader();
});
if (profilInfoHeader) {
    displayUserInfoHeader();
}
if (btnRegister) {
    registerHeader(btnRegister);
}
if (btnLogin) {
    Login(btnLogin);
}

// Index.js

const sectionHeader = document.querySelector('#background_img_banner');
const sectionProduct = document.querySelector('#containerProduits');
const sectionCategories = document.querySelector('#displayCategories');
const sectionAvis = document.querySelector('#lastAvisClient');
const containerMessageCart = document.getElementById('containerMessageCart');
async function displayBanner() {
    await fetch('src/php/fetch/produit/displayLastProduct.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Tri du tableau par ordre décroissant de date de sortie
            data.lastProduct.sort((a, b) => new Date(b.released_date_product) - new Date(a.released_date_product));
            // Récupération du premier élément du tableau trié (celui avec la date la plus récente)
            const newestProduct = data.lastProduct[0];
            for (let product of data.lastProduct) {
                sectionHeader.innerHTML = `
                <div class="flex flex-col justify-center h-fit relative z-5">
                <div class="flex flex-col justify-center h-fit relative z-5">
                    <img src="public/images/produits/${newestProduct.name_img}" alt="${newestProduct.name_product}" class="max-h-[450px] object-cover relative">
                    <div class="absolute lg:w-1/4 w-1/3 lg:h-1/3 h-1/2 p-2 left-[21%] flex flex-col justify-around items-center">
                    <div class="rounded-lg absolute top-0 left-0 right-0 bottom-0"></div>
                    <a href="produit.php?id=${newestProduct.id_product}" class="flex flex-col justify-start items-end">
                        <h1 class="text-4xl font-semibold text-white relative z-10 uppercase text-shadow-lg">${newestProduct.name_product}</h1>
                        <div class="flex justify-end w-9/12">
                            <p class="text-white text-5xl w-fit font-bold relative z-10 text-shadow-sm">${newestProduct.price_product} €</p>
                        </div>
                    </a>
                    </div>
                    </div>
                </div>`;
            }
            for (let product of data.lastProduct) {
                sectionProduct.innerHTML += `
                <div id="itemsProductContainer" class="w-60 flex justify-center mx-2">
                            <a href="produit.php?id=${product.id_product}">
                            <div id="wapperProduct" class="p-4">
                                <div id="itemsImgProduct">
                                    <div id="priceProduct" class="absolute mt-2 ml-2 rounded-full text-white bg-slate-900/90 w-fit p-1">
                                        <p>${product.price_product}€</p>
                                    </div>
                                    <img src="src/images/products/${product.img_product}" alt="${product.name_product}" class="rounded-lg h-fit lg:h-72">
                                </div>
                                <div id="TitleProduct" class="flex items-center w-full justify-between">
                                    <div id="containerTitleProduct" class="flex flex-col items-start">
                                        <p class="font-bold text-white">${product.name_product}</p>
                                        <p class="font-light text-[#a8b3cf]">${product.name_subcategories}</p>
                                    </div>
                                    <div id="containerButtonAddToCart">
                                        <form action="" method="post" id="formAddToCart_${product.id_product}">
                                            <input type="hidden" name="id_product" value="${product.id_product}">
                                            <input type="hidden" name="name_product" value="${product.name_product}">
                                            <button id="buttonAddToCart_${product.id_product}" class="text-white rounded-full" type="submit">
                                                <svg width="40" height="40" viewBox="0 0 24 24" stroke="#a87ee6" fill="none" stroke-linejoin="round" stroke-width="1.105263157894737" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M6.99999 12H12M12 12H17M12 12V6.99999M12 12V17M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z"></path></svg>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            </a>
                        </div>
                    `;
            }
            for (let product of data.lastProduct) {
                const formAddToCart = document.getElementById(`formAddToCart_${product.id_product}`);
                formAddToCart.addEventListener('click', async (ev) => {
                    ev.preventDefault();
                    await fetch(`src/php/fetch/cart/addProductToCart.php?id=${product.id_product}&name=${product.name_product}&quantity=1`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.status == 'success') {
                                const diaog = document.createElement("dialog");
                                diaog.setAttribute('class','fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-transparent');
                                diaog.setAttribute('open', '');
                                diaog.innerHTML = `
                                        <div class="w-full flex items-center py-3 px-2 space-x-3 bg-opacity-50 backdrop-filter backdrop-blur-lg hover:bg-opacity-75 hover:saturate-100 rounded-[14px] bg-[#cbf4f0] text-[#000] border-l-[3px] border-[#23a094]">
                                            <svg width="25" height="25" viewBox="0 0 24 24" stroke="#23a094" fill="#fff" class="p-0.5 bg-white items-center rounded-full" stroke-linejoin="round" stroke-width="1.736842105263158" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M16.253 10.1109L11.8891 14.4749C11.4986 14.8654 10.8654 14.8654 10.4749 14.4749L7.99999 12M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"></path></svg>
                                            <small class="text-lg">Produit ajouté au panier</small>
                                        </div>
                                        `;
                                containerMessageCart.appendChild(diaog);
                                setTimeout(() => {
                                    containerMessageCart.innerHTML = '';
                                }, 2500);
                                cartHeader();
                            }
                        });
                });
            }
        });
}
async function displayCategories() {
    await fetch('src/php/fetch/category/categoriesIndex.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let category of data.cat) {
                sectionCategories.innerHTML += `
                <div id="itemsCatContainer" class="card w-60 flex justify-center m-2 rounded-[14px]">  
                    <div class="card-content flex items-center">  
                        <a href="catalogue.php?categorie=${category.id_categories}">  
                        <div id="wapperCat" class="p-4">  
                            <h2 class="card-title font-bold text-white">${category.name_categories}</h2>  
                            <h4 class="card-subtitle"></h4>  
                        </div>  
                        </a>  
                    </div>  
                </div>
                `;
            }
        });
}
async function displayAvis() {
    const response = await fetch('src/php/fetch/avis/displayLastAvis.php')
    const data = await response.json();
    console.log(data);
    const containerAvis = document.getElementById('lastAvisClient');
    for (let avis of data.lastAvis) {
        const maxLength = 35; // Longueur maximale du contenu de l'avis
        let truncatedContent = avis.content; // Contenu de l'avis initial
        // Vérifier la longueur du contenu de l'avis
        if (avis.content.length > maxLength) {
            // Si la longueur dépasse la limite, raccourcir le contenu et ajouter "..."
            truncatedContent = avis.content.substring(0, maxLength) + "...";
        }
        containerAvis.innerHTML += `
    <div class="flex flex-col justify-between bg-[#2d323c] rounded-[14px] p-2 w-60">
        <div class="flex space-x-2 items-center justify-start">
            <img src="src/images/avatars/${avis.avatar_users}" alt="avatar_${avis.avatar_users}" class="w-8 h-8 rounded-full">
            <p class="text-white">${avis.login_users}</p>
        </div>
        <p class="text-white text-lg">${avis.title_comment}</p>
        <p class="ml-6 text-[#a8b3cf] font-light">${truncatedContent}</p>
        <p class="flex items-end text-sm font-light text-white">${avis.name_product}</p>
    </div>
    `;
    }

}

const btnBurgerMenu = document.getElementById('btnBurgerMenu');
if (btnBurgerMenu) {
    btnBurgerMenu.addEventListener('click', () => {
        const menuMobile = document.getElementById('menuMobile');
        menuMobile.classList.toggle('hidden');
    });
}
displayBanner();
displayCategories();
displayAvis();
