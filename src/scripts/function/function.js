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
// Formatage de la date
function formatDate(timestamp) {
    const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year} à ${hours}:${minutes}`;
}
function formatDateSansh(timestamp) {
    const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year}`;
}

// Fonction Login
function loginFormHeader(BtnLogin) {
    BtnLogin.addEventListener('click', async (ev) => {
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

export { displayError, displaySuccess, formatDate, formatDateSansh, loginFormHeader, registerHeader, closeModalDialog };