import { loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import {formatDateSansh} from "./function/function.js";
import { displaySuccessMessageFormUpdateProduct } from './function/function.js';
import { messagePopup } from "./function/function.js";

const btnRegister = document.querySelector('#buttonRegisterHeader');
const btnLogin = document.querySelector('#buttonLoginHeader');
const buttonProfilHeader = document.getElementById("buttonProfilHeader");
const menuProfilHeader = document.getElementById("menuProfilHeader");
const profilInfoHeader = document.getElementById("infoUserNavBar");
const SearchBarHeader = document.getElementById("search_bar_form");
const FormSearchBarHeader = document.getElementById("searchBarFormHeader");
const containerMessageCart = document.getElementById("containerMessageAddCart");

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
            const titlePageCart = document.querySelector('title');
            titlePageCart.innerHTML = `Panier - ${data[0].login_users}`;
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


// Cart.js

// Récupérer les données du produit
async function cartHeader() {
    const cartButtonHeader = document.getElementById("cartHeader");
    const notifCartHeader = document.getElementById("notifCartHeader");
    await fetch('src/php/fetch/cart/displayCartInfoHeader.php')
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success_not_connected') {
                const total = data.total;
                const nbProduits = data.countProducts;
                notifCartHeader.innerHTML = `
                    <p class="absolute rounded-full bg-[#A87EE6FF] px-1">
                        <span class="text-white text-xs">${nbProduits}</span>
                    </p>
                `;

                const cartDivHeader = document.createElement("dialog");
                cartDivHeader.setAttribute('class', 'absolute top-[17%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-80 rounded-lg shadow-lg');
                cartDivHeader.setAttribute('id', 'cartDivHeader');

                cartDivHeader.innerHTML = '';
                cartButtonHeader.addEventListener('mouseenter', () => {
                    cartDivHeader.setAttribute('open', '');
                    cartDivHeader.innerHTML = `
                    <div class="flex flex-col items-around space-y-2">
                        <div class="mt-2">
                            <p class="text-[#a8b3cf]">Total : ${total} €</p>
                        </div>
                        <div id="containerCartHeader"></div>
                        <div class="h-10 flex items-center justify-center pb-2">
                            <a href="cart.php" class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg">Voir le panier</a>
                        </div>
                    </div>
                    `;

                    const containerCartHeader = document.getElementById("containerCartHeader");
                    for (const product of data.products) {
                        containerCartHeader.innerHTML += `
                        <div class="flex flex-row justify-between px-5 py-3 border-b-[1px] border-[#e5e7eb]">
                            <div class="flex flex-row items-center">
                                <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-12 rounded-lg">
                                <p class="text-[#a8b3cf] ml-5">${product.name_product}</p>
                            </div>
                            <div class="flex flex-col items-start">
                                <p class="text-[#a8b3cf] text-2xl">${product.price_product} €</p>
                                <p class="text-[#a8b3cf] text-sm">Quantité :${product.quantity_product}</p>
                            </div>
                        </div>
                        `;
                    }

                });
                cartButtonHeader.appendChild(cartDivHeader);
                cartButtonHeader.addEventListener('mouseleave', () => {
                    cartDivHeader.removeAttribute('open');
                    cartDivHeader.innerHTML = '';
                });

            }
            if (data.status == 'success_connected') {
                const total = data.total;
                const nbProduits = data.countProducts;
                notifCartHeader.innerHTML = `
                    <p class="absolute rounded-full bg-[#A87EE6FF] px-1">
                        <span class="text-white text-xs">${nbProduits}</span>
                    </p>
                `;
                const cartDivHeader = document.createElement("dialog");
                cartDivHeader.setAttribute('class', 'absolute top-[17%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-80 rounded-lg shadow-lg');
                cartDivHeader.setAttribute('id', 'cartDivHeader');

                cartButtonHeader.addEventListener('mouseenter', () => {
                    cartDivHeader.setAttribute('open', '');
                    cartDivHeader.innerHTML = `
                    <div class="flex flex-col items-around space-y-2">
                        <div class="mt-2">
                            <p class="text-[#a8b3cf]">Total : ${total} €</p>
                        </div>
                        <div id="containerCartHeader"></div>
                        <div class="h-10 flex items-center justify-center pb-2">
                            <a href="cart.php" class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg">Voir le panier</a>
                        </div>
                    </div>
                    `;
                    const containerCartHeader = document.getElementById("containerCartHeader");
                    for (const product of data.products) {
                        containerCartHeader.innerHTML += `
                        <div class="flex flex-row justify-between px-5 py-3 border-b-[1px] border-[#e5e7eb]">
                            <div class="flex flex-row items-center">
                                <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-12 rounded-lg">
                                <p class="text-[#a8b3cf] ml-5">${product.name_product}</p>
                            </div>
                            <div class="flex flex-col items-start">
                                <p class="text-[#a8b3cf] text-2xl">${product.price_product} €</p>
                                <p class="text-[#a8b3cf] text-sm">Quantité :${product.quantity_product}</p>
                            </div>
                        </div>
                        `;
                    }
                });
                cartButtonHeader.appendChild(cartDivHeader);
                cartButtonHeader.addEventListener('mouseleave', () => {
                    cartDivHeader.removeAttribute('open');
                    cartDivHeader.innerHTML = '';
                });
            }
            if (data.status == 'error') {
                notifCartHeader.innerHTML = '';
                const cartDivHeader = document.createElement("dialog");
                cartDivHeader.setAttribute('class', 'absolute top-[17%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-80 rounded-lg shadow-lg');
                cartDivHeader.setAttribute('id', 'cartDivHeader');

                cartDivHeader.addEventListener('mouseenter', () => {
                    cartDivHeader.setAttribute('open', '');
                    cartDivHeader.innerHTML = `
                    <div class="flex flex-col items-center space-y-2">
                        <div class="mt-2">
                            <p class="text-[#a8b3cf]">Votre panier est vide</p>
                        </div>
                    </div>
                    `;
                });
                cartButtonHeader.appendChild(cartDivHeader);
                cartButtonHeader.addEventListener('mouseleave', () => {
                    cartDivHeader.removeAttribute('open');
                    cartDivHeader.innerHTML = '';
                });
            }
        });
}

