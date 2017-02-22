<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Login</title>

		<?php include('head.php');
		echo '<link rel="stylesheet" type="text/css" href="css/index.css?' . filemtime('css/index.css') . '" />';
		echo '<script type="text/javascript" src="js/index.js?' . filemtime('js/index.js') . '"></script>';
		?>
	</head>
	<body>
		<header>
			<table id='headerLogoContainer'>
				<tr>
					<td>
						<img id='headerLogo' src='images/logo.png' />
					</td>
					<td>
						<div id='headerTitle'>
							HostKeep Property <br />Management
						</div>
					</td>
				</tr>
			</table>
		</header>

		<main>
			<div class='col-sm-4'>
				<div class='title'>
					<span>OWNERS <br />PORTAL</span>
				</div>
				<div class='checkList'>
					<div class='listItem'>
						<img src='./images/tick.svg' alt='tick' />
						<span>Tracking earnings</span>
					</div>
					<div class='listItem'>
						<img src='./images/tick.svg' alt='tick' />
						<span>Review occupancy</span>
					</div>
					<div class='listItem'>
						<img src='./images/tick.svg' alt='tick' />
						<span>Make direct bookings</span>
					</div>
					<div class='listItem'>
						<img src='./images/tick.svg' alt='tick' />
						<span>View repair and maintenance requests</span>
					</div>
				</div>
			</div>
			<div class='col-sm-4'>
				<span class="header">Sign into HostKeep</span>
				<span class="subheader">Enter your details below</span>
				<table class='loginForm'>
					<tr>
						<td colspan='2'>
							<span class='inputLabel'>Username</span>
						</td>
					</tr>
					<tr>
						<td colspan='2'>
							<input type='text' id='loginUsername' />
						</td>
					</tr>
					<tr>
						<td>
							<span class='inputLabel'>Password</span>
						</td>
						<td>
							<a href='forgot-password.php'>Forgot password</a>
						</td>
					</tr>
					<tr>
						<td colspan='2'>
							<input type='password' id='loginPassword' />
						</td>
					</tr>
					<tr>
						<td colspan='2'>
							<input type='checkbox' id='loginRemember' />
							<span class='checkboxLabel'>Remember me on this computer</span>
						</td>
					</tr>
				</table>
				<div>
					<button class='registerButton' onclick='location.href = "register.php"'>SIGN UP</button>
					<button class='loginButton' onclick='login()'>LOGIN</button>
				</div>
			</div>
			<div class='col-sm-4'>

			</div>
		</main>
	</body>
</html>
