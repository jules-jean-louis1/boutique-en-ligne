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
const URLid = searchParams.get("id");

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
            console.log(data);
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

async function displayAvis() {
    await fetch ('src/php/fetch/client/isConnected.php')
    .then(response => response.json())
    .then(data => {
        const containerAvisClient = document.getElementById('containerAvisClients');
        if (data.status == 'success') {
            const Users_id = data.id;
            fetch ('src/php/fetch/avis/getAvis.php?id_product='+URLid)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status == 'success') {
                    if (data.avis.length == 0) {
                        containerAvisClient.innerHTML = `<p class="text-[#a8b3cf]">Aucun avis pour ce produit</p>`;
                    } else {
                        containerAvisClient.innerHTML = '';
                        let avisID = [];
                        for (let avis of data.avis) {
                            avisID.push(avis.id_avis);
                        }
                        for (let avis of data.avis) {
                            const avisContainer = document.createElement('div');
                            avisContainer.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'space-y-2', 'border-[1px]', 'border-[#a8b3cf33]', 'rounded-[14px]', 'xl:w-8/12', 'w-full', 'p-4', 'mb-2');
                            avisContainer.innerHTML = `
                    <div id="avis_${avis.id_avis}" class="w-full">
                        <div class="flex flex-row justify-between w-full">
                                <p class="text-[#fff] font-semibold">${avis.titre_avis}</p>
                                <p class="text-[#a8b3cf]">${formatDateSansh(avis.created_at)}</p>
                            </div>
                            <div class="w-full flex flex-row justify-between">
                                <div class="flex flex-row space-x-2">
                                    <img src="src/images/avatars/${avis.avatar_users}" alt="" class="w-6 h-6 rounded-full">
                                    <p class="font-semibold text-white">${avis.login_users}</p>
                                </div>
                                <div class="flex flex-row justify-end w-full">
                                    <p class="text-[#a8b3cf]">${afficherEtoiles(avis.note_avis)}</p>
                                </div>
                            </div>
                            <div class="w-full flex flex-row justify-start">
                                <p class="text-white font-light">${avis.commentaire_avis}</p>
                            </div>
                            <div class="flex flex-row w-full justify-start">
                                <div>
                                    <button class="text-[#A8B3CF] p-2 rounded-lg duration-100 ease-in hover:text-[#39e58c] hover:bg-[#1ddc6f3d]" id="buttonRepondreAvis_${avis.id_avis}">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                          <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                                        </svg>                                    
                                    </button>
                                </div>
                                <div id="callToAction" class="flex"></div>
                            </div>
                        <div id="reponseAvis-${avis.id_avis}" class="w-full"></div>
                    </div>
                    `;
                    const callToAction = avisContainer.querySelector('#callToAction');
                    if (avis.users_id === Users_id) {
                        callToAction.innerHTML = `
                        <div class="flex flex-row justify-between w-full">
                            <button class="text-[#A8B3CF] p-2 rounded-lg duration-100 ease-in hover:text-[#2cdce6] hover:bg-[#0dcfdc3d]" id="buttonEditAvis_${avis.id_avis}">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-cog" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                  <path d="M11.996 19.98a9.868 9.868 0 0 1 -4.296 -.98l-4.7 1l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c1.842 1.572 2.783 3.691 2.77 5.821" />
                                  <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                  <path d="M19.001 15.5v1.5" />
                                  <path d="M19.001 21v1.5" />
                                  <path d="M22.032 17.25l-1.299 .75" />
                                  <path d="M17.27 20l-1.3 .75" />
                                  <path d="M15.97 17.25l1.3 .75" />
                                  <path d="M20.733 20l1.3 .75" />
                                </svg>                            
                            </button>
                            <button class="text-[#A8B3CF] p-2 rounded-lg duration-100 ease-in hover:text-[#ff3b3b] hover:bg-[#ff606033]" id="buttonDeleteAvis_${avis.id_avis}">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                  <path d="M12.023 19.98a9.87 9.87 0 0 1 -4.323 -.98l-4.7 1l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c2.718 2.319 3.473 5.832 2.096 8.811" />
                                  <path d="M16 19h6" />
                                </svg>
                            </button>
                        </div>
                    `;
                    }
                    containerAvisClient.appendChild(avisContainer);
                        // Edit Avis Of Client
                            const buttonEditAvis = document.querySelector(`#buttonEditAvis_${avis.id_avis}`);
                            if (buttonEditAvis) {
                                buttonEditAvis.addEventListener('click', async (ev) => {
                                    ev.preventDefault();
                                    const containerDialogAvis = document.getElementById('containerDialogAvis');
                                    const dialogAvis = document.createElement('dialog');
                                    dialogAvis.setAttribute('id', 'dialog_fixed');
                                    dialogAvis.className = 'dialog_modal w-6/12 h-6/12 bg-[#24272A] text-[#a8b3cf] rounded-[14px] shadow-lg';
                                    containerDialogAvis.appendChild(dialogAvis);
                                    containerDialogAvis.classList.add('bg-overlay-quaternary-onion');
                                    dialogAvis.innerHTML = `
                                    <div class="border-[1px] rounded-[14px] border-[#a8b3cf]">
                                        <div class="flex flex-row justify-between border-b border-[#a8b3cf] flex items-center py-4 px-6 w-full h-14">
                                            <p class="text-xl font-semibold text-white">Modifier votre avis</p>
                                            <button class="p-2 hover:bg-slate-800" id="closeDialogAvis">
                                                <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                                            </button>
                                        </div>
                                        <form action="" method="post" id="formEditAvisClient" class="flex flex-col items-center justify-center space-y-2 p-3">
                                            <input type="hidden" name="id_avis" value="${avis.id_avis}">
                                            <input type="hidden" name="id_product" value="${avis.id_product}">
                                            <div class="flex items-center w-full space-x-2">
                                                <div class="relative w-full">
                                                    <input type="text" name="title_avis" id="title_avis" placeholder="Titre de l'avis" class="px-2.5 pt-4 pb-1 text-white bg-[#31333a] hover:bg-[#21262D] rounded-[14px] textField_form focus:outline-none w-full" value="${avis.titre_avis}">
                                                    <label for="title_avis" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Titre de l'avis</label>
                                                </div>
                                                <div class="relative w-full">
                                                    <select name="note_avis" id="note_avis" class="px-2.5 pt-4 pb-1 text-white bg-[#31333a] hover:bg-[#21262D] rounded-[14px] textField_form focus:outline-none w-full">
                                                        <option value="${avis.note_avis}" selected>${avis.note_avis}</option>
                                                        <option value="0">0/5</option>
                                                        <option value="1">1/5</option>
                                                        <option value="2">2/5</option>
                                                        <option value="3">3/5</option>
                                                        <option value="4">4/5</option>
                                                        <option value="5">5/5</option>
                                                    </select>
                                                    <label for="note_avis" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Note de l'avis</label>
                                                </div>
                                            </div>
                                            <div class="relative w-full">
                                                <textarea name="content_avis" id="content_avis" cols="30" rows="10" placeholder="Contenu de l'avis" class="px-2.5 pt-4 pb-1 text-white bg-[#31333a] hover:bg-[#21262D] rounded-[14px] textField_form focus:outline-none w-full">${avis.commentaire_avis}</textarea>
                                                <label for="content_avis" class="absolute top-0 left-2 px-1 py-px text-xs text-[#a8b3cf]">Contenu de l'avis</label>
                                            </div>
                                            <div id="errorMsg" class="h-12"></div>
                                            <button type="submit" class="bg-[#39e58c] text-black font-bold px-5 py-2 rounded-[14px]" id="buttonAddAvis">Modifier un avis</button>
                                        </form>
                                    </div>
                                `;
                                    const formEditAvisClient = document.getElementById('formEditAvisClient');
                                    formEditAvisClient.addEventListener('submit', async (ev) => {
                                        ev.preventDefault();
                                        await fetch(`src/php/fetch/avis/editAvis.php?id_avis=${avis.id_avis}`, {
                                            method: 'POST',
                                            body: new FormData(formEditAvisClient)
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                if (data.status == 'error') {
                                                    const errorMsg = document.getElementById('errorMsg');
                                                    displayErrorMessageFormUpdateProduct(errorMsg, data.message);
                                                }
                                                if (data.status == 'success') {
                                                    dialogAvis.close();
                                                    dialogAvis.remove();
                                                    displayAvis();
                                                }
                                            });
                                    });
                                    dialogAvis.showModal();
                                    const closeDialogAvis = document.getElementById('closeDialogAvis');
                                    closeDialogAvis.addEventListener('click', (ev) => {
                                        ev.preventDefault();
                                        containerDialogAvis.classList.remove('bg-overlay-quaternary-onion');
                                        dialogAvis.close();
                                        dialogAvis.remove();
                                    });
                                });
                            }
                        // Delete Avis Of Client
                            const buttonDeleteAvis = document.querySelector(`#buttonDeleteAvis_${avis.id_avis}`);
                            if (buttonDeleteAvis) {
                                buttonDeleteAvis.addEventListener('click', async (ev) => {
                                    ev.preventDefault();
                                    await fetch(`src/php/fetch/avis/deleteAvis.php?id_avis=${avis.id_avis}`)
                                        .then(response => response.json())
                                        .then(data => {
                                            if (data.status == 'success') {
                                                displayAvis();
                                            }
                                        });
                                });
                            }
                        // Reply Avis Of Client
                            const buttonRepondreAvis = document.querySelector(`#buttonRepondreAvis_${avis.id_avis}`);
                            if (buttonRepondreAvis) {
                                buttonRepondreAvis.addEventListener('click', async (ev) => {
                                    ev.preventDefault();
                                    const containerDialogAvis = document.getElementById('containerDialogAvis');
                                    const dialogAvis = document.createElement('dialog');
                                    dialogAvis.setAttribute('id', 'dialog_fixed');
                                    dialogAvis.className = 'dialog_modal w-10/12 bg-[#24272A] text-[#a8b3cf] rounded-lg shadow-lg';
                                    containerDialogAvis.appendChild(dialogAvis);
                                    dialogAvis.innerHTML = `
                                    <div class="p-2">
                                        <div class="flex flex-row justify-between">
                                                <h3>Votre commentaire</h3>
                                                <button class="close" id="closeDialogAvis">&times;</button>
                                            </div>
                                        <div>
                                        <div>
                                            <img src="src/images/avatars/${avis.avatar_users}" alt="" class="w-6 h-6 rounded-full">
                                            <p class="text-[#a8b3cf]">${avis.login_users}</p>
                                        </div>
                                        <div>
                                            <p class="text-[#a8b3cf]">${avis.titre_avis}</p>
                                            <p class="text-[#a8b3cf]">${avis.commentaire_avis}</p>
                                        </div>
                                        <div>
                                            <p>Réponse à ${avis.login_users}</p>
                                        </div>
                                        </div>
                                        <form action="" method="post" id="formAddReplyAvisClient" class="flex flex-col items-center justify-center space-y-2">
                                            <input type="hidden" name="id_product" value="${URLid}">
                                            <input type="hidden" name="parent_avis" value="${avis.id_avis}">
                                            <textarea name="content_avis" id="content_avis" cols="30" rows="10" placeholder="Contenu de l'avis" class="bg-slate-100 p-2 rounded-lg"></textarea>
                                            <div id="errorMsg" class="h-12"></div>
                                            <button type="submit" class="bg-[#A87EE6FF] text-white px-5 py-2 rounded-lg" id="buttonAddAvis">Répondre</button>
                                        </form>
                                    </div>
                                `;
                                    dialogAvis.showModal();
                                    const closeDialogAvis = document.getElementById('closeDialogAvis');
                                    closeDialogAvis.addEventListener('click', (ev) => {
                                        ev.preventDefault();
                                        dialogAvis.close();
                                        dialogAvis.remove();
                                    });
                                    const formAddReplyAvisClient = document.getElementById('formAddReplyAvisClient');
                                    formAddReplyAvisClient.addEventListener('submit', async (ev) => {
                                        ev.preventDefault();
                                        await fetch(`src/php/fetch/avis/addReplyAvis.php?id_avis=${avis.id_avis}`, {
                                            method: 'POST',
                                            body: new FormData(formAddReplyAvisClient)
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                if (data.status == 'error') {
                                                    const errorMsg = document.getElementById('errorMsg');
                                                    displayErrorMessageFormUpdateProduct(errorMsg, data.message);
                                                }
                                                if (data.status == 'success') {
                                                    dialogAvis.close();
                                                    dialogAvis.remove();
                                                    displayAvis();
                                                }
                                            });
                                    });
                                });
                            }
                            for (let reply of data.reply_avis) {
                                if (reply.avis_parent_id == avis.id_avis) {
                                    const reponseAvis = document.getElementById('reponseAvis-' + avis.id_avis);
                                    reponseAvis.innerHTML += `
                                    <div class="flex flex-col w-full ml-6 p-4 mr-2">
                                        <div class="flex flex-col justify-between hover:bg-[#21262D] w-full border-l-2 border-[#a8b3cf33]">
                                            <div class="flex flex-col py-4 px-2">
                                            <div class="flex flex-row py-1 space-x-2">
                                                <img src="src/images/avatars/${reply.avatar_users}" alt="" class="w-6 h-6 rounded-full">
                                                <div class="flex flex-col items-start">
                                                    <p class="font-semibold text-white">${reply.login_users}</p>
                                                    <p class="text-[#a8b3cf] text-xs">
                                                        <span>${formatDistanceToNow(new Date(reply.created_at))}</span>
                                                        <span id="ifUpdateComment_${reply.id_comment}"></span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="flex flex-row ml-8">
                                                <p class="text-white font-light"><b class="bg-[#A87EE6AE] p-0.5 w-fit rounded-lg text-white">@${avis.login_users}</b><span id="replyOfAvis_content"> ${reply.content_comment}</span></p>
                                            </div>
                                            </div>
                                            <div class="flex flex-row py-1 ml-2">
                                                <div id="button">
                                                    <button class="text-[#A8B3CF] p-2 rounded-lg duration-100 ease-in hover:text-[#39e58c] hover:bg-[#1ddc6f3d]" id="buttonRepondreComment_${reply.id_comment}">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                      <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                                                    </svg>                                                      
                                                    </button>
                                                </div>
                                                <div id="callToActionComment_${reply.id_comment}"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="reponseComment_${reply.id_comment}" data-comment-id="${reply.id_comment}" class="ml-4"></div>
                                    `;
                                    const callToActionComment = document.getElementById(`callToActionComment_${reply.id_comment}`);
                                    if (avis.users_id === Users_id) {
                                        callToActionComment.innerHTML = `
                                            <div class="flex flex-row justify-between w-full">
                                                <button class="text-[#A8B3CF] p-2 rounded-lg duration-100 ease-in hover:text-[#2cdce6] hover:bg-[#0dcfdc3d]" id="buttonEditComment_${reply.id_comment}">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-cog" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                      <path d="M11.996 19.98a9.868 9.868 0 0 1 -4.296 -.98l-4.7 1l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c1.842 1.572 2.783 3.691 2.77 5.821" />
                                                      <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                                      <path d="M19.001 15.5v1.5" />
                                                      <path d="M19.001 21v1.5" />
                                                      <path d="M22.032 17.25l-1.299 .75" />
                                                      <path d="M17.27 20l-1.3 .75" />
                                                      <path d="M15.97 17.25l1.3 .75" />
                                                      <path d="M20.733 20l1.3 .75" />
                                                    </svg>                         
                                                </button>
                                                <button class="text-[#A8B3CF] p-2 rounded-lg duration-100 ease-in hover:text-[#ff3b3b] hover:bg-[#ff606033]" id="buttonDeleteComment_${reply.id_comment}">
                                                 <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                  <path d="M12.023 19.98a9.87 9.87 0 0 1 -4.323 -.98l-4.7 1l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c2.718 2.319 3.473 5.832 2.096 8.811" />
                                                  <path d="M16 19h6" />
                                                </svg>
                                                </button>
                                            </div>
                                        `;
                                    }

                                    const ifUpdateComment = document.getElementById(`ifUpdateComment_${reply.id_comment}`);
                                    if (ifUpdateComment) {
                                        if (reply.update_at !== null) {
                                            ifUpdateComment.textContent = "· Modifier il y a " + formatDistanceToNow(new Date(reply.update_at));
                                        }
                                    }
                                }
                            }
                            for (let reply of data.reply_avis) {
                                // Reply to comment
                                const BtnreplyComment = document.getElementById(`buttonRepondreComment_${reply.id_comment}`);
                                if (BtnreplyComment) {
                                    BtnreplyComment.addEventListener('click', async (ev) => {
                                        ev.preventDefault();
                                        const containerDialogAvis = document.getElementById('containerDialogAvis');
                                        containerDialogAvis.innerHTML = '';
                                        const dialogAvis = document.createElement('dialog');
                                        dialogAvis.setAttribute('id', 'dialog_fixed');
                                        dialogAvis.className = 'dialog_modal w-6/12 h-6/12 bg-[#24272A] text-[#a8b3cf] rounded-[14px] shadow-lg';
                                        containerDialogAvis.appendChild(dialogAvis);
                                        dialogAvis.innerHTML = '';
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
                                                        <img src="src/images/avatars/${reply.avatar_users}" alt="" class="w-6 h-6 rounded-full">
                                                        <div class="flex flex-col">
                                                            <p class="text-white font-regular">${reply.login_users}</p>
                                                            <p class="text-[#a8b3cf] text-xs">
                                                                <span>${formatDate(reply.created_at)}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="m-2 border-l border-white pl-6">
                                                        <p class="text-white font-light text-lg">${reply.content_comment}</p>
                                                    </div>
                                                    <div>
                                                        <p class="text-xs text-white pl-8">Réponse à <b>${reply.login_users}</b></p>
                                                    </div>
                                                </div>
                                                <div class="flex relative flex-1 pl-6 pr-2">
                                                    <img src="src/images/avatars/${UserAvatar}" alt="" class="w-6 h-6 rounded-full">
                                                        <form action="" method="post" id="formAddReplyComment" class="flex flex-col items-center justify-center w-full">
                                                        <input type="hidden" name="id_product" value="${URLid}">
                                                        <input type="hidden" name="parent_comment" value="${reply.id_comment}">
                                                        <textarea name="content_avis" id="content_avis" cols="30" rows="5" placeholder="@${reply.login_users}" class="ml-3 flex-1 bg-[#24272A] focus:outline-none rounded-b-[14px] w-full h-full"></textarea>
                                                        <div id="errorMsg" class="h-12"></div>
                                                        <div class="flex flex-row justify-end w-full py-2">
                                                            <button class="bg-[#39e58c] text-black font-bold px-5 py-2 rounded-[14px]" id="buttonAddAvis">Répondre</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                
                                            </div>
                                        `;
                                        const formAddReplyComment = document.getElementById('formAddReplyComment');
                                        formAddReplyComment.addEventListener('submit', async (ev) => {
                                            ev.preventDefault();
                                            await fetch(`src/php/fetch/avis/replyComment.php?id_product=${URLid}&parent_comment=${reply.id_comment}`, {
                                                method: 'POST',
                                                body: new FormData(formAddReplyComment)
                                            })
                                                .then(response => response.json())
                                                .then(data => {
                                                    if (data.status == 'error') {
                                                        const errorMsg = document.getElementById('errorMsg');
                                                        displayErrorMessageFormUpdateProduct(errorMsg, data.message);
                                                    }
                                                    if (data.status == 'success') {
                                                        dialogAvis.close();
                                                        dialogAvis.remove();
                                                        displayAvis();
                                                    }
                                                });
                                        });
                                        dialogAvis.showModal();
                                        const closeDialogAvis = document.getElementById('closeDialogAvis');
                                        closeDialogAvis.addEventListener('click', (ev) => {
                                            ev.preventDefault();
                                            dialogAvis.close();
                                            dialogAvis.remove();
                                        });
                                    });
                                }
                                const BtnEditComment = document.getElementById(`buttonEditComment_${reply.id_comment}`);
                                if (BtnEditComment) {
                                    BtnEditComment.addEventListener('click', (ev) => {
                                        ev.preventDefault();
                                        const containerDialogAvis = document.getElementById('containerDialogAvis');
                                        containerDialogAvis.innerHTML = '';
                                        const dialogAvis = document.createElement('dialog');
                                        dialogAvis.setAttribute('id', 'dialog_fixed');
                                        dialogAvis.className = 'dialog_modal w-6/12 h-6/12 bg-[#24272A] text-[#a8b3cf] rounded-[14px] shadow-lg';
                                        containerDialogAvis.appendChild(dialogAvis);
                                        dialogAvis.innerHTML = '';
                                        dialogAvis.innerHTML = `
                                            <div class="border-[1px] rounded-[14px] border-[#a8b3cf]">
                                                <div class="flex flex-row justify-between border-b border-[#a8b3cf] flex items-center py-4 px-6 w-full h-14">
                                                    <h3>Modifier votre réponse</h3>
                                                    <button class="close" id="closeDialogAvis">
                                                        <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                                                    </button>
                                                </div>
                                                <div class="pl-6 p-2">
                                                    <p class="text-[#a8b3cf] text-xs">${formatDate(reply.created_at)}</p>
                                                </div>
                                                <div class="flex relative flex-1 pl-6 pr-2">
                                                    <img src="src/images/avatars/${UserAvatar}" alt="" class="w-6 h-6 rounded-full">
                                                        <form action="" method="post" id="formEditComment" class="flex flex-col items-center justify-center w-full">
                                                        <input type="hidden" name="id_product" value="${URLid}">
                                                        <input type="hidden" name="parent_comment" value="${reply.id_comment}">
                                                        <input type="hidden" name="id_comment" value="${reply.id_comment}">
                                                        <textarea name="content_avis" id="content_avis" cols="30" rows="5" class="ml-3 flex-1 bg-[#24272A] focus:outline-none rounded-b-[14px] w-full h-full">${reply.content_comment}</textarea>
                                                        <div id="errorMsg" class="h-12"></div>
                                                        <div class="flex flex-row justify-end w-full py-2">
                                                            <button class="bg-[#39e58c] text-black font-bold px-5 py-2 rounded-[14px]" id="buttonAddAvis">Modifier</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                
                                            </div>
                                        `;
                                        const formEditComment = document.getElementById('formEditComment');
                                        formEditComment.addEventListener('submit', async (ev) => {
                                            ev.preventDefault();
                                            await fetch(`src/php/fetch/avis/editComment.php`, {
                                                method: 'POST',
                                                body: new FormData(formEditComment)
                                            })
                                                .then(response => response.json())
                                                .then(data => {
                                                    if (data.status == 'error') {
                                                        const errorMsg = document.getElementById('errorMsg');
                                                        displayErrorMessageFormUpdateProduct(errorMsg, data.message);
                                                    }
                                                    if (data.status == 'success') {
                                                        dialogAvis.close();
                                                        dialogAvis.remove();
                                                        displayAvis();
                                                    }
                                                });
                                        });
                                        dialogAvis.showModal();
                                        const closeDialogAvis = document.getElementById('closeDialogAvis');
                                        closeDialogAvis.addEventListener('click', (ev) => {
                                            ev.preventDefault();
                                            dialogAvis.close();
                                            dialogAvis.remove();
                                        });
                                    });
                                }
                                const BtnDeleteComment = document.getElementById(`buttonDeleteComment_${reply.id_comment}`);
                                if (BtnDeleteComment) {
                                    BtnDeleteComment.addEventListener('click', async (ev) => {
                                        ev.preventDefault();
                                        await fetch(`src/php/fetch/avis/deleteComment.php?id_comment=${reply.id_comment}`)
                                            .then(response => response.json())
                                            .then(data => {
                                                console.log(data);
                                            });
                                    });
                                }
                            }

                        }
                        for (let avis of data.avis) {
                            for (let reply of data.reply_avis) {
                                const parentCommentDiv = document.getElementById(`reponseComment_${reply.comment_parent_id}`);
                                if (parentCommentDiv) {
                                    const replyDiv = document.createElement('div');
                                    replyDiv.setAttribute('id', `reponseComment_${reply.id_comment}`);
                                    replyDiv.setAttribute('data-comment-id', `${reply.id_comment}`);
                                    replyDiv.innerHTML = `
                                          <div class="flex flex-col w-full ml-6 p-4 mr-2" data-id="${reply.id_comment}">
                                            <div class="flex flex-col justify-between hover:bg-[#21262D] w-full border-l-2 border-[#a8b3cf33]">
                                              <div class="flex flex-col py-4 px-2">
                                                <div class="flex flex-row py-1 space-x-2">
                                                  <img src="src/images/avatars/${reply.avatar_users}" alt="" class="w-6 h-6 rounded-full">
                                                  <div class="flex flex-col items-start">
                                                    <p class="font-semibold text-white">${reply.login_users}</p>
                                                    <p class="text-[#a8b3cf] text-xs">
                                                      <span>${formatDistanceToNow(new Date(reply.created_at))}</span>
                                                      <span id="ifUpdateComment_${reply.id_comment}"></span>
                                                    </p>
                                                  </div>
                                                </div>
                                                <div class="flex flex-row ml-8">
                                                  <span class="text-white font-light"><b class="bg-[#A87EE6AE] p-0.5 w-fit rounded-lg text-white" id="Loginusers">@${avis.login_users}</b> ${reply.content_comment}</span>
                                                </div>
                                              </div>
                                              <div class="flex flex-row py-1 ml-2">
                                                <button class="text-[#A8B3CF] p-2 rounded-lg duration-100 ease-in hover:text-[#39e58c] hover:bg-[#1ddc6f3d]" id="buttonRepondreReply_${reply.id_comment}">
                                                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                      <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                                                  </svg>                                                  
                                                </button>
                                                <div id="callToActionReply_"></div>
                                              </div>
                                            </div>
                                          </div>
                                          `;

                                    const ifUpdateComment = document.getElementById(`ifUpdateComment_${reply.id_comment}`);
                                    if (ifUpdateComment) {
                                        if (reply.update_at !== null) {
                                            ifUpdateComment.textContent = "· Modifier il y a " + formatDistanceToNow(new Date(reply.update_at));
                                        }
                                    }
                                    // Vérifie si l'identifiant de l'élément parent correspond à celui de la réponse actuelle
                                    if (parentCommentDiv.getAttribute('id') === `reponseComment_${reply.comment_parent_id}`) {
                                        replyDiv.classList.add('ml-4');
                                        parentCommentDiv.appendChild(replyDiv);
                                    }
                                    const buttonRepondreReply = document.getElementById(`buttonRepondreReply_${reply.id_comment}`);
                                    if (buttonRepondreReply) {
                                        buttonRepondreReply.addEventListener('click', async (ev) => {
                                            ev.preventDefault();
                                            const containerDialogAvis = document.getElementById('containerDialogAvis');
                                            containerDialogAvis.innerHTML = '';
                                            const dialogAvis = document.createElement('dialog');
                                            dialogAvis.setAttribute('id', 'dialog_fixed');
                                            dialogAvis.className = 'dialog_modal w-6/12 h-6/12 bg-[#24272A] text-[#a8b3cf] rounded-[14px] shadow-lg';
                                            containerDialogAvis.appendChild(dialogAvis);
                                            dialogAvis.innerHTML = '';
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
                                                        <img src="src/images/avatars/${reply.avatar_users}" alt="" class="w-6 h-6 rounded-full">
                                                        <div class="flex flex-col">
                                                            <p class="text-white font-regular">${reply.login_users}</p>
                                                            <p class="text-[#a8b3cf] text-xs">
                                                                <span>${formatDate(reply.created_at)}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="m-2 border-l border-white pl-6">
                                                        <p class="text-white font-light text-lg">${reply.content_comment}</p>
                                                    </div>
                                                    <div>
                                                        <p class="text-xs text-white pl-8">Réponse à <b>${reply.login_users}</b></p>
                                                    </div>
                                                </div>
                                                <div class="flex relative flex-1 pl-6 pr-2">
                                                    <img src="src/images/avatars/${UserAvatar}" alt="" class="w-6 h-6 rounded-full">
                                                        <form action="" method="post" id="formAddRepliesComment" class="flex flex-col items-center justify-center w-full">
                                                        <input type="hidden" name="id_product" value="${URLid}">
                                                        <input type="hidden" name="parent_comment" value="${reply.id_comment}">
                                                        <textarea name="content_avis" id="content_avis" cols="30" rows="5" placeholder="@${reply.login_users}" class="ml-3 flex-1 bg-[#24272A] focus:outline-none rounded-b-[14px] w-full h-full"></textarea>
                                                        <div id="errorMsg" class="h-12"></div>
                                                        <div class="flex flex-row justify-end w-full py-2">
                                                            <button class="bg-[#39e58c] text-black font-bold px-5 py-2 rounded-[14px]" id="buttonAddAvis">Répondre</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                
                                            </div>
                                        `;
                                            const formAddRepliesComment = document.getElementById('formAddRepliesComment');
                                            formAddRepliesComment.addEventListener('submit', async (ev) => {
                                                ev.preventDefault();
                                                await fetch(`src/php/fetch/avis/replyToReply.php?id_product=${URLid}&parent_comment=${reply.id_comment}`, {
                                                    method: 'POST',
                                                    body: new FormData(formAddRepliesComment)
                                                })
                                                    .then(response => response.json())
                                                    .then(data => {
                                                        if (data.status == 'error') {
                                                            const errorMsg = document.getElementById('errorMsg');
                                                            displayErrorMessageFormUpdateProduct(errorMsg, data.message);
                                                        }
                                                        if (data.status == 'success') {
                                                            dialogAvis.close();
                                                            dialogAvis.remove();
                                                            displayAvis();
                                                        }
                                                    });
                                            });
                                            dialogAvis.showModal();
                                            const closeDialogAvis = document.getElementById('closeDialogAvis');
                                            closeDialogAvis.addEventListener('click', (ev) => {
                                                ev.preventDefault();
                                                dialogAvis.close();
                                                dialogAvis.remove();
                                            });
                                        });
                                    }
                                }
                            }
                            break;
                        }
                    }
                }
            });
        }
        if (data.status == 'error') {
            fetch ('src/php/fetch/avis/getAvis.php?id_product='+URLid)
                .then(response => response.json())
                .then(data => {
                    containerAvisClient.innerHTML = '';
                    for (let avis of data.avis) {
                        const avisContainer = document.createElement('div');
                        avisContainer.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'space-y-2', 'border-[1px]', 'border-[#a8b3cf33]', 'rounded-[14px]', 'xl:w-8/12', 'w-full', 'p-4', 'mb-2');
                        avisContainer.innerHTML = `
                    <div id="avis_${avis.id_avis}" class="w-full">
                        <div class="flex flex-row justify-between w-full">
                                <p class="text-[#fff] font-semibold">${avis.titre_avis}</p>
                                <p class="text-[#a8b3cf]">${formatDateSansh(avis.created_at)}</p>
                            </div>
                            <div class="w-full flex flex-row justify-between">
                                <div class="flex flex-row space-x-2">
                                    <img src="src/images/avatars/${avis.avatar_users}" alt="" class="w-6 h-6 rounded-full">
                                    <p class="font-semibold text-white">${avis.login_users}</p>
                                </div>
                                <div class="flex flex-row justify-end w-full">
                                    <p class="text-[#a8b3cf]">${afficherEtoiles(avis.note_avis)}</p>
                                </div>
                            </div>
                            <div class="w-full flex flex-row justify-start">
                                <p class="text-white font-light">${avis.commentaire_avis}</p>
                            </div>
                            <div class="flex flex-row w-full justify-start">
                                <div>
                                    <button class="text-[#A8B3CF] p-2 rounded-lg duration-100 ease-in hover:text-[#39e58c] hover:bg-[#1ddc6f3d]" id="buttonRepondreAvis_${avis.id_avis}">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                          <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                                        </svg>                                    
                                    </button>
                                </div>
                                <div id="callToAction" class="flex"></div>
                            </div>
                        <div id="reponseAvis-${avis.id_avis}" class="w-full"></div>
                    </div>  
                        `;
                        containerAvisClient.appendChild(avisContainer);
                        for (let reply of data.reply_avis) {
                            if (reply.avis_parent_id == avis.id_avis) {
                                const reponseAvis = document.getElementById('reponseAvis-' + avis.id_avis);
                                reponseAvis.innerHTML += `
                                    <div class="flex flex-col w-full ml-6 p-4 mr-2">
                                        <div class="flex flex-col justify-between hover:bg-[#21262D] w-full border-l-2 border-[#a8b3cf33]">
                                            <div class="flex flex-col py-4 px-2">
                                            <div class="flex flex-row py-1 space-x-2">
                                                <img src="src/images/avatars/${reply.avatar_users}" alt="" class="w-6 h-6 rounded-full">
                                                <div class="flex flex-col items-start">
                                                    <p class="font-semibold text-white">${reply.login_users}</p>
                                                    <p class="text-[#a8b3cf] text-xs">
                                                        <span>${formatDistanceToNow(new Date(reply.created_at))}</span>
                                                        <span id="ifUpdateComment_${reply.id_comment}"></span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="flex flex-row ml-8">
                                                <p class="text-white font-light"><b class="bg-[#A87EE6AE] p-0.5 w-fit rounded-lg text-white">@${avis.login_users}</b><span id="replyOfAvis_content"> ${reply.content_comment}</span></p>
                                            </div>
                                            </div>
                                            <div class="flex flex-row py-1 ml-2">
                                                <div id="button">
                                                    <button class="text-[#A8B3CF] p-2 rounded-lg duration-100 ease-in hover:text-[#39e58c] hover:bg-[#1ddc6f3d]" id="buttonRepondreComment_${reply.id_comment}">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                      <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                                                    </svg>                                                      
                                                    </button>
                                                </div>
                                                <div id="callToActionComment_${reply.id_comment}"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="reponseComment_${reply.id_comment}" data-comment-id="${reply.id_comment}" class="ml-4"></div>
                                    `;
                                }
                            }
                        }

                });
        }
    });
}

Avis();
displayAvis();
cartHeader();
getProduct(URLid);
