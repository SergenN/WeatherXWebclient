<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 4-11-2015
 * Time: 13:27
 */

$query = "SELECT name, country FROM stations WHERE stn = '$id'";
$result = $connection->query($query);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $country = $row['country'];
        $name = $row['name'];
    }
} else {
    echo "0 results";
}

?>