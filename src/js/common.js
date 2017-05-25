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

	//innerHtml生成元素 setStr为set数据函数 intervalcolor为隔行变色函数
	var getData = function(json, setStr, intervalcolor, callback) {
		var aTh = document.getElementById("tables").getElementsByTagName("th");
		var oTbody = document.getElementsByTagName("tbody")[0];
		ajax(json.method, json.url, json.data, function(data) {
			console.log(data);
			if (data) {
				if (data.list) {
					oTbody.innerHTML = setStr(data.list);
					intervalcolor();
				} else {
					oTbody.innerHTML = setStr(data);
					intervalcolor();
				}
			}
			if (document.getElementById("showCount")) {
				document.getElementById("showCount").innerHTML = data.count;
			}
			callback(data);
		})
	}

	//动态创建页尾 json为数据项 data为传入的ajax请求数据  clickpage为点击页码的函数
	var showFooter = function(json, data, setStr, clickPage) {
			if (document.getElementsByClassName("footer")[0]) {
				var oFooter = document.getElementsByClassName("footer")[0];
				var oUl = oFooter.getElementsByTagName("ul")[0];
				if (data) {
					if (data.count != 0) { //请求data数量不为0
						let pageShow, pageMax;
						pageMax = parseInt(data.count / 10 + 1);
						if (data.count / 10 <= 10) {
							if (data.count % 10 == 0) {
								pageShow = pageMax = parseInt(data.count / 10);
							} else {
								pageShow = pageMax = parseInt(data.count / 10 + 1);
							}
						} else {
							pageShow = 10;
							pageMax = parseInt(data.count / 10 + 1);
						}
						var lastPage = document.createElement('span');
						lastPage.id = 'lastPage';
						lastPage.className = 'liTag';
						lastPage.innerHTML = '尾页';
						oFooter.insertBefore(lastPage, oUl);
						var nextPage = document.createElement('span');
						nextPage.id = 'nextPage';
						nextPage.className = 'liTag';
						nextPage.innerHTML = '下一页';
						oFooter.insertBefore(nextPage, lastPage);

						//生成显示的页码li
						for (var i = pageShow; i > 0; i--) {
							var oLi = document.createElement('li');
							oLi.className = 'liTag';
							oLi.innerHTML = i;
							oUl.appendChild(oLi);
						}
						oUl.getElementsByClassName("liTag")[oUl.getElementsByClassName("liTag").length - 1].className = 'activeliTag liTag';
						clickPage(json, setStr, pageShow, pageMax);
					} else { /*请求data数量为0*/ }

				}
			}
		}
		//生成单个ul
	var singleLi = function() {}
		//点击页尾page加载数据
	var clickPage = function(json, setStr, pageShow, pageMax) {
		var pageInner; //点击页码的innerHTML
		var pageCurrent = 1; // 当前显示的数据的页码
		var aFootLi = document.getElementsByClassName("footer")[0].getElementsByClassName("liTag");
		// console.log(aFootLi.length);
		for (var i = 0; i < aFootLi.length; i++) {
			aFootLi[i].index = i;
			aFootLi[i].onclick = function() {
				var changeColor = function(a) { //改变点击后的颜色
					for (var j = 0; j < aFootLi.length; j++) {
						aFootLi[j].className = 'liTag';
					}
					aFootLi[a].className = 'activeliTag liTag';
				}
				document.getElementsByTagName("tbody")[0].innerHTML = ''; // 清空已有数据
				pageInner = isNaN(aFootLi[this.index].innerHTML) ? aFootLi[this.index].innerHTML : parseInt(aFootLi[this.index].innerHTML);
				pageCurrent = isNaN(pageInner) ? pageCurrent : pageInner;
				//console.log("pageInner=" + pageInner);		
				if (aFootLi[this.index].innerHTML != '下一页' && aFootLi[this.index].innerHTML != '尾页') { //点击数字
					changeColor(this.index);
					json.data = "type=" + json.type + "&page=" + pageInner + "&pageSize=" + json.pageSize;
					getData(json, setStr, intervalcolor, function() {});
				} else
				if (aFootLi[this.index].innerHTML == '下一页') { // 点击下一页
					if (pageCurrent < pageMax) {
						pageCurrent += 1
					}
					console.log("pagecurrent=" + pageCurrent);
					console.log("pageMax=" + pageMax);
					if (pageCurrent <= pageMax) { //当前显示的页面的page小于等于最大页
						changeColor(aFootLi.length - pageCurrent);
						//console(pageCurrent);
						json.data = "type=" + json.type + "&page=" + pageCurrent + "&pageSize=" + json.pageSize;
						getData(json, setStr, intervalcolor, function() {});
					}
				} else { //点击尾页
					changeColor(aFootLi.length - pageMax);
					json.data = "type=" + json.type + "&page=" + pageMax + "&pageSize=" + json.pageSize;
					getData(json, setStr, intervalcolor, function() {});
				}
			}
		}
	}

	//表格中的操作
	var tabOptions = function(optionsJson) {
			var aOptions = document.getElementById("tables").getElementsByTagName("tbody")[0].getElementsByTagName("a");
			for (var i = 0; i < aOptions.length; i++) {
				aOptions[i].index = i;
				aOptions[i].onclick = function() {
					if (aOptions[this.index].innerHTML = '删除') { // 删除操作
						// optionsJson.data = optionsJson
					} else if (aOptions[this.index].innerHTML = '修改') { //修改操作

					} else if (aOptions[this.index].innerHTML = '冻结') {

					} else if (aOptions[this.index].innerHTML = '查看详情') {

					} else if (aOptions[this.index].innerHTML = '进入主体') {

					} else {

					}
				}

			};

		}
		//隔行变色函数
	var intervalcolor = function() {
		var oTbody = document.getElementsByTagName("tbody")[0];
		var aTr = oTbody.getElementsByTagName("tr");
		for (var i = 0; i < aTr.length; i++) {
			if (i % 2 == 0) {
				aTr[i].style.background = '#F5F5F5';
			};
		}
	}

	//空函数
	function nullFunction() {}