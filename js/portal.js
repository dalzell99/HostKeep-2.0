$(function() {
	$("#headerDate").html(moment().format("dddd, D MMMM YYYY"));

	if (getSessionVars(['loggedIn']).loggedIn == 'true') {
		// Change the displayed section based on the url hash
		$(window).on({
			hashchange: function() {
				switch(window.location.hash.substr(1)) {
					case '':
					case 'dashboard':
						dashboard();
						break;
					case 'maintenance':
						maintenance();
						break;
					case 'profile':
						profile();
						break;
					case 'properties':
						properties();
						break;
					case 'add-property':
						addProperty();
						break;
					case 'documents':
						documents();
						break;
					case 'direct-booking':
						directBooking();
						break;
					case 'change-password':
						password();
						break;
					case 'admin':
						admin();
						break;
					default:
						break;
				}
			}
		});

		$("#headerLogoutButton").on({
			click: function () {
				logout();
			}
		});

		$(window).hashchange();
	} else {
		// If user came to page without logging in redirect to login page
		window.location = 'index.php';
	}
});

// Set sessionStorage variables and reload page
function changeUser(userInfo) {
	setSessionVars({
		customerID: userInfo.customerID,
		username: userInfo.username,
		salutation: userInfo.salutation,
		firstName: userInfo.firstName,
		lastName: userInfo.lastName,
		company: userInfo.company,
		phoneNumber: userInfo.phoneNumber,
		mobileNumber: userInfo.mobileNumber,
		bankName: userInfo.bankName,
		bsb: userInfo.bsb,
		accountNumber: userInfo.accountNumber,
		postalAddress: userInfo.postalAddress,
		suburb: userInfo.suburb,
		state: userInfo.state,
		postcode: userInfo.postcode,
		country: userInfo.country,
		lastModified: userInfo.lastModified,
		lastLogin: userInfo.lastLogin,
		lastLoginIP: userInfo.lastLoginIP,
		status: userInfo.status
	});

	// If the admin is on a property subpage, change the hash to properties before reloading the page.
	if (['', 'dashboard', 'my-profile', 'my-properties', 'documents', 'direct-booking', 'change-password', 'admin'].indexOf(window.location.hash.substr(1)) === -1) {
		window.location.hash = 'properties';
	}

	location.reload();
}

// Set sessionStorage variables to empty and redirect to login page
function logout() {
	removeSessionVars(['loggedIn', 'admin', 'username', 'salutation', 'firstName', 'lastName', 'company', 'phoneNumber', 'mobileNumber', 'postalAddress', 'suburb', 'state', 'postcode', 'country', 'lastModified', 'lastLogin', 'lastLoginIP', 'timeZone']);

	window.location = 'index.php';
}

function setSectionHeader(obj) {
	var s = $(".sectionHeader");

	if (obj) {
		s.find("img").prop('src', obj.img ? 'images/' + obj.img : PLACEHOLDER + '100');

		if (obj.title) {
			s.find("span").html(obj.title);
		} else {
			s.find("span").hide();
		}

		if (obj.button) {
			s.find("button").html(obj.button.text).click(obj.button.onclick);
		} else {
			s.find("button").hide();
		}

		if (obj.select) {
			s.find("select").html(obj.select.options.reduce(function (html, option) {
				return html + "<option value='" + option.value + "'>" + option.text + "</option>";
			}, "")).change(obj.select.onchange);
		} else {
			s.find("select").hide();
		}

		s.show();
	} else {
		s.hide();
	}
}

function setSectionContent(html) {
	$(".sectionContent").html(html);
}

function setHash(hash) {
	window.location.hash = hash;
}

/* ------------------------------------------------------- Dashboard -------- */

function dashboard() {
	$("nav .active").removeClass("active");
	$("nav .dashboard").addClass("active");

	setSectionHeader();

	var html = "";
	html += "<div id='dashboard'>";
	html += "    <div>";
	html += "        <div class='dashboardNewsUpdates col-sm-7'>";
	html += "            <h4>News & updates</h4>";
	html += "            <p>";
	html += "                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
	html += "            </p>";
	html += "        </div>";
	html += "        <div class='dashboardReporting col-sm-4'>";
	html += "            <h4>" + moment().format('MMMM') + " Reporting</h4>";
	html += "            <p class='col-xs-6'>";
	html += "                Your " + moment().format('MMMM') + " HostKeep property statement";
	html += "            </p>";
	html += "            <div class='downloadContainer col-xs-6'>";
	html += "                <img src='images/dashboardDownloadStatement.png' alt='download statement' />";
	html += "                <button onclick='downloadLastStatement()'>DOWNLOAD</button>";
	html += "            </div>";
	html += "        </div>";
	html += "    </div>";
	html += "    <div class='dashboardCalendar'>";
	html += "    </div>";
	html += "</div>";

	setSectionContent(html);
}

/* ------------------------------------------------------- Properties ------- */

