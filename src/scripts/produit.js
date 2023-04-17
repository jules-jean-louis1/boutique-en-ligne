import { loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import {formatDateSansh} from "./function/function.js";

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
}

// Ajout d'un écouteur d'événement sur le document entier pour fermer le menu lors d'un clic à l'extérieur
if (menuProfilHeader) {
document.addEventListener("click", function(event) {
        // Si l'élément cliqué n'est ni le bouton de profil ni le menu
        if (!event.target.closest("#buttonProfilHeader") && !event.target.closest("#menuProfilHeader")) {
            // Ajout de la classe "hidden" sur la liste ul
            menuProfilHeader.classList.add("hidden");
        }
    });
}
// Fonction pour lancer la recherche
async function searchHeader() {
    let query = SearchBarHeader.value;
    if (query.length > 0) {
        await fetch (`src/php/fetch/produit/searchBarProduct.php?query=${query}`)
            .then(response => response.json())
            .then(data => {
                const containerHeaderSearch = document.getElementById("containerSearchBarResultHeader");
                if (data.status === 'error') {
                    containerHeaderSearch.innerHTML = `
                <div class="absolute top-14 transform -translate-y-1/2 w-[50%] mt-1.5 bg-[#2D323C] hover:border-[#A87EE6FF] border-[1px] border-[#a8b3cf33] z-10 rounded-lg">
                    <p class="text-center text-[#a8b3cf] py-2">Aucun résultat</p>
                </div>
                `;
                }
                if (data.status === 'success') {
                    containerHeaderSearch.innerHTML = '';
                    for (const product of data.data) {
                        containerHeaderSearch.innerHTML += `
                    <div class="absolute top-16 transform -translate-y-1/2 w-[50%] mt-1.5 bg-[#2D323C] hover:border-[#A87EE6FF] border-[1px] border-[#a8b3cf33] z-10 rounded-lg">
                        <a href="produit.php?id=${product.id_product}" class="flex flex-row items-center justify-between p-2 ">
                            <div class="flex items-center">
                                <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-10">
                                <div class="flex flex-col items-start ml-2">
                                    <p class="text-white">${product.name_product}</p>
                                    <small class="text-[#a8b3cf]">${product.name_subcategories}</small>
                                </div>
                            </div>
                            <p class="text-sm text-[#a8b3cf]">${product.price_product} €</p>
                        </a>
                    </div>
                    `;
                    }
                }
            });
    } else {
        const containerHeaderSearch = document.getElementById("containerSearchBarResultHeader");
        containerHeaderSearch.innerHTML = '';
    }
}
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
    loginFormHeader(btnLogin);
}


// Produit.js
// Récupérer les elements du DOM
const containerDivProduct = document.getElementById("containerInformationProduits");
// Récupérer l'ID à partir de la query string
const searchParams = new URLSearchParams(window.location.search);
const URLid = searchParams.get("id");

// Récupérer les données du produit
async function getProduct(URLid) {
    const containerProduct = document.createElement("div");
    containerProduct.classList.add("flex", "flex-col", "items-center", "justify-center");
    containerProduct.setAttribute("id", "containerProduct");
    containerDivProduct.appendChild(containerProduct);
    await fetch(`src/php/fetch/produit/getProductById.php?id=${URLid}`)
        .then(response => response.json())
        .then(data => {
            let options = '';
            for (let i = 1; i <= 10; i++) {
                options += `<option value="${i}">${i}</option>`;
            }
            const containerProduct = document.getElementById("containerProduct");
            for (const product of data.data) {
                containerProduct.innerHTML = `
            <div class="bg-[#A87EE6FF] h-[150px] w-9/12">
                <div class="flex flex-row justify-between px-16 py-6">
                    <div>
                        <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-12 rounded-lg">
                    </div>
                    <div class="flex flex-col items-start w-5/12">
                        <p class="text-center text-white rounded-lg p-1 bg-[#00000038]">${product.name_subcategories}</p>
                        <h1 class="text-6xl text-white mt-5 uppercase">${product.name_product}</h1>
                        <p class="mt-5">${product.description_product}</p>
                        <div>
                            <p class="text-[#a8b3cf] mt-2">${product.price_product} €</p>
                            <form action="" method="post" id="formAddToCart">
                                <label for="quantity" class="text-[#a8b3cf] mt-5">Quantité :</label>
                                <input type="hidden" name="id" value="${product.id_product}">
                                <select name="quantity" id="quantity" class="bg-[#2D323C] text-white px-5 py-2 rounded-lg mt-5">
                                    ${options}
                                </select>
                                <button type="submit" class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg mt-5" id="buttonAddToCart">Ajouter au panier</button>
                            </form>
                        </div>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <div class="">
                            <p class="text-[#a8b3cf]">Sortie le :</p>
                            <p class="text-[#a8b3cf] mt-2">${formatDateSansh(product.released_date_product)}</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
                const titlePageProduct = document.querySelector("title");
                titlePageProduct.innerHTML = `${product.name_product}`;
                // Ajouter au panier
                const formAddToCart = document.getElementById("formAddToCart");
                formAddToCart.addEventListener('submit', (ev) => {
                    ev.preventDefault();
                    const id = formAddToCart.querySelector('[name="id"]').value;
                    const quantity = formAddToCart.querySelector('[name="quantity"]').value;
                    addToCart(id, quantity);
                });
            }
            async function addToCart(id, quantity) {
                await fetch(`src/php/fetch/cart/addProductToCart.php?id=${id}&quantity=${quantity}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    });
            }
        });
}
getProduct(URLid);
