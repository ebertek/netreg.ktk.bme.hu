function getXmlHttpRequestObject() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		alert("Nem támogatott böngésző!");
	}
}

//Our XmlHttpRequest object to get the auto suggest
var ldapReq = getXmlHttpRequestObject();

//Called from keyup on the search textbox.
//Starts the AJAX request.
function ldap_info() {
	valasz=false;
	if (ldapReq.readyState == 4 || ldapReq.readyState == 0) {
		var str = escape(document.getElementById('ldap_login').value);
		ldapReq.open("GET", 'scripts/ldap_info.php?search=' + str, true);
		ldapReq.onreadystatechange = handleldap_info;
		ldapReq.send(null);
	}		
}


//Called when the AJAX response is returned.
function handleldap_info() {
	if (ldapReq.readyState == 4) {
		var msg = "";
		var str = ldapReq.responseText.split("\n");
//		msg.=str[0]; //for ciklus i=0;i<str.length;i++;
		for(i=0; i < str.length - 1; i++) {
			msg += "<div>" + str[i] + "</div>";
		}
		var info = document.getElementById('ldap_info_p');
		info.innerHTML = msg;
	}
}