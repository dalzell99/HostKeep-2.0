<?php
require('../global.php');
require('../sendemail.php');
$con = mysqli_connect('localhost', $dbusername, $dbpassword, $dbname);
mysqli_set_charset($con, 'utf8');

// Check connection
if (mysqli_connect_errno()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$sql = "SELECT * FROM Properties WHERE username LIKE '%" . $_GET['username'] . "%'";

if ($result = mysqli_query($con, $sql)) {
	$response = [];

	// Add results to an array
	while ($row = mysqli_fetch_assoc($result)) {
		$response[] = $row;
	}

	// Echo array as json
	echo json_encode([
		'status' => true,
		'data' => $response
	]);
} else {
	sendErrorEmail("
	getproperties.php<br />
	sql: $sql
	");
	echo json_encode([
		'status' => false,
		'sql' => $sql,
		'message' => 'There was an error getting this users properties'
	]);
}

mysqli_close($con);
?>
