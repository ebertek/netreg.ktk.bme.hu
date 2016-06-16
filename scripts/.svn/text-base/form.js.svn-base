function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
} 

document.onkeypress = stopRKey; //letiltjuk az Enter-t, mert hulye a bongeszo, s submitelni akar, pedig nincs is submit gomb xD

function form_check() {
	ajax_validate_all();
	var accept=document.getElementById('accept');
	if (error.value=='0000,00,000' && accept.checked == true) {
		return true;
	} else
	if (error_v.value=='0000' && document.getElementById('current_page').value=='validate_section') {
		return true;
	} else
	{ return false; } //ez csak akkor tortenhet meg, ha valaki mokazni probal :)
}

function kill_ekezet(str) { //megoli az ekezeteket, illetve space-bol underscore-t csinal
	var mit  = new Array("Á","á","É","é","Í","í","Ó","ó","Ö","ö","Ő","ő","Ú","ú","Ü","ü","Ű","ű"," ");
	var mire = new Array("A","a","E","e","I","i","O","o","O","o","O","o","U","u","U","u","U","u","_");
	for (var i=0; i<mit.length; i++) {
		str = str.replace(mit[i], mire[i]);
	}
	return str;
}

function pass_reminder() {
	document.getElementById('ldap_info_section').style.visibility = "hidden";
	document.getElementById('pass_reminder_section').style.visibility = "visible";
}

function next() {
	var home=document.getElementById('home');
	var kontent1=document.getElementById('content1');
	var kontent2=document.getElementById('content2');
	var kontent3=document.getElementById('content3');
	var kontent4=document.getElementById('content4');
	var next_btn=document.getElementById('next_btn');
	var prev_btn=document.getElementById('prev_btn');
	var form1=document.getElementById('form1');
	var current_page=document.getElementById('current_page');
	var error=document.getElementById('error');
	var error_split=error.value.split(',');
	var validate_section=document.getElementById('validate_section');
	var login_window=document.getElementById('login_window');
	var ldap_info_section=document.getElementById('ldap_info_section');

	if (current_page.value == 'home' && document.getElementById('what').value == "validate") {
		home.style.visibility = 'hidden';
		validate_section.style.visibility = 'visible';
		current_page.value='validate_section';
		prev_btn.disabled=false;
		next_btn.value='Befejezés';
	} else
	if (current_page.value == 'validate_section') {
		if(document.form1.onsubmit()) {
			document.form1.submit();
		}
	} else

	if (current_page.value == 'home' && document.getElementById('what').value == "old") {
		home.style.visibility = 'hidden';
		ldap_info_section.style.visibility = 'visible';
		current_page.value='ldap_info_section';
		prev_btn.disabled=false;
	} else

	if (current_page.value == 'home' && document.getElementById('what').value == "new") {
		home.style.visibility = 'hidden';
		login_window.style.visibility = 'visible';
		current_page.value='login_window';
		prev_btn.disabled=false;
	} else
	if (current_page.value == 'login_window' && document.getElementById('what').value == "new") {
		login_window.style.visibility = 'hidden';
		kontent1.style.visibility = 'visible';
		current_page.value='content1';
	} else
	if (current_page.value == 'content1' && error_split[0]=='0000') { //2. oldal jon
		kontent1.style.visibility = 'hidden';
		next_btn.value="Tovább >";
		prev_btn.disabled=false;
/*		//itt generalunk egy logint :)
		if (form1.login.value == '') {
			var vnev=form1.lname.value.toLowerCase();
			var knev=form1.fname.value.toLowerCase();
			var generalt_login=vnev+"."+knev;
			form1.login.value=kill_ekezet(generalt_login);
			ajax_validate('login');
		} */
		kontent2.style.visibility = 'visible';
		current_page.value='content2';
	} else
	if (current_page.value == 'content2' && error_split[1]=='00') { //3. oldal jon
		kontent2.style.visibility = 'hidden';
		next_btn.value="Tovább >";
		prev_btn.disabled=false;
		kontent3.style.visibility = 'visible';
		current_page.value='content3';
	} else
	if (current_page.value == 'content3' && error_split[2]=='000') { //4. oldal jon
		kontent3.style.visibility = 'hidden';
		prev_btn.disabled=false;
		next_btn.value='Befejezés';
		kontent4.style.visibility = 'visible';
		current_page.value='content4';
	} else
	if (current_page.value == 'content4') { //vege :)
		if(document.form1.onsubmit()) {
			document.form1.submit();
		}
	} else
	{
		//lname,fname,gender,dob,faculty,neptun,login,pass,pass2,email,email2,room,mac,wifi
		ajax_validate_all();
	}
}

