"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ajax = exports.timeFormatting = exports.base64 = exports.getPropertyArray = void 0;
/**
 * @description 防抖函数：设定时间，在时间内函数调用了，停止执行函数，重新设定时间，只有设定时间到了才会执行一次
 * @param func { Function } 需要防抖处理的函数
 * @param delay { number } 延迟时间
 * @return { Function } 返回具备防抖能力的函数
 * @example const debounceFun = debounce(func,2000) ; debounceFun()
 * @author zcf
 */
function debounce(func, delay) {
    var timer;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            func.apply(_this, args);
        }, delay);
    };
}
/**
 * @description 节流函数：不管你在设置时间内调用函数，都只会再设定时间到了后执行一次
 * @param func { Function } 需要节流处理的函数
 * @param delay { number } 延迟时间
 * @return { Function } 返回具备节流能力的函数
 * @example const throttleFun = throttle(func,2000) ; throttleFun()
 * @author zcf
 */
function throttle(func, delay) {
    var flag = true;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (flag) {
            setTimeout(function () {
                func.apply(_this, args);
                flag = true;
            }, delay);
        }
        flag = false;
    };
}
/**
 * @description 将一个以对象组成的数组进行排序
 * @param sortArray { Array } 需要进行排序的数组
 * @param sortProperty { string } 根据对象的哪个属性来排序
 * @return { Array } 返回排序后的数组
 * @example bubbleSort(arr,'price')
 * @author zcf
 */
function bubbleSort(sortArray, sortProperty) {
    var length = sortArray.length;
    for (var i = length - 1; 0 < i; i--) {
        for (var j = 0; j < i; j++) {
            if (sortArray[j][sortProperty] > sortArray[j + 1][sortProperty]) {
                var temp = sortArray[j];
                sortArray[j] = sortArray[j + 1];
                sortArray[j + 1] = temp;
            }
        }
    }
    return sortArray;
}
/**
 * @description 使用for循环加push的方式反转数组
 * @param reArray { Array } 需要反转的数组
 * @return { Array } 返回反转后的数组
 * @author zcf
 */
function reverseArray(reArray) {
    var returnArray = [];
    for (var i = reArray.length - 1; 0 <= i; i--) {
        returnArray.push(reArray[i]);
    }
    return returnArray;
}
/**
 * @description 将手机号的中间四位进行带*号处理
 * @param phone { string } 手机号
 * @return { string } 返回带*号后的手机号
 * @author zcf
 */
function dealPhoneByStars(phone) {
    return phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
}
/**
 * @function getPropertyArray 用于获取数组或对象中需要的属性名，将属性名加入到新数组中并返回
 * @description _propertyArray 是一个用于存储属性名的数组
 * @param array 接收一个数组
 * @author zcf
 */
function getPropertyArray(array) {
    var _propertyArray = [];
    for (var arrayKey in array) {
        _propertyArray.push(arrayKey);
    }
    return _propertyArray;
}
exports.getPropertyArray = getPropertyArray;
/**
 * @description 获取当前的年月日
 * @param split { string } 分隔符
 * @return { string } 返回带有分隔符的年月日
 * @author zcf
 */
function getYMDate(split) {
    if (split === void 0) { split = '-'; }
    var now = new Date();
    return now.getFullYear() + split + ((now.getMonth()) + 1) + split + now.getDate();
}
/**
 * @description 获取今日属于星期几或周几
 * @param character { number } [0,1] - 星期或周
 * @return { string } 时间
 */
function getWeek(character) {
    if (character === void 0) { character = 0; }
    var day = new Date().getDay(), week = ['天', '一', '二', '三', '四', '五', '六',], today;
    var weekType = character === 0 ? '周' : '星期';
    if (character === 0) {
        week[0] = '末';
    }
    week.forEach(function (item, index) {
        index === day ? today = item : null;
    });
    return weekType + today;
}
/**
 * @description 将table中的数据转成excel表格
 * @param data { Array } 表格数据
 * @author zcf
 */
