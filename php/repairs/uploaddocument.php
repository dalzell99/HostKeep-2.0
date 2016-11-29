<?php
date_default_timezone_set('UTC');

$target_file = "../../repairs/" . $_POST['id'] . "." . date("Ymd") . '.' . $_FILES["file"]["name"];

move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
?>
