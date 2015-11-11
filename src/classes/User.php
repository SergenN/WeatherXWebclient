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

    /**
     * Construct,
     * create a new user which will be saved in the session
     *
     * @param int $userID, the user's ID or leave empty for guests
     * @param string $userName, the user's name or leave empty for guests
     * @param bool|false $isLoggedIn, if the user has been logged in, leave empty for false
     * @param int $userLevel, the user's level, leave empty for guests
     * @param string $userMail, the user's e-mail, leave empty for guests
     * @param string $userTheme, the user's theme, leave empty for guests
     */
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
     * isLoggedIn,
     * Checks if a user is logged in.
     *
     * @return bool, true if the user i slogged in
     */
    public function isLoggedIn(){
        return $this->isLoggedIn;
    }

    /**
     * SetLoggedIn,
     * Log the user in by giving the needed parameters, this will automatically save the login in the session.
     *
     * @param $id, the user's ID
     * @param $name, the user's name
     * @param $level, the user's level
     * @param $mail, the user's e-mail
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
     * logOut,
     * Function to log the user out, this will also destroy the whole session!
     */
    public function logOut() {
        session_destroy();
    }

    /**
     * getName,
     * Get the username of a user
     *
     * @return string, user name
     */
    public function getName(){
        return $this->userName;
    }

    /**
     * getLevel,
     * get the user's authority level,
     *
     * @return int authority level of the user
     */
    public function getLevel(){
        return $this->userLevel;
    }

    /**
     * getMail,
     * get the user's e-mail
     *
     * @return string, user's e-mail
     */
    public function getMail(){
        return $this->userMail;
    }

    /**
     * getId,
     * get the user's Id
     *
     * @return int, user's Id
     */
    public function getId(){
        return $this->userID;
    }

    /**
     * getTheme,
     * get the current theme the user has set.
     *
     * @return string, theme (green or default)
     */
    public function getTheme(){
        return $this->userTheme;
    }

    /**
     * setPassword,
     * change the password of the user who is logged in.
     *
     * @param String $oldPass, user's old password
     * @param String $newPass, user's new password
     * @param SQLConnection $SQLConnection, the current established SQLConnection
     * @return String, true if the password has been changed else false
     */
    public function setPassword($oldPass, $newPass, $SQLConnection){
        $newPass = $SQLConnection->escapeString($newPass);
        $oldPass = $SQLConnection->escapeString($oldPass);

        $login = $SQLConnection->query("SELECT * FROM users WHERE `id` = '".$this->getId()."' AND password = '".$oldPass."';");
        if ($login->num_rows > 0){
            $SQLConnection->query("UPDATE `users` SET `password`='".$newPass."' WHERE `id`='".$this->getId()."';");
            return "true";
        }
        return "false";
    }

    /**
     * setTheme,
     * Change the user's theme.
     *
     * @param int $theme, the number of the theme (1 for green theme, 0 for default theme, etc.)
     * @param SQLConnection $SQLConnection, the current established SQLConnection
     */
    public function setTheme($theme, $SQLConnection){
        if ($theme || $theme == 1){
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
     * save,
     * save this class in the session.
     */
    public function save(){
        $_SESSION['user'] = serialize($this);
    }

    /**
     * validateLogin,
     * Checks if an attempt to login is valid.
     *
     * @param $userMail, the given user e-mail
     * @param $password, the given password
     * @param SQLConnection $SQLConnection, the current established connection
     * @return bool, true if the login attempt was successful.
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

            return "true";
        }
        return "false";
    }

}