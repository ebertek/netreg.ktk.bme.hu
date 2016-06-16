<?php

	header("Expires: Wed, 14 Mar 1990 05:00:00 GMT" ); 
	header("Content-Type: text/xml; charset=utf-8");

	if (isset($_GET['search']) && $_GET['search'] != '') {

		$search = addslashes($_GET['search']);

		$ldap_server="152.66.220.47";	//ldap
		$ldap_server2="152.66.220.48";	//ldap2
		$basedn="ou=People,dc=ktk,dc=bme,dc=hu";
//		$basedn_aliases="ou=People,dc=ktk,dc=bme,dc=hu";

		$filter="(|(uid=$search))";
		$justthese = array("ou", "sn", "givenName", "mail", "roomNumber");
//		$dn = "uid=d,ou=Active,ou=Szakkoli,ou=KTKUsers,";
//		$password = "";
		if (!($connect = ldap_connect($ldap_server))) {
			if (!($connect = ldap_connect($ldap_server2))) {
				die ("Could not connect to LDAP server");
			}
		}

		//if(ldap_start_tls($connect)) {
//			if (!($bind = ldap_bind($connect, "$dn" . "$basedn", $password))) {				
				if (!($bind = ldap_bind($connect))) { //anonim
					die ("Could not bind to $dn");
				}
			//								} else {
				//									die ("Could not start TLS");
			//								}
			// } //start_tls
			$sr = ldap_search($connect, $basedn, $filter, $justthese);
			$info = ldap_get_entries($connect, $sr);
			$room=$info[0]["roomnumber"][0];
			$fqdn=$info[0]["dn"];
			$fullname=$info[0]["sn"][0] . " " . $info[0]["givenname"][0];
			$email=$info[0]["mail"][0];

/*			$sr = ldap_search($connect, $basedn_aliases, $filter, $justthese);
			$info = ldap_get_entries($connect, $sr);
			$fqdn=$info[0]["dn"];
			if ($fqdn=="") { 
				$ldap_aliases_szabad=true;
			} else {
				$ldap_aliases_szabad=false;
			} */

//KIIRAS
			$fqdn_div=preg_replace("/,/", "<br />", $fqdn);
			echo "Fully qualified DN: $fqdn_div\n";
			echo "Full name: $fullname\n";
			echo "Room: $room\n";
			echo "Email address: $email\n";

	}
?>