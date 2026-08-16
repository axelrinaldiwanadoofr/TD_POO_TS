
<?php
header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];
$id = (int)($_GET['id'] ?? 0);

$pdo = new PDO('mysql:host=localhost;dbname=fdlcdb', 'root', 'root');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

switch ($method) {
  case 'GET':
    $stmt = $pdo->prepare('SELECT id, nom FROM Exposants WHERE id = ?');
    $stmt->execute([$id]);
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    break;

  case 'PUT':
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare('UPDATE Exposants SET exposant = ? WHERE id = ?');
    $stmt->execute([$data['nom'], $id]);
    echo json_encode(['id' => $id, 'nom' => $data['nom']]);
    break;

  default:
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
}
