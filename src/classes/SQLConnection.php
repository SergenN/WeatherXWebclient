<?php
/**
 * Created by PhpStorm.
 * User: sergen
 * Date: 19-10-2015
 * Time: 02:00
 */

namespace classes;
use mysqli;

class SQLConnection{

    private $mysqlConn;

    function __Construct($host, $user, $pass, $database){
        $this->mysqlConn = new mysqli($host, $user, $pass, $database);

        if ($this->mysqlConn->connect_errno) {
            printf("Connect failed: %s\n", $this->mysqlConn->connect_error);
            exit();
        }
    }

    public function query($SQLQuery){
        return $this->mysqlConn->query($SQLQuery);
    }

    public function exists($SQLQuery){
        return $this->query($SQLQuery)->num_rows > 0;
    }

    public function close(){
        $this->mysqlConn->close();
    }

    public function escapeString($string){
        return $this->mysqlConn->real_escape_string($string);
    }

}