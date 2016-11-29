var propertyArray = [];
var datePickers;

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
					case 'add-request':
						addRequest();
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
	// Prevents previous content being shown while new content is being created
	$(".sectionContent").hide();
	var s = $(".sectionHeader");

	if (obj) {
		s.find("img").prop('src', obj.img ? 'images/' + obj.img : PLACEHOLDER);

		if (obj.title) {
			s.find("span").html(obj.title).show();
		} else {
			s.find("span").hide();
		}

		if (obj.button) {
			s.find("button").html(obj.button.text).click(obj.button.onclick).show();
		} else {
			s.find("button").hide();
		}

		if (obj.select) {
			s.find("select").html(obj.select.options.reduce(function (html, option) {
				return html + "<option value='" + option.value + "'>" + option.text + "</option>";
			}, "")).change(obj.select.onchange).show();
		} else {
			s.find("select").hide();
		}

		s.show();
	} else {
		s.hide();
	}
}

function setSectionContent(html) {
	$(".sectionContent").html(html).show();
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
			propertyArray = res;

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
		title: 'Maintenance & repairs',
		button: {
			text: 'Add request',
			onclick: function () {
				setHash('add-request');
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
		url: "repairs/getrepairs.php",
		vars: getSessionVars(['username']),
		callback: function (res) {
			var html = "";
			html += "<div id='requests'>";
			html += "    <table class='requestOverview'>";
			html += "        <tr>";
			html += "            <th>Date</th>";
			html += "            <th>Address</th>";
			html += "            <th>Property</th>";
			html += "            <th>Details</th>";
			html += "            <th>Status</th>";
			html += "        </tr>";
			res.forEach(function (req) {
				var i = req.address.indexOf(',');

				html += "    <tr>";
				html += "        <td>";
				html += "            " + moment(req.incidentDate).format("DD/MM/YYYY");
				html += "        </td>";
				html += "        <td>";
				html += "            <div>";
				html += "                <span class='addressFirst'>" + req.address.slice(0, i) + "</span><br />";
				html += "                <span class='addressSecond'>" + req.address.slice(i + 1) + "</span>";
				html += "            </div>";
				html += "        </td>";
				html += "        <td>";
				html += "            " + req.name;
				html += "        </td>";
				html += "        <td>";
				html += "            " + req.overview;
				html += "        </td>";
				html += "        <td>";
				html += "            " + req.status;
				html += "        </td>";
				html += "    </tr>";
			});
			html += "    </table>";
			html += "</div>";

			setSectionContent(html);
		}
	});
}

