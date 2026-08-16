<?php 
require_once 'Connexion.php' ;
require_once 'Route.php' ;    
require_once 'RestReponse.php' ;    
require_once 'RouteSQL.php' ;

class RouteSqlDelete extends RouteSQL
{
    public function __construct( string $chemin, string $sql, string $translate )
    {
        parent::__construct( $chemin, "DELETE", $sql, $translate ) ;
    }

    public function run( RestRequest $request, Array $params )
    {
        $sql = $this->sql ;
        $db = Connexion::getInstance() ;

        $sth = $db->prepare( $sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
        foreach( $_POST as $param => $value )
        {
            $sth->bindValue( $param, $value ) ;
        }

        try
        {
            $sth->execute() ;

            $data = $sth->fetchAll( PDO::FETCH_ASSOC ) ;

            return new RestReponse( $data, "" ) ;
        }
        catch( PDOException $e )
        {
            return new RestReponse( Array(), "RouteSqlDelete->run: ". $sql . " " .$e->getMessage() ) ;
        }
    }   
}





?>