import {displayErrorMessageFormUpdateProduct, loginFormHeader} from './function/function.js';
import {registerHeader} from './function/function.js';
import {formatDateSansh} from "./function/function.js";
import {searchHeader} from "./function/function.js";

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

// Catalogue.js

async function getDateProduct() {
    const response = await fetch('src/php/fetch/catalogue/getDateProductFiltre.php');
    const data = await response.json();
    for (const date of data.displayYear) {
        dateSortieProduit.innerHTML += `
            <div class="flex items-center space-x-2">
                <label for="date">${date.annee}</label>
                <input type="checkbox" name="date" id="date" value="${date.annee}">
                <p class="text-[#A87EE6FF]"> ${date.count}</p>
            </div>
            `;
    }
}
async function getSubCategorie() {
    const response = await fetch('src/php/fetch/catalogue/getSubCategorieFiltre.php');
    const data = await response.json();
    for (const subCategorie of data.displaySubCategories) {
        subCategories.innerHTML += `
            <option value="${subCategorie.id_subcategories}">${subCategorie.name_subcategories}</option>
            `;
    }
}
async function filterForm(Page, Date, Filtre, subCategorie) {
    const containerFilterForm = document.getElementById("displayFilterCatalogue");
    const filterFormC = document.createElement('div');
    filterFormC.className = "filterFormC";
    containerFilterForm.appendChild(filterFormC);

    filterFormC.innerHTML = `
    <form id="filtrageForm" method="POST" class="flex flex-col">
    <div id="subCategorieSelectC" class="flex flex-col ">
        <select name="subCategories" id="subCategories" class="p-4">
            <option value="">Genre...</option>
        </select>
    </div>
    <div id="filtreSelectC" class="flex flex-col ">
        <select name="filtre" id="filtre" class="p-4">
            <option value="">Filtre...</option>
            <option value="ASC">Prix croissant</option>
            <option value="DESC">Prix décroissant</option>
        </select>
    </div>
    <div id="dateSortieProduit" class="flex flex-col ">
    </div>
    
    </form>
    `;
    const dateSortieProduit = document.getElementById("dateSortieProduit");
    const subCategories = document.getElementById("subCategories");
    getSubCategorie();
    getDateProduct();
}
filterForm();