function addRequest() {
	setSectionHeader({
		title: 'Maintenance & repairs > Add new'
	});

	var html = "";
	html += "<div id='add-request'>";
	html += "    <div class='col-sm-6'>";
	html += "        <div class='row'>";
	html += "            <div class='col-sm-6'>";
	html += "                <label>Property</label>";
	html += "                <select id='requestProperty'></select>";
	html += "            </div>";
	html += "            <div class='col-sm-6'>";
	html += "                <label>Property Address</label>";
	html += "                <div id='requestPropertyAddress'></div>";
	html += "            </div>";
	html += "        </div>";
	html += "        <div class='row'>";
	html += "            <div class='col-sm-6'>";
	html += "                <label>Report date</label>";
	html += "                <input type='date' id='requestReportDate' name='requestReportDate' />";
	html += "            </div>";
	html += "            <div class='col-sm-6'>";
	html += "                <label>Date of incident or maintenance</label>";
	html += "                <input type='date' id='requestIncidentDate' name='requestIncidentDate' />";
	html += "            </div>";
	html += "        </div>";
	html += "        <div class='row'>";
	html += "            <div class='col-sm-6'>";
	html += "                <label>Reported By</label>";
	html += "                <select id='requestReportedBy'>";
	html += "                    <option value='guest'>Guest</option>";
	html += "                    <option value='cleaner'>Cleaner</option>";
	html += "                    <option value='owner'>Owner</option>";
	html += "                    <option value='hostkeep'>HostKeep</option>";
	html += "                </select>";
	html += "            </div>";
	html += "        </div>";
	html += "        <div class='row'>";
	html += "            <label>Overview of incident or maintenance</label>";
	html += "            <textarea id='requestOverview' rows='4'></textarea>";
	html += "        </div>";
	html += "        <div class='row'>";
	html += "            <label>Action taken</label>";
	html += "            <textarea id='requestActionTaken' rows='4'></textarea>";
	html += "        </div>";
	html += "        <div class='row'>";
	html += "            <div class='col-sm-6'>";
	html += "                <label>Cost of issue</label>";
	html += "                $<input type='number' id='requestCost' />";
	html += "            </div>";
	html += "            <div class='col-sm-6'>";
	html += "                <label>To be paid by</label>";
	html += "                <select id='requestPaidBy'>";
	html += "                    <option value='guest'>Guest</option>";
	html += "                    <option value='owner'>Owner</option>";
	html += "                    <option value='hostkeep'>HostKeep</option>";
	html += "                    <option value='airbnb'>Airbnb</option>";
	html += "                </select>";
	html += "            </div>";
	html += "        </div>";
	html += "        <div class='row'>";
	html += "            <label>Payment Received</label>";
	html += "            <form id='requestPaymentReceived'>";
	html += "                <input type='radio' value='yes' name='paid' /><label>Yes</label><br />";
	html += "                <input type='radio' value='no' name='paid' checked /><label>No</label>";
	html += "            </form>";
	html += "        </div>";
	html += "        <div class='row'>";
	html += "            <form id='requestDropzone' class='dropzone' action='" + API_URL + "repairs/uploaddocument.php'>";
	html += "                <div class='fallback'>";
	html += "                    <input name='file' type='file' multiple />";
	html += "                </div>";
	html += "                <input name='id' type='hidden' />";
	html += "            </form>";
	html += "        </div>";
	html += "        <div class='row'>";
	html += "            <button id='requestSubmit' onclick='submitNewRequest()'>SUBMIT</button>";
	html += "        </div>";
	html += "    </div>";
	html += "    <div class='col-sm-6'>";
	html += "        <img src='" + PLACEHOLDER + "' alt='placeholder image' />";
	html += "    </div>";
	html += "</div>";

	setSectionContent(html);

	if (propertyArray.length) {
		$("#requestProperty").html(propertyArray.reduce(function (html, prop) {
			html += "<option value='" + prop.propertyID + "'>" + prop.name + "</option>";
		}, ''));

		$("#requestProperty").change();
	} else {
		get({
			url: "properties/getproperties.php",
			vars: getSessionVars(['username']),
			callback: function (res) {
				propertyArray = res;
				$("#requestProperty").html(propertyArray.reduce(function (html, prop) {
					return html + "<option value='" + prop.propertyID + "'>" + prop.name + "</option>";
				}, ''));

				$("#requestProperty").change();
			}
		});
	}

	$('#requestReportDate, #requestIncidentDate').pickadate({
		format: 'ddd d mmm yyyy',
		formatSubmit: 'yyyy/mm/dd',
		hiddenName: true
	});

	$("#requestProperty").change(function () {
		$("#requestDropzone [name='id']").val($("#requestProperty").val());
		$("#requestPropertyAddress").html(propertyArray.reduce(function (address, prop) {
			return (prop.propertyID === $("#requestProperty").val() ? prop.address : '');
		}, ''));
	});
}

function submitNewRequest() {
	var filenames = [];
	var propID = $("#requestProperty").val();

	$(".dz-filename span").each(function () {
		filenames.push(propID + "." + moment().utc().format("YYYYMMDD") + "." + $(this).text());
	});

	post({
		url: 'repairs/addrepair.php',
		vars: $.extend({}, getSessionVars(['username']), {
			propertyID: propID,
			reportDate: $("input[name='requestReportDate']").val(),
			incidentDate: $("input[name='requestIncidentDate']").val(),
			reportedBy: $("#requestReportedBy").val(),
			overview: $("#requestOverview").val(),
			actionTaken: $("#requestActionTaken").val(),
			issueCost: $("#requestCost").val(),
			paidBy: $("#requestPaidBy").val(),
			paymentReceived: $("#requestPaymentReceived :checked").val(),
			documentation: JSON.stringify(filenames)
		}),
		callback: function (res) {
			displayMessage('success', 'Repair request successfully created');

			$("#requestReportDate, #requestIncidentDate").pickadate().pickadate('clear');
			$("#requestOverview").val('');
			$("#requestActionTaken").val('');
			$("#requestCost").val('');
			$(".dz-preview").remove();
			$(".dropzone.dz-started .dz-message").show();
		}
	});
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
