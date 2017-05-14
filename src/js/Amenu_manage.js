window.onload=function(){
    var oTab=document.getElementById('tab1');
    var oBtn=document.getElementById('btn1');
    var oName=document.getElementById('name');
    
    var createDate=function(){
        var oTr=document.createElement('tr');
        var oTd=document.createElement('td');
        oTr.appendChild(oTd);
        var oTd=document.createElement('td');
        oTr.appendChild(oTd);
        var oTd=document.createElement('td');
        oTr.appendChild(oTd);
        var oTd=document.createElement('td');
        oTr.appendChild(oTd);
        var oTd=document.createElement('td');
        oTd.innerHTML='<a href="javascript:;">修改</a>/<a href="javascript:;">删除</a>';
        oTr.appendChild(oTd);
        oTab.tBodies[0].appendChild(oTr);
        
    }   
    
    
    oBtn.onclick=createDate();       
 
    var tabRemove=function(){
        
    }
    var tabChange=function(){
        
    }
    
    
    
    
    
    
}