function properties() {
	$("nav .active").removeClass("active");
	$("nav .properties").addClass("active");

	setSectionHeader({
		title: 'Properties',
		button: {
			text: 'Add property',
			onclick: function () {
				setHash('add-property');
			}
		},
		select: {
			onchange: function () {

			},
			options: [
				{
					text: 'Property: ALL',
					value: 'all'
				}
			]
		}
	});

	get({
		url: "properties/getproperties.php",
		vars: getSessionVars(['username']),
		callback: function (res) {
			var html = "";
			html += "<div id='properties'>";
			html += "    <table class='propertyOverview'>";
			html += "        <tr>";
			html += "            <th colspan='2'>Address</th>";
			html += "            <th>Name</th>";
			html += "            <th>Description</th>";
			html += "            <th>Status</th>";
			html += "            <th></th>";
			html += "        </tr>";
			res.forEach(function (prop) {
				var i = prop.address.indexOf(',');

				html += "    <tr>";
				html += "        <td>";
				html += "            <img class='propertyMap' src='./images/property_map.png' alt='map thumbnail' />";
				html += "        </td>";
				html += "        <td>";
				html += "            <div>";
				html += "                <span class='addressFirst'>" + prop.address.slice(0, i) + "</span><br />";
				html += "                <span class='addressSecond'>" + prop.address.slice(i + 1) + "</span>";
				html += "            </div>";
				html += "        </td>";
				html += "        <td>";
				html += "            <span>" + prop.name + "</span>";
				html += "        </td>";
				html += "        <td>";
				html += "            <span>" + prop.description + "</span>";
				html += "        </td>";
				html += "        <td>";
				html += "            <span>" + prop.status[0].toUpperCase() + prop.status.slice(1) + "</span>";
				html += "        </td>";
				html += "        <td>";
				html += "            <img class='propertySubpage' src='./images/property_subpage.svg' alt='property subpage thumbnail' />";
				html += "        </td>";
				html += "    </tr>";
			});
			html += "    </table>";
			html += "</div>";

			setSectionContent(html);
		}
	});
}

function addProperty() {
	$("nav .active").removeClass("active");
	$("nav .properties").addClass("active");

	setSectionHeader({
		title: 'Add Property',
		select: {
			onchange: function () {

			},
			options: [
				{
					text: 'Property: ALL',
					value: 'all'
				}
			]
		}
	});

	var html = "";
	html += "<div id=''>";
	html += "</div>";

	setSectionContent(html);
}

/* ------------------------------------------------------- Maintenance ------ */

function maintenance() {
	$("nav .active").removeClass("active");
	$("nav .maintenance").addClass("active");

	setSectionHeader({
		title: 'Properties',
		button: {
			text: 'Add property',
			onclick: function () {

			}
		},
		select: {
			onchange: function () {

			},
			options: [
				{
					text: 'Property: ALL',
					value: 'all'
				}
			]
		}
	});

	var html = "";
	html += "<div id=''>";
	html += "</div>";

	setSectionContent(html);
}

/* ------------------------------------------------------- Profile ---------- */

function profile() {
	$("nav .active").removeClass("active");
	$("nav .profile").addClass("active");

	setSectionHeader({
		title: 'Properties',
		button: {
			text: 'Add property',
			onclick: function () {

			}
		},
		select: {
			onchange: function () {

			},
			options: [
				{
					text: 'Property: ALL',
					value: 'all'
				}
			]
		}
	});

	var html = "";
	html += "<div id=''>";
	html += "</div>";

	setSectionContent(html);
}

/* ------------------------------------------------------- Documents -------- */

function documents() {
	$("nav .active").removeClass("active");
	$("nav .documents").addClass("active");

	setSectionHeader({
		title: 'Properties',
		button: {
			text: 'Add property',
			onclick: function () {

			}
		},
		select: {
			onchange: function () {

			},
			options: [
				{
					text: 'Property: ALL',
					value: 'all'
				}
			]
		}
	});

	var html = "";
	html += "<div id=''>";
	html += "</div>";

	setSectionContent(html);
}

/* ------------------------------------------------------- Direct Booking --- */

function directBooking() {
	$("nav .active").removeClass("active");
	$("nav .directBooking").addClass("active");

	setSectionHeader({
		title: 'Properties',
		button: {
			text: 'Add property',
			onclick: function () {

			}
		},
		select: {
			onchange: function () {

			},
			options: [
				{
					text: 'Property: ALL',
					value: 'all'
				}
			]
		}
	});

	var html = "";
	html += "<div id=''>";
	html += "</div>";

	setSectionContent(html);
}

/* ------------------------------------------------------- Admin ------------ */

function admin() {
	$("nav .active").removeClass("active");
	$("nav .admin").addClass("active");

	setSectionHeader({
		title: 'Properties',
		button: {
			text: 'Add property',
			onclick: function () {

			}
		},
		select: {
			onchange: function () {

			},
			options: [
				{
					text: 'Property: ALL',
					value: 'all'
				}
			]
		}
	});

	var html = "";
	html += "<div id=''>";
	html += "</div>";

	setSectionContent(html);
}
