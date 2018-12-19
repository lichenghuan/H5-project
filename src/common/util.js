/**
 * 工具类
 */

const util = {
    /**
     * 四舍五入保留2位小数（若第二位小数为0，则保留一位小数）
     */
    keepTwoDecimal: function (num) {
        var result = parseFloat(num);
        if (isNaN(result)) {
            // alert('传递参数错误，请检查！');
            return false;
        }
        result = Math.round(num * 100) / 100;
        return result;
    },
    /**
     * 四舍五入保留2位小数（不够位数，则用0替补）
     */
    keepTwoDecimalFull: function (num) {
        var result = parseFloat(num);
        if (isNaN(result)) {
            // alert('传递参数错误，请检查！');
            return false;
        }
        result = Math.round(num * 100) / 100;
        var s_x = result.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
        }
        while (s_x.length <= pos_decimal + 2) {
            s_x += '0';
        }
        return s_x;
    },
    dateFormat: function (fmt, date) {
        var o = {
            "y+": date.getFullYear(),                 //月份   
            "M+": date.getMonth() + 1,                 //月份   
            "d+": date.getDate(),                    //日   
            "h+": date.getHours(),                   //小时   
            "m+": date.getMinutes(),                 //分   
            "s+": date.getSeconds(),                 //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    dateAddDay: function (date, day) {
        date.setDate(date.getDate() + day);
        return date;
    },
    //判断用户手机类型
    mobileType: function () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;//android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);//ios终端
        if (isAndroid) {
            return 1;
        } else if (isiOS) {
            return 2;
        }
        return 0;
    }
};

export default util;