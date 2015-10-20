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

    /**
     * Checks if a user is logged in.
     * @return bool
     */
    public function isLoggedIn(){
        return $this->isLoggedIn;
    }

    /**
     * Login method for a user.
     * @param $id
     * @param $name
     * @param $level
     * @param $mail
     */
    public function setLoggedIn($id, $name, $level, $mail){
        $this->isLoggedIn = true;
        $this->userID = $id;
        $this->userLevel = $level;
        $this->userName = $name;
        $this->userMail = $mail;
        $this->save();
    }

    /**
     * Function to log out
     */
    public function logOut() {
        $this->isLoggedIn = false;
        session_destroy();
    }

    /**
     * Get the username of a user
     * @return string
     */
    public function getName(){
        return $this->userName;
    }

    /**
     * Serialize user data.
     * Initiates valid session.
     */
    public function save(){
        $_SESSION['user'] = serialize($this);
    }

    /**
     * Checks if an attempt to login is valid.
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