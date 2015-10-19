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


    public function __Construct($userID = -1, $userName = "", $isLoggedIn = false, $userLevel = 0){
        $this->userID = $userID;
        $this->userName = $userName;
        $this->isLoggedIn = $isLoggedIn;
        $this->userLevel = $userLevel;
        $this->save();
    }

    public function isLoggedIn(){
        return $this->isLoggedIn;
    }

    public function setLoggedIn(){
        $this->isLoggedIn = true;
        $this->save();
    }

    public function save(){
        $_SESSION['user'] = serialize($this);
    }

}