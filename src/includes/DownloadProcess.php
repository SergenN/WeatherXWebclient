<?php
/**
 * Created by PhpStorm.
 * User: pjvan
 * Date: 12-11-2015
 * Time: 02:18
 */


        $path = $_SERVER['DOCUMENT_ROOT']."/src/other/data/database";
        list_all_files($path);

        function list_all_files($path)
        {
            $paths="";
            $handle = opendir($path);
            $first = 0;
            while ($file = readdir($handle)) {
                if ($file != '.' && $file != '..') {
                    if (strpos($file,'.csv')) {
                        if($first>0) {
                            $paths = "," . $path . "/" . $file;
                        }else{
                            $paths = $path."/".$file;
                            $first++;
                        }
                    }else{
                        list_all_files("$path/$file");
                    }
                }
                echo $paths;

            }
            closedir($handle);
        }

        ?>