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

    /**
     * Construct,
     * Create a new connection with the database.
     *
     * @param $host, the IP adress of the database server
     * @param $user, the username
     * @param $pass, the password
     * @param $database, the database name where WeatherX tables are located
     */
    function __Construct($host, $user, $pass, $database){
        $this->mysqlConn = new mysqli($host, $user, $pass, $database);

        if ($this->mysqlConn->connect_errno) {
            printf("Connect failed: %s\n", $this->mysqlConn->connect_error);
            exit();
        }
    }

    /**
     * query,
     * issue a query on the WeatherX database connection.
     *
     * @param $SQLQuery, the query you wish to run
     * @return bool|\mysqli_result, result or false if the query failed
     */
    public function query($SQLQuery){
        return $this->mysqlConn->query($SQLQuery);
    }

    /**
     * exists,
     * check if a row exists in the database.
     *
     * @param $SQLQuery, the query of the data you wish to check
     * @return bool, true if there is a match
     */
    public function exists($SQLQuery){
        return $this->query($SQLQuery)->num_rows > 0;
    }

    /**
     * close,
     * close the database connection.
     */
    public function close(){
        $this->mysqlConn->close();
    }

    /**
     * escapeString,
     * Strip a string of it's special characters.
     *
     * @param $string, the string to strip
     * @return string, the stripped string
     */
    public function escapeString($string){
        return $this->mysqlConn->real_escape_string($string);
    }

}