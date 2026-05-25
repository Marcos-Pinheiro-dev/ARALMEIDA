<?php

require "database.php";

header("Content-Type: application/json");

$resultado = $db->query("
SELECT * FROM eventos
ORDER BY data ASC
");

$eventos = [];

while($linha = $resultado->fetchArray(SQLITE3_ASSOC)){

    $eventos[] = $linha;

}

echo json_encode($eventos);