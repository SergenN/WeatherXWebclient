<?php
/**
 * Created by PhpStorm.
 * User: Sergen
 * Date: 4-11-2015
 * Time: 21:12
 */

spl_autoload_register(function($class){
    require_once $class . '.php';
});

$connection = new classes\SQLConnection("localhost", "root", "", "weatherxweb");

$query = "SELECT stn, name, country FROM stations;";
$result = $connection->query($query);
$resultSet[] = [];

while($row = $result->fetch_assoc()) {
    $resultSet[] = $row;
}
 var_dump($resultSet);
die;

echo json_encode($resultSet);
?>