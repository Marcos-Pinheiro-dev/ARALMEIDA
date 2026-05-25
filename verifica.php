<?php

require "config.php";

header("Content-Type: application/json");

echo json_encode([
    "logado" => isset($_SESSION["admin"])
]);