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
    private $userTheme;

    public function __Construct($userID = -1, $userName = "", $isLoggedIn = false, $userLevel = 0, $userMail = "", $userTheme = "default"){
        $this->userID = $userID;
        $this->userName = $userName;
        $this->isLoggedIn = $isLoggedIn;
        $this->userLevel = $userLevel;
        $this->userMail = $userMail;
        $this->userTheme = $userTheme;
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
    public function setLoggedIn($id, $name, $level, $mail, $theme){
        $this->isLoggedIn = true;
        $this->userID = $id;
        $this->userLevel = $level;
        $this->userName = $name;
        $this->userMail = $mail;
        $this->userTheme = $theme;
        $this->save();
    }

    /**
     * Function to log out
     */
    public function logOut() {
        session_destroy();
    }

    /**
     * Get the username of a user
     * @return string
     */
    public function getName(){
        return $this->userName;
    }

    public function getLevel(){
        return $this->userLevel;
    }

    public function getMail(){
        return $this->userMail;
    }

    public function getId(){
        return $this->userID;
    }

    public function getTheme(){
        return $this->userTheme;
    }

    /**
     * @param $newPass
     * @param SQLConnection $SQLConnection
     */
    public function setPassword($newPass, $SQLConnection){
        $newPass = $SQLConnection->escapeString($newPass);
        $result = $SQLConnection->query("UPDATE `users` SET `password`='".$newPass."' WHERE `id`='".$this->getId()."';");
    }

    /**
     * @param $theme
     * @param SQLConnection $SQLConnection
     */
    public function setTheme($theme, $SQLConnection){
        if ($theme){
            if ($this->getTheme() == "default"){
                $SQLConnection->query("UPDATE `users` SET `theme`='green' WHERE `id`='".$this->getId()."';");
                $this->userTheme = "green";
                $this->save();
            }
        } else {
            if ($this->getTheme() != "default"){
                $SQLConnection->query("UPDATE `users` SET `theme`='default' WHERE `id`='".$this->getId()."';");
                $this->userTheme = "default";
                $this->save();
            }
        }
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

        $userMail = $SQLConnection->escapeString($userMail);
        $password = $SQLConnection->escapeString($password);

        $result = $SQLConnection->query("SELECT * FROM users WHERE email = '".$userMail."' AND password = '".$password."';");
        if ($result->num_rows > 0){
            $row = $result->fetch_assoc();
            $this->setLoggedIn($row['id'], $row['name'], $row['level'], $row['email'], $row['theme']);

            if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
                $ip = $_SERVER['HTTP_CLIENT_IP'];
            } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
            } else {
                $ip = $_SERVER['REMOTE_ADDR'];
            }

            $mysqltime = date ("Y-m-d H:i:s");

            $SQLConnection->query("UPDATE `users` SET `lastlogin`='".$mysqltime."', `IP`='".$ip."'  WHERE `id`='".$this->getId()."';");

            return true;
        }
        return false;
    }

}