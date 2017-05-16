window.onload = function() {
    var oTab = document.getElementById('tab1');

    var createDate = function(n) {
        var oTr = document.createElement('tr');
        for (var i = 0; i < n - 1; i++) {
            var oTd = document.createElement('td');
            oTr.appendChild(oTd);
        }
        var oTd = document.createElement('td');
        oTr.appendChild(oTd);
        oTab.tBodies[0].appendChild(oTr);
        console.log(oTr)
    }



}