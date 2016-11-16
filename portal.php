<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Dashboard</title>

		<?php
		include('head.php');
		// echo '<link href="css/dashboard.css?' . filemtime('css/dashboard.css') . '" rel="stylesheet" />';
		echo '<script type="text/javascript" src="js/dashboard.js?' . filemtime('js/dashboard.js') . '"></script>';
		?>
	</head>
	<body id="dashboard">
		<div class='.container-fluid'>
			<div class="col-sm-12">
				<header>
					<?php include('header.php'); ?>
				</header>

				<main>
					<nav class="col-sm-3">
						<table>
							<tr>
								<td>
									<div class='dashboard' onclick='window.location = "#dashboard"'>
										Dashboard
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class='profile' onclick='window.location = "#my-profile"'>
										Profile
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class='properties' onclick='window.location = "#my-properties"'>
										Properties
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class='documents' onclick='window.location = "#documents"'>
										Documents
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class='directBooking' onclick='window.location = "#direct-booking"'>
										Direct Booking
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class='admin' onclick='window.location = "#admin"'>
										Admin
									</div>
								</td>
							</tr>
						</table>
						<table id="sidebarFooter">
							<tr>
								<td id="copyright" colspan="4">
									HostKeep Property Management &copy; <?php echo date('Y'); ?>
								</td>
							</tr>
							<tr>
								<td class="footerLink">
									About
								</td>
								<td class="footerLink">
									Blog
								</td>
								<td class="footerLink">
									Help
								</td>
								<td class="footerLink">
									Contact
								</td>
							</tr>
						</table>
					</nav>
					<content class="col-sm-9">
						<div id="dashboard">
							<?php include('dashboard.php'); ?>
						</div>

						<div id="profile">
							<?php include('profile.php'); ?>
						</div>

						<div id="properties">
							<?php include('properties.php'); ?>
						</div>

						<div id="documents">
							<?php include('documents.php'); ?>
						</div>

						<div id="directBooking">
							<?php include('direct-booking.php'); ?>
						</div>

						<div id="password">
							<?php include('change-password.php'); ?>
						</div>

						<div id="admin">
							<?php include('admin.php'); ?>
						</div>
					</content>
				</main>
			</div>
		</div>
	</body>
</html>
