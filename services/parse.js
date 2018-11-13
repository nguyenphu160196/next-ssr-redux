export function parseHtml(str, isHeader) {
	var vstyle = {
		wrapper: "font-family: -apple-system, 'Helvetica Neue', 'Roboto', 'Oxygen', 'Droid Sans', 'Segoe UI', sans-serif; \
				font-size: 14px; \
				line-height: 20px; \
				display:inline-block; \
				width: 100%; \
				min-height: 25px;",

		bulleting: "",
		bulletingIcon: "width:10px; \
						height:10px; \
						border-radius:5px; \
						background:#0273B9; \
						float:left; margin-top:6px; \
						margin-right:10px;",

		header: "text-decoration: none; \
				 color: #0273B9; \
				 font-size:20px; \
				 font-weight:400;",

		phone: "text-decoration: none; \
				color: #0273B9;",

		link: "text-decoration: none; \
			   color: #0273B9;",

		email: "text-decoration: none; \
				color: #0273B9;",

		newline: "line-height: 10px; \
				  height: 10px;"
	};
	//isHeader = true;
	var header = "";
	var result = str.replace(/&/g, "&amp;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;")
					.replace(/"/g, "&quot;")
					.replace(/'/g, "&#039;");

	if(isHeader) {
		var i = result.indexOf("\n");
		if(i > 0) {
			header = "<div style=\"" + vstyle.header + "\">" + result.substr(0, i) + "</div>";
			result = result.substr(i+1);
		}
	}


	// Bulleting
	result = result.replace(/^(-( |)(.*))/gmi, function(val) {
		var dval = val.substr(1).trim();
		return "<div style=\"" +  vstyle.bulleting + "\">" + "<div style=\"" + vstyle.bulletingIcon + "\"></div>"+ dval + "</div>";
	});

	// Email
	result = result.replace(/(\w){1,}@(\S){3,}/gmi, function(val) {
		return "<a style=\"" +  vstyle.email + "\" href=\"mailto:" + val + "\">" + val + "</a>";
	});

	// Link
	result = result.replace(/((http(|s):\/\/)|(www.))\S+/gmi, function(val) {
		var link = val;
		if(!link.startsWith("http")) {
			link = "http://" + link;
		}
		return "<a style=\"" +  vstyle.link + "\" href=\"" + link + "\">" + val + "</a>";
	});

	// Phone
	result = result.replace(/(\+|)((\(|)(\+|\-| |\.|)([0-9]{1,})(\)|)){9,}/gmi, function(val) {
		return "<a style=\"" +  vstyle.phone + "\" href=\"tel:" + val + "\">" + val + "</a>";
	});


	// New Line
	result = result.replace(/(\r\n)|(\n\r)|(\n)/gmi, function(val) {
		return "<div style=\"" + vstyle.newline +"\"></div>";
	});

	if(isHeader) {
		if(header.length > 3) {
			header += "<br>";
		}

		vstyle.wrapper += "text-align: center;";

	}

	return "<div style=\"" + vstyle.wrapper + "\">" + header + result + "</div>";
}

function displayText(htmlText, isHeader) {
    var a = parseHtml(htmlText, isHeader);
    var div = document.getElementById('desc-display');
    div.innerHTML = a;
    AndroidBridge.resize(document.getElementById('desc-display').clientHeight);

    console.log(a)
}