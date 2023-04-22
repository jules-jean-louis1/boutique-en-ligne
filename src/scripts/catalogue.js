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

const containerCatalogue = document.getElementById("containerCatalogue");
const containerPage = document.getElementById("displayPagesCatalogue");
async function getDateProduct(categorie, subCategorie) {
    const params = new URLSearchParams();
    params.append('categorie', categorie);
    params.append('subCategorie', subCategorie);
    const response = await fetch(`src/php/fetch/catalogue/getDateProductFiltre.php?${params.toString()}`);
    const data = await response.json();
    dateSortieProduit.innerHTML = '';
    for (const date of data.displayYear) {
        dateSortieProduit.innerHTML += `
            <div class="flex items-center space-x-2">
                <label for="dateSortie">${date.annee}</label>
                <input type="checkbox" name="dateSortie" id="dateSortie" value="${date.annee}">
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
let categoriesSelect;

async function getCategorie() {
    const response = await fetch('src/php/fetch/catalogue/getCategorieFiltre.php');
    const data = await response.json();
    for (const subCategorie of data.displayCategories) {
        categoriesSelect.innerHTML += `
            <option value="${subCategorie.id_categories}">${subCategorie.name_categories}</option>
            `;
    }
    categoriesSelect.addEventListener('change', async () => {
        const selectedCategoryId = categoriesSelect.value;
        if (selectedCategoryId === '') {
            getSubCategorie();
        } else {
        const subCategoriesSelect = document.getElementById("subCategories");
        subCategoriesSelect.innerHTML = '<option value="">Genre...</option>';
        const response = await fetch(`src/php/fetch/catalogue/getSubCatByCat.php?categoryId=${selectedCategoryId}`);
        const data = await response.json();
        for (const subCategory of data.displaySubCategories) {
            subCategoriesSelect.innerHTML += `
                <option value="${subCategory.id_subcategories}">${subCategory.name_subcategories}</option>
            `;
        }
        }
    });
}
async function getPages(Date, order, categorie, subCategorie) {
    const params = new URLSearchParams();
    params.append('date', Date);
    params.append('order', order);
    params.append('categorie', categorie);
    params.append('subCategorie', subCategorie);

    const response = await fetch(`src/php/fetch/catalogue/getPages.php?${params.toString()}`);
    const data = await response.json();
    console.log(data);
    for (let i = 1; i <= data.displayPages; i++) {
        containerPage.innerHTML += `
            <li class="page-item">
                <button class="px-4 py-2 rounded-[14px] bg-slate-100" id="pageButton${i}" value="${i}">${i}</button>
            </li>
            `;
    }
}

function createFormFilter() {
    const containerFilterForm = document.getElementById("displayFilterCatalogue");
    const filterFormC = document.createElement('div');
    filterFormC.className = "filterFormC";
    containerFilterForm.appendChild(filterFormC);

    filterFormC.innerHTML = `
    <form id="filtrageForm" method="POST" class="flex flex-col">
        <div class="flex flex-col ">
            <select name="categorie" id="categorie" class="p-4">
                <option value="">Categorie</option>
            </select>
        </div>
        <div class="flex flex-col ">
            <select name="subCategories" id="subCategories" class="p-4">
                <option value="">Genre...</option>
            </select>
        </div>
        <div id="filtreSelectC" class="flex flex-col ">
            <select name="order" id="order" class="p-4">
                <option value="">Tirer par...</option>
                <option value="ASC_prix">Prix : les moins chers</option>
                <option value="DESC_prix">Prix : les plus chers</option>
                <option value="ASC_vente">Meilleures ventes</option>
                <option value="DESC_vente">Moins bonnes ventes</option>
                <option value="ASC_date">Date : les plus récents</option>
                <option value="DESC_date">Date : les plus anciens</option>
                <option value="ASC_rating">Note : Les meilleurs</option>
                <option value="DESC_rating">Note : Les moins bonnes</option>
            </select>
        </div>
        <div id="dateSortieProduit" class="flex flex-col ">
        </div>
    </form>
    `;
    const dateSortieProduit = document.getElementById("dateSortieProduit");
    categoriesSelect = document.getElementById("categorie");
    const subCategoriesSelect = document.getElementById("subCategories");
    const Order = document.getElementById("order");
    const selectedCategoryValue = categoriesSelect.value;
    const selectedSubCategoryValue = subCategoriesSelect.value;
    categorie = selectedCategoryValue;
    subCategorie = selectedSubCategoryValue;
    getSubCategorie();
    getCategorie();
    getDateProduct(categorie, subCategorie);
}

async function filterForm(Page, Date, order, categorie, subCategorie) {
    const orderSelect = document.getElementById("order");
    const categoriesSelect = document.getElementById("categorie");
    const subCategoriesSelect = document.getElementById("subCategories");

    const selectedCategoryValue = categoriesSelect.value;
    const selectedSubCategoryValue = subCategoriesSelect.value;
    const selectedDateInput = document.querySelector('input[name="dateSortie"]:checked');
    const selectedDate = selectedDateInput ? selectedDateInput.value : '';


    Date = selectedDate;
    order = orderSelect.value;
    categorie = selectedCategoryValue;
    subCategorie = selectedSubCategoryValue;

    const params = new URLSearchParams();
    params.append('page', Page);
    params.append('date', Date);
    params.append('order', order);
    params.append('categorie', categorie);
    params.append('subCategorie', subCategorie);

    getDateProduct(categorie, subCategorie);
    await fetch(`src/php/fetch/catalogue/getProductByFilter.php?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // faire quelque chose avec les résultats
            }
            if (data.status === 'error') {
                console.log(data.message);
            }
        });
}








let Page = 1;
let Date = '';
let order = '';
let categorie = '';
let subCategorie = '';
createFormFilter();
getPages(Date, order, categorie, subCategorie);
filterForm(Page, Date, order, categorie, subCategorie);

const filtrageForm = document.getElementById("filtrageForm");
filtrageForm.addEventListener('change', async (ev) => {
    ev.preventDefault();
    filterForm(Page, Date, order, categorie, subCategorie);
});