<?php

require_once('DbConnection.php');

/**
 * Class for rendering data after page refresh. Creates the table if it didn't exist
 * */

class Template
{
    protected $connection;
    protected $data;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    public function load()
    {
        $sql = 'SELECT * FROM user_information  ORDER BY `name` ';
        $result = $this->connection->query($sql, []);

        if (count($result)) {
            header('Content-type: application/json');
            echo json_encode($result);
        }
        else {
            $sql = 'CREATE TABLE IF NOT EXISTS `user_information` (
            `id` int(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
            `name` varchar(50) NOT NULL,
            `country` varchar(50) NOT NULL,
            `city` varchar(50) NOT NULL,
            `street` varchar(100) NOT NULL,
            `home_number` varchar(10) NOT NULL,
            `information` varchar(200) DEFAULT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4';
                $this->connection->pdo->exec($sql);
        }
    }
}

$model = new Template(Connection::getInstance());
$model->load();
