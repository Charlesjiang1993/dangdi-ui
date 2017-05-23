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


	//请求数据DOM生成表格,callback1为隔行变色函数，createFooter为生成页尾
	var getData = function(json,intervalcolor) {
			var oTbody = document.getElementsByTagName("tbody")[0];
			var aTh = document.getElementsByTagName("thead")[0].getElementsByTagName("th");
			ajax(json.method, json.url, json.data, function(data) {
				console.log(data);
				if (data) {
					console.log("count=" + data.count)
					if (data.count) { //如果返回数据的数目不为0
						if (data.list) {
							for (var i in data.list) {
								var oTr = document.createElement('tr');
								for (var j = 0; j < aTh.length - 1; j++) {
									var oTd = document.createElement('td');
									oTd.innerHTML = data.list[i][json.arr[j]];
									oTr.appendChild(oTd);
								};
								var oTd = document.createElement('td');
								oTd.innerHTML = json.options;
								oTr.appendChild(oTd);
								oTbody.appendChild(oTr);
							};
						}
						if (document.getElementById("showCount")) { //如果页面需要显示总个数
							document.getElementById("showCount").innerHTML = data.count;
						}
						intervalcolor();
						//createFooter(data);
					} else { //请求的数据数目为0
						var oBox = document.getElementsByClassName("box-content")[0];
						var oDiv = document.createElement('div');
						oDiv.innerHTML = "暂无数据";
						oBox.appendChild(oDiv);
					}

				}

			})
		}

		//innerHtml生成元素 callback为set数据函数 callback1为隔行变色函数，createFooter为生成页尾
	var ajaxData;
	var getData2 = function(json, setStr, callback1) {
		var aTh = document.getElementById("tables").getElementsByTagName("th");
		var oTbody = document.getElementsByTagName("tbody")[0];
		ajax(json.method, json.url, json.data, function(data) {
			console.log(data)
			ajaxData = data.list;
			if (data) {
				oTbody.innerHTML = setStr(data.list);
			}
			if (document.getElementById("showCount")) {
				document.getElementById("showCount").innerHTML = data.count;
			}
			callback1();			
		})
	}

	//动态创建页尾
	var showFooter = function(json,setStr,clickPage) {
		var oUl = document.getElementsByClassName("footer")[0].getElementsByTagName("ul")[0];
		ajax(json.method, json.url, json.data, function(data) {
			if (data) {
				if (data.count) { //请求data数量不为0
					let pageShow, pageMax;
					pageMax = parseInt(data.count / 10 + 1);
					if (data.count / 10 <= 10){
						if(data.count%10==0){
							pageShow =pageMax= parseInt(data.count / 10);
						}else{
							pageShow =pageMax= parseInt(data.count / 10 + 1);
						}
					} else {
						pageShow = 10;
						pageMax = parseInt(data.count / 10 + 1);
					}
					for (var i = pageMax; i > 0; i--) {
						var oLi = document.createElement('li');
						oLi.className = 'liTag';
						oLi.innerHTML = i;
						oUl.appendChild(oLi);
					}

				} else { /*请求data数量为0*/ }
				clickPage(json,setStr);
			}
		})
	}
	//作为回调函数 动态创建页尾
	var createFooter = function(data) {
		var oUl = document.getElementsByClassName("footer")[0].getElementsByTagName("ul")[0];
		if (data.count) { //请求data数量不为0
			let pageShow, pageMax;
			if (data.count / 10 <= 10) {
				if(data.count%10==0){
					pageShow =pageMax= parseInt(data.count / 10);
				}else{
					pageShow =pageMax= parseInt(data.count / 10 + 1);
				}
				
			} else {
				pageShow = 10;
				pageMax = parseInt(data.count / 10 + 1);
			}
			for (var i = pageMax; i > 0; i--) {
				var oLi = document.createElement('li');
				oLi.className = 'liTag';
				oLi.innerHTML = i;
				oUl.appendChild(oLi);
			}
		} else { /*请求data数量为0*/ }		
	}

	//点击页尾page加载数据
	function clickPage(json,setStr){
		var page;
		// var aFootLi = document.getElementsByClassName("footer")[0].getElementsByTagName("li");
		var aFootLi = document.getElementsByClassName("footer")[0].getElementsByClassName("liTag");
		console.log(aFootLi.length);
		for (var i = 0; i < aFootLi.length; i++) {
			aFootLi[i].index = i;
			aFootLi[i].onclick = function() {
				console.log("click li");
				document.getElementsByTagName("tbody")[0].innerHTML = '';
				page = parseInt(aFootLi[this.index].innerHTML);
				if (aFootLi[this.index].innerHTML != '下一页' && aFootLi[this.index].innerHTML != '尾页') {
					// console.log("page="+ page);
					json.data = "type=" + 2 + "&page=" + page + "&pageSize=" + 10;
					// getData(json,intervalcolor,createFooter);
					getData2(json,setStr,intervalcolor);
				} else if (aFootLi[this.index].innerHTML == '下一页') {
					page
				} else {

				}
			}
		}
	}

	//隔行变色函数
	function intervalcolor() {
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