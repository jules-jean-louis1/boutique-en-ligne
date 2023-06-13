import { displayError} from './function/function.js';
import { displaySuccess} from './function/function.js';
import {Login} from './function/function.js';
import { loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import {cartHeader} from './function/function.js';

const btnRegister = document.querySelector('#buttonRegisterHeader');
const btnLogin = document.querySelector('#buttonLoginHeader');
const buttonProfilHeader = document.getElementById("buttonProfilHeader");
const menuProfilHeader = document.getElementById("menuProfilHeader");
const profilInfoHeader = document.getElementById("infoUserNavBar");
const SearchBarHeader = document.getElementById("search_bar_form");
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
//cartHeader();
// Fonction pour lancer la recherche
async function searchHeader() {
    let query = SearchBarHeader.value;
    if (query.length > 0) {
        await fetch (`${window.location.origin}/wellgames/search/${query}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const containerHeaderSearch = document.getElementById("containerSearchBarResultHeader");
                containerHeaderSearch.innerHTML = '';
                if (data.items) {
                    for (const product of data.items) {
                        containerHeaderSearch.innerHTML += `
                            <div class="transform -translate-y-1/2 w-[50%] bg-[#2D323C] hover:border-[#A87EE6FF] border-[1px] border-[#a8b3cf33] z-10 rounded-lg">
                                <a href="${window.location.origin}/wellgames/product/${product.id}" class="flex flex-row items-center justify-between p-2">
                                    <div class="flex items-center">
                                        <img src="${product.tiny_image}" alt="${product.img_product}" class="h-10">
                                        <div class="flex flex-col items-start ml-2">
                                            <p class="text-white">${product.name}</p>
                                            <div id="containerCategory"></div>
                                        </div>
                                    </div>
                                    <div id="priceContainerSearch-${product.id}" class="text-white font-bold"></div>
                                </a>
                            </div>
                        `;
                        const priceContainerSearch = document.getElementById(`priceContainerSearch-${product.id}`);
                        if (product.price) {
                            const priceProduct = (product.price.final / 100).toLocaleString("fr-FR", {
                                style: "currency",
                                currency: "EUR"
                            });
                            priceContainerSearch.innerHTML = priceProduct;
                        }
                    }
                } else {
                    containerHeaderSearch.innerHTML = `
                    <div class="top-14 transform -translate-y-1/2 w-[50%] mt-1.5 bg-[#2D323C] hover:border-[#A87EE6FF] border-[1px] border-[#a8b3cf33] z-10 rounded-lg">
                        <p class="text-center text-[#a8b3cf] py-2">Aucun résultat</p>
                    </div>
                `;
                }
            });
    } else {
        const containerHeaderSearch = document.getElementById("containerSearchBarResultHeader");
        containerHeaderSearch.innerHTML = '';
    }
}
// Fonction pour afficher les infos de l'utilisateur dans le header
async function displayUserInfoHeader() {
    await fetch(`${window.location.origin}/wellgames/headerInfo`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            profilInfoHeader.innerHTML = `
            <p>${data.login_users}</p>
            <img src="${window.location.origin}/wellgames/public/images/avatars/${data.avatar_users}" alt="${data.avatar_users}" class="h-6 rounded-full">
            `;
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

// Product page
function getID(){
    let currentURL = window.location.href;
    let segments = currentURL.split('/');
    let id = segments[segments.length - 1];
    return id;
}
let idProduct = new URLSearchParams(window.location.search).get('id');
console.log(idProduct);
async function displayProduct(id){
    await fetch(`${window.location.origin}/wellgames/product/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}
function displayMoreTags(){
// Récupération des éléments HTML
    const showAllCategoriesButton = document.getElementById('showAllCategories');
    const categoryElements = document.querySelectorAll('#containerCategories span');

// Vérification du nombre de catégories
    if (categoryElements.length > 4) {
        // Masquage des catégories supplémentaires
        for (let i = 4; i < categoryElements.length; i++) {
            categoryElements[i].classList.add('hidden');
        }

        // Ajout d'un gestionnaire d'événements au bouton "Voir plus"
        showAllCategoriesButton.addEventListener('click', function() {
            // Affichage ou masquage des catégories supplémentaires
            for (var i = 4; i < categoryElements.length; i++) {
                categoryElements[i].classList.toggle('hidden');
            }

            // Changement de texte du bouton en fonction de l'état actuel
            if (showAllCategoriesButton.textContent === 'Voir plus') {
                showAllCategoriesButton.textContent = 'Voir moins';
            } else {
                showAllCategoriesButton.textContent = 'Voir plus';
            }
        });
    }
}
async function addProductToCart(){
    let id = getID(); // Appel de la fonction getID() pour récupérer l'ID
    await fetch(`${window.location.origin}/wellgames/product/addToCart/${id}`,{
        method: 'POST',
        body: new FormData(btnAddToCart)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}
const btnAddToCart = document.getElementById('addToCart');
btnAddToCart.addEventListener('submit', (ev) => {
    ev.preventDefault();
    addProductToCart();
});
displayMoreTags();
