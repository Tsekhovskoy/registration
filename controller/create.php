<?php

require_once ('DbConnection.php');

/*
 * The Add address class. After adding an address, it returns the current list of addresses from the database
**/

class Create
{
    public $id;
    protected $connection;
    protected $data;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
        if($_SERVER['REQUEST_METHOD'] == "POST") {
            if (isset($_POST["name"]) && isset($_POST["countrySel"]) && isset($_POST["citySel"])) {
                $this->data = array(
                    'name' => $this->cleanData($_POST["name"]),
                    'country' => $this->cleanData($_POST["countrySel"]),
                    'city' => $this->cleanData($_POST["citySel"]),
                    'street' => $this->cleanData($_POST["street"]),
                    'home_number' => $this->cleanData($_POST["number"]),
                    'information' => $this->cleanData($_POST["info"]),
                );
            }
        }
    }

    public function cleanData($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    public function save() {
        $sql = 'INSERT INTO `user_information` (name, country, city, street, home_number, information) 
        VALUES (?, ?, ?, ?, ?, ?)';
        $result = $this->connection->query($sql, [$this->data['name'], $this->data['country'],
            $this->data['city'], $this->data['street'], $this->data['home_number'], $this->data['information']]);
    }

    public function load() {
        $sql = 'SELECT * FROM `user_information` ORDER BY `name` ';
        $result = $this->connection->query($sql, []);

        if (count($result)) {
            //header('Content-type: application/json');
            echo json_encode($result);
        }
    }
}

$model = new Create(Connection::getInstance());
$model->save();
$model->load();
