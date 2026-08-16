<?php 
require_once 'Connexion.php' ;
require_once 'Route.php' ;    
require_once 'RestReponse.php' ;    
require_once 'RouteSQL.php' ;

class RouteSqlSelect extends RouteSQL
{
    public function __construct( string $chemin, string $sql, string $translate )
    {
        parent::__construct( $chemin, "GET", $sql, $translate ) ;
    }

    public function run( RestRequest $request, Array $params )
    {
        $index = 0 ;
        $count = 999999999 ;
        $db = Connexion::getInstance() ;

        $sql = $this->sql ;
        if( isset( $params["_index_"] ) &&  isset($params["_count_"]) )
        {
            $sql .= " limit :_count_ offset :_index_" ;
        }

        $sth = $db->prepare( $sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
        foreach( $params as $param => $value )
        {
            if( $param == "_count_" ) $sth->bindValue( $param, $value, PDO::PARAM_INT ) ;
            else if( $param == "_index_" ) $sth->bindValue( $param, $value, PDO::PARAM_INT ) ;
            else $sth->bindValue( $param, $value ) ;
        }

        try
        {
            $sth->execute() ;

            $data = $sth->fetchAll( PDO::FETCH_ASSOC ) ;

            return new RestReponse( $data, "" ) ;
        }
        catch( PDOException $e )
        {
            return new RestReponse( Array() , "RouteSqlSelect->run: ". $sql . " " .$e->getMessage() ) ;
        }
    }   
}





?>