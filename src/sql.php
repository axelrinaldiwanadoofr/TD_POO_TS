<?php

// toto

//$sql = $_GET["sql"] ;
//$sql = $_POST["sql"] ;

// Test de chiffrement / déchiffrement

$algo_chiffrement_dechiffrement = "aes-128-cbc" ;
$key = "Ceci est ma clé " ;
$iv =  "Ceci est mon iv_" ;

$message = "Bonjour, nous allons faire un test de chiffrement d'un message" ;

// On recupère les méthodes de chiffrment disponibles
$les_algo_dispo = openssl_get_cipher_methods() ;

if( in_array( $algo_chiffrement_dechiffrement, $les_algo_dispo ) )
{
    echo "Message: " . $message . "<br>" ;

    $messageChiffre = openssl_encrypt( 
        $message,
        $algo_chiffrement_dechiffrement,
        $key,
        0,
        $iv ) ;

    echo "Message chiffré: " . $messageChiffre . "<br>" ;

    $messageOriginal = openssl_decrypt( 
        $messageChiffre,
        $algo_chiffrement_dechiffrement,
        $key,
        0,
        $iv ) ;

    echo "Message original: " . $messageOriginal . "<br>" ;



    
}

/*
$host = '127.0.0.1';
$port = 3306 ;
$db   = 'dessin2d';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";

$pdo = new PDO($dsn, $user, $pass );

$curseur = $pdo->query( $sql ) ;

$resultat = $curseur->fetchAll( PDO::FETCH_ASSOC ) ;

echo json_encode( $resultat ) ;
*/

?>