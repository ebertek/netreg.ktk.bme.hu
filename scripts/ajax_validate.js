function getXmlHttpRequestObject() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		alert("Nem támogatott böngésző!");
	}
}

//csinalunk egy XmlHttpRequest object-et
var searchReq = getXmlHttpRequestObject();

//keyup utan hivja meg az ajax_validate(), tolja az ajax request-et
function searchSuggest() {
	valasz=false;
	if (searchReq.readyState == 4 || searchReq.readyState == 0) {
		var str = escape(document.getElementById('login').value);
		searchReq.open("GET", 'scripts/searchSuggest.php?search=' + str, true);
		searchReq.onreadystatechange = handleSearchSuggest;
		searchReq.send(null);
	}		
}

//meghivodik, ha megjott az ajax valasz
function handleSearchSuggest() {
	if (searchReq.readyState == 4) {
		var msg = "";
		var err = [];
		var error = document.getElementById('error');
		for (i = 0; i<error.value.length; i++) {
			err[i] = error.value.charAt(i);
		}
		var str = searchReq.responseText.split("\n");
		var login_jo_string = str[0];
		if (login_jo_string.indexOf("szabad")>=0) {
			err[4]="0";
			msg = '<img src="images/green.png" alt="Helyes" title="Helyes" />';
		} else {
			err[4]="1";
			msg = '<img src="images/red.png" alt="Hibás" title="Hibás" />';
		}
		var info = document.getElementById('login_info');
		info.innerHTML = msg;
		var kiirando=err.join('');
		error.value=kiirando;
	}
}

var TimerID=0; //globalisnak kell lennie, e. :)

function ajax_validate(tipus) {
	var msg = '<img src="images/yellow.png" alt="Ellenőrzés" title="Ellenőrzés" />';
	var info = document.getElementById(tipus+'_info');
	info.innerHTML = msg;
	clearTimeout (TimerID); //ha mar fut egy timer, akkor azt megoljuk!
	TimerID=setTimeout(function(){ajax_validate_proper(tipus)}, 1500); //minden validalas elott varunk 1,5 masodpercet, hogy alacsonyabb legyen a load -- elsosorban SQL-LDAP miatt kell
}

// onblur event-ek meghivjak elesben a proper validation-t, a clearTimeout miatt muszaj!

