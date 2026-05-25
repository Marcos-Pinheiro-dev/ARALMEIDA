<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try{

    $db = new SQLite3(__DIR__ . "/eventos.db");

    $db->exec("
    CREATE TABLE IF NOT EXISTS eventos (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        data TEXT NOT NULL,

        nome TEXT NOT NULL

    )
    ");

}catch(Throwable $e){

    die($e->getMessage());

}