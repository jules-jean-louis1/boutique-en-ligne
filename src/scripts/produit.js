import {displayErrorMessageFormUpdateProduct, loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import {formatDate} from './function/function.js';
import {formatDateSansh} from "./function/function.js";
import { displaySuccessMessageFormUpdateProduct } from './function/function.js';
import {Login} from "./function/function.js";

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
let UserAvatar = '';
let UserLogin = '';

if (profilInfoHeader) {
    async function displayUserInfoHeader() {
        const response = await fetch('src/php/fetch/client/displayUserById.php');
        const data = await response.json();

        for (const user of data) {
            profilInfoHeader.innerHTML = `
                <p>${user.login_users}</p>
                <img src="src/images/avatars/${user.avatar_users}" alt="${user.avatar_users}" class="h-6 rounded-full">
            `;
            UserAvatar = user.avatar_users;
            UserLogin = user.login_users;
        }
    }

    await displayUserInfoHeader();
}


if (btnRegister) {
    registerHeader(btnRegister);
}
if (btnLogin) {
    Login(btnLogin);
}


// Produit.js
// Récupérer les elements du DOM
const containerDivProduct = document.getElementById("containerInformationProduits");
// Récupérer l'ID à partir de la query string
const searchParams = new URLSearchParams(window.location.search);
let URLid = searchParams.get("id");

// Afficher les étoiles
function afficherEtoiles(note) {
    let nbEtoiles = 5;
    let str = "";
    for (let i = 1; i <= nbEtoiles; i++) {
        if (i <= note) {
            str += "<i class='fas fa-star'></i>"; // étoile pleine
        } else {
            str += "<i class='far fa-star'></i>"; // étoile vide
        }
    }
    return str;
}

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
            <div class="lg:w-full xl:w-9/12 border-[1px] border-[#a8b3cf33] rounded-lg">
                <div class="bg-[#A87EE6FF] flex xl:flex-row flex-col items-center xl:justify-between justify-center rounded-[14px]  xl:px-16 xl:py-6 p-1">
                    <div class="h-fit">
                        <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="xl:h-96 rounded-[14px] h-80">
                    </div>
                    <div class="flex flex-col xl:items-start items-center lg:w-5/12 sm:w-[95%]">
                        <p class="text-center text-white rounded-lg p-1 bg-[#00000038] xl:block hidden">${product.name_subcategories}</p>
                        <h1 class="text-6xl text-white xl:mt-5 mt-1 uppercase font-bold">${product.name_product}</h1>
                        <p class="text-[#a8b3cf] mt-5">${afficherEtoiles(product.rating_product)}</p>
                        <p class="mt-5 text-black font-xl">À propos du jeu</p>
                        <p class="text-white xl:text-start text-center">${product.description_product}</p>
                        <div>
                            <p class="text-white mt-2 font-bold text-6xl  xl:text-start text-center" id="price_product">${product.price_product} €</p>
                            <div id="containerFormAddProductToCart">
                                <form action="" method="post" id="formAddToCart">
                                    <input type="hidden" name="id" value="${product.id_product}">
                                    <input type="hidden" name="name" value="${product.name_product}">
                                    <select name="quantity" id="quantity" class="bg-[#2D323C] text-white px-5 py-2 rounded-lg mt-5">
                                        ${options}
                                    </select>
                                    <button type="submit" class="text-[#A87EE6FF] bg-white px-5 py-2 rounded-lg mt-5" id="buttonAddToCart">Ajouter au panier</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <div class="xl:block hidden">
                            <p class="text-black">Sortie le :</p>
                            <p class="text-black mt-2">${formatDateSansh(product.released_date_product)}</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
                const containerFormAddProductToCart = document.getElementById("containerFormAddProductToCart");
                const priceProduct = document.getElementById("price_product");
                if (product.dispo_product === '1') {
                    let optionsDisponible = `<button class="bg-black opacity-50 text-white rounded-lg px-6 py-3" disabled>Ce produit n'est plus disponible a la vente</button>`;
                    priceProduct.innerHTML = '';
                    containerFormAddProductToCart.innerHTML = optionsDisponible;
                }
                const titlePageProduct = document.querySelector("title");
                titlePageProduct.innerHTML = `${product.name_product}`;
                // Ajouter au panier
                const formAddToCart = document.getElementById("formAddToCart");
                if (formAddToCart) {
                    formAddToCart.addEventListener('submit', (ev) => {
                        ev.preventDefault();
                        const id = formAddToCart.querySelector('[name="id"]').value;
                        const quantity = formAddToCart.querySelector('[name="quantity"]').value;
                        const name = formAddToCart.querySelector('[name="name"]').value;
                        addToCart(id, quantity, name);
                    });
                    }
            }
            async function addToCart(id, quantity, name) {
                await fetch(`src/php/fetch/cart/addProductToCart.php?id=${id}&quantity=${quantity}&name=${name}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status == 'success') {
                            const diaog = document.createElement("dialog");
                            diaog.setAttribute('class','fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-transparent');
                            diaog.setAttribute('open', '');
                            diaog.innerHTML = `
                            <div class="flex items-center py-3 px-2 rounded-lg bg-[#DFF2BF] text-[#270] border-l-[3px] border-[#270]">
                                <img src="public/images/icones/succes-circle-green-stroke-2.svg" alt="" class="w-5 h-5">
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
            }
        });
}
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
async function Avis(){
    await fetch('src/php/fetch/client/isConnected.php')
    .then(response => response.json())
    .then(data => {
        const containerAddAvis = document.getElementById('containerAddAvis');
        if (data.status == 'error') {
            containerAddAvis.innerHTML = `
            <div class="flex flex-col items-center justify-center space-y-2">
                <button class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg" id="buttonAddAvis">Vous devez être connecté pour ajouter un avis</button>
            </div>
            `;
            const buttonAddAvis = document.getElementById('buttonAddAvis');
            buttonAddAvis.addEventListener('click', (ev) => {
                ev.preventDefault();
                loginFormHeader(buttonAddAvis);
            });
        }
        if (data.status == 'success') {
            containerAddAvis.innerHTML = `
            <div class="flex flex-col items-center justify-center space-y-2 w-full">
                <form action="" method="post" id="formAddAvisClient" class="flex flex-col space-y-3 ">
                    <input type="hidden" name="id_product" value="${URLid}">
                    <input type="text" name="title_avis" id="title_avis" placeholder="Titre de l'avis" class="text-white hover:bg-[#21262D] bg-[#2d323c] border-[1px] border-[#a8b3cf33] p-2 rounded-[14px] w-full">
                    <textarea name="content_avis" id="content_avis" cols="65" rows="6" placeholder="Contenu de l'avis" class="text-white hover:bg-[#21262D] bg-[#2d323c] border-[1px] border-[#a8b3cf33] p-2 rounded-[14px] w-full"></textarea>
                    <select name="note_avis" id="note_avis" class="hover:bg-[#21262D] bg-[#2d323c] border-[1px] border-[#a8b3cf33]  p-2 rounded-[14px] text-[#a8b3cf]">
                        <option value="" selected>Note du produit</option>
                        <option value="0">0/5</option>
                        <option value="1">1/5</option>
                        <option value="2">2/5</option>
                        <option value="3">3/5</option>
                        <option value="4">4/5</option>
                        <option value="5">5/5</option>
                    </select>
                    <div id="errorMsg" class="h-12"></div>
                    <button type="submit" class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg" id="buttonAddAvis">Ajouter un avis</button>
                </form>
            </div>
                `;
            const formAddAvisClient = document.getElementById('formAddAvisClient');
            formAddAvisClient.addEventListener('submit', async (ev) => {
                ev.preventDefault();
                await fetch('src/php/fetch/avis/addAvis.php', {
                    method: 'POST',
                    body: new FormData(formAddAvisClient)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const msg = document.getElementById('errorMsg');
                    if (data.status == 'error') {
                        msg.innerHTML = `
                        <div class="flex items-center py-3 px-2 rounded-lg bg-[#FF03032A] text-[#D8000C] border-l-[3px] border-[#ff0303]">
                            <img src="public/images/icones/danger-red-stroke-2.svg" alt="" class="w-5 h-5">
                            <small class="text-lg">${data.message}</small>
                        </div>
                        `;
                    }
                    if (data.status == 'success') {
                        msg.innerHTML = `
                        <div class="w-full flex items-center py-3 px-2 space-x-3 bg-opacity-50 backdrop-filter backdrop-blur-lg hover:bg-opacity-75 hover:saturate-100 rounded-[14px] bg-[#cbf4f0] text-[#000] border-l-[3px] border-[#23a094]">
                            <svg width="25" height="25" viewBox="0 0 24 24" stroke="#23a094" fill="#fff" class="p-0.5 bg-white items-center rounded-full" stroke-linejoin="round" stroke-width="1.736842105263158" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M16.253 10.1109L11.8891 14.4749C11.4986 14.8654 10.8654 14.8654 10.4749 14.4749L7.99999 12M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"></path></svg>
                            <small class="text-lg">Produit ajouté au panier</small>
                        </div>
                        `;
                        displayAvis();
                    }
                });
            });
        }

    });
}
//Affichage des avis
function formatDistanceToNow(date) {
    const distanceInMillis = new Date() - date;
    const minuteInMillis = 60 * 1000;
    const hourInMillis = 60 * minuteInMillis;
    const dayInMillis = 24 * hourInMillis;
    const weekInMillis = 7 * dayInMillis;

    if (distanceInMillis < minuteInMillis) {
        return "à l'instant";
    } else if (distanceInMillis < hourInMillis) {
        const minutes = Math.round(distanceInMillis / minuteInMillis);
        return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (distanceInMillis < dayInMillis) {
        const hours = Math.round(distanceInMillis / hourInMillis);
        return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    } else if (distanceInMillis < weekInMillis) {
        const days = Math.round(distanceInMillis / dayInMillis);
        return `il y a ${days} jour${days > 1 ? 's' : ''}`;
    } else {
        const daysAgo = Math.floor(distanceInMillis / dayInMillis);
        return `il y a ${daysAgo} jour${daysAgo > 1 ? 's' : ''}`;
    }
}
const containerModalDialog = document.getElementById('containerDialogAvis');
async function displayAvis() {
    await fetch ('src/php/fetch/client/isConnected.php')
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {
                let UserId = data.id;
                fetch (`src/php/fetch/avis/getAvis.php?id_product=${URLid}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'success') {
                            let commentsData = data.avis;
                            console.log(commentsData);
                            function addReplyToComment(comment, action, UrlId) {
                                const dialogAvis = document.createElement('dialog');
                                dialogAvis.setAttribute('id', 'dialog_fixed');
                                dialogAvis.className = 'dialog_modal w-6/12 h-6/12 bg-[#24272A] text-[#a8b3cf] rounded-[14px] shadow-lg';
                                containerModalDialog.appendChild(dialogAvis);
                                dialogAvis.innerHTML = `
                                <div class="border-[1px] rounded-[14px] border-[#a8b3cf]">
                                    <div class="flex flex-row justify-between border-b border-[#a8b3cf] flex items-center py-4 px-6 w-full h-14">
                                        <h3>Votre réponse</h3>
                                        <button class="close" id="closeDialogAvis">
                                            <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                                        </button>
                                    </div>
                                    <div class="overflow-auto relative w-full h-full shrink max-h-full p-6 flex flex-col">
                                        <div class="flex space-x-2">
                                            <div class="flex flex-col">
                                                <p class="text-white font-regular">${comment.login}</p>
                                                <p class="text-[#a8b3cf] text-xs">
                                                    <span>${formatDate(comment.created_at)}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="m-2 border-l border-white pl-6">
                                            <p class="text-white font-light text-lg">${comment.content}</p>
                                        </div>
                                        <div>
                                            <p class="text-xs text-white pl-8">Réponse à <b>${comment.login}</b></p>
                                        </div>
                                    </div>
                                    <div class="flex relative flex-1 pl-6 pr-2">
                                            <form action="" method="post" id="formAddReplyComment" class="flex flex-col items-center justify-center w-full text-white">
                                            <input type="hidden" name="produit_id" value="${UrlId}">
                                            <input type="hidden" name="parent_id" value="${comment.id}">
                                            <textarea name="content" id="content" cols="30" rows="5" placeholder="@${comment.login}" class="ml-3 flex-1 bg-[#24272A] focus:outline-none rounded-b-[14px] w-full h-full text-white"></textarea>
                                            <div id="errorMsg" class="h-12"></div>
                                            <div class="flex flex-row justify-end w-full py-2">
                                                <button class="bg-[#39e58c] text-black font-bold px-5 py-2 rounded-[14px]" id="buttonAddAvis">Répondre</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                        `;
                                const textArea = document.querySelector('#content');
                                const buttonAddAvis = document.querySelector('#buttonAddAvis');
                                if (action === 'reply') {
                                    textArea.placeholder = `@${comment.login}`;
                                    buttonAddAvis.textContent = 'Répondre';
                                } else if (action === 'edit') {
                                    textArea.placeholder = '';
                                    textArea.value = comment.content;
                                    buttonAddAvis.textContent = 'Modifier';
                                }
                                dialogAvis.showModal();
                                const closeDialogAvis = document.getElementById('closeDialogAvis');
                                closeDialogAvis.addEventListener('click', (ev) => {
                                    ev.preventDefault();
                                    dialogAvis.close();
                                    dialogAvis.remove();
                                });
                                const formAddReplyComment = document.querySelector('#formAddReplyComment');
                                if (action === 'reply') {
                                    formAddReplyComment.addEventListener('submit', async (e) => {
                                        e.preventDefault();
                                        await fetch(`src/php/fetch/avis/addReplyAvis.php`, {
                                            method: 'POST',
                                            body: new FormData(formAddReplyComment)
                                        })
                                            .then((response) => response.json())
                                            .then((data) => {
                                                console.log(data);
                                                if (data.success) {
                                                    dialogAvis.close();
                                                }
                                            });
                                    });
                                } else if (action === 'edit') {
                                    formAddReplyComment.addEventListener('submit', async (e) => {
                                        e.preventDefault();
                                        await fetch('src/php/fetch/avis/editComment.php', {
                                            method: 'POST',
                                            body: new FormData(formAddReplyComment)
                                        })
                                            .then((response) => response.json())
                                            .then((data) => {
                                                console.log(data);
                                                if (data.success) {
                                                    dialogAvis.close();
                                                }
                                            });
                                    });
                                }
                            }
                            function generateCommentHTML(comment) {
                                const commentId = `comment_${comment.id}`;
                                let commentHTML = '';
                                let callToActionHTML = '';
                                if (comment.id_users === UserId) {
                                    callToActionHTML = `
                                    <button class="flex space-x-2 p-1 rounded hover:bg-[#1ddc6f3d] hover:text-[#39e58c]" id="edit_${comment.id}">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/>
                                          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"/>
                                          <path d="M16 5l3 3"/>
                                        </svg>
                                        Modifier
                                    </button>
                                    <button class="flex space-x-2 p-1 rounded hover:bg-[#dc1d1d3d] hover:text-[#e53939]" id="delete_${comment.id}">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M9 12h6"/>
                                            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"/>
                                        </svg>
                                    Supprimer
                                    </button>
                                `;
                                }
                                commentHTML = `
                                    <div class="comment" id="${commentId}">
                                        <div class="flex space-x-2">
                                            <div class="flex justify-between items-center w-full"> 
                                                <div class="flex items-center gap-2">   
                                                    <img src="src/images/avatars/${comment.avatar}" alt="avatar" class="w-8 h-8 rounded-full">
                                                    <p>${comment.login}</p>
                                                </div>
                                                <p>${formatDate(comment.created_at)}</p>
                                            </div>
                                        </div>
                                        <h3>${comment.title_comment}</h3>
                                        <p>${comment.content}</p>
                                        <div class="flex space-x-2 py-2 text-[#dcdcdc]">
                                            <button class="flex space-x-2 rounded hover:bg-[#A87EE627] hover:text-[#a87ee6] p-1" id="reply_${comment.id}">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                  <path d="M8 9h8"/>
                                                  <path d="M8 13h6"/>
                                                  <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"/>
                                                </svg>
                                                Répondre
                                            </button>
                                            <div id="callToAction_${comment.id}" class="flex space-x-2">${callToActionHTML}</div>
                                        </div>
                                    </div>
                                `;
                                return commentHTML;
                            }
                            // Fonction récursive pour générer le HTML des réponses imbriquées
                            function generateNestedRepliesHTML(comments, parentId) {
                                const replies = comments.filter(comment => comment.parent_id === parentId);

                                if (replies.length === 0) {
                                    return '';
                                }
                                let repliesHTML = '';
                                replies.forEach(reply => {
                                    const replyId = `${reply.id}`;
                                    const callToActionId = `callToAction_${reply.id}`;

                                    let callToActionHTML = '';

                                    if (reply.id_users === UserId) {
                                        callToActionHTML = `
                                        <button class="border-2 border-black" id="edit_${reply.id}">
                                            Modifier
                                        </button>
                                        <button class="border-2 border-black" id="delete_${reply.id}">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                <path d="M9 12h6"/>
                                                <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"/>
                                            </svg>
                                            Supprimer
                                        </button>
                                        
                                    `;
                                    }
                                    repliesHTML += `
                                    <div class="reply" id="container_${replyId}">
                                        <div class="flex space-x-2">
                                            <div class="flex justify-between items-center w-full"> 
                                                <div class="flex items-center gap-2">   
                                                    <img src="src/images/avatars/${reply.avatar}" alt="avatar" class="w-8 h-8 rounded-full">
                                                    <p>${reply.login}</p>
                                                </div>
                                                <p>${formatDate(reply.created_at)}</p>
                                            </div>
                                        </div>
                                        <h3>${reply.content}</h3>
                                        <div class="flex space-x-2">
                                            <button class="border-2 border-black" id="reply_${replyId}">Répondre</button>
                                            <div id="${callToActionId}">${callToActionHTML}</div>
                                        </div>
                                        ${generateNestedRepliesHTML(comments, reply.id)}
                                    </div>
                                `;
                                });
                                return repliesHTML;
                            }
                            function displayComments(comments) {
                                const commentsContainer = document.getElementById('containerAvisClients');
                                comments.forEach(comment => {
                                    if (comment.parent_id === null) {
                                        const commentHTML = generateCommentHTML(comment);
                                        const repliesHTML = generateNestedRepliesHTML(comments, comment.id);

                                        commentsContainer.innerHTML += `
                                        <div class="comment-container p-2 bg-[#2d323c] rounded-[14px] text-white m-2">
                                            ${commentHTML}
                                            <div id="replies-container" class="pl-2 mt-2">
                                            ${repliesHTML}
                                            </div>
                                        </div>
                                        `;
                                    }
                                });
                                comments.forEach(comment => {
                                    const repliesButton = commentsContainer.querySelector(`#reply_${comment.id}`);
                                    repliesButton.addEventListener('click', (e) => {
                                        e.preventDefault();
                                        addReplyToComment(comment, 'reply', URLid);
                                    });
                                    const editButton = commentsContainer.querySelector(`#edit_${comment.id}`);
                                    if (editButton) {
                                        editButton.addEventListener('click', (e) => {
                                            e.preventDefault();
                                            addReplyToComment(comment, 'edit', URLid);
                                        });
                                    }
                                    const deleteButton = commentsContainer.querySelector(`#delete_${comment.id}`);
                                    if (deleteButton) {
                                        deleteButton.addEventListener('click', async (e) => {
                                            e.preventDefault();
                                            await fetch(`src/php/fetch/avis/deleteAvis.php`, {
                                                method: 'POST',
                                                body: new FormData(),
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                }
                                            })
                                                .then((response) => response.json())
                                                .then((data) => {
                                                    console.log(data);
                                                    if (data.success) {

                                                    }
                                                });
                                        });
                                    }
                                });
                            }
                            // Appel de la fonction pour afficher les commentaires
                            displayComments(commentsData);
                        } else {
                            containerComment.innerHTML = `
                                <div class="w-full p-2 bg-[#2a1825] h-12 rounded my-6">
                                    <p class="text-white">Aucun commentaire pour cette series</p>
                                </div>`;
                        }
                    });
            } else {
                console.log('Vous n\'êtes pas connecté');
            }
        });
}

Avis();
displayAvis();
cartHeader();
getProduct(URLid);

