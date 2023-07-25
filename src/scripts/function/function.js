// Fonction pour la gestion des messages d'erreurs
function displayError(message) {
    message.classList.add('alert-danger');
    message.classList.remove('alert-success');
    message.style.display = 'block';
    // Effacer le message après 3 secondes
    setTimeout(() => {
        message.style.display = 'none';
    }, 5000);
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
        const dialogLogin = document.createElement('dialog');
        dialogLogin.setAttribute('id', 'dialog_fixed');
        dialogLogin.className = 'dialog_modal border-[1px] border-[#a8b3cf33] rounded-[14px] p-2 bg-[#242629] bg-overlay bg-overlay-primary';
        body.appendChild(dialogLogin);
        dialogLogin.innerHTML = '';
        await fetch('src/php/fetch/registerLogin/login.php')
            .then(response => response.text())
            .then(data => {
                dialogLogin.innerHTML = data;
                // Afficher le dialog
                dialogLogin.showModal();
                // Fermer le dialog
                const closeDialog = document.querySelector('#closeDialog');
                closeDialog.addEventListener('click', (ev) => {
                    ev.preventDefault();
                    dialogLogin.close();
                });
                // Gestion du bouton "S'inscrire" sur la page de connexion
                const btnSignIn = document.querySelector('#btnSignIn')
                btnSignIn.addEventListener('click', async (ev) => {
                    ev.preventDefault();
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
        dialog.className = 'dialog_modal dialog_modal border-[1px] border-[#a8b3cf33] rounded-[14px] p-2 bg-[#242629] bg-overlay bg-overlay-primary';
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
function updateField(data, fieldName, fieldInput, smallField) {
    if (data[fieldName]) {
        fieldInput.addEventListener('keyup', () => {
            const fieldValue = fieldInput.value;
            if (fieldValue === ''){
                smallField.innerHTML = '';
                smallField.innerHTML = `${data[fieldName]}`;
                smallField.classList.add('text-red-500');
                fieldInput.classList.remove('textField_border');
                fieldInput.classList.add('textField_invalid');
            } else {
                smallField.innerHTML = '';
                fieldInput.classList.remove('textField_invalid');
                fieldInput.classList.add('textField_border');
            }
        });
        smallField.innerHTML = '';
        smallField.innerHTML = `${data[fieldName]}`;
        fieldInput.classList.remove('textField_border');
        smallField.classList.add('text-red-500');
        fieldInput.classList.add('textField_invalid');
    }
}
export function displayMessage(state, container, message) {
    if (state === 'success') {
        container.innerHTML = `
        <div class="w-full flex items-center py-3 px-2 space-x-3 bg-opacity-50 backdrop-filter backdrop-blur-lg hover:bg-opacity-75 hover:saturate-100 rounded-[14px] bg-[#cbf4f0] text-[#000] border-l-[3px] border-[#23a094]">
            <svg width="25" height="25" viewBox="0 0 24 24" stroke="#23a094" fill="#fff" class="p-0.5 bg-white items-center rounded-full" stroke-linejoin="round" stroke-width="1.736842105263158" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M16.253 10.1109L11.8891 14.4749C11.4986 14.8654 10.8654 14.8654 10.4749 14.4749L7.99999 12M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"></path></svg>
            <p class="text-lg">${message}</p>
        </div>`;
    } else if (state === 'error') {
        container.innerHTML = `
        <div class="w-full flex items-center py-3 px-2 space-x-3 bg-red-500/20 backdrop-filter backdrop-blur-lg hover:bg-opacity-75 hover:saturate-100 rounded-[14px] bg-[#f9d0d0] text-[#fff] border-l-[3px] border-[#e02424]">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-triangle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M10.24 3.957l-8.422 14.06a1.989 1.989 0 0 0 1.7 2.983h16.845a1.989 1.989 0 0 0 1.7 -2.983l-8.423 -14.06a1.989 1.989 0 0 0 -3.4 0z"/>
                <path d="M12 9v4"/>
                <path d="M12 17h.01"/>
            </svg>            
            <p class="text-lg">${message}</p>
        </div>`;
    }
}
// Amelioration du formulaire d'inscription
async function Login(btnLogin) {
    const containerForm = document.getElementById("containerLoginRegisterForm");
    containerForm.innerHTML = '';
    function createDialog() {
        const dialog = document.createElement("dialog");
        dialog.setAttribute("id", "dialog");
        dialog.setAttribute("class", "w-[26.25rem] h-[55%] bg-[#202225] border-[1px] border-[#a8b3cf33] rounded-[14px] shadow-lg z-50");
        dialog.innerHTML = '';

        const divBottom = document.createElement("div");
        divBottom.setAttribute("id", "divBottom");
        divBottom.setAttribute("class", "w-full flex items-center justify-center bg-[#202225] border-t-[1px] border-t-[#a8b3cf33] text-white rounded-b-[14px]");
        divBottom.innerHTML = `
            <div class="w-full flex items-center justify-center">
                <p class="text-sm" id="TextchangeLogin">Vous n'avez pas de compte ?</p>
                <button type="button" id="buttonLogin" class="p-4 bg-red rounded-lg">S'inscrire</button>
            </div>
        `;
        const Div = document.createElement("div");
        Div.setAttribute("id", "DivModifyText");
        Div.setAttribute("class", "py-2 px-4 w-full flex items-center justify-between bg-[#202225] border-b-[1px] border-b-[#a8b3cf33] text-white font-semibold text-lg rounded-t-[14px]");
        const Para = document.createElement("p")
        Para.setAttribute("id", "ParaModifyText");
        Para.textContent = "Se connecter sur Game+";

        const buttonClose = document.createElement("button");
        buttonClose.innerHTML = `
            <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
        `;
        buttonClose.setAttribute("id", "buttonClose");
        buttonClose.setAttribute("type", "button");
        buttonClose.setAttribute("class", "font-bold cursor-pointer select-none focus-outline justify-center flex z-1 rounded-[12px] hover:bg-[#a8b3cf1f]");

        const Divflex1 = document.createElement("div");
        Divflex1.setAttribute("class", "flex flex-1");

        const containerDiv = document.createElement("div");
        containerDiv.setAttribute("id", "containerDiv");
        containerDiv.setAttribute("class", "flex justify-center w-full h-[78%]");

        dialog.appendChild(Div);
        Div.appendChild(Para);
        Div.appendChild(buttonClose);
        dialog.appendChild(containerDiv);
        dialog.appendChild(Divflex1);
        dialog.appendChild(divBottom);
        containerForm.appendChild(dialog);
    }


    createDialog();
    const dialog = document.getElementById("dialog");
    const containerDiv = document.getElementById("containerDiv");
    btnLogin.addEventListener("click", () => {
        dialog.setAttribute("open", "");
        const main = document.querySelector("#background_container_dialog");
        main.classList.add("bg-overlay-quaternary-onion");
        const buttonLogin = document.getElementById("buttonLogin");
        const ParaModifyText = document.getElementById("ParaModifyText");
        fetch('src/php/fetch/registerLogin/login.php')
            .then(response => response.text())
            .then(data => {
                containerDiv.innerHTML = data;
                const formLogin = document.querySelector('#login-form');
                formLogin.addEventListener('submit', (ev) => {
                    ev.preventDefault();
                    fetch('src/php/fetch/registerLogin/login.php', {
                        method: 'POST',
                        body: new FormData(formLogin)
                    })
                        .then(response => response.json())
                        .then(data => {
                            const containerMessageProfil= document.getElementById("containerMessageProfil");
                            let message = document.querySelector('#errorMsg');
                            const loginInput = document.getElementById("login");
                            const passwordInput = document.getElementById("password");
                            // Small
                            const smallLogin = document.getElementById("errorLogin");
                            const smallPassword = document.getElementById("errorPassword");
                            updateField(data, 'login', loginInput, smallLogin);
                            updateField(data, 'password', passwordInput, smallPassword);

                            if (data.login || data.password) {
                                displayMessage("error", containerMessageProfil, "Veuillez remplir tous les champs");
                            }
                            if (data.error) {
                                displayMessage("error", containerMessageProfil, data.error)
                            }
                            if (data.success) {
                                displayMessage("success", containerMessageProfil, data.success)
                                main.classList.remove("bg-overlay-quaternary-onion");
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1000);
                            }
                        });
                });
            });
        buttonLogin.addEventListener("click", () => {
            if (buttonLogin.textContent === "Connexion") {
                buttonLogin.textContent = "S'inscrire";
                ParaModifyText.textContent = "S'inscrire sur Game+";
                fetch('src/php/fetch/registerLogin/login.php')
                    .then(response => response.text())
                    .then(data => {
                        containerDiv.innerHTML ='';
                        containerDiv.innerHTML = data;
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
                                    const loginInput = document.getElementById("login");
                                    const passwordInput = document.getElementById("password");
                                    // Small
                                    const smallLogin = document.getElementById("errorLogin");
                                    const smallPassword = document.getElementById("errorPassword");
                                    updateField(data, 'login', loginInput, smallLogin);
                                    updateField(data, 'password', passwordInput, smallPassword);

                                    if (data.login || data.password) {
                                        displayMessage("error", containerMessageProfil, "Veuillez remplir tous les champs")
                                    }
                                    if (data.error) {
                                        displayMessage("error", containerMessageProfil, data.error);
                                    }
                                    if (data.success) {
                                        displayMessage("success", containerMessageProfil, data.success)
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 1000);
                                    }
                                });
                        });
                    })
            } else {
                buttonLogin.textContent = "Connexion";
                ParaModifyText.textContent = "S'inscrire sur Game+";
                fetch('src/php/fetch/registerLogin/register.php')
                    .then(response => response.text())
                    .then(data => {
                        containerDiv.innerHTML ='';
                        containerDiv.innerHTML = data;
                        const formRegister = document.querySelector('#resgister-form');
                        formRegister.addEventListener('submit', (ev) => {
                            ev.preventDefault();
                            fetch('src/php/fetch/registerLogin/register.php', {
                                method: 'POST',
                                body: new FormData(formRegister)
                            })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    let message = document.querySelector('#errorMsg');
                                    const containerMessageProfil = document.getElementById("containerMessageProfil");
                                    const loginInput = document.getElementById("login");
                                    const emailInput = document.getElementById("E-mail");
                                    const passwordInput = document.getElementById("password");
                                    const passwordConfirmInput = document.getElementById("passwordConfirm");

                                    // Small
                                    const smallLogin = document.getElementById("errorLogin");
                                    const smallEmail = document.getElementById("errorEmail");
                                    const smallPassword = document.getElementById("errorPassword");
                                    const smallPasswordConfirm = document.getElementById("errorC_Password");

                                    updateField(data, 'login', loginInput, smallLogin);
                                    updateField(data, 'email', emailInput, smallEmail);
                                    updateField(data, 'password', passwordInput, smallPassword);
                                    updateField(data, 'passwordConfirm', passwordConfirmInput, smallPasswordConfirm);

                                    if (data.login || data.email || data.password || data.passwordConfirm) {
                                        containerMessageProfil.innerHTML = "";
                                        displayMessage("error", containerMessageProfil, "Veuillez remplir tous les champs");
                                    }
                                    if (data.errorLogin) {
                                        containerMessageProfil.innerHTML = "";
                                        displayMessage("error", containerMessageProfil, data.errorLogin);
                                    }
                                    if (data.errorEmail) {
                                        containerMessageProfil.innerHTML = "";
                                        displayMessage("error", containerMessageProfil, data.errorEmail);
                                    }
                                    if (data.validEmail) {
                                        containerMessageProfil.innerHTML = "";
                                        displayMessage("error", containerMessageProfil, data.validEmail);
                                    }
                                    if (data.errorPasswordConfirm) {
                                        containerMessageProfil.innerHTML = "";
                                        displayMessage("error", containerMessageProfil, data.errorPasswordConfirm);
                                    }
                                    if (data.errorPassword) {
                                        containerMessageProfil.innerHTML = "";
                                        displayMessage("error", containerMessageProfil, data.errorPassword);
                                    }
                                    if (data.success) {
                                        containerMessageProfil.innerHTML = "";
                                        displayMessage("success", containerMessageProfil, data.success);
                                    }
                                });
                        });
                    })
            }
        });
        const buttonClose = document.getElementById("buttonClose");
        buttonClose.addEventListener("click", () => {
            dialog.removeAttribute("open");
            main.classList.remove("bg-overlay-quaternary-onion");
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
export async function searchHeader() {
    const btnClearInput = document.getElementById("eraseSearches");
    const SearchBarHeader = document.getElementById("search_bar_form");
    let query = SearchBarHeader.value;
    if (query.length >= 2) {
        await fetch (`src/php/fetch/produit/searchBarProduct.php?query=${query}`)
            .then(response => response.json())
            .then(data => {
                const containerHeaderSearch = document.getElementById("containerSearchBarResultHeader");
                if (data.status === 'error') {
                    btnClearInput.classList.remove('hidden');
                    containerHeaderSearch.innerHTML = `
                <div class="bg-[#2D323C] hover:border-[#A87EE6FF] border-[1px] border-[#a8b3cf33] z-10 rounded-lg">
                    <p class="text-center text-[#a8b3cf] py-2">Aucun résultat</p>
                </div>`;
                }
                if (data.status === 'success') {
                    btnClearInput.classList.remove('hidden');
                    containerHeaderSearch.innerHTML = '';
                    let count = 0;
                    for (const product of data.data) {
                        if (count < 6) {
                            containerHeaderSearch.innerHTML += `
                            <div class="bg-[#2D323C] hover:border-[#A87EE6FF] border border-[#2D323C] z-10 rounded-lg">
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
                            </div>`;
                        }
                        count++;
                    }
                    if (count > 6) {
                        containerHeaderSearch.innerHTML += `
                        <a href="./search.php?search_bar_form=${query}" class="text-white p-2">Afficher tous les résultats</a>`;
                    }
                }
            });
        if (btnClearInput) {
            btnClearInput.addEventListener('click', () => {
                SearchBarHeader.value = '';
                btnClearInput.classList.add('hidden');
                const containerHeaderSearch = document.getElementById("containerSearchBarResultHeader");
                containerHeaderSearch.innerHTML = '';
            });
        }
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
    const containerCartHeader = document.getElementById("containerCartHeaderDiv");
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
                containerCartHeader.innerHTML = '';

                const cartDivHeader = document.createElement("div");
                cartDivHeader.setAttribute('class', 'absolute z-50 w-80 ml-[-130px] top-[57px]');
                cartDivHeader.setAttribute('id', 'cartDivHeader');

                cartDivHeader.innerHTML = '';
                cartButtonHeader.addEventListener('mouseenter', () => {
                    cartDivHeader.removeAttribute('hidden');
                    cartDivHeader.innerHTML = `
                    <div class="absolute flex flex-col items-around space-y-2 bg-[#2D323C] border border-[#a8b3cf33] rounded-lg shadow-lg ">
                        <div class="mt-2">
                            <p class="text-white text-center">Total : ${total} €</p>
                        </div>
                        <div id="containerCartHeader"></div>
                    </div>
                    `;

                    const containerCartHeader = document.getElementById("containerCartHeader");
                    for (const product of data.products) {
                        containerCartHeader.innerHTML += `
                        <div class="flex flex-row justify-between px-2 py-2 space-x-2 text-white">
                            <div class="flex flex-row items-center">
                                <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-12 rounded-lg">
                                <p class="ml-2">${product.name_product}</p>
                            </div>
                            <div class="flex flex-col items-start">
                                <p class="text-[#a87ee6] text-2xl font-bold">${product.price_product} €</p>
                                <p class="text-sm">Quantité :${product.quantity_product}</p>
                            </div>
                        </div>
                        `;
                    }

                });
                containerCartHeader.appendChild(cartDivHeader);
                cartButtonHeader.addEventListener('mouseleave', () => {
                    cartDivHeader.setAttribute('hidden', '');
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
                containerCartHeader.innerHTML = '';

                const cartDivHeader = document.createElement("div");
                cartDivHeader.setAttribute('class', 'absolute z-50 w-80 ml-[-130px] top-[57px]');
                cartDivHeader.setAttribute('id', 'cartDivHeader');

                cartDivHeader.innerHTML = '';
                cartButtonHeader.addEventListener('mouseenter', () => {
                    cartDivHeader.removeAttribute('hidden');
                    cartDivHeader.innerHTML = `
                    <div class="absolute flex flex-col items-around space-y-2 bg-[#2D323C] border border-[#a8b3cf33] rounded-lg shadow-lg ">
                        <div class="mt-2">
                            <p class="text-white text-center">Total : ${total} €</p>
                        </div>
                        <div id="containerCartHeader"></div>
                    </div>
                    `;
                    const containerCartHeader = document.getElementById("containerCartHeader");
                    for (const product of data.products) {
                        containerCartHeader.innerHTML += `
                        <div class="flex flex-row justify-between px-2 py-2 space-x-2 text-white">
                            <div class="flex flex-row items-center">
                                <img src="src/images/products/${product.img_product}" alt="${product.img_product}" class="h-12 rounded-lg">
                                <p class="ml-2">${product.name_product}</p>
                            </div>
                            <div class="flex flex-col items-start">
                                <p class="text-[#a87ee6] text-2xl font-bold">${product.price_product} €</p>
                                <p class="text-sm">Quantité :${product.quantity_product}</p>
                            </div>
                        </div>
                        `;
                    }
                });
                containerCartHeader.appendChild(cartDivHeader);
                cartButtonHeader.addEventListener('mouseleave', () => {
                    cartDivHeader.setAttribute('hidden', '');
                    cartDivHeader.innerHTML = '';
                });
            }
            if (data.status == 'error') {
                notifCartHeader.innerHTML = '';
                const cartDivHeader = document.createElement("dialog");
                cartDivHeader.setAttribute('class', 'absolute z-50 w-80 ml-[-130px] top-[57px]');
                cartDivHeader.setAttribute('id', 'cartDivHeader');

                cartDivHeader.addEventListener('mouseenter', () => {
                    cartDivHeader.removeAttribute('hidden');
                    cartDivHeader.innerHTML = `
                    <div class="flex flex-col items-center space-y-2">
                        <div class="mt-2">
                            <p class="text-[#a8b3cf]">Votre panier est vide</p>
                        </div>
                    </div>
                    `;
                });
                containerCartHeader.appendChild(cartDivHeader);
                cartButtonHeader.addEventListener('mouseleave', () => {
                    cartDivHeader.setAttribute('hidden', '');
                    cartDivHeader.innerHTML = '';
                });
            }
        });
}
export const displayMessageToast = (modalAppend, message, state) => {
    const dialogElement = document.createElement('div');
    dialogElement.innerHTML = '';
    dialogElement.setAttribute('class', 'bg-[#05a763] rounded-lg open h-fit w-fit');
    dialogElement.setAttribute('id', 'ToastSuccess');
    const container = document.createElement('div');
    if (state === 'success') {
        container.setAttribute('class', 'flex items-center justify-between gap-2 bg-[#05a763] rounded-lg');
    } else if (state === 'error') {
        container.setAttribute('class', 'flex items-center justify-between gap-2 bg-[#ff003d] rounded-lg');
    } else if (state === 'warning') {
        container.setAttribute('class', 'flex items-center justify-between gap-2 bg-[#ffd53d] rounded-lg');
    } else if (state === 'info') {
        container.setAttribute('class', 'flex items-center justify-between gap-2 bg-[#0148d2] rounded-lg');
    } else if (state === 'default') {
        container.setAttribute('class', 'flex items-center justify-between gap-2 bg-[#3d3d3d] rounded-lg');
    }
    container.innerHTML = `
    <div class="p-2">
        <div class="flex items-center justify-between gap-2">
            <div class="flex items-center" id="svg_container"></div>
            <div class="flex items-center">
                <p class=" text-white">${message}</p>
            </div>
            <div class="border-l border-white">
                <button id="closeToast" class="text-white hover:text-gray-400 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M18 6l-12 12"/>
                        <path d="M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>`;

    dialogElement.appendChild(container);
    modalAppend.appendChild(dialogElement);
    dialogElement.classList.add('open');
    const svgContainer = document.getElementById('svg_container');
    if (state === 'success') {
        svgContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
            <path d="M9 12l2 2l4 -4"/>
        </svg>
        `;
    } else if (state === 'error') {
        svgContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-triangle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10.24 3.957l-8.422 14.06a1.989 1.989 0 0 0 1.7 2.983h16.845a1.989 1.989 0 0 0 1.7 -2.983l-8.423 -14.06a1.989 1.989 0 0 0 -3.4 0z"/>
            <path d="M12 9v4"/>
            <path d="M12 17h.01"/>
        </svg>
        `;
    } else if (state === 'warning') {
        svgContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/>
            <path d="M12 9h.01"/>
            <path d="M11 12h1v4h1"/>
        </svg>
        `;
    } else if (state === 'info') {
        svgContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/>
            <path d="M12 9h.01"/>
            <path d="M11 12h1v4h1"/>
        </svg>
        `;
    }
    const closeToast = document.getElementById('closeToast');
    closeToast.addEventListener('click', () => {
        dialogElement.classList.remove('open');
        dialogElement.remove();
    });
    setTimeout(() => {
        dialogElement.classList.remove('open');
        dialogElement.remove();
    }, 3000);
}

export { displayError, displaySuccess, formatDate, formatDateSansh, loginFormHeader, registerHeader,
    closeModalDialog, displayErrorMessageFormUpdateProduct, displaySuccessMessageFormUpdateProduct,
    addSignInClickHandler, messagePopup, displayUserInfoHeader, cartHeader, Login};