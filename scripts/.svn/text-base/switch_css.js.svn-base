function switch_css(file) {
	if (file=="1024" || file=="1280") {
		document.getElementsByTagName('link')[1].disabled = false;
		document.getElementsByTagName('link')[1].href = 'styles/common.css';
	} else
	{
		document.getElementsByTagName('link')[1].disabled = true;
		document.getElementsByTagName('link')[1].href = "styles/" + file + ".css";
	}
	document.getElementsByTagName('link')[2].href = "styles/" + file + ".css";
}