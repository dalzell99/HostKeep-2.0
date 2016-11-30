<?php
require('../global.php');
require('../sendemail.php');

$con = mysqli_connect('localhost', $dbusername, $dbpassword, $dbname);

// Check connection
if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$sql = "SELECT r.*, p.name, p.address
FROM Repairs AS r
INNER JOIN Properties AS p
ON r.propertyID = p.propertyID
WHERE r.username = '" . $_GET['username'] . "'";

if ($result = mysqli_query($con, $sql)) {
	$response = [];

	while ($row = mysqli_fetch_assoc($result)) {
		$response[] = $row;
	}

	echo json_encode([
		'status' => true,
		'data' => $response
	]);
} else {
	sendErrorEmail("
	getrepairs.php<br />
	sql: $sql
	");
	echo json_encode([
		'status' => false,
		'sql' => $sql,
		'message' => 'There was an error getting this users repairs'
	]);
}

mysqli_close($con);
?>
