<?php

// toto

//$sql = $_GET["sql"] ;
//$sql = $_POST["sql"] ;

// Test de chiffrement / déchiffrement

$keyJsStringHex = "d9f7340c9bc71ffe6075be002dfcccd5" ;
$ivJsStringHex = "4eb1b0a59e32f28dc4d9fa8c93d6fe4e" ;
$resultatChiffreJsStringHex = "bb8a067d49d0b393a67f8a17f5eb0b6583219ad3bca16e07c9e3a84a8a152feef44b1270cbac7c36a76afde3076317d85fab17cf5d67b9115b0640ade5c9701f" ;


$algo_chiffrement_dechiffrement = "aes-128-cbc" ;

$key = hex2bin( $keyJsStringHex ) ;
$iv = hex2bin( $ivJsStringHex ) ;

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
    echo "Message chiffré string hex:<br>" . bin2hex( base64_decode( $messageChiffre) . "<br>" ) ;
    echo "Message chiffré en js: <br>" . $resultatChiffreJsStringHex . "<br>";

    $messageChiffre = hex2bin( $resultatChiffreJsStringHex . "3c62723e" ) ;
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

echo json_encode( $resultat )