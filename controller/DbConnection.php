<?php

/*
 * The database connection class
 * */

class Connection
{
    private static $instance;
    public $pdo;
    //Enter your mysql-server information here
    public $dbName = '';
    public $user = '';
    public $password = '';
    public $host = 'localhost';

    private function __construct()
    {
        $dsn = "mysql:host=$this->host; dbname=$this->dbName";
        $this->pdo = new PDO($dsn, $this->user, $this->password);
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new Connection();
        }
        return self::$instance;
    }

    public function query($sql, $params)
    {
        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}