function ajax_validate_proper(tipus) {

//	clearTimeout (TimerID); //azert a biztonsag kedveert megoljuk itt is :P
	var msg = "";
	var msg2 = "";
	
	var maci1 = "";
	var maci2 = "";

	var ok = false;
	var ok_lesz = false;

	var err = []; //ez a validation utani normalis reg-hez
	var error = document.getElementById('error');
	for (i = 0; i<error.value.length; i++) {
		err[i] = error.value.charAt(i)
	}

	var err_v = []; //ez a teljesen uj reg-hez
	var error_v = document.getElementById('error_v');
	for (i = 0; i<error_v.value.length; i++) {
		err_v[i] = error_v.value.charAt(i)
	}


	var info = document.getElementById(tipus+'_info');
	var value = document.getElementById(tipus).value;

	var name_re = new RegExp("^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+[- .]?[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]*$"); //max. ket tagu, elvalaszto - SPACE .
	var dob_re = new RegExp("^(19|20)[0-9]{2}[\x20]?[\-\x20\/\.]?[\x20]?(0[1-9]|1[0-2])[\x20]?[\-\x20\/\.]?[\x20]?(0[1-9]|[12][0-9]|3[01])[\x20]?[\.]?$"); //1900/01/01-2099/12/31, elvalaszto -SPACE/. (vagy elvalaszto nelkul)
	var neptun_re = new RegExp("^[0-9a-zA-Z]{6}$"); //6 karakter, alfanumerikus
	var login_re = new RegExp("(?!^.*[\.\_\-]{2,}.*$)^[a-z][0-9a-z\.\_\-]{1,18}[0-9a-z]$"); //betuvel kezdodjon, a tobbi pedig alfanumerikus (de lowercase), 3-20 karakter, valamint lehet benne pont-alahuzas-kotojel, de egymas utan ket ilyen karakter nem szerepelhet, illetve az utolso karakter sem lehet ilyen
	var pass_re = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$"); //8 karakter, ebbol legalabb egy kisbetu, egy nagybetu, egy szam
	var email_re = new RegExp("^[0-9a-zA-Z._+-]+[@][0-9a-zA-Z.-]+[\.][a-zA-Z]{2,3}$"); //egyjokarakter@egyjokarakter.kettovagyharombetu
	var email2_re = new RegExp("^[0-9a-zA-Z._+-]+[@][0-9a-zA-Z.-]+[\.][a-zA-Z]{2,3}$|^$"); //lehet ures string is
	var room_re = new RegExp("^[0-9aA][0-9]{2}$|^(hk|HK)[0-9]{0,3}$"); //a00-a99 vagy 000-999 vagy hk, hk0, hk00, hk000
	var mac_re = new RegExp("^([0-9a-fA-F]{2}([:-]?)){5}[0-9a-fA-F]{2}$"); //0-9 vagy a-f, hatszor, elvalaszto :- (vagy elvalaszto nelkul)
	var wifi_re = new RegExp("^([0-9a-fA-F]{2}([:-]?)){5}[0-9a-fA-F]{2}$|^$"); //lehet ures string is

	//lname,fname,gender,dob,faculty,neptun,login,pass,pass2,email,email2,room,mac,wifi

	if (tipus=='login') {
		if (value.match(login_re)) {
			searchSuggest();
			ok_lesz=true;
		} else {err_v[0]="1";}
	}
	
	if (tipus=='pass') {
		if (value.match(pass_re)) {
			ok = true;
			err_v[1]="0";
			if (value == document.getElementById('pass2').value) {
				err_v[2]="0"; msg2 = '<img src="images/green.png" alt="Helyes" title="Helyes" />';
			} else {err_v[2]="1"; msg2 = '<img src="images/red.png" alt="Hibás" title="Hibás" />';}
			document.getElementById('pass2_info').innerHTML = msg2;
		} else {err_v[1]="1";}
	}
	
	if (tipus=='pass2' && value!='') {
		if (err_v[1]=="0" && value == document.getElementById('pass').value) {
			ok = true;
			err_v[2]="0";
		} else {err_v[2]="1";}
	}

	if (tipus=='email') {
		if (value.match(email_re)) {
			ok = true;
			err_v[3]="0";
		} else {err_v[3]="1";}
	}

	if (tipus=='confirm') {
//		if (value.match(name_re)) {
			ok = true;
			err[0]="0";
//		} else {err[0]="1";}
	}

	if (tipus=='lname') {
		if (value.match(name_re)) {
			ok = true;
			err[1]="0";
		} else {err[1]="1";}
	}
	
	if (tipus=='fname') {
		if (value.match(name_re)) {
			ok = true;
			err[2]="0";
		} else {err[2]="1";}
	}
	
	if (err[1]=="0" && err[2]=="0") {
		document.getElementById('cname').options[0].text=document.getElementById('lname').value+' '+document.getElementById('fname').value;
		document.getElementById('cname').options[1].text=document.getElementById('fname').value+' '+document.getElementById('lname').value;
	}
	
	if (tipus=='dob') {
		if (value.match(dob_re)) {
			ok = true;
			err[3]="0";
		} else {err[3]="1";}
	}

	if (tipus=='neptun') {
		if (value.match(neptun_re) || document.getElementById('faculty').value=='other') {
			ok = true;
			err[5]="0";
		} else {err[5]="1";}
	}
	
	if (tipus=='email2') {
		if (value.match(email2_re)) {
/*			var email_domain1=document.getElementById('email').value.split('@')[1];
			var email_domain2=value.split('@')[1];
			if (email_domain1 != email_domain2) { */
				ok = true;
				err[6]="0";
//			} else {err[6]="1";}
		} else {err[6]="1";}
	}

	if (tipus=='room') {
		if (value.match(room_re)) {
			ok = true;
			err[8]="0";
		} else {err[8]="1";}
	}

	if (tipus=='mac') {
		if (value.match(mac_re)) {
			maci2=document.getElementById('wifi').value;
			maci2.replace(/[:-]+/g, "");
			maci1=value;
			maci1.replace(/[:-]+/g, "");
			if (maci1==maci2 && maci2!="") {
				err[9]="1";
			} else {
				ok = true;
				err[9]="0";
			}
		} else {err[9]="1";}
	}
	
	if (tipus=='wifi') {
		if (value.match(wifi_re)) {
			maci1=document.getElementById('mac').value;
			maci1.replace(/[:-]+/g, "");
			maci2=value;
			maci2.replace(/[:-]+/g, "");
			if (maci1==maci2 && maci2!="") {
				err[10]="1";
			} else {
				ok = true;
				err[10]="0";
			}
		} else {err[10]="1";}
	}

	if (ok) {
		msg = '<img src="images/green.png" alt="Helyes" title="Helyes" />';
	} else if (ok_lesz) {
		msg = '<img src="images/yellow.png" alt="Ellenőrzés" title="Ellenőrzés" />';
	} else
	{
		msg = '<img src="images/red.png" alt="Hibás" title="Hibás" />';
	}
	
	info.innerHTML = msg;
	var kiirando=err.join('');
	error.value=kiirando;
	var kiirando_v=err_v.join('');
	error_v.value=kiirando_v;
}

function ajax_validate_all() {
	ajax_validate_proper('login');
	ajax_validate_proper('pass');
	ajax_validate_proper('pass2');
	ajax_validate_proper('email');

	ajax_validate_proper('confirm');	
	ajax_validate_proper('lname');
	ajax_validate_proper('fname');
	ajax_validate_proper('dob');

	ajax_validate_proper('neptun');
	ajax_validate_proper('email2');

	ajax_validate_proper('room');
	ajax_validate_proper('mac');
	ajax_validate_proper('wifi');
}

function send_reminder() {
	//ktk login es uj jelszo kikuldese
	var email_re = new RegExp("^[0-9a-zA-Z._+-]+[@][0-9a-zA-Z.-]+[\.][a-zA-Z]{2,3}$");
	var neptun_re = new RegExp("^[0-9a-zA-Z]{6}$");
	var value = document.getElementById(pass_forgot).value; //ebben van valami, vagy email, vagy neptun, vagy uid, vagy.. barmi mas XD
	if (value.match(neptun_re)) {
		//ajax->php->ldap-ban megkeresi a neptunt, majd:
		//uj jelszot general, felulirja ldap-ban, majd email-ben kikuldi az logint es az uj jelszot
	} else
	if (value.match(email_re)) {
		//ajax->php->ldap-ban megkeresi az emailt (lehet masodlagos is!), majd:
		//uj jelszot general, felulirja ldap-ban, majd email-ben kikuldi az logint es az uj jelszot
		//figyelni kell arra, hogy a MEGADOTT email cimre kuldje az emailt, ne feltetlen az elsodlegesre!
	} else
	{
		//ajax->php->ldap-ban megkeresi az uid-t, majd:
		//uj jelszot general, felulirja ldap-ban, majd email-ben kikuldi az logint es az uj jelszot
		//(a logint nem kene, de igy ket sorral kevesebb php kell majd :P)
	}
}