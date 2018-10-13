/**
 * 获取咨询
 * ajax
 */
(function () {
    // 获取6组数据
    // ajax
    function getDate(url, [typeid, page], sucFn, errorFn, beforeFn) {
        $.ajax({
            url: url + "?typeid=" + typeid + " &page=" + page,
            data: typeid,
            page,
            type: "GET",
            dataType: "json",
            beforeSend: beforeFn,
            //加载执行方法  
            erro: errorFn,
            //错误执行方法  
            success: sucFn,
            //成功执行方法  
        })

        console.log(url + "?typeid=" + typeid + " &page=" + page)
    }

    // 全部咨询
    function allDate(data) {
        var from
        var time
        var content
        var img
        var intro
        var title
        var typeid
        var url


        var zxArr = data.data
        $.each(zxArr, function (index, ele) {
            if (index < 5) {
                lazyLoad(ele)
            }

        })
    }

    function error() {
        alert("连接失败，请重试！")
    }

    function lazyLoad(ele) {
        from = ele.news_from
        time = ele.create_time
        contetnt = ele.content
        img = ele.img
        intro = ele.intro
        title = ele.title
        typeid = ele.typeid
        url = ele.url
        time = timestampToTime(time)
        var htmlAll = `
            <li class="zx-l-item">
                <a target="_blank" href="${url}" class="zx-l-link">
                    <div class="l-des">
                        <div class="des-title">
                            <img src="${typeid}" class="title-icon">
                            <h3 class="title-text text-ellipsis">${title}</h3>
                        </div>
                        <span class="des-text line-ellipsis">
                            ${intro}
                        </span>
                        <div class="des-bot">
                            <span class="bot-left text-ellipsis">${from}</span>
                            <span class="bot-right">
                                <img src="./img/web/shijian1.png" class="icon-time">
                                <span class="time-desc text-ellipsis">${time}</span>
                            </span>
                        </div>
                    </div>
                    <div class="l-img">
                        <div class="img-box">
                            <div class="zixun-img-show" style="background-image: url(${img});"></div>
                        </div>
                    </div>
                </a>
            </li>
        `
        $(".zx-det-box").eq(0).append(htmlAll)
    }

    function bindClick() {
        $(".zx-loadMore").each(function () {
            $(this).on("click", function () {
                var btnEq = $(this).index()
                var page = $(this).attr("page")
                console.log(page)
                getDate(urlAll, [btnEq, page], allDate, error)
                page++
                $(this).attr("page", page)
                console.log(page)
            })
        })
    }

    // 时间戳转换
    function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
    }
    // 调用
    // 初始化

    var urlAll = './api/zixun.json'
    getDate(urlAll, [1, 1], allDate, error)
    bindClick()

}())