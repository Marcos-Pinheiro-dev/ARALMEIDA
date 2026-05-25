<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require "database.php";

try{

    $json = file_get_contents("php://input");

    $dados = json_decode($json, true);

    if(!$dados){

        echo json_encode([
            "status" => "erro",
            "mensagem" => "JSON inválido"
        ]);

        exit;

    }

    $data = trim($dados["data"] ?? "");
    $nome = trim($dados["nome"] ?? "");

    if($data === "" || $nome === ""){

        echo json_encode([
            "status" => "erro",
            "mensagem" => "Campos vazios"
        ]);

        exit;

    }

    $sql = "INSERT INTO eventos (data, nome) VALUES (:data, :nome)";

    $stmt = $db->prepare($sql);

    if(!$stmt){

        echo json_encode([
            "status" => "erro",
            "mensagem" => "Erro ao preparar query"
        ]);

        exit;

    }

    $stmt->bindValue(":data", $data, SQLITE3_TEXT);
    $stmt->bindValue(":nome", $nome, SQLITE3_TEXT);

    $resultado = $stmt->execute();

    if($resultado){

        echo json_encode([
            "status" => "ok"
        ]);

    }else{

        echo json_encode([
            "status" => "erro",
            "mensagem" => "Falha ao executar INSERT"
        ]);

    }

}catch(Throwable $e){

    echo json_encode([
        "status" => "erro",
        "mensagem" => $e->getMessage()
    ]);

}