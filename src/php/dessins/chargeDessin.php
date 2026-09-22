<?php
require_once "../Connexion.php" ;

// Recupère les données du dessin dont le nom est donné par "nom"

try
{
    $bd = Connexion::getInstance() ;

    if( isset($_GET["nom"]) )
    {
        $nom = $_GET["nom"] ;

        $sql = "select f.id, nom, type, couleur, epaisseur, x1, y1, x2, y2, x3, y3, x4, y4, x5, y5 " ;
        $sql .= "from figures as f inner join dessins as d on idDessin = d.id " ;
        $sql .= "where nom = :nom" ;

        $cursor = $bd->prepare( $sql ) ;
        $cursor->bindValue( ":nom", $nom, PDO::PARAM_STR ) ;
        $cursor->execute() ;

        $data = $cursor->fetchAll( PDO::FETCH_ASSOC ) ;

        echo json_encode( $data ) ;
    }
    else
    {
      echo json_encode( [] ) ;  
    } 


}
catch( PDOException $erreur )
{
    $message = $erreur->getMessage() ;
    echo "Probleme d'acces à la BD " . $message ;
}


?>