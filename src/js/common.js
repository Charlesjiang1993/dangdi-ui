window.onload = function() {
	var oTab = document.getElementById("tables");
	var oTbody = oTab.getElementsByTagName("tbody")[0];
	var aTr = oTbody.getElementsByTagName("tr");
	for (var i = 0; i < aTr.length; i++) {
		if (i % 2 == 0) {
			aTr[i].style.background = '#F5F5F5';
		};
	}


	function del() {
		var msg = "确定要删除这篇文章吗？\n\n请确认！";
		if (confirm(msg)==true){
		return true;
		}else{
		return false;
		}
	}
}