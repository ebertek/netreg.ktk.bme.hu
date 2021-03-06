function context_help(id) {
	//lname,fname,gender,dob,faculty,neptun,login,pass,pass2,email,email2,room,mac,wifi
	var aside_p = document.getElementById('aside_p');
	if (id == 'lname') {
		aside_p.innerHTML="A családneved. Lehet benne szóköz, kötőjel.";
	} else
	if (id == 'fname') {
		aside_p.innerHTML="Az a név, amin általában szólítanak, például Anna.";
	} else
	if (id == 'dob') {
		aside_p.innerHTML="A születési időpontod, például: 1969. 04. 20.";
	} else
	if (id == 'neptun') {
		aside_p.innerHTML="A Neptun kódod. Hat karakter.";
	} else
	if (id == 'login') {
		aside_p.innerHTML="Ezt a nevet fogod használni a KTKSzSz által üzemeltetett összes szolgáltatáshoz.";
	} else
	if (id == 'pass') {
		aside_p.innerHTML="Legalább nyolc karakter, melyből legalább egy-egy kisbetű, nagybetű és szám.";
	} else
	if (id == 'pass2') {
		aside_p.innerHTML="Ide ugyanazt kell írnod, mint az előző mezőbe.";
	} else
	if (id == 'email') {
		aside_p.innerHTML="Az email címed. Fontos, hogy érvényes legyen, különben a regisztrációd érvénytelen.";
	} else
	if (id == 'email2') {
		aside_p.innerHTML="Ha megszűnik az elsődleges email címed, itt próbálunk meg elérni. Külön szolgáltatónál kell lennie.";
	} else
	if (id == 'room') {
		aside_p.innerHTML="A szobaszámod. HK tömb esetén elég annyi, hogy HK.";
	} else
	if (id == 'mac') {
		aside_p.innerHTML="Itt egy howto: <a href='#'>howto</a>.";
	} else
	if (id == 'wifi') {
		aside_p.innerHTML="Mint az előzőnél. Menni fog, bízunk benned!!";
	} else
	if (id == 'pass_forgot') {
		aside_p.innerHTML="Ha a másodlagos e-mail címedet írod ide, oda küldjük az új jelszót.";
	} else
	{
		aside_p.innerHTML="Ne légy láma.";
	}	
}
