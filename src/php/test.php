<?php
// 1. Démarrer la session
session_start();
// 2. Écrire une valeur test
if( !isset($_SESSION['test']) ) $_SESSION['test'] = 'ok_' . time();
// 3. Afficher l'état
echo '<pre>';
echo "time             : " . time() . "\n" ;
echo "session_id()     : " . session_id() . "\n";
echo "session_status() : " . session_status() . " (2 = active)\n";
echo "save_handler     : " . ini_get('session.save_handler') . "\n";
echo "save_path        : " . ini_get('session.save_path') . "\n";
echo "cookie_secure    : " . ini_get('session.cookie_secure') . "\n";
echo "cookie_samesite  : " . ini_get('session.cookie_samesite') . "\n";
echo "\$_SESSION        : ";
var_dump($_SESSION);
// 4. Vérifier que le fichier session existe
$path = session_save_path() ?: sys_get_temp_dir();
$file = $path . '/sess_' . session_id();
echo "Fichier session  : " . $file . "\n";
echo "Fichier existe   : " . (file_exists($file) ? "OUI" : "NON") . "\n";
echo '</pre>';

?>

