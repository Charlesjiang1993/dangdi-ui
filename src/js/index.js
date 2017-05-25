window.onload = function() {
    var oLeft = document.getElementById('index_left');
    var aLeftDiv = oLeft.getElementsByTagName('div');
    var oRight = document.getElementById('index_right');
    var aUl = oRight.getElementsByTagName('ul');
    var aLi = document.getElementsByTagName('li');
    var oIframe = document.getElementById('iframebox')
    var num = 0;
    //退出按钮功能
    document.getElementsByClassName('right_topdiv')[0].getElementsByTagName('button')[0].onclick = function() {
            //清除session
            window.parent.location = '../login.html';
        }
        //跨域地址
    var iframe_arr = ["menu_manage.html", "roles_manage.html", "account_manage.html", "system_log.html",
            "home_subject.html", "gov_class.html", "portal_class.html", "events_pages.html", "client_notice.html", "bg_notice.html",
            "subject_info.html", "subject_add.html", "subject_review.html", "weight_set.html",
            "portal_article.html", "gov_acticle.html",
            "income_statistics.html", "comsume.html", "withdraw_apply.html", "recharge_apply.html", "red_packets.html",
            "door_bind.html",
            "article_report.html", "subject_report.html"
        ]
        //左侧一级菜单功能
    for (var i = 0; i < aLeftDiv.length; i++) {
        aLeftDiv[i].index = i;
        aLeftDiv[i].onclick = function() {
            for (var j = 0; j < aLeftDiv.length; j++) {
                aLeftDiv[j].className = '';
            }
            for (var j = 0; j < aLi.length; j++) {
                aLi[j].className = '';
            }
            for (var j = 0; j < aUl.length; j++) {
                aUl[j].style.display = 'none';
            }
            aUl[this.index].getElementsByTagName('li')[0].className = 'activeli';
            switch (this.index) {
                case 0:
                    num = 0;
                    break;
                case 1:
                    num = 4;
                    break;
                case 2:
                    num = 10;
                    break;
                case 3:
                    num = 14;
                    break;
                case 4:
                    num = 16;
                    break;
                case 5:
                    num = 21;
                    break;
                default:
                    num = 22;
            }
            oIframe.setAttribute("src", "../html/" + iframe_arr[num]);
            aLeftDiv[this.index].className = "active_leftitem";
            aUl[this.index].style.display = 'block';

        }

    }

    //右侧二级菜单功能
    for (var j = 0; j < aLi.length; j++) {
        aLi[j].index = j;
        aLi[j].onclick = function() {
            for (var x = 0; x < aLi.length; x++) {
                aLi[x].className = '';
            }
            aLi[this.index].className = 'activeli';
            oIframe.setAttribute("src", "../html/" + iframe_arr[this.index]);
        }
    }

    //用户名的值
    // document.getElementById("userName").innerHTML=getsession("userName");

}