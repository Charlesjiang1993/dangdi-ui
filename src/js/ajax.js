var xhr, urlA;
if (location.href.includes(".net")) {
	urlA = "http://passapi.dangdi.net/";
} else {
	urlA = "http://passapi.dangdi.cn/";
}

var ajax = function(method, url, data, callback) {
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		xhr = null;
	}

	if (xhr != null) {
		xhr.open(method, url, true);
		xhr.setRequestHeader('content-type', type);
		xhr.send(data);
		xhr.onreadystatechange = state_Change;

	} else {
		alert("你的浏览器太旧了，请更新！！！.");
	}
	// console.log(88888888888888)
	function state_Change() {
		if (xhr.readyState == 4) { // 4 = "loaded"
			if (xhr.status == 200) { // 200 = OK
				if (xhr.responseText != "" && type != "application/json") {
					callback(eval("(" + xmlhttp.responseText + ")"));
				} else {
					callback(xhr.responseText);
				}
			} else {
				// alert("你的网络不稳定，请重试"+xmlhttp.statusText);
			}
		}
	}

}