/**
 * @description 防抖函数：设定时间，在时间内函数调用了，停止执行函数，重新设定时间，只有设定时间到了才会执行一次
 * @param func { Function } 需要防抖处理的函数
 * @param delay { number } 延迟时间
 * @return { Function } 返回具备防抖能力的函数
 * @example const debounceFun = debounce(func,2000) ; debounceFun()
 * @author zcf
 */
function debounce(func: Function, delay: number) {
  let timer: number
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * @description 节流函数：不管你在设置时间内调用函数，都只会再设定时间到了后执行一次
 * @param func { Function } 需要节流处理的函数
 * @param delay { number } 延迟时间
 * @return { Function } 返回具备节流能力的函数
 * @example const throttleFun = throttle(func,2000) ; throttleFun()
 * @author zcf
 */
function throttle(func: Function, delay: number) {
  let flag: boolean = true
  return function (...args: any[]) {
    if (flag) {
      setTimeout(() => {
        func.apply(this, args)
        flag = true
      }, delay)
    }
    flag = false
  }
}

/**
 * @description 将一个以对象组成的数组进行排序
 * @param sortArray { Array } 需要进行排序的数组
 * @param sortProperty { string } 根据对象的哪个属性来排序
 * @return { Array } 返回排序后的数组
 * @example bubbleSort(arr,'price')
 * @author zcf
 */
function bubbleSort(sortArray: any[], sortProperty: string) {
  let length: number = sortArray.length
  for (let i = length - 1; 0 < i; i--) {
    for (let j = 0; j < i; j++) {
      if (sortArray[j][sortProperty] > sortArray[j + 1][sortProperty]) {
        let temp: any = sortArray[j]
        sortArray[j] = sortArray[j + 1]
        sortArray[j + 1] = temp
      }
    }
  }
  return sortArray
}

/**
 * @description 使用for循环加push的方式反转数组
 * @param reArray { Array } 需要反转的数组
 * @return { Array } 返回反转后的数组
 * @author zcf
 */
function reverseArray(reArray: any[]) {
  let returnArray: any[] = []
  for (let i = reArray.length - 1; 0 <= i; i--) {
    returnArray.push(reArray[i])
  }
  return returnArray
}

/**
 * @description 将手机号的中间四位进行带*号处理
 * @param phone { string } 手机号
 * @return { string } 返回带*号后的手机号
 * @author zcf
 */
function dealPhoneByStars(phone: string) {
  return phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}

/**
 * @function getPropertyArray 用于获取数组或对象中需要的属性名，将属性名加入到新数组中并返回
 * @description _propertyArray 是一个用于存储属性名的数组
 * @param array 接收一个数组
 * @author zcf
 */
export function getPropertyArray(array: any) {
  let _propertyArray: (keyof typeof array)[] = []
  for (const arrayKey in array) {
    _propertyArray.push(arrayKey)
  }
  return _propertyArray
}

/**
 * @description 获取当前的年月日
 * @param split { string } 分隔符
 * @return { string } 返回带有分隔符的年月日
 * @author zcf
 */
function getYMDate(split: string = '-') {
  let now = new Date()
  return now.getFullYear() + split + ((now.getMonth()) + 1) + split + now.getDate()
}

/**
 * @description 获取今日属于星期几或周几
 * @param character { number } [0,1] - 星期或周
 * @return { string } 时间
 */
function getWeek(character: number = 0) {
  let day = new Date().getDay(), week: string[] = ['天', '一', '二', '三', '四', '五', '六',], today: string
  let weekType = character === 0 ? '周' : '星期'
  if (character === 0) {
    week[0] = '末'
  }
  week.forEach((item, index) => {
    index === day ? today = item : null
  })
  return weekType + today
}

/**
 * @description 将table中的数据转成excel表格
 * @param data { Array } 表格数据
 * @author zcf
 */
function tableToExcel(data: any[]) {
  let head = `<tr class="table-header"><td>商品id</td><td>商品标题</td><td>图片</td><td>价格</td><td>库存</td></tr>`;
  let tbody = "";//内容
  for (let item in data) {
    tbody +=
      `<tr class="product">
                                     <td class="id">${data[item]['id'] + '\t'}</td>
                                     <td class="title">${data[item]['title'] + '\t'}</td>
                                     <td class="path">${data[item]['imagePath'] + '\t'}</td>
                                     <td class="price">￥${data[item]['price'] + '\t'}</td>
                                     <td class="stocks">${data[item]['count'] + '\t'}</td>
                                 </tr>`
  }
  let str = head + tbody;//头部跟身体内容连接

  //Worksheet名
  let worksheet = '商品数据'
  let uri = 'data:application/vnd.ms-excel;base64,';

  //下载的表格模板数据(需要设置编码格式utf-8，不设置会在打开Excel文件时会乱码)
  let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
                               xmlns:x="urn:schemas-microsoft-com:office:excel"
                               xmlns="http://www.w3.org/TR/REC-html40" lang="en">
                               <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
                                 <x:Name>${worksheet}</x:Name>
                                 <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
                                 </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
                                 <meta charset="UTF-8">
                                 <style type="text/css">
                                    .table-header td{
                                         padding: 16px;
                                         height: 60px;
                                         text-align: center;
                                         color: #FFFFFF;
                                         background-color: #1e8efc;
                                         border: 1px solid #8a8a8a;
                                    }
                                    .product{
                                         text-align: center;
                                    }
                                    td{
                                         padding: 16px;
                                    }

                                    .id{
                                         color: #1e8efc;
                                    }
                                    .title{
                                         color: #d91868;
                                    }
                                    .path{
                                         color: orchid;
                                         font-weight: bold;
                                    }
                                    .price{
                                         width: 100px;
                                         color: red;
                                    }
                                    .stocks{
                                         width: 100px;

                                    }
                                 </style><title></title>
                                 </head><body><table>${str}</table></body></html>`;
  //下载模板
  window.location.href = uri + base64(template)
}

//输出base64编码
export function base64(s: any) {
  return window.btoa(unescape(encodeURIComponent(s)))
}

/**
 * @description 时间格式化函数
 * @param time { number } 时间
 * @param fm { string } 时间样式
 * @return { string } 返回格式化后的时间
 */
export function timeFormatting(time: any, fm: string = 'YYYY-MM-DD hh:mm:ss',) {
  //拓展Date的时间格式化函数
  //@ts-ignore
  Date.prototype.format = function (fmt: string) {
    let formatObject = {
      "M+": this.getMonth() + 1,                   //月份
      "d+": this.getDate(),                        //日
      "h+": this.getHours(),                       //小时
      "m+": this.getMinutes(),                     //分
      "s+": this.getSeconds(),                     //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds()                  //毫秒
    };

    //  获取年份
    // ①
    if (/(y+)/i.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (let k in formatObject) {
      // ②
      if (new RegExp("(" + k + ")", "i").test(fmt)) {
        fmt = fmt.replace(
          //@ts-ignore
          RegExp.$1, (RegExp.$1.length === 1) ? (formatObject[k]) : (("00" + formatObject[k]).substr(("" + formatObject[k]).length)));
      }
    }
    return fmt;
  }
  if (time) {
    return time.format(fm)
  } else {
    //@ts-ignore
    return new Date().format(fm)
  }

}


 //ts+promise手写ajax
interface ajaxOption {
  url: string,
  method?: string,
  data: any,
  timeout: number,
  headers?: object,
  async?: boolean
}

/**
 * @description 将数据拼接成url参数
 * @param data { any }
 * @return { string } 返回url参数形式的字符串
 * @author zcf
 */
function appendUrlParams(data: any) {
  let paramsArr: any[] = []

  //遍历data对象
  for (let key in data) {
    //参数加上=号并使用encodeURIComponent对参数中的特殊字符进行转义避免内容丢失造成读取数据失败，最后将其push到新数组中
    // @ts-ignore
    paramsArr.push(`${key}=${encodeURIComponent(paramsArr[key])}`)
  }

  //将数组中的元素转换成字符串后返回
  return paramsArr.join('&')
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
export function ajax(options: ajaxOption = {url: '', method: 'GET', data: {}, timeout: 3000, async: true}) {
  // @ts-ignore
  return new Promise((resolve, reject) => {

    if (!options.url) throw Error('URL is required!')
    let xhr: XMLHttpRequest;

    //创建ActiveXObject时ts报错，去tsconfig.json文件中启用scripthost库
    window.XMLHttpRequest ? xhr = new XMLHttpRequest() : xhr = new ActiveXObject("Microsoft.XMLHTTP")

    //参数拼接用于GET请求
    let queryParams = appendUrlParams(options.data)

    //设置请求头
    const headers = options.headers || {"Content-type": "application/json;charset=UTF-8"}
    //Object.keys方法获取对象中的属性名返回一个数组
    Object.keys(headers).forEach(key => {
      //@ts-ignore
      xhr.setRequestHeader(key, headers[key])
    })

    //超时处理
    xhr.timeout = options.timeout
    xhr.ontimeout = () => {
      reject('请求超时！')
    }

    //连接
    //将请求方式参数转换成全大写
    // @ts-ignore
    let method = options.method.toUpperCase()
    if (method === 'GET') {
      xhr.open('get', `${options.url}?${queryParams}`, <boolean>options.async)
      xhr.send()
    } else if (method === 'POST') {
      xhr.open('post', options.url, <boolean>options.async)
      xhr.send(options.data)
    }

    //接收
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        (xhr.status >= 200 && xhr.status <= 300 || xhr.status === 304) ? resolve(xhr.responseText) : reject(xhr.status)
      }
    }
  })
}





