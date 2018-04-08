setInterval(getRTime, 100);
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;
    var d = dd.getDate();
    return y + "/" + m + "/" + d;
}
function getRTime() {
    var EndTime = new Date(GetDateStr(1));
    var NowTime = new Date();
    var t = EndTime.getTime() - NowTime.getTime();
    if (t > 0) {
        var h = Math.floor(t / 1000 / 60 / 60);
        var m = Math.floor(t / 1000 / 60 % 60);
        var s = Math.floor(t / 1000 % 60);
        var w = Math.floor(t / 100 % 10);
        document.getElementById("J_TimeHour").innerHTML = (Array(2).join(0) + h).slice(-2);
        document.getElementById("J_TimeMin").innerHTML = (Array(2).join(0) + m).slice(-2);
        document.getElementById("J_TimeSec").innerHTML = (Array(2).join(0) + s).slice(-2);
        document.getElementById("J_TimeWSec").innerHTML = (Array(2).join(0) + w).slice(-2);
    }
}


function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

var localurl = document.location.href;
getQueryString(localurl);

document.getElementById("backid").value = getQueryString('id');




function getUrl() {
    window.location.href = "http://vips.laoyejia8.cn/fishing-pole/js/order.htm?id=" + document.getElementById("backid").value;
}