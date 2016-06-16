<?php
	if ($_SERVER['REQUEST_METHOD'] != 'POST'){
		echo "NEMPOST";
		$me = $_SERVER['PHP_SELF'];

		function returnMacAddress() {
		// This code is under the GNU Public Licence
		// Written by michael_stankiewicz {don't spam} at yahoo {no spam} dot com
		// Tested only on linux, please report bugs

		// WARNING: the commands 'which' and 'arp' should be executable
		// by the apache user; on most linux boxes the default configuration
		// should work fine

		// Execute the arp command and store the output in $arpTable
		$arpTable = `/usr/sbin/arp -a -n`;

		// Split the output so every line is an entry of the $arpSplitted array
		$arpSplitted = split("\n",$arpTable);

		// Get the remote ip address (the ip address of the client, the browser)
		$remoteIp = $GLOBALS['REMOTE_ADDR'];
		$remoteIp = str_replace(".", "\\.", $remoteIp);

		// Cicle the array to find the match with the remote ip address
		foreach ($arpSplitted as $value) {
		// Split every arp line, this is done in case the format of the arp
		// command output is a bit different than expected
		$valueSplitted = split(" ",$value);

		foreach ($valueSplitted as $spLine) {
		if ( preg_match("/$remoteIp/",$spLine) ) {
		$ipFound = true;
		}

		// The ip address has been found, now rescan all the string
		// to get the mac address

		if ($ipFound) {
		// Rescan all the string, in case the mac address, in the string
		// returned by arp, comes before the ip address (you know, Murphy's laws)
		reset($valueSplitted);

		foreach ($valueSplitted as $spLine) {
		if (
		preg_match("/[0-9a-f][0-9a-f][:-][0-9a-f][0-9a-f][:-][0-9a-f][0-9a-f][:-][0-9a-f][0-9a-f][:-]".
		"[0-9a-f][0-9a-f][:-][0-9a-f][0-9a-f]/i",$spLine)) {
		return $spLine;
		}
		}
		}

		$ipFound = false;
		}
		}

		return false;
		}
		
		echo returnMacAddress();

	} else {       

		echo "POST<br />";

		$name_re = '/^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+[- .]?[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]*$/';
		$dob_re = '/^(19|20)[0-9]{2}[\x20]?[\-\x20\/\.]?[\x20]?(0[1-9]|1[0-2])[\x20]?[\-\x20\/\.]?[\x20]?(0[1-9]|[12][0-9]|3[01])[\x20]?[\.]?$/';
		$neptun_re = '/^[0-9a-zA-Z]{6}$/';
		$login_re = '/(?!^.*[\.\_\-]{2,}.*$)^[a-z][0-9a-z\.\_\-]{1,18}[0-9a-z]$/';
		$pass_re = '/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/';
		$email_re = '/^[0-9a-zA-Z._+-]+[@][0-9a-zA-Z.-]+[\.][a-zA-Z]{2,3}$/';
		$email2_re = '/^[0-9a-zA-Z._+-]+[@][0-9a-zA-Z.-]+[\.][a-zA-Z]{2,3}$|^$/';
		$room_re = '/^[0-9aA][0-9]{2}$|^(hk|HK)[0-9]{0,3}$/';
		$mac_re = '/^([0-9a-fA-F]{2}([:-]?)){5}[0-9a-fA-F]{2}$/';
		$wifi_re = '/^([0-9a-fA-F]{2}([:-]?)){5}[0-9a-fA-F]{2}$|^$/';

		$what = $_POST[what];
		
		if ($what == "validate") {
			$login = $_POST[login];	//KTKlogin
			$pass = $_POST[pass];	//jelszo
			$pass2 = $_POST[pass2];	//jelszo megerositese
			$email = $_POST[email];	//email cim
			if(preg_match($login_re,$login) && preg_match($pass_re,$pass) && pass==pass2 && preg_match($email_re,$email)) {
				$uzenet.="REGEX SUCCESS!!<br />";
			}
		} else

		if ($what == "new") {
			$confirm = $_POST[confirm];	//megerosito kod
			$lname = $_POST[lname];		//vezeteknev
			$fname = $_POST[fname];		//keresztnev
			$cname = $_POST[cname];		//megjel. nev
			$gender = $_POST[gender];	//nem; value=male vagy female
			$dob = $_POST[dob];			//date of birth, string-kent, tetszoleges elvalasztassal, de YYYY MM DD sorrendben
			// $avatar = $_POST[avatar]; //$_FILES-al, kesobb
			$faculty = $_POST[faculty];	//szak; value=gpk,ttk,gtk,vik,ksk,vbk,epk,emk,other
			$neptun = $_POST[neptun];	//neptun kod, other eseten *lehet* ures
			$email2 = $_POST[email2];	//secondary email cim, nem kotelezo
			$wantmail = $_POST[wantmail];	//ker-e @ktk.bme.hu-s email cimet
			$room = $_POST[room];		//szobaszam, a00-a99 vagy 000-999 vagy hk, hk0, hk00, hk000
			$mac = $_POST[mac];			//mac cim, tetszolegesen elvalasztva
			$wifi = $_POST[wifi];		//szinten, csak wifire... lehet ures.
			$accept = $_POST[accept];	//elfogadja-e a policy-t

/*			$tmpfajl = $_FILES["avatar"]["tmp_name"];
			$fajlnev = $_FILES["avatar"]["name"];
			$kepnev = $neptun . ".jpg"; //logint SQL-bol ki kell nezni

			if (copy ($tmpfajl, "upload/$kepnev")) {
				$uzenet.="A fotó az upload mappába került.<br />";
			} else{
				$uzenet.="Fotó URL: $_POST[avatar_url]<br />";
			} */
			
			// REGEX ELLENORZES, JUST TO BE SURE
			if(preg_match($name_re,$lname) && preg_match($name_re,$fname) && preg_match($dob_re,$dob) && preg_match($neptun_re,$neptun) && preg_match($email2_re,$email2) && preg_match($room_re,$room) && preg_match($mac_re,$mac) && preg_match($wifi_re,$wifi) && $accept) {
				$uzenet.="REGEX SUCCESS!!<br />";
				//ez utan johet az adatok formazasa, majd sql-be tolasa
			}			
			// REGEX ELLENORZES VEGE
			
		} // uj reg-es if ag vege


		$to = "ebertek@gmail.com";
		$subject = "[netreg] $neptun";

		$uzenet.="Név: $lname $fname<br />";
		$uzenet.="Nem: $gender<br />";
		$uzenet.="Szülinap: $dob<br />";
		$uzenet.="Kar: $faculty<br />";
		$uzenet.="Neptun: $neptun<br />";
		$uzenet.="Login: $login<br />";
		$uzenet.="Pass: $pass<br />";
		$uzenet.="Email: $email<br />";
		$uzenet.="Email2: $email2<br />";
		$uzenet.="Szoba: $room<br />";
		$uzenet.="MAC: $mac<br />";
		$uzenet.="WiFi: $wifi<br />";

		$headers = "From: $_POST[email]" . "\r\n";
		$headers .= "To: David Ebert <$to>" . "\r\n";
		$headers .= 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
		$headers .= 'X-Mailer: PHP/' . phpversion();

		if (mail ($to, $subject, $uzenet, $headers)) {
			echo "Success.<br />";
			echo $uzenet; echo "<br/>";
		} else
		{
			echo "Fail.";
		} //else
	}
?>
