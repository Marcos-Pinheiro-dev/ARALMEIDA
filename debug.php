<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "<h1>PHP FUNCIONANDO</h1>";

try{

    $db = new SQLite3("eventos.db");

    echo "<h2>SQLite funcionando</h2>";

    $db->exec("
    CREATE TABLE IF NOT EXISTS eventos (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        data TEXT NOT NULL,

        nome TEXT NOT NULL

    )
    ");

    echo "<h2>Tabela criada</h2>";

}catch(Exception $e){

    die("<h1>ERRO:</h1>" . $e->getMessage());

}