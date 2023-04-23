// Fonction pour la gestion des messages d'erreurs
function displayError(message) {
    message.classList.add('alert-danger');
    message.classList.remove('alert-success');
    message.style.display = 'block';
    // Effacer le message après 3 secondes
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}

// Fonction pour la gestion des messages de success
function displaySuccess(message) {
    message.classList.add('alert-success');
    message.classList.remove('alert-danger');
    message.style.display = 'block';
    // Effacer le message après 3 secondes
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}
function displayErrorMessageFormUpdateProduct(ParentSelector, ContentMessage) {
    ParentSelector.innerHTML = '';
    ParentSelector.innerHTML = `
    <div class="flex items-center py-3 px-2 rounded-[14px] bg-[#DC110154] text-[#D8000C] border-l-[3px] border-[#D8000C]">
        <img src="public/images/icones/danger-red-stroke-2.svg" alt="" class="w-5 h-5">
        <small class="text-lg">${ContentMessage}</small>
    </div>
    `;
}
function displaySuccessMessageFormUpdateProduct(ParentSelector, ContentMessage) {
    ParentSelector.innerHTML = '';
    ParentSelector.innerHTML = `
    <div class="flex items-center py-3 px-2 rounded-lg bg-[#DFF2BF] text-[#270] border-l-[3px] border-[#270]">
        <img src="public/images/icones/succes-circle-green-stroke-2.svg" alt="" class="w-5 h-5">
        <small class="text-lg">${ContentMessage}</small>
    </div>
    `;
}
// Fonction qui permet de modifier le style de l'input number
function inputNumber(el) {
    let min = el.getAttribute('min') || false;
    let max = el.getAttribute('max') || false;

    let els = {};

    els.dec = el.previousElementSibling;
    els.inc = el.nextElementSibling;

    init(el);

    function init(el) {
        els.dec.addEventListener('click', decrement);
        els.inc.addEventListener('click', increment);

        function decrement() {
            let value = parseInt(el.value);
            value--;
            if(!min || value >= min) {
                el.value = value;
            }
        }

        function increment() {
            let value = parseInt(el.value);
            value++;
            if(!max || value <= max) {
                el.value = value;
            }
        }
    }
}

let inputNumbers = document.querySelectorAll('.input-number');
inputNumbers.forEach(inputNumber);

// Formatage de la date
function formatDate(timestamp) {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year} à ${hours}:${minutes}`;
}
function formatDateSansh(timestamp) {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${day} ${month} ${year}`;
}
// Input qui permet de faire la recherche

// Fonction Login
function loginFormHeader(BtnLogin) {
    BtnLogin.addEventListener('click', async (ev) => {
        ev.preventDefault();
        const body = document.querySelector('body');
        // Créer l'élément dialog
        const dialog = document.createElement('dialog');
        dialog.setAttribute('id', 'dialog');
        dialog.className = 'dialog_modal';
        body.appendChild(dialog);
        dialog.innerHTML = '';
        await fetch('src/php/fetch/registerLogin/login.php')
            .then(response => response.text())
            .then(data => {
                dialog.innerHTML = data;

                // Afficher le dialog
                dialog.showModal();
                document.addEventListener('click', (ev) => {
                    if (ev.target.id === 'closeDialog') {
                        closeModalDialog();
                    }
                });
                // Gestion du bouton "S'inscrire" sur la page de connexion
                const btnSignIn = document.querySelector('#btnSignIn')
                btnSignIn.addEventListener('click', async (ev) => {
                    registerHeader(btnSignIn);
                });
            });
        const formLogin = document.querySelector('#login-form');
        formLogin.addEventListener('submit', (ev) => {
            ev.preventDefault();
            fetch('src/php/fetch/registerLogin/login.php', {
                method: 'POST',
                body: new FormData(formLogin)
            })
                .then(response => response.json())
                .then(data => {
                    let message = document.querySelector('#errorMsg');
                    if (data.status === 'success') {
                        message.innerHTML = data.message;
                        displaySuccess(message);
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    }
                    if (data.status === 'error') {
                        message.innerHTML = data.message;
                        displayError(message);
                    }
                });
        });
    });
}
// Fonction Register
function registerHeader(BtnRegister) {
    BtnRegister.addEventListener('click', async (ev) => {
        const body = document.querySelector('body');
        // Créer l'élément dialog
        const dialog = document.createElement('dialog');
        dialog.setAttribute('id', 'dialog');
        dialog.className = 'dialog_modal';
        body.appendChild(dialog);
        dialog.innerHTML = '';
        // Affichage du formulaire d'inscription
        await fetch('src/php/fetch/registerLogin/register.php')
            .then(response => response.text())
            .then(data => {
                // Insérer le contenu de la réponse dans l'élément dialog
                dialog.innerHTML = data;
                // Afficher le dialog
                dialog.showModal();
                document.addEventListener('click', (ev) => {
                    if (ev.target.id === 'closeDialog') {
                        closeModalDialog();
                    }
                });

            });
        const formRegister = document.querySelector('#resgister-form');
        formRegister.addEventListener('submit', (ev) => {
            ev.preventDefault();
            fetch('src/php/fetch/registerLogin/register.php', {
                method: 'POST',
                body: new FormData(formRegister)
            })
                .then(response => response.json())
                .then(data => {
                    let message = document.querySelector('#errorMsg');
                    if (data.status === 'success') {
                        message.innerHTML = data.message;
                        displaySuccess(message);
                    }
                    if (data.status === 'error') {
                        message.innerHTML = data.message;
                        displayError(message);
                    }
                });
        });
    });
}

function addSignInClickHandler() {
    const btnSignIn = document.querySelector('#btnSignIn')
    btnSignIn.addEventListener('click', async (ev) => {
        closeModalDialog();
        registerHeader(btnSignIn);
    });
}

function closeModalDialog() {
    let dialog = document.querySelector("#dialog");
    dialog.close();
    dialog.remove();
}
async function searchBarHeader() {

}
function messagePopup(message, status) {
    const body = document.querySelector('body');
    const dialog = document.createElement('dialog');
    dialog.setAttribute('id', 'dialog_message');
    dialog.className = 'd_message';
    body.appendChild(dialog);
    dialog.innerHTML = message;
    dialog.showModal();
    setTimeout(() => {
        dialog.close();
        dialog.remove();
    }, 2000);

    if (status === 'success') {
        dialog.classList.add('success_dialog_message');
    } else if (status === 'error') {
        dialog.classList.add('error_dialog_message');
    }
}

// Input qui permet de faire la recherche
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
                    <p class="absolute flex items-center justify-center rounded-full h-4 w-4 bg-[#A87EE6FF]">
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
                    <div class="absolute flex flex-col items-around space-y-2">
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
                    <p class="absolute flex items-center justify-center rounded-full h-4 w-4 bg-[#A87EE6FF]">
                        <span class="text-white text-xs">${nbProduits}</span>
                    </p>
                `;
                const cartDivHeader = document.createElement("dialog");
                cartDivHeader.setAttribute('class', 'absolute top-[21vh] left-[78vw] transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-80 rounded-lg shadow-lg');
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

export { displayError, displaySuccess, formatDate, formatDateSansh, loginFormHeader, registerHeader,
    closeModalDialog, displayErrorMessageFormUpdateProduct, displaySuccessMessageFormUpdateProduct,
    addSignInClickHandler, searchBarHeader, messagePopup, searchHeader, displayUserInfoHeader, cartHeader};