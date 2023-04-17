<?php
require_once "Database.php";
class Cart extends Database
{
    public function __construct()
    {
        parent::__construct();
    }
    public function verifyIfCartExist($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT * FROM cart WHERE users_id = :id");
        $req->execute(array(
            "id" => $id
        ));
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        if (count($result) > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function createCart($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("INSERT INTO cart (created_at_cart, modified_at_cart, users_id) VALUES (NOW(), NOW(), :id)");
        $req->execute(array(
            "id" => $id
        ));
    }
    public function AddProductToClientCart($userId, $productId, $quantityProduct)
    {
        $bdd = $this->getBdd();
        // On récupère le prix du produit lors de l'ajout au panier
        $req = $bdd->prepare("SELECT price_product FROM product WHERE id_product = :id");
        $req->execute(["id" => $userId]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        $priceProduct = $result[0]['price_product'];

        // Vérifie si le produit existe déjà dans la table cart_product
        $req2 = $bdd->prepare("SELECT * FROM cart_product WHERE cart_id = (SELECT id_cart FROM cart WHERE users_id = :userId AND status_cart = 'active') AND product_id = :productId");
        $req2->execute(["userId" => $userId, "productId" => $productId]);
        $result2 = $req2->fetchAll(PDO::FETCH_ASSOC);
        if (count($result2) > 0) {
            // Si le produit existe déjà dans la table cart_product, on met à jour la quantité et le prix
            $req4 = $bdd->prepare("SELECT id, quantity_product, price_product FROM cart_product WHERE product_id = :productId AND cart_id = (SELECT id_cart FROM cart WHERE users_id = :userId AND status_cart = 'active')");
            $req4->execute(["userId" => $userId, "productId" => $productId]);
            $result4 = $req4->fetchAll(PDO::FETCH_ASSOC);

            $UpdateQuantityProduct = $result4[0]['quantity_product'] + $quantityProduct;
            $UpdatePriceProduct = $result4[0]['price_product'] * $quantityProduct;

            // Si le produit existe déjà dans la table cart_product, on met à jour la quantité et le prix
            $req3 = $bdd->prepare("UPDATE cart_product SET quantity_product = :quantity, price_product = :price WHERE cart_id = (SELECT id_cart FROM cart WHERE users_id = :userId AND status_cart = 'active') AND product_id = :productId");
            $req3->execute(["quantity" => $UpdateQuantityProduct, "price" => $priceProduct, "userId" => $userId, "productId" => $productId]);

            // Mettre à jour le prix total du panier
            // Récupérer le prix total du panier et ajouter le nouveau prix
            $req5 = $bdd->prepare("SELECT total_price_cart FROM cart WHERE users_id = :userId AND status_cart = 'active'");
            $req5->execute(["userId" => $userId]);
            $result5 = $req5->fetchAll(PDO::FETCH_ASSOC);

            $totalPriceCart = $result5[0]['total_price_cart'] + $UpdatePriceProduct;

            // Mettre à jour le prix total du panier
            $req6 = $bdd->prepare("UPDATE cart SET total_price_cart = :totalPriceCart, modified_at_cart = NOW() WHERE users_id = :userId AND status_cart = 'active'");
            $req6->execute(["totalPriceCart" => $totalPriceCart, "userId" => $userId]);

            return true;
        } else {
            // Recupere le cart de l'utilisateur
            $req = $bdd->prepare("SELECT id_cart FROM cart WHERE users_id = :userId AND status_cart = 'active'");
            $req->execute(["userId" => $userId]);
            $result = $req->fetchAll(PDO::FETCH_ASSOC);
            $cartId = $result[0]['id_cart'];
            // Si le produit n'existe pas dans la table cart_product, on l'insère
            $req3 = $bdd->prepare("INSERT INTO cart_product (quantity_product, price_product, cart_id, product_id) VALUES (:quantity, :price, :id_cart, :id_product)");
            $req3->execute(["quantity" => $quantityProduct, "price" => $priceProduct, "id_cart" => $cartId, "id_product" => $productId]);

            // Mettre à jour le prix total du panier dans la table cart
            $req4 = $bdd->prepare("SELECT total_price_cart FROM cart WHERE id_cart = :cart_id");
            $req4->execute(["cart_id" => $cartId]);
            $result4 = $req4->fetchAll(PDO::FETCH_ASSOC);
            $totalPriceCart = $result4[0]['total_price_cart'] + $priceProduct;

            $req5 = $bdd->prepare("UPDATE cart SET total_price_cart = :total_price_cart, modified_at_cart = NOW() WHERE id_cart = :cart_id");
            $req5->execute(["total_price_cart" => $totalPriceCart, "cart_id" => $cartId]);
            return true;
        }
    }
    public function test($userId,$productId, $quantityProduct, $priceProduct)
    {
        $bdd = $this->getBdd();
        $req4 = $bdd->prepare("SELECT id, quantity_product, price_product FROM cart_product WHERE product_id = :productId AND cart_id = (SELECT id_cart FROM cart WHERE users_id = :userId AND status_cart = 'active')");
        $req4->execute(["userId" => $userId, "productId" => $productId]);
        $result4 = $req4->fetchAll(PDO::FETCH_ASSOC);

        $UpdateQuantityProduct = $result4[0]['quantity_product'] + $quantityProduct;
        $UpdatePriceProduct = $result4[0]['price_product'] * $quantityProduct;
        return $UpdateQuantityProduct;
    }
    function addProductToCart($productId, $userId, $quantity) {

        $pdo = $this->getBdd();
        // Récupérer le produit depuis la base de données
        $productQuery = "SELECT price_product FROM product WHERE id_product = :productId";
        $productStmt = $pdo->prepare($productQuery);
        $productStmt->execute(['productId' => $productId]);
        $product = $productStmt->fetch(PDO::FETCH_ASSOC);
        if (!$product) {
            // Le produit n'existe pas
            return false;
        }
        $productPrice = $product['price_product'];

        // Vérifier si le produit est déjà dans le panier de l'utilisateur
        $cartQuery = "SELECT id_cart_product, quantity_product FROM cart_product WHERE product_id = :productId AND cart_id = (SELECT id_cart FROM cart WHERE users_id = :userId AND status_cart = 'active')";
        $cartStmt = $pdo->prepare($cartQuery);
        $cartStmt->execute(['productId' => $productId, 'userId' => $userId]);
        $cartProduct = $cartStmt->fetch(PDO::FETCH_ASSOC);
        if ($cartProduct) {
            // Le produit est déjà dans le panier, mettre à jour la quantité
            $cartProductId = $cartProduct['id_cart_product'];
            $newQuantity = $cartProduct['quantity_product'] + $quantity;
            $updateQuery = "UPDATE cart_product SET quantity_product = :newQuantity, price_product = :productPrice * :newQuantity WHERE id_cart_product = :cartProductId";
            $updateStmt = $pdo->prepare($updateQuery);
            $updateStmt->execute(['newQuantity' => $newQuantity, 'productPrice' => $productPrice, 'cartProductId' => $cartProductId]);
        } else {
            // Le produit n'est pas dans le panier, l'ajouter
            $cartId = getActiveCartId($userId);
            $insertQuery = "INSERT INTO cart_product (quantity_product, price_product, cart_id, product_id) VALUES (:quantity, :productPrice * :quantity, :cartId, :productId)";
            $insertStmt = $pdo->prepare($insertQuery);
            $insertStmt->execute(['quantity' => $quantity, 'productPrice' => $productPrice, 'cartId' => $cartId, 'productId' => $productId]);
        }
        return true;
    }

    function getActiveCartId($userId) {
        // Récupérer l'ID du panier actif de l'utilisateur
        $cartQuery = "SELECT id_cart FROM cart WHERE users_id = :userId AND status_cart = 'active'";
        $cartStmt = $pdo->prepare($cartQuery);
        $cartStmt->execute(['userId' => $userId]);
        $cart = $cartStmt->fetch(PDO::FETCH_ASSOC);
        if (!$cart) {
            // L'utilisateur n'a pas de panier actif, en créer un nouveau
            $insertQuery = "INSERT INTO cart (total_price_cart, status_cart, users_id) VALUES (0, 'active', :userId)";
            $insertStmt = $pdo->prepare($insertQuery);
            $insertStmt->execute(['userId' => $userId]);
            $cartId = $pdo->lastInsertId();
        } else {
            $cartId = $cart['id_cart'];
        }
        return $cartId;
    }

}