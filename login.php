<?php

require "config.php";

header("Content-Type: application/json");

$dados = json_decode(file_get_contents("php://input"), true);

$senha = $dados["senha"] ?? "";

if($senha === $senhaAdmin){

    $_SESSION["admin"] = true;

    echo json_encode([
        "status" => "ok"
    ]);

}else{

    echo json_encode([
        "status" => "erro"
    ]);

}