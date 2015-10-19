<?php
/**
 * Created by PhpStorm.
 * User: serge
 * Date: 19-10-2015
 * Time: 02:13
 */

namespace classes;

class User {

    private $userID;
    private $userName;
    private $isLoggedIn;
    private $userLevel;
    private $userMail;

    public function __Construct($userID = -1, $userName = "", $isLoggedIn = false, $userLevel = 0, $userMail = ""){
        $this->userID = $userID;
        $this->userName = $userName;
        $this->isLoggedIn = $isLoggedIn;
        $this->userLevel = $userLevel;
        $this->userMail = $userMail;
        $this->save();
    }

    public function isLoggedIn(){
        return $this->isLoggedIn;
    }

    public function setLoggedIn($id, $name, $level, $mail){
        $this->isLoggedIn = true;
        $this->userID = $id;
        $this->userLevel = $level;
        $this->userName = $name;
        $this->userMail = $mail;
        $this->save();
    }

    public function getName(){
        return $this->userName;
    }

    public function save(){
        $_SESSION['user'] = serialize($this);
    }

    /**
     * @param $userMail
     * @param $password
     * @param SQLConnection $SQLConnection
     * @return bool
     */
    public function validateLogin($userMail, $password, $SQLConnection){
        $result = $SQLConnection->query("SELECT * FROM users WHERE email = '".$userMail."' AND password = '".$password."';");
        if ($result->num_rows > 0){
            $row = $result->fetch_assoc();
            $this->setLoggedIn($row['id'], $row['name'], $row['level'], $row['email']);
            return true;
        }
        return false;
    }

}