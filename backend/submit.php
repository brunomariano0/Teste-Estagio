<?php
header('Content-Type: application/json; charset=utf-8');

// Apenas aceitar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

// Ler dados do POST
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validação básica
$errors = [];
if ($name === '') $errors[] = 'Nome é obrigatório.';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'E-mail inválido.';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// Inserir no banco
try {
    require_once __DIR__ . '/db.php';
    $pdo = getPDO();

    $stmt = $pdo->prepare('INSERT INTO subscribers (name, email, phone, message) VALUES (:name, :email, :phone, :message)');
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':message' => $message
    ]);

    echo json_encode(['success' => true, 'message' => 'Inscrição recebida. Obrigado!']);
} catch (Exception $e) {
    // Em produção, não retornar $e->getMessage() diretamente
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao salvar os dados.']);
}
