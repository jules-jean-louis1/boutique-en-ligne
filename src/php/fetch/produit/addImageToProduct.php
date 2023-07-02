<?php
require_once "../../Classes/Product.php";

$productID = intval($_POST['product_id']);
$errors = [];
$fileUploaded = false;

for ($i = 1; $i <= 7; $i++) {
    if (!empty($_FILES['image' . $i]['name'])) {
        $fileUploaded = true;

        if ($_FILES['image' . $i]['error'] === UPLOAD_ERR_OK) {
            // Vérifier si le fichier est une image
            if (getimagesize($_FILES['image' . $i]['tmp_name'])) {
                // Vérifier la taille du fichier (ne doit pas dépasser 2 Mo)
                if ($_FILES['image' . $i]['size'] <= 2 * 1024 * 1024) {
                    // Vérifier le format d'image (jpeg, gif, png, webp)
                    $allowedFormats = ['image/jpeg', 'image/gif', 'image/png', 'image/webp'];
                    if (in_array($_FILES['image' . $i]['type'], $allowedFormats)) {
                        // Définir le nom et le chemin de destination du fichier
                        $targetDir = '../../../../public/images/produits/';
                        $fileName = $productID . '_' . basename($_FILES['image' . $i]['name']);
                        $targetPath = $targetDir . $fileName;

                        // Déplacer le fichier vers le répertoire cible
                        if (move_uploaded_file($_FILES['image' . $i]['tmp_name'], $targetPath)) {
                            // Vérifier si le bouton radio correspondant est coché
                            $isBanner = isset($_POST['banner']) && $_POST['banner'] === 'image' . $i;
                            $img_product = new Product();
                            $isBanner = htmlspecialchars($isBanner);
                            $fileName = htmlspecialchars($fileName);
                            $img_product->addImageToProduct($productID, $fileName, $isBanner);
                            // Utiliser $isBanner et $fileName pour effectuer les opérations nécessaires (par exemple, enregistrer le nom de l'image dans la base de données)

                            // Ajouter un message de succès
                            $errors['success'][] = "L'image $fileName a été ajoutée avec succès.";
                        } else {
                            // Ajouter un message d'erreur si le déplacement du fichier a échoué
                            $errors['error'][] = "Une erreur s'est produite lors du déplacement du fichier $fileName.";
                        }
                    } else {
                        // Ajouter un message d'erreur si le format d'image n'est pas autorisé
                        $errors['error'][] = "Le format d'image image$i n'est pas autorisé.";
                    }
                } else {
                    // Ajouter un message d'erreur si la taille du fichier dépasse 2 Mo
                    $errors['error'][] = "La taille du fichier image$i dépasse la limite autorisée (2 Mo).";
                }
            } else {
                // Ajouter un message d'erreur si le fichier n'est pas une image
                $errors['error'][] = "Le fichier image$i n'est pas une image valide.";
            }
        }
    }
}

if (!$fileUploaded) {
    $errors['error'][] = "Aucun fichier n'a été envoyé.";
}

header("Content-Type: application/json");
echo json_encode($errors);



?>