function prev() {
	var home=document.getElementById('home');
	var kontent1=document.getElementById('content1');
	var kontent2=document.getElementById('content2');
	var kontent3=document.getElementById('content3');
	var kontent4=document.getElementById('content4');
	var prev_btn=document.getElementById('prev_btn');
	var next_btn=document.getElementById('next_btn');
	var current_page=document.getElementById('current_page');
	if (current_page.value == 'content4') { //3. oldal jon
		kontent4.style.visibility = 'hidden';
		next_btn.value="Tovább >";
		prev_btn.disabled=false;
		kontent3.style.visibility = 'visible';
		current_page.value='content3';
	} else
	if (current_page.value == 'content3') { //2. oldal jon
		kontent3.style.visibility = 'hidden';
		next_btn.value="Tovább >";
		prev_btn.disabled=false;
		kontent2.style.visibility = 'visible';
		current_page.value='content2';
	} else
	if (current_page.value == 'content2') { //1. oldal jon
		kontent2.style.visibility = 'hidden';
		next_btn.value="Tovább >";
		kontent1.style.visibility = 'visible';
		current_page.value='content1';
	} else //go home
	{
		document.getElementById(current_page.value).style.visibility = 'hidden';
		next_btn.value="Tovább >";
		prev_btn.disabled=true;
		home.style.visibility= 'visible';
		current_page.value='home';
	}
}

function force_next() {
	var validate_section=document.getElementById('validate_section');
	var login_window=document.getElementById('login_window');
	var kontent1=document.getElementById('content1');
	var kontent2=document.getElementById('content2');
	var kontent3=document.getElementById('content3');
	var kontent4=document.getElementById('content4');
	var next_btn=document.getElementById('next_btn');
	var prev_btn=document.getElementById('prev_btn');
	var form1=document.getElementById('form1');
	var current_page=document.getElementById('current_page');
	var error = document.getElementById('error');
	if (current_page.value == 'content1') { //2. oldal jon
		kontent1.style.visibility = 'hidden';
		next_btn.value="Tovább >";
		prev_btn.disabled=false;
		//itt generalunk egy logint :)
		if (form1.login.value == '') {
			var vnev=form1.lname.value.toLowerCase();
			var knev=form1.fname.value.toLowerCase();
			var generalt_login=vnev+"."+knev;
			form1.login.value=kill_ekezet(generalt_login);
			ajax_validate('login');
		}
		kontent2.style.visibility = 'visible';
		current_page.value='content2';
	} else
	if (current_page.value == 'content2') { //3. oldal jon
		kontent2.style.visibility = 'hidden';
		next_btn.value="Tovább >";
		prev_btn.disabled=false;
		kontent3.style.visibility = 'visible';
		current_page.value='content3';
	} else
	if (current_page.value == 'content3') { //4. oldal jon
		kontent3.style.visibility = 'hidden';
		prev_btn.disabled=false;
		next_btn.value='Befejezés';
		kontent4.style.visibility = 'visible';
		current_page.value='content4';
	} else
	if (current_page.value == 'content4') { //vege :)
		if(document.form1.onsubmit()) {
			document.form1.submit();
		}
	} else
	{
		//ajax_validate_all();
	}
}