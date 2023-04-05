
// fonction de gestion des produits
async function gestionProduit() {
    const buttonAddProduct = document.createElement('button');
    buttonAddProduct.classList.add('btn', 'btn-primary', 'btn-sm', 'm-2');
    buttonAddProduct.textContent = 'Ajouter un produit';
    buttonAddProduct.setAttribute('id', 'buttonAddProduct');
    const containerButtonAddProduct = document.querySelector('#displayProduct');
    containerButtonAddProduct.appendChild(buttonAddProduct);
}