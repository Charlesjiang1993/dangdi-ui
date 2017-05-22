	//ajax方法
	var xhr, urlA;
	if (location.href.includes(".net")) {
		urlA = "http://passapi.dangdi.net/";
	} else {
		urlA = "http://passapi.dangdi.cn/";
	}

	var ajax = function(method, url, data, callback, type = 'application/x-www-form-urlencoded') {
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

		function state_Change() {
			if (xhr.readyState == 4) { // 4 = "loaded"
				if (xhr.status == 200) { // 200 = OK
					if (xhr.responseText != "" && type != "application/json") {
						callback(eval("(" + xhr.responseText + ")"));
					} else {
						callback(xhr.responseText);
					}
				}
			}
		}

	}

	//隔行变色函数
	function intervalcolor() {
		var oTab = document.getElementById("tables");
		var oTbody = oTab.getElementsByTagName("tbody")[0];
		var aTr = oTbody.getElementsByTagName("tr");
		for (var i = 0; i < aTr.length; i++) {
			if (i % 2 == 0) {
				aTr[i].style.background = '#F5F5F5';
			};
		}
	}

	//创建表格元素方法
	var createDate = function(n) {
		var oTbody = oTab.getElementsByTagName("tbody")[0];
		var oTr = document.createElement('tr');
		for (var i = 0; i < n; i++) {
			var oTd = document.createElement('td');
			oTr.appendChild(oTd);
		}

		oTab.tBodies[0].appendChild(oTr);
	}

	//删除文章确认框
	function del() {
		var msg = "确定要删除这篇文章吗？\n\n请确认！";
		if (confirm(msg) == true) {
			return true;
		} else {
			return false;
		}
	}

	//上传图片显示缩略图
	function viewmypic(mypic, imgfile) {
		if (imgfile.value) {
			mypic.src = imgfile.value;
			mypic.style.display = "";
			mypic.border = 1;
		}
	}

	//尾页请求数据
	var netPage = function(page) {

	}

	//请求数据方法
	var ajaxData;
	var getData = function(json, callback) {
		var aTh = document.getElementById("tables").getElementsByTagName("th");
		var oTbody = document.getElementsByTagName("tbody")[0];
		ajax(json.method, json.url, json.data, function(data) {
			console.log(data)
			ajaxData = data;
			if (data) {
				oTbody.innerHTML = callback(data);
			}
		})
	}