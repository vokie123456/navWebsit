(function () {

    /**
     * 主题漫画
     * 切换
     * 单一功能原则
     */
    // 全局变量
    // 缓存当前分类加载过的漫画数据
    
    var cacheTrue = {}
    var cacheFalse = {}
    // 请求分页
    var flagMore = true
    // 获取主题漫画data
    function getData(url, dataid, page, sort) {
        var url = url
        obj = {
            pid: dataid,
            page: page,
            sort: sort
        }
        // console.log(url)
        $.ajax({
            url: url,
            type: 'GET',
            data: obj,
            success: function (data) {
                var panelId = dataid
                // console.log(data)
                renderManhua(data, panelId)
            },
            error: error
        })
    }
    getMhModule()
    // 点击获取模块
    function getMhModule() {
        $(".mh-tag-item").unbind()
        $(".mh-tag-item").on("click", function () {
            var dataid = $(this).data("id")
            $(".mh-tag-item").removeClass("mh-cur")
            $(this).toggleClass("mh-cur")
            $(".mh-screen-list").hide()
            var selectEle = ".mh-screen-list[data-id=" + dataid + "]"
            $(selectEle).show()
        })
    }
    // 点击获取更多
    function getMoreMh(url) {
        var url = 'http://daohang.zanhf.com/index.php/portal/index/getCartoon'
        $(".mh-screen-list").each(function () {
            var dataid = $(this).data("id")
            $(this).find(".mh-loadMore").unbind()
            $(this).find(".mh-loadMore").on("click", function () {
                var page = $(this).attr("page")
                if ($(".h-info-btn").attr("data-sort") == "true") {
                    var sort = "desc"
                } else {
                    // 正序
                    var sort = "asc"
                }
                getData(url, dataid, page, sort)
            })
        })
    }

    // 正倒序
    function clickSort(obj) {
        var cacheTrue = obj.cacheTrue
        var cacheFalse = obj.cacheFalse
        $(".h-info-btn").unbind()
        $(".h-info-btn").on("click", function () {
            var sort = $(this).attr("data-sort")
            $(".mh-tag-item").each(function () {
                var dataid = $(this).attr("data-id")
                var selectEle = ".mh-screen-list[data-id=" + dataid + "]"
                var thisEle = $(selectEle)
                if ($(".mh-loadMore").data('page') == "1") {
                    thisEle.find(".mh-list-b").css("minHeight", thisEle.find(".mh-list-b").height())
                    console.log("颠倒顺序")
                }
                var index = $(this).index() + 1
                if (sort === 'true') {
                    // renderMhItem(dataid, cacheFalse[dataid])
                    $('.h-info-btn').attr("data-sort", false)
                    $('.h-info-btn').children(".h-info-link").text("正序")
                    thisEle.find(".mh-list-b").empty()
                    getData(url, index, 1, 'asc')
                    thisEle.find(".mh-loadMore").text("加载更多")
                    thisEle.find(".mh-loadMore").attr("page", 1)
                    // thisEle.find(".mh_top").show()
                    // thisEle.find(".mh_bot").hide()
                } else {
                    // renderMhItem(dataid, cacheTrue[dataid])
                    $('.h-info-btn').attr("data-sort", true)
                    $('.h-info-btn').children(".h-info-link").text("倒序")
                    thisEle.find(".mh-list-b").empty()
                    getData(url, index, 1, 'desc')
                    thisEle.find(".mh-loadMore").text("加载更多")
                    thisEle.find(".mh-loadMore").attr("page", 1)
                    // thisEle.find(".mh_top").hide()
                    // thisEle.find(".mh_bot").show()
                }
            })
            return false
        })
    }
    var url = 'http://daohang.zanhf.com/index.php/portal/index/getCartoon'
    // 初始化
    var initPage = []

    $(".mh-tag-item").each(function () {
        initPage.push($(this).data("id"))
    })
    initPage.forEach(function (item) {
        getData(url, item, 1)
    })
    // 渲染页面
    function renderManhua(data, panelId) {
        var current_page = Number(data["data"]["current_page"])
        var last_page = Number(data["data"]["last_page"])
        var selectEle = ".mh-screen-list[data-id=" + panelId + "]"
        var thisEle = $(selectEle)
        if (!flagMore) {
            thisEle.find(".mh-list-b").empty()
        }
        data = data["data"]["data"]
        var sort = $(".h-info-btn").attr("data-sort")
        $.each(data, function (index, item) {
            if (!cacheTrue[panelId]) {
                cacheTrue[panelId] = []
                cacheTrue[panelId].push(item)
            } else {
                cacheTrue[panelId].push(item)
            }
            if (!cacheFalse[panelId]) {
                cacheFalse[panelId] = []
                cacheFalse[panelId].unshift(item)
            } else {
                cacheFalse[panelId].unshift(item)
            }
            clickSort({
                cacheTrue: cacheTrue,
                cacheFalse: cacheFalse
            })
            // console.log(item)
            var manhuaId = item["id"]
            var manhuaImg = "/upload/" + item["image"]
            var manhuaUrl = item["url"]
            var manhuaIntro = item["intro"]
            var manhuaName = item["name"]
            var manhuaHtml = `
                <li class="mh-screen-item" data-id="${manhuaId}">
                    <a href="/portal/manhua_detail.html?id=${manhuaId}" target="" class="mh-item-link">
                        <div class="mh-item-img">
                            <div class="item-img-show" style="background-image: url(${manhuaImg});"></div>
                        </div>
                        <div class="mh-item-right">
                            <dt class="mh-item-title">${manhuaName}</dt>
                            <dd class="mh-item-des line-ellipsis">${manhuaIntro}</dd>
                        </div>
                    </a>
                </li>
             `
            if (sort === "true") {
                // 正序
                thisEle.find(".mh-list-b").append(manhuaHtml)
                // thisEle.find(".mh_top").hide()
                // thisEle.find(".mh_bot").show()
            } else {
                // 倒序
                thisEle.find(".mh-list-b").append(manhuaHtml)
                // thisEle.find(".mh-list-b").prepend(manhuaHtml)
                // thisEle.find(".mh_top").show()
                // thisEle.find(".mh_bot").hide()
            }
        })
        thisEle.find(".manhua-loadMore").unbind()
        if (current_page >= last_page) {
            thisEle.find(".mh-loadMore").text("加载完毕")
            var page = Number(thisEle.find(".mh-loadMore").attr("page")) + 1
            thisEle.find(".mh-loadMore").attr("page", page)
            thisEle.find(".mh-loadMore").unbind()
        } else {
            thisEle.find(".mh-loadMore").text("加载更多")
            var page = Number(thisEle.find(".mh-loadMore").attr("page")) + 1
            thisEle.find(".mh-loadMore").attr("page", page)
            getMoreMh(url)
        }
    }

    // 报错
    function error() {
        alert("哦哦，链接失败了~")
    }

    // 渲染插入漫画
    function renderMhItem(panelId, data) {
        var selectEle = ".mh-screen-list[data-id=" + panelId + "]"
        var thisEle = $(selectEle)
        thisEle.find(".mh-list-b").empty()
        $.each(data, function (index, item) {
            var manhuaId = item["id"]
            var manhuaImg = "/upload/" + item["image"]
            var manhuaUrl = item["url"]
            var manhuaIntro = item["intro"]
            var manhuaName = item["name"]
            var manhuaHtml = `
                <li class="mh-screen-item" data-id="${manhuaId}">
                    <a href="/portal/manhua_detail.html?id=${manhuaId}" target="" class="mh-item-link">
                        <div class="mh-item-img">
                            <div class="item-img-show" style="background-image: url(${manhuaImg});"></div>
                        </div>
                        <div class="mh-item-right">
                            <dt class="mh-item-title">${manhuaName}</dt>
                            <dd class="mh-item-des line-ellipsis">${manhuaIntro}</dd>
                        </div>
                    </a>
                </li>
             `
            thisEle.find(".mh-list-b").append(manhuaHtml)
        })
    }

}())