function tableToExcel(data) {
    var head = "<tr class=\"table-header\"><td>\u5546\u54C1id</td><td>\u5546\u54C1\u6807\u9898</td><td>\u56FE\u7247</td><td>\u4EF7\u683C</td><td>\u5E93\u5B58</td></tr>";
    var tbody = ""; //内容
    for (var item in data) {
        tbody +=
            "<tr class=\"product\">\n                                     <td class=\"id\">".concat(data[item]['id'] + '\t', "</td>\n                                     <td class=\"title\">").concat(data[item]['title'] + '\t', "</td>\n                                     <td class=\"path\">").concat(data[item]['imagePath'] + '\t', "</td>\n                                     <td class=\"price\">\uFFE5").concat(data[item]['price'] + '\t', "</td>\n                                     <td class=\"stocks\">").concat(data[item]['count'] + '\t', "</td>\n                                 </tr>");
    }
    var str = head + tbody; //头部跟身体内容连接
    //Worksheet名
    var worksheet = '商品数据';
    var uri = 'data:application/vnd.ms-excel;base64,';
    //下载的表格模板数据(需要设置编码格式utf-8，不设置会在打开Excel文件时会乱码)
    var template = "<html xmlns:o=\"urn:schemas-microsoft-com:office:office\"\n                               xmlns:x=\"urn:schemas-microsoft-com:office:excel\"\n                               xmlns=\"http://www.w3.org/TR/REC-html40\" lang=\"en\">\n                               <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>\n                                 <x:Name>".concat(worksheet, "</x:Name>\n                                 <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>\n                                 </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->\n                                 <meta charset=\"UTF-8\">\n                                 <style type=\"text/css\">\n                                    .table-header td{\n                                         padding: 16px;\n                                         height: 60px;\n                                         text-align: center;\n                                         color: #FFFFFF;\n                                         background-color: #1e8efc;\n                                         border: 1px solid #8a8a8a;\n                                    }\n                                    .product{\n                                         text-align: center;\n                                    }\n                                    td{\n                                         padding: 16px;\n                                    }\n\n                                    .id{\n                                         color: #1e8efc;\n                                    }\n                                    .title{\n                                         color: #d91868;\n                                    }\n                                    .path{\n                                         color: orchid;\n                                         font-weight: bold;\n                                    }\n                                    .price{\n                                         width: 100px;\n                                         color: red;\n                                    }\n                                    .stocks{\n                                         width: 100px;\n\n                                    }\n                                 </style><title></title>\n                                 </head><body><table>").concat(str, "</table></body></html>");
    //下载模板
    window.location.href = uri + base64(template);
}
//输出base64编码
function base64(s) {
    return window.btoa(unescape(encodeURIComponent(s)));
}
exports.base64 = base64;
/**
 * @description 时间格式化函数
 * @param time { number } 时间
 * @param fm { string } 时间样式
 * @return { string } 返回格式化后的时间
 */
function timeFormatting(time, fm) {
    if (fm === void 0) { fm = 'YYYY-MM-DD hh:mm:ss'; }
    //拓展Date的时间格式化函数
    //@ts-ignore
    Date.prototype.format = function (fmt) {
        var formatObject = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds() //毫秒
        };
        //  获取年份
        // ①
        if (/(y+)/i.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in formatObject) {
            // ②
            if (new RegExp("(" + k + ")", "i").test(fmt)) {
                fmt = fmt.replace(
                //@ts-ignore
                RegExp.$1, (RegExp.$1.length === 1) ? (formatObject[k]) : (("00" + formatObject[k]).substr(("" + formatObject[k]).length)));
            }
        }
        return fmt;
    };
    if (time) {
        return time.format(fm);
    }
    else {
        //@ts-ignore
        return new Date().format(fm);
    }
}
exports.timeFormatting = timeFormatting;
/**
 * @description 将数据拼接成url参数
 * @param data { any }
 * @return { string } 返回url参数形式的字符串
 * @author zcf
 */
function appendUrlParams(data) {
    var paramsArr = [];
    //遍历data对象
    for (var key in data) {
        //参数加上=号并使用encodeURIComponent对参数中的特殊字符进行转义避免内容丢失造成读取数据失败，最后将其push到新数组中
        // @ts-ignore
        paramsArr.push("".concat(key, "=").concat(encodeURIComponent(paramsArr[key])));
    }
    //将数组中的元素转换成字符串后返回
    return paramsArr.join('&');
}
/**
 * @description 手写ajax
 * @param options { Object } 配置项
 * @param options.url { string } 请求地址
 * @param options.method { 'GET' | 'POST' } 请求方式
 * @param options.data { Object } 参数
 * @param options.timeout { number } 超时时间
 * @return { Promise } 返回一个promise
 * @example  ajax({
 *     url:'url',
 *     method:'get',
 *     timeout:3000,
 *     data:{},
 *     async:true
 * }).then()
 * @author zcf
 */
function ajax(options) {
    if (options === void 0) { options = { url: '', method: 'GET', data: {}, timeout: 3000, async: true }; }
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        if (!options.url)
            throw Error('URL is required!');
        var xhr;
        //创建ActiveXObject时ts报错，去tsconfig.json文件中启用scripthost库
        window.XMLHttpRequest ? xhr = new XMLHttpRequest() : xhr = new ActiveXObject("Microsoft.XMLHTTP");
        //参数拼接用于GET请求
        var queryParams = appendUrlParams(options.data);
        //设置请求头
        var headers = options.headers || { "Content-type": "application/json;charset=UTF-8" };
        //Object.keys方法获取对象中的属性名返回一个数组
        Object.keys(headers).forEach(function (key) {
            //@ts-ignore
            xhr.setRequestHeader(key, headers[key]);
        });
        //超时处理
        xhr.timeout = options.timeout;
        xhr.ontimeout = function () {
            reject('请求超时！');
        };
        //连接
        //将请求方式参数转换成全大写
        // @ts-ignore
        var method = options.method.toUpperCase();
        if (method === 'GET') {
            xhr.open('get', "".concat(options.url, "?").concat(queryParams), options.async);
            xhr.send();
        }
        else if (method === 'POST') {
            xhr.open('post', options.url, options.async);
            xhr.send(options.data);
        }
        //接收
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                (xhr.status >= 200 && xhr.status <= 300 || xhr.status === 304) ? resolve(xhr.responseText) : reject(xhr.status);
            }
        };
    });
}
exports.ajax = ajax;
