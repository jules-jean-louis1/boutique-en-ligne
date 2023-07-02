<?php
require_once "../../Classes/Product.php";

$productID = intval($_POST['product_id']);
$errors = [];

if (!empty($_FILES['image'])) {
    // Parcourir tous les fichiers
    foreach ($_FILES as $key => $file) {
        // Vérifier si un fichier a été envoyé
        if ($file['error'] === UPLOAD_ERR_OK) {
            // Vérifier si le fichier est une image
            if (getimagesize($file['tmp_name'])) {
                // Vérifier la taille du fichier (ne doit pas dépasser 2 Mo)
                if ($file['size'] <= 2 * 1024 * 1024) {
                    // Vérifier le format d'image (jpeg, gif, png, webp)
                    $allowedFormats = ['image/jpeg', 'image/gif', 'image/png', 'image/webp'];
                    if (in_array($file['type'], $allowedFormats)) {
                        // Définir le nom et le chemin de destination du fichier
                        $targetDir = '../../public/images/produits/';
                        $fileName = $productID . '_' . basename($file['name']);
                        $targetPath = $targetDir . $fileName;

                        // Déplacer le fichier vers le répertoire cible
                        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
                            // Vérifier si le bouton radio correspondant est coché
                            $isBanner = isset($_POST['banner']) && $_POST['banner'] === $key;
                            $img_product = new Product();
                            $isBanner = htmlspecialchars($isBanner);
                            $fileName = htmlspecialchars($fileName);
                            $img_product->addImageToProduct($productID, $fileName, $isBanner);
                            // Utiliser $isBanner et $fileName pour effectuer les opérations nécessaires (par exemple, enregistrer le nom de l'image dans la base de données)

                            // Afficher un message de succès
                            $errors[] = "L'image $fileName a été ajoutée avec succès.";
                        } else {
                            // Afficher un message d'erreur si le déplacement du fichier a échoué
                            $errors[] = "Une erreur s'est produite lors du déplacement du fichier $fileName.";
                        }
                    } else {
                        // Afficher un message d'erreur si le format d'image n'est pas autorisé
                        $errors[] = "Le format d'image $key n'est pas autorisé.";
                    }
                } else {
                    // Afficher un message d'erreur si la taille du fichier dépasse 2 Mo
                    $errors[] = "La taille du fichier $key dépasse la limite autorisée (2 Mo).";
                }
            } else {
                // Afficher un message d'erreur si le fichier n'est pas une image
                $errors[] = "Le fichier $key n'est pas une image valide.";
            }
        }
    }
} else {
    // Afficher un message d'erreur si aucun fichier n'a été envoyé
    $errors[] = "Aucun fichier n'a été envoyé.";
}

foreach ($errors as $error) {
    echo $error . '<br>';
}



?>

