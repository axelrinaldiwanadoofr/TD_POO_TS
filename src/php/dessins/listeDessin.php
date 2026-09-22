<?php
require_once "../Connexion.php" ;

// Recupère la liste des dessins

try
{
    $bd = Connexion::getInstance() ;


        $sql = "select id, nom from dessins order by nom" ;

        $cursor = $bd->prepare( $sql ) ;
        $cursor->execute() ;

        $data = $cursor->fetchAll( PDO::FETCH_ASSOC ) ;

        echo json_encode( $data ) ;
}
catch( PDOException $erreur )
{
    $message = $erreur->getMessage() ;
    echo "Probleme d'acces à la BD " . $message ;
}


?>