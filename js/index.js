$(function() {
	$(document).keypress(function(e) {
		if(e.which == 13) {
			$("#loginButton").click();
		}
	});

	if (getPersistentVar('username') && getPersistentVar('password')) {
		$("#loginUsername").val(getPersistentVar('username'));
		$("#loginPassword").val(getPersistentVar('password'));
		login();
	}
});

function login() {
	var username = $("#loginUsername").val();
	var password = $("#loginPassword").val();

	if ($("#loginRemember").prop('checked')) {
		setPersistentVars({
			username: username,
			password: password
		});
	}

	$("#loginPassword").val('');
	post({
		url: "customer/login.php",
		vars: {
			username: username,
			password: password
		},
		callback: function(response) {
			setUserInfo(response.details);
			if (response.type == 'correct') {
				// If username and password are correct and it's not the first time logging in then call setUserInfo and redirect to dashboard
				window.location = "portal.php#dashboard";
			} else if (response.type == 'firsttime') {
				// If username and password are correct and it's the first time logging in then call setUserInfo and redirect to first-time to set new password
				window.location = "first-time.php";
			}
		}
	});
}

// Set sessionStorage variables
function setUserInfo(userInfo) {
	setSessionVars({
		loggedIn: 'true',
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
}
