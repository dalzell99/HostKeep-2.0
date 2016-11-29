<?php
require('../global.php');
require('../sendemail.php');
$con = mysqli_connect('localhost', $dbusername, $dbpassword, $dbname);

// Check connection
if (mysqli_connect_errno()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$username = $_POST['username'];
$propertyID = $_POST['propertyID'];
$reportDate = $_POST['reportDate'];
$incidentDate = $_POST['incidentDate'];
$reportedBy = $_POST['reportedBy'];
$overview = $_POST['overview'];
$actionTaken = $_POST['actionTaken'];
$issueCost = $_POST['issueCost'];
$paidBy = $_POST['paidBy'];
$paymentReceived = $_POST['paymentReceived'];
$documentation = $_POST['documentation'];

$sql = "INSERT INTO Repairs (username, propertyID, reportDate, incidentDate, reportedBy, overview, actionTaken, cost, paidBy, paymentReceived, documentation) VALUES ('$username', '$propertyID', '$reportDate', '$incidentDate', '$reportedBy', '$overview', '$actionTaken', '$issueCost', '$paidBy', '$paymentReceived', '$documentation')";
if (mysqli_query($con, $sql)) {
	echo json_encode([
		'status' => true
	]);
} else {
	echo json_encode([
		'status' => false,
		'sql' => $sql,
		'message' => 'There was an error adding the repair request'
	]);
}

mysqli_close($con);
?>
