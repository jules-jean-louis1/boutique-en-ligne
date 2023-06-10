<?php
session_start();
require './vendor/autoload.php';

use App\Controller\HomeController;
$HomeController = new HomeController();
$router = new AltoRouter();

$router->setBasePath('/wellgames');

// home Page
$router->map('GET', '/', function() use ($HomeController) {
    $HomeController->index();
});
$router->map('GET', '/lastGame', function() use ($HomeController) {
    $HomeController->lastGame();
});
$match = $router->match();

if( $match && is_callable( $match['target'] ) ) {
    call_user_func_array( $match['target'], $match['params'] );
} else {
    // no route was matched
    http_response_code(404);
    ?>
    <h1 class="text-center font-bold">404 Page Not Found</h1>
    <?php
}
?>