cartHeader();




// Page cart.php
async function getCart() {
    const containerCart = document.getElementById("containerCart");
    await fetch('src/php/fetch/cart/getCart.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            containerCart.innerHTML = '';
            if (data.status == 'success') {
                const total = data.total;
                const nbProduits = data.countProducts;
                containerCart.innerHTML = `
                    <div class="flex flex-col items-center space-y-2 w-full">
                        <div class="flex flex-row items-center justify-between w-9/12">
                            <div id="total_items_cart">
                                <p class="text-[#a8b3cf]">Vous avez ${nbProduits} articles dans votre panier</p>
                            </div>
                            <div id="total_prix">
                                <p class="text-[#a8b3cf]">Total : ${total} €</p>
                            </div>
                        </div>
                        <div id="displayproductsInCart" class=" w-9/12"></div>
                    </div>
                    <div id="containerBtnLoginSigin"></div>
                `;
                const displayproductsInCart = document.getElementById("displayproductsInCart");
                for (const product of data.products) {
                    displayproductsInCart.innerHTML += `
                    <div class="flex flex-row items-center justify-between px-5 py-3 border-b-[1px] border-[#e5e7eb]">
                        <div class="flex flex-row items-center">
                            <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-12 rounded-lg">
                            <p class="text-[#a8b3cf] ml-5">${product.name_product}</p>
                        </div>
                        <div class="flex flex-col items-center">
                            <p class="text-[#a8b3cf] text-2xl">${product.price_product} €</p>
                            <p class="text-[#a8b3cf] text-sm">Quantité :${product.quantity_product}</p>
                        </div>
                        <div id="actionOnProduct" class="flex justify-end space-x-2">
                            <form action="" method="POST" id="formModifyProduct_${product.id_product}" class="flex flex-row items-center space-x-0.5">
                                <input type="hidden" name="id_product" value="${product.id_product}">
                                <input type="number" name="quantity_product" id="quantity_product" class="bg-[#000] text-white p-2 rounded-lg w-[55px]" min="1" max="${product.quantite_product}" value="${product.quantity_product}">
                                <button class="bg-[#ce3df3] text-white px-5 py-2 rounded-lg font-bold" type="submit" id="modifyProduct_${product.id_product}" data-id-cat="${product.id_product}">
                                    Modifier
                                </button>
                            </form>
                            <button class="bg-[#e04337] text-white px-5 py-2 rounded-lg font-extrabold" id="deleteProduct_${product.id_product}" data-id-cat="${product.id_product}">Supprimer</button>
                        </div>
                    </div>
                    `;
                }
                for ( const product of data.products) {
                    const btnDeleteProduct = document.querySelector(`#deleteProduct_${product.id_product}`);
                    btnDeleteProduct.addEventListener('click', async (ev) => {
                        ev.preventDefault();
                        await fetch(`src/php/fetch/cart/deleteProductFormCart.php?id_product=${product.id_product}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                if (data.status == 'success') {
                                    getCart();
                                    cartHeader();
                                    messagePopup('Votre produit a bien été supprimé', 'success');
                                }
                            });
                    });
                    const formModifyProduct = document.querySelector(`#formModifyProduct_${product.id_product}`);
                    formModifyProduct.addEventListener('submit', async (ev) => {
                        ev.preventDefault();
                        const formData = new FormData(formModifyProduct);
                        const quantity_product = formData.get('quantity_product');
                        await fetch(`src/php/fetch/cart/modifyProduct.php?id_product=${product.id_product}&quantity_product=${quantity_product}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                if (data.status == 'success') {
                                    getCart();
                                    cartHeader();
                                    messagePopup('Votre produit a bien été modifié', 'success');
                                }
                                if (data.status == 'error') {
                                    messagePopup('Quantité invalide', 'error');
                                }
                            });
                    });
                }
            }
            if (data.status == 'success_not_connected') {
                const total = data.total;
                const nbProduits = data.countProducts;
                containerCart.innerHTML = `
                    <div class="flex flex-col items-center space-y-2 w-full">
                        <div class="flex flex-row items-center justify-between w-9/12">
                            <div id="total_items_cart">
                                <p class="text-[#a8b3cf]">Vous avez ${nbProduits} articles dans votre panier</p>
                            </div>
                            <div id="total_prix">
                                <p class="text-[#a8b3cf]">Total : ${total} €</p>
                            </div>
                        </div>
                        <div id="displayproductsInCart" class="w-9/12"></div>
                    </div>
                    <div id="containerBtnLoginSigin"></div>
                `;
                const displayproductsInCart = document.getElementById("displayproductsInCart");
                for (const product of data.products) {
                    displayproductsInCart.innerHTML += `
                    <div class="flex flex-row items-center justify-between px-5 py-3 border-b-[1px] border-[#e5e7eb]">
                        <div class="flex flex-row items-center">
                            <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-12 rounded-lg">
                            <p class="text-[#a8b3cf] ml-5">${product.name_product}</p>
                        </div>
                        <div class="flex flex-col items-center">
                            <p class="text-[#a8b3cf] text-2xl">${product.price_product} €</p>
                            <p class="text-[#a8b3cf] text-sm">Quantité :${product.quantity_product}</p>
                        </div>
                        <div id="actionOnProduct" class="flex justify-end space-x-2">
                            <form action="" method="POST" id="formModifyProduct_${product.id_product}" class="flex flex-row items-center space-x-0.5">
                                <input type="hidden" name="id_product" value="${product.id_product}">
                                <input type="number" name="quantity_product" id="quantity_product" class="bg-[#000] text-white p-2 rounded-lg w-[55px]" min="1" max="${product.quantite_product}" value="${product.quantity_product}">
                                <button class="bg-[#ce3df3] text-white px-5 py-2 rounded-lg font-bold" type="submit" id="modifyProduct_${product.id_product}" data-id-cat="${product.id_product}">
                                    Modifier
                                </button>
                            </form>
                            <button class="bg-[#e04337] text-white px-5 py-2 rounded-lg font-extrabold" id="deleteProduct_${product.id_product}" data-id-cat="${product.id_product}">Supprimer</button>
                        </div>
                    </div>
                    `;
                }
                for ( const product of data.products) {
                    const btnDeleteProduct = document.querySelector(`#deleteProduct_${product.id_product}`);
                    btnDeleteProduct.addEventListener('click', async (ev) => {
                        ev.preventDefault();
                        await fetch(`src/php/fetch/cart/deleteProductFormCart.php?id_product=${product.id_product}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                if (data.status == 'success') {
                                    getCart();
                                    cartHeader();
                                    messagePopup('Votre produit a bien été supprimé', 'success');
                                }
                            });
                    });
                    const formModifyProduct = document.querySelector(`#formModifyProduct_${product.id_product}`);
                    formModifyProduct.addEventListener('submit', async (ev) => {
                        ev.preventDefault();
                        const formData = new FormData(formModifyProduct);
                        const quantity_product = formData.get('quantity_product');
                        await fetch(`src/php/fetch/cart/modifyProduct.php?id_product=${product.id_product}&quantity_product=${quantity_product}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                if (data.status == 'success') {
                                    getCart();
                                    cartHeader();
                                    messagePopup('Votre produit a bien été modifié', 'success');
                                }
                                if (data.status == 'error') {
                                    messagePopup('Quantité invalide', 'error');
                                }
                            });
                    });
                }
                const containerBtnLogin = document.getElementById("containerBtnLogin");
                if (total > 0) {
                    containerBtnLogin.innerHTML = `
                        <a href="login.php" class="bg-[#ce3df3] text-white px-5 py-2 rounded-lg font-bold">Se connecter pour commander</a>
                    `;
                } else {
                    containerBtnLogin.innerHTML = `
                        <a href="login.php" class="bg-[#ce3df3] text-white px-5 py-2 rounded-lg font-bold">Se connecter</a>
                    `;
                }
            }
            if (data.status == 'error') {
                containerCart.innerHTML = `
                    <div class="flex flex-col items-center space-y-2 w-full">
                        <div class="flex flex-row items-center justify-between w-9/12">
                            <div id="total_items_cart">
                                <p class="text-[#a8b3cf]">Vous avez 0 articles dans votre panier</p>
                            </div>
                            <div id="total_prix">
                                <p class="text-[#a8b3cf]">Total : 0 €</p>
                            </div>
                        </div>
                        <div id="displayproductsInCart" class=" w-9/12">
                            <p class="text-[#a8b3cf]">Votre panier est vide</p>
                        </div>
                    </div>
                    <div id="containerBtnLoginSigin" class="flex justify-center space-x-4">
                        <button class="bg-[#ce3df3] text-white px-5 py-2 rounded-lg font-bold" id="btnLoginCart">Se connecter</button>
                        <button class="bg-[#e04337] text-white px-5 py-2 rounded-lg font-extrabold" id="btnSigninCart">S'inscrire</button>
                    </div>
                `;
                const btnLoginCart = document.getElementById("btnLoginCart");
                btnLoginCart.addEventListener('click', (ev) => {
                    loginFormHeader(btnLoginCart);
                });
                const btnSigninCart = document.getElementById("btnSigninCart");
                btnSigninCart.addEventListener('click', (ev) => {
                    registerHeader(btnSigninCart);
                });
            }
        });
}
getCart();
