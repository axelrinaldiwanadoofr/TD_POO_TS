<?php 
// Auto chargement des fichiers de classe à la demande
spl_autoload_register(function (string $className) {
    require __DIR__ . "/" . $className . '.php';
});

session_start() ;
unset( $_SESSION["routeur"] ) ;

$routeur = null ;
$route = null ;

if( !isset( $_SESSION['routeur'] ) )
{
    $routeur = new Routeur() ;

    $routeur->addRoute( new RouteSqlSelect( 'exposants/id/:id', "select id, exposant from Exposants where id=:id", "" ) ) ;
    $routeur->addRoute( new RouteSqlSelect( "exposants/all/_index_/:_index_/_count_/:_count_", "select id, exposant from Exposants", "" ) ) ;
    $routeur->addRoute( new RouteSqlSelect( "exposants/all", "select id, exposant from Exposants", "" ) ) ;
    $routeur->addRoute( new RouteSqlInsert( 'exposants', 
        "insert into Exposants( id, exposant ) values( :id, :exposant)", 
        "select max(id)+1 as id from Exposants",
        "" ) ) ;
    $routeur->addRoute( new RouteSqlUpdate( 'exposants/id/:id',
        "update Exposants set exposant = :exposant where id=:id", "" ) ) ;
    $routeur->addRoute( new RouteSqlDelete( 'exposants/id', 
        "delete from Exposants where id=:id", "" ) ) ;

    $_SESSION['routeur'] = $routeur ;
    $_SESSION['route'] = null ;
}
else
{
    $routeur = $_SESSION['routeur'] ;
    $route = $_SESSION['route'] ;
}   


if( !$route )
{
    // Etape 1: recherche d'une route
    
    $request = RestRequest::createRequest() ;

    $route = $routeur->find( $request ) ;
    if( $route )
    {
        $_SESSION['route'] = $route ;
        $rep = new RestReponse( ["route" => $request] ) ;
        $rep->send() ;
    }
    else 
    {
        $rep = new RestReponse( [], "Route " . $request . " non trouvée" ) ;
        //$rep = new RestReponse( [], "Route " . " non trouvée" ) ;
        $rep->send() ;
    }
}
else
{
    // Etape 2: traitement associé à la route

    $_SESSION['route'] = null ;
    $routeur->run( $route )->send() ;
}
    
?>