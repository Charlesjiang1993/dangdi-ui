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
            window.parent.location = '/src/login.html';
            window.parent.location = '../login.html';
        }
        //跨域地址
    var iframe_arr = ["Amenu_manage.html", "Aroles_manage.html", "Aaccount_manage.html", "Asystem_log.html",
            "Bhome_subject.html", "Bgov_class.html", "Bportal_class.html", "Bevents_pages.html", "Bclient_notice.html", "Bbg_notice.html",
            "Csubject_info.html", "Csubject_add.html", "Csubject_review.html", "Cweight_set.html",
            "Gportal_article.html", "Ggov_acticle.html",
            "Dincome_statistics.html", "Dcomsume.html", "Dwithdraw_apply.html", "Drecharge_apply.html", "Dred_packets.html",
            "Edoor_bind.html",
            "Farticle_report.html", "Fsubject_report.html"
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

            for (var j = 0; j < aUl.length; j++) {
                aUl[j].style.display = 'none';
            }
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

}