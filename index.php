<?php
session_start();
require './vendor/autoload.php';

use App\Controller\
    {HomeController,
    ProductController,
    AuthController,
    };
$HomeController = new HomeController();
$AuthController = new AuthController();
$ProductController = new ProductController();
$router = new AltoRouter();

$router->setBasePath('/wellgames');

// Auth
// login
$router->map('POST', '/login/submit', function() use ($AuthController) {
    $AuthController->login();
});
// register
$router->map('POST', '/register/submit', function() use ($AuthController) {
    $AuthController->register();
});
// logout
$router->map('GET', '/logout', function() use ($AuthController) {
    $AuthController->logout();
});
// HeaderInfo
$router->map('GET', '/headerInfo', function() use ($AuthController) {
    $AuthController->headerInfo();
});

// search Game
$router->map('GET', '/search/[a:query]', function($query) use ($HomeController) {
    $HomeController->search($query);
});
// home Page
$router->map('GET', '/', function() use ($HomeController) {
    $HomeController->index();
});
// trending
$router->map('GET', '/trending', function() use ($HomeController) {
    $HomeController->trending();
});
$router->map('GET', '/lastGame', function() use ($HomeController) {
    $HomeController->lastGame();
});

// Product PAGE
$router->map('GET', '/product/[i:id]', function($id) use ($ProductController) {
    $gameDetails = $ProductController->product($id);
    $ProductController->showPage($gameDetails);
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
