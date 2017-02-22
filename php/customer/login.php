<?php
require('../global.php');
require('../sendemail.php');
$con = mysqli_connect('localhost', $dbusername, $dbpassword, $dbname);

// Check connection
if (mysqli_connect_errno()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$username = mysqli_real_escape_string($con, $_POST['username']);
$password = hashPassword($con, $_POST['password']);

$sql = "SELECT * FROM Customer WHERE username = '$username'";

// Get customer info
if ($result = mysqli_query($con, $sql)) {
	if (mysqli_num_rows($result) == 0) {
		// If username doesn't exist in database, then respond with incorrectusername
		echo json_encode([
			'status' => false,
			'message' => 'User does not exist, if you are a HostKeep client please register below'
		]);
	} else {
		$assoc = mysqli_fetch_assoc($result);
		if ($assoc['status'] == 'retired') {
			// Echo retired if the account has been marked as retired
			echo json_encode([
				'status' => false,
				'message' => 'This account has been marked as retired. If this is incorrect, please send an email to hello@hostkeep.com.au'
			]);
		} else if ($assoc['lastLogin'] == '') {
			// If the customer hasn't logged in yet then update last login database info and send firsttime and json array of customer info
			mysqli_query($con, "UPDATE Customer SET lastLoginIP = '" . $_SERVER['REMOTE_ADDR'] . "', lastLogin = '" . date('c') . "' WHERE username = '$username'");
			echo json_encode([
				'status' => true,
				'data' => [
					'type' => 'firsttime',
					'details' => $assoc
				]
			]);
		} else if ($assoc['password'] == $password) {
			// If the customer has logged in before then update last login database info and send correct and json array of customer info
			mysqli_query($con, "UPDATE Customer SET lastLoginIP = '" . $_SERVER['REMOTE_ADDR'] . "', lastLogin = '" . date('c') . "' WHERE username = '$username'");
			echo json_encode([
				'status' => true,
				'data' => [
					'type' => 'correct',
					'details' => $assoc
				]
			]);
		} else {
			// If password is incorrect then respond with incorrectpassword
			echo json_encode([
				'status' => false,
				'message' => 'Your password appears to be incorrect, please try again'
			]);
		}
	}
} else {
	sendErrorEmail("
	login.php<br />
	sql: $sql
	");
	echo json_encode([
		'status' => false,
		'sql' => $sql,
		'message' => 'Something went wrong logging in. The web admin has been notified.'
	]);
}

mysqli_close($con);
?>
