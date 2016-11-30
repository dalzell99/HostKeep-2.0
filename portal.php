<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Dashboard</title>

		<?php
		include('head.php');
		echo '<link href="css/portal.css?' . filemtime('css/portal.css') . '" rel="stylesheet" />';
		echo '<script type="text/javascript" src="js/portal.js?' . filemtime('js/portal.js') . '"></script>';
		?>
	</head>
	<body id="dashboard">
		<div class='.container-fluid'>
			<div class="col-sm-12">
				<header>
					<?php include('header.php'); ?>
				</header>

				<main>
					<img class='burgerMenu' src='images/menu.svg' alt='menu' onclick='toggleMenu()' />
					<nav class="col-xs-6 col-sm-3">
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
									<div class='properties' onclick='window.location = "#properties"'>
										Properties
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class='maintenance' onclick='window.location = "#maintenance"'>
										Maintenance & repairs
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
									<div class='documents' onclick='window.location = "#documents"'>
										Statements
									</div>
								</td>
							</tr>
						</table>
						<table id="sidebarAdmin">
							<tr>
								<td class='admin' onclick='window.location = "#admin"'>
									HostKeep admin
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
					<content class="col-sm-9 col-xs-12">
						<div class="col-xs-12">
							<table class="sectionHeader">
								<tr>
									<td>
										<img src="" alt="header image" />
									</td>
									<td>
										<span></span>
									</td>
									<td>
										<button></button>
									</td>
									<td>
										<select></select>
									</td>
								</tr>
							</table>
							<div class="sectionContent"></div>
						</div>
					</content>
				</main>
			</div>
		</div>
	</body>
</html>
