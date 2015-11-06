<?php
/**
 * Created by PhpStorm.
 * User: Sergen
 * Date: 4-11-2015
 * Time: 21:12
 */


include_once  $_SERVER['DOCUMENT_ROOT'] . '/includes/init.php';

$query = "SELECT stn, name, country FROM stations;";
$result = $connection->query($query);

while($row = $result->fetch_assoc()) {
    $resultSet[] = $row;
    var_dump($row);
}
//var_dump ($resultSet);
?>