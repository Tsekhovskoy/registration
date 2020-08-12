<?php

require_once('DbConnection.php');

/*
 * The Address deletion class. Removes an address by its ID
 * */

class Delete
{
    protected $id;
    protected $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
        $this->id = $this->cleanData($_POST["id"]);
    }

    public function cleanData($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    public function delete() {

        if ($this->isExist($this->id)) {
            $sql = 'DELETE FROM `user_information` WHERE `id` = ?';
            $this->connection->query($sql, [$this->id]);
            $status = ['Message' => 'success'];
            echo json_encode($status);
        } else {
            http_response_code(404);
        }
    }

    public function isExist($id) {
        $sql = 'SELECT * FROM `user_information` WHERE `id` = ?';
        $result = $this->connection->query($sql, [$this->id]);

        if (count($result)) {
            return true;
        } else {
            return false;
        }
    }
}

$model = new Delete(Connection::getInstance());
$model->delete();

