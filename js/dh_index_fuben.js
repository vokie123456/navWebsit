/**** 漫画 ****************************************************************** */
if (document.getElementsByClassName('index_wrap').length) {
    (function () {

        /**
         * 主题漫画
         * 切换
         * 单一功能原则
         */
        // 全局变量
        // 缓存当前分类加载过的漫画数据
        var LBC_Manhua = function LBC_Manhua() {
            return {
                add: function add(value) {
                    localStorage.setItem("mhCache", JSON.stringify(value));
                },
                get: function get() {
                    return JSON.parse(localStorage.getItem("mhCache"));
                },
                remove: function remove() {
                    localStorage.removeItem("mhCache");
                }
            };
        };
        var mhCache = {}
        var url = 'http://daohang.zanhf.com/index.php/portal/index/getCartoon'
        initManhua(url)
        // 初始化
        function initManhua(ulr, sort) {
            if (LBC_Manhua().get() != null) {
                // 判断时间戳
                var lastDate = LBC_Manhua().get().date
                var curDate = new Date().getTime()
                // 6小时清除
                if (curDate - lastDate >= 3600000) {
                    LBC_Manhua().remove()
                }
            }
            var initPage = []
            $(".mh-tag-item").each(function () {
                initPage.push($(this).data("id"))
            })
            initPage.forEach(function (item) {
                // 判断缓存有没有
                mhCache = reMhCache(item)
                if (mhCache[item].data.length != 0) {
                    renderMhCache(item, mhCache)
                    // 展示对应模块
                    var panelId = mhCache.show
                    $(".mh-tag-item").removeClass("mh-cur")
                    var oEle = ".mh-tag-item[data-id=" + panelId + "]"
                    $(oEle).toggleClass("mh-cur")
                    $(".mh-screen-list").hide()
                    var selectEle = ".mh-screen-list[data-id=" + panelId + "]"
                    $(selectEle).show()
                } else {
                    if (sort) {
                        getData(url, item, 1, sort)
                    } else {
                        getData(url, item, 1)
                    }

                }
            })
        }
        // 请求分页
        var flagMore = true
        // 获取主题漫画data
        function getData(url, dataid, page, sort) {
            var url = url
            // 传后台参数
            obj = {
                pid: dataid,
                page: page,
                sort: sort
            }
            $.ajax({
                url: url,
                type: 'GET',
                data: obj,
                success: function (data) {
                    var panelId = dataid
                    var data = data["data"]
                    var pageObj = {
                        current_page: data.current_page,
                        last_page: data.last_page
                    }
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
                // 写入缓存  
                mhCache = reMhCache(dataid)
                mhCache.show = dataid
                LBC_Manhua().remove()
                LBC_Manhua().add(mhCache)
                setTimeout(() => {
                    if ($(selectEle).find(".mh-loadMore").attr('page') == "2") {
                        console.log($(selectEle).find(".mh-list-b").height())
                        $(selectEle).find(".mh-list-b").css("minHeight", $(selectEle).find(".mh-list-b").height())
                    }
                }, 300);
            })
        }
        // 点击获取更多
        function getMoreMh(url) {
            var url = 'http://daohang.zanhf.com/index.php/portal/index/getCartoon'
            $(".mh-screen-list").each(function () {
                var dataid = $(this).attr("data-id")
                $(this).find(".mh-loadMore").unbind()
                $(this).find(".mh-loadMore").on("click", function () {
                    var page = $(this).attr("page")
                    // 倒序 true  正序 false
                    if ($(".h-info-btn").attr("data-sort") == "true") {
                        // 倒序
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
        function clickSort() {
            $(".h-info-btn").unbind()
            $(".h-info-btn").on("click", function () {
                // 倒序 true  正序 false
                if ($(".h-info-btn").attr("data-sort") == "false") {
                    // 如果当前为false
                    // 则发送 倒序
                    // 倒序
                    var sort = "desc"
                    $(this).attr('data-sort', 'true')
                    $(this).children('.h-info-link').text('倒序')
                } else {
                    // 正序
                    var sort = "asc"
                    $(this).attr('data-sort', 'false')
                    $(this).children('.h-info-link').text('正序')
                }
                // 清缓存
                LBC_Manhua().remove()
                // 清页面 () 
                $(".mh-screen-list").each(function () {
                    $(this).find('.mh-list-b').empty()
                })
                var url = 'http://daohang.zanhf.com/index.php/portal/index/getCartoon'
                // 初始化
                initManhua(url, sort)
                return false
            })
        }

        // 初始化给list panel最小高度
        function minHeightMh(panelLists) {
            $(panelLists).each(function () {})
        }
        //  mhCache分析函数
        function reMhCache(panelId) {
            var locData = LBC_Manhua().get()
            if (locData != null) {
                if (!(panelId in locData)) {
                    mhCache[panelId] = {}
                    mhCache[panelId].data = []
                    console.log(111111)
                } else {
                    mhCache[panelId] = locData[panelId]
                    mhCache["show"] = locData["show"]
                    mhCache["sort"] = locData["sort"]
                    mhCache["date"] = locData["date"]
                    console.log(22222)
                }
            } else {
                mhCache[panelId] = {}
                mhCache[panelId].data = []
                console.log(3333)
            }
            return mhCache
        }
        // 渲染页面
        function renderManhua(data, panelId) {

            var current_page = Number(data["current_page"])
            var last_page = Number(data["last_page"])
            var selectEle = ".mh-screen-list[data-id=" + panelId + "]"
            var thisEle = $(selectEle)
            // if (thisEle.find(".mh-loadMore").attr('page') == "2") {
            //     console.log(thisEle.find(".mh-list-b").height())
            //     thisEle.find(".mh-list-b").css("minHeight", thisEle.find(".mh-list-b").height())
            // }
            // 用panelId 新建分组
            // 判断有无缓存 缓存里面有无该id
            var mhCache = reMhCache(panelId)
            // 顺序写入
            var sortLoc = $('.h-info-btn').attr('data-sort')
            mhCache.sort = sortLoc
            // 时间戳写入
            var date = new Date().getTime()
            mhCache['date'] = date
            // 展示模块写入
            var showId = $('.mh-screen-con .mh-cur').attr('data-id')
            mhCache.show = showId
            // 写入页码
            mhCache[panelId].current_page = current_page
            mhCache[panelId].last_page = last_page

            if (!flagMore) {
                thisEle.find(".mh-list-b").empty()
            }
            data = data["data"]
            var sort = $(".h-info-btn").data("sort")
            var manhuaHtml = ''
            $.each(data, function (index, item) {
                // 写入具体数据
                mhCache[panelId].data.push(item)
                var manhuaId = item["id"]
                var manhuaImg = "/upload/" + item["image"]
                var manhuaUrl = item["url"]
                var manhuaIntro = item["intro"]
                var manhuaName = item["name"]
                manhuaHtml += `
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
            })
            thisEle.find(".mh-list-b").append(manhuaHtml)
            thisEle.find(".manhua-loadMore").unbind()
            // 正常数据库获取加载更多
            var page = current_page + 1
            thisEle.find(".mh-loadMore").attr("page", page)
            if (current_page >= last_page) {
                thisEle.find(".mh-loadMore").text("加载完毕")
                thisEle.find(".mh-loadMore").unbind()
            } else {
                thisEle.find(".mh-loadMore").text("加载更多")
                getMoreMh(url)
            }
            // 写入mh缓存
            LBC_Manhua().add(mhCache)
            clickSort()

        }
        // 报错
        function error() {
            alert("哦哦，链接失败了~")
        }
        // 判断缓存是正序还是倒序
        function locSortRender(sortLoc) {
            var curSort = $('.h-info-btn').attr('data-sort')
            if (sortLoc != curSort) {
                $('.h-info-btn').attr('data-sort', sortLoc)
                if (sortLoc == 'false') {
                    $('.h-info-btn .h-info-link').text('正序')
                } else {
                    $('.h-info-btn .h-info-link').text('倒序')
                }
            }
        }

        // 渲染缓存
        function renderMhCache(panelId, mhCacheItem) {
            // 写入缓存
            mhCache = reMhCache(panelId)
            var sortLoc = mhCache.sort
            locSortRender(sortLoc)
            var current_page = Number(mhCacheItem[panelId]["current_page"])
            var last_page = Number(mhCacheItem[panelId]["last_page"])
            var selectEle = ".mh-screen-list[data-id=" + panelId + "]"
            var thisEle = $(selectEle)
            // console.log(mhCacheItem[panelId])
            var data = mhCacheItem[panelId].data
            var manhuaHtml = ''
            $.each(data, function (index, item) {
                // 写入具体数据
                var manhuaId = item["id"]
                var manhuaImg = "/upload/" + item["image"]
                var manhuaUrl = item["url"]
                var manhuaIntro = item["intro"]
                var manhuaName = item["name"]
                manhuaHtml += `
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
            })
            thisEle.find(".mh-list-b").append(manhuaHtml)
            // 正常数据库获取加载更多
            var page = current_page + 1
            thisEle.find(".mh-loadMore").attr("page", page)
            if (current_page >= last_page) {
                thisEle.find(".mh-loadMore").text("加载完毕")
                thisEle.find(".mh-loadMore").unbind()
            } else {
                thisEle.find(".mh-loadMore").text("加载更多")
                getMoreMh(url)
            }
            clickSort()
        }
        setTimeout(() => {
            mhCache = reMhCache(panelId)
            console.log(mhCache)
            var panelId = mhCache.show
            var selectEle = ".mh-screen-list[data-id=" + panelId + "]"
            var thisEle = $(selectEle)
            if (thisEle.find(".mh-loadMore").attr('page') == "2") {
                console.log(thisEle.find(".mh-list-b").height())
                thisEle.find(".mh-list-b").css("minHeight", thisEle.find(".mh-list-b").height())
            }
        }, 0);
    }());
}


/**** 周边模块 ****************************************************************** */
if (document.getElementsByClassName('index_wrap').length) {
    (function () {

        // 缓存当前分类加载过的漫画数据
        var LBC_Zhoubian = function LBC_Zhoubian() {
            return {
                add: function add(value) {
                    localStorage.setItem("zbCache", JSON.stringify(value));
                },
                get: function get() {
                    return JSON.parse(localStorage.getItem("zbCache"));
                },
                remove: function remove() {
                    localStorage.removeItem("zbCache");
                }
            };
        };

        var zbCache = {}
        // 6小时清空LBC_Zhoubian
        var dataZhoubian = LBC_Zhoubian().get()
        removeZhoubianLoc(dataZhoubian)

        function removeZhoubianLoc(locData) {
            if (locData != null) {
                // 获取当前时间戳和缓存时间戳比较
                var curTime = new Date().getTime()
                if (curTime - locData.date > 3600000) {
                    LBC_Zhoubian().remove()
                }
            }
        }
        // 实例化
        var allZb = new AllZb()
        var singleZb = new SingleZb()
        var eventZb = new EventZb()
        // 触发事件
        eventZb.select()
        // 展示所有周边
        function AllZb() {
            this.all = function () {
                // 如果标签中所有标签都未被选中，显示第一个ul
                var ifAll = true
                var dataId
                $(".zb-top-tag .zb-tag-item").each(function () {
                    if ($(this).hasClass("zb-cur")) {
                        ifAll = false
                        dataId = $(this).attr("data-id")
                        $(".zb-screen-con .zb-b:first").attr("data-id", dataId)
                    }
                })
                if (ifAll) {
                    $(".zb-screen-con .zb-b").css("display", "none")
                    $(".zb-screen-con .zb-b:first").css("display", "block")
                    // 初始化周边，只渲染所有
                    // 切换到周边的时候显示
                    // 获取所有
                    // initZoubian()
                }
                singleZb.single(ifAll, dataId)
            }
        }
        // 初始化周边，只渲染所有
        // 切换到周边的时候显示
        // 获取所有
        var cacheData = LBC_Zhoubian().get()
        // console.log(cacheData)
        initZoubian(cacheData)
        // 展示单个模块周边
        function SingleZb() {
            this.single = function (status, dataId) {
                var curPageId = dataId
                if (!status) {
                    $(".zb-screen-con .zb-b").css("display", "none")
                    $(".zb-screen-con .zb-b").each(function () {
                        if ($(this).attr("data-id") == dataId) {
                            $(this).css("display", "block")
                        }
                    })
                    // $(".data-id").attr("data-id",dataId)
                    $(".zb-p .zb-b").attr("data-id", dataId)
                    // initZbSort(curPageId)
                    if (cacheData != null) {
                        if (curPageId in cacheData) {
                            renderCache(cacheData, curPageId)
                        } else {
                            initZbSort(curPageId)
                        }
                    } else {
                        initZbSort(curPageId)
                    }
                } else {
                    if (cacheData != null) {
                        if (curPageId in cacheData) {
                            renderCache(cacheData, curPageId)
                        } else {
                            initZoubian(cacheData)
                        }
                    } else {
                        initZoubian(cacheData)
                    }
                }
            }
        }


        function getScrollTop() {
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        }
        $(window).on('scroll', function () {
            // 获取到视窗滚动的距离
            var locScrollTop = getScrollTop()
            // 存入缓存
            var locData = LBC_Zhoubian().get()
            locData['scrollTop'] = locScrollTop
        })

        // 点击标签触发切换
        function EventZb() {
            this.select = function () {
                $(".zb-top-tag .zb-tag-item").each(function () {
                    $(this).on("click", function () {
                        if (!$(this).hasClass("zb-cur")) {
                            $(".zb-top-tag .zb-tag-item").removeClass("zb-cur")
                            $(this).addClass("zb-cur")
                            var dataId = $(this).attr('data-id')
                            $(".zb-b").attr('data-id', dataId)
                            // 每次点击调用
                            allZb.all()
                        } else {
                            $(".zb-top-tag .zb-tag-item").removeClass("zb-cur")
                            $(".zb-b").attr('data-id', "0")
                            // 每次点击调用
                            // allZb.all()
                            // initZoubian(cacheData)
                            renderCache(cacheData, 0)
                        }
                    })

                })
            }
        }

        var codeZb
        var pageZb
        var thisEle
        var locData = []
        // 全局定义当前所处模块 id 
        // 方便调取
        // 加载缓存内容

        // 初始化周边 所有
        function initZoubian(cacheData) {
            if (cacheData) {
                renderCache(cacheData)
            } else {
                $(".zb-p .zb-b").attr("data-id", "0")
                var page = 1
                var url = "http://daohang.zanhf.com/portal/index/getZhoubian?"
                getZbData(url, page)
            }
        }

        // 初始化周边对应的 分类
        function initZbSort(curPageId) {
            // if (locData != null)
            if (cacheData != null) {
                if (curPageId in cacheData) {
                    renderCache(cacheData)
                } else {
                    var page = 1
                    var url = "http://daohang.zanhf.com/portal/index/getZhoubianSort?sort_id=" + curPageId
                    // console.log(url)
                    getZbData(url, page)
                }
            } else {
                var page = 1
                var url = "http://daohang.zanhf.com/portal/index/getZhoubianSort?sort_id=" + curPageId
                // console.log(url)
                getZbData(url, page)
            }
        }

        // 判断是否触发的是加载更多
        var flagMore = false
        // 点击加载更多
        // 加载对应模块 对应页面更多
        function clickZbPage() {
            $(".zb-b").each(function () {
                var curPageId = Number($(this).attr("data-id"))
                // console.log(curPageId)
                $(this).find(".zb-loadMore").on("click", function (event) {
                    var curPageNum = $(this).attr("page")
                    thisEle = $(this).parent(".zb-b")
                    flagMore = true
                    if (curPageId === 0) {
                        // console.log("所有")
                        // 1. 所有分类 url=> "http://daohang.zanhf.com/portal/index/getZhoubian?sort_id=0
                        var url = "http://daohang.zanhf.com/portal/index/getZhoubian?"
                        getZbData(url, curPageNum)

                    } else {
                        // console.log("分类分类")
                        // 2.独立模块url = "http://daohang.zanhf.com/portal/index/getZhoubianSort?sort_id=" + curPageId
                        var url = "http://daohang.zanhf.com/portal/index/getZhoubianSort?sort_id=" + curPageId
                        getZbData(url, curPageNum)
                    }
                })
            })
        }

        // 加载 周边 页面内容
        function getZbData(url, page) {
            // console.log(url + "&page=" + page)
            $.ajax({
                url: url + "&page=" + page,
                dataType: "JSON",
                type: 'GET',
                success: renderZb,
                error: error
            })
        }

        // 渲染页面
        function renderZb(data) {
            var sort = (data.sort)
            var locData = LBC_Zhoubian().get()
            if (locData != null) {
                zbCache = locData
                // 获取已经缓存的数据
                if (!(sort in locData)) {
                    zbCache[sort] = {}
                    zbCache[sort]["data"] = []
                    $('.zb-b').find(".zb-list").empty()
                } else {
                    if (data.data.current_page == locData[sort].current_page) {
                        zbCache[sort] = {}
                        zbCache[sort].data = []
                    }
                }
            } else {
                zbCache[sort] = {}
                zbCache[sort].data = []
            }
            zbCache[sort].current_page = data.data.current_page
            zbCache[sort].last_page = data.data.last_page
            zbCache.show = sort
            var current_page = Number(data["data"]["current_page"])
            var last_page = Number(data["data"]["last_page"])
            var date = new Date().getTime()
            zbCache.date = date
            if (!thisEle) {
                thisEle = $(".zb-b").eq(0)
                // console.log("清空")
            } else {
                thisEle.find(".zb-loadMore").attr("page", current_page + 1)
            }

            data = data["data"]["data"]
            if (!flagMore) {
                thisEle.find(".zb-list").empty()
            }
            // flagMore = false
            var zbHtml = ''
            $.each(data, function (index, item) {
                zbCache[sort].data.push(item)
                var zbId = item["id"]
                var zbImg = "/upload/" + item["url"]
                var zbTime = item["time"]
                var zbTitle = item["title"]
                zbHtml = zbHtml + "\n             <li class=\"zb-item\">\n                <a href=\"/portal/zhoubian_detail.html?id=" + zbId + "\" target=\"\" class=\"zb-link\">\n                    <div class=\"zb-img-box\">\n                        <div class=\"zb-img-show\" style=\"background-image: url(" + zbImg + ");\"></div>\n                    </div>\n                    <div class=\"zb-link-des\">\n                        <dt class=\"zb-des-title text-ellipsis\" title =\"" + zbTitle + "\">" + zbTitle + "</dt>\n                        <dd class=\"zb-des-time\">\u53D1\u552E\u65E5\uFF1A" + zbTime + "</dd>\n                    </div>\n                </a>\n              </li>\n            ";
            })

            thisEle.find(".zb-list").append(zbHtml)
            thisEle.find(".zb-loadMore").attr("page", current_page + 1)
            thisEle.find(".zb-loadMore").unbind()
            if (current_page >= last_page) {
                thisEle.find(".zb-loadMore").text("加载完毕")
            } else {
                thisEle.find(".zb-loadMore").text("加载更多")
                clickZbPage()
            }
            LBC_Zhoubian().add(zbCache)
        }
        // console.log(zbCache)
        function renderCache(data, sort) {
            var locData = LBC_Zhoubian().get()
            var zbCache = locData
            if (sort === undefined) {
                sort = zbCache.show
                var eleText = ".zb-tag-item[data-id='" + sort + "']"
            } else {
                zbCache.show = sort
            }
            var dataLoc = zbCache[sort].data
            var current_page = Number(zbCache[sort].current_page)
            var last_page = Number(zbCache[sort].last_page)
            var eleText = ".zb-tag-item[data-id='" + sort + "']"

            // zb-tag-item
            $(eleText).addClass("zb-cur")
            LBC_Zhoubian().add(zbCache)
            $(".zb-p .zb-b").find(".zb-list").empty()
            var zbHtml = ''
            $.each(dataLoc, function (index, item) {
                var zbId = item["id"]
                var zbImg = "/upload/" + item["url"]
                var zbTime = item["time"]
                var zbTitle = item["title"]
                zbHtml = zbHtml + "\n             <li class=\"zb-item\">\n                <a href=\"/portal/zhoubian_detail.html?id=" + zbId + "\" target=\"\" class=\"zb-link\">\n                    <div class=\"zb-img-box\">\n                        <div class=\"zb-img-show\" style=\"background-image: url(" + zbImg + ");\"></div>\n                    </div>\n                    <div class=\"zb-link-des\">\n                        <dt class=\"zb-des-title text-ellipsis\" title =\"" + zbTitle + "\">" + zbTitle + "</dt>\n                        <dd class=\"zb-des-time\">\u53D1\u552E\u65E5\uFF1A" + zbTime + "</dd>\n                    </div>\n                </a>\n              </li>\n            ";
            })
            $(".zb-p .zb-b").find(".zb-list").append(zbHtml)
            // 剩余加载
            $(".zb-p .zb-b").find(".zb-loadMore").attr("page", current_page + 1)
            $(".zb-p .zb-b").find(".zb-loadMore").unbind()
            if (current_page == last_page) {
                $(".zb-p .zb-b").find(".zb-loadMore").text("加载完毕")
            } else {
                $(".zb-p .zb-b").find(".zb-loadMore").text("加载更多")
                clickZbPage()
            }
        }

        // 报错
        function error() {
            alert("哦哦，链接失败了~")
        }

    }());
}
/**** 音乐 ****************************************************************** */
if (document.getElementsByClassName('index_wrap').length) {
    (function () {

        /**
         * 音乐专辑
         * 切换
         * 单一功能原则
         */
        // 实例化
        var allMusic = new AllMusic()
        var singleMusic = new SingleMusic()
        var eventMusic = new EventMusic()
        // 触发事件
        eventMusic.select()
        // 展示所有周边
        function AllMusic() {
            this.all = function () {
                // 如果标签中所有标签都未被选中，显示第一个ul
                var ifAll = true
                var dataId
                $(".music-top-tag .music-tag-item").each(function () {
                    if ($(this).hasClass("music-cur")) {
                        ifAll = false
                        dataId = $(this).attr("data-id")
                        // console.log("这个dataId" + dataId)
                    }
                })
                if (ifAll) {
                    dataId = $(this).attr("data-id")
                    $(".music-screen-con .music-b").css("display", "none")
                    $(".music-screen-con .music-b:first").css("display", "block")
                    // 初始化周边，只渲染所有
                    // 切换到周边的时候显示
                    // 获取所有
                    // initZoubian()

                }
                singleMusic.single(ifAll, dataId)
            }
        }
        // 初始化周边，只渲染所有
        // 切换到周边的时候显示
        // 获取所有
        initZoubian()
        // 展示单个模块周边
        function SingleMusic() {
            this.single = function (status, dataId) {
                if (!status) {
                    // $(".music-screen-con .music-b").css("display", "none")
                    $(".music-screen-con .music-b").each(function () {
                        if ($(this).attr("data-id") == dataId) {
                            $(this).css("display", "block")
                        }
                    })
                    var curPageId = dataId
                    // $(".data-id").attr("data-id",dataId)
                    $(".music-p .music-b").attr("data-id", dataId)
                    initMusicSort(curPageId)
                }
            }
        }

        // 点击标签触发切换
        function EventMusic() {
            this.select = function () {
                $(".music-top-tag .music-tag-item").each(function () {
                    $(this).on("click", function () {
                        if (!$(this).hasClass("music-cur")) {
                            $(".music-top-tag .music-tag-item").removeClass("music-cur")
                            $(this).addClass("music-cur")
                            // 每次点击调用
                            allMusic.all()
                        } else {
                            $(".music-top-tag .music-tag-item").removeClass("music-cur")
                            // 每次点击调用
                            allMusic.all()
                            initZoubian()
                        }
                    })
                })
            }
        }

        var codeMusic
        var pageMusic
        var thisEle
        // 全局定义当前所处模块 id 
        // 方便调取

        // 初始化周边 所有
        function initZoubian() {
            $(".music-p .music-b").attr("data-id", "0")
            var page = 1
            var url = "http://daohang.zanhf.com/portal/index/getMusic?sort_id=0"
            getMusicData(url, page)
        }
        // 初始化周边对应的 分类
        function initMusicSort(curPageId) {
            var page = 1
            var url = "http://daohang.zanhf.com/portal/index/getMusicSort?sort_id=" + curPageId
            // console.log(url)
            getMusicData(url, page)
        }

        // 判断是否触发的是加载更多
        var flagMore = false
        // 点击加载更多
        // 加载对应模块 对应页面更多
        function clickMusicPage() {
            $(".music-b").each(function () {
                var curPageId = Number($(this).attr("data-id"))
                $(this).find(".music-loadMore").on("click", function (event) {
                    var curPageNum = $(this).attr("page")
                    thisEle = $(this).parent(".music-b")
                    flagMore = true
                    if (curPageId === 0) {
                        // console.log("所有")
                        // 1. 所有分类 url=> "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/musicAll?sort_id=0
                        var url = "http://daohang.zanhf.com/portal/index/getMusic?sort_id=0"
                        getMusicData(url, curPageNum)
                    } else {
                        // console.log("分类分类")
                        // 2.独立模块url = "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/musicFenlei?sort_id=" + curPageId
                        var url = "http://daohang.zanhf.com/portal/index/getMusicSort?sort_id=" + curPageId
                        getMusicData(url, curPageNum)
                    }
                })
            })
        }

        // 加载 周边 页面内容
        function getMusicData(url, page) {
            // console.log(url + "&page=" + page)
            $.ajax({
                url: url + "&page=" + page,
                dataType: "JSON",
                type: 'GET',
                success: renderMusic,
                error: error
            })
        }

        // 渲染页面
        function renderMusic(data) {
            // console.log(data)
            var current_page = Number(data["data"]["current_page"])
            var last_page = Number(data["data"]["last_page"])
            // console.log(thisEle)
            if (!thisEle) {
                thisEle = $(".music-b").eq(0)
                // console.log("清空")
            } else {
                thisEle.find(".music-loadMore").attr("page", current_page + 1)
            }

            data = data["data"]["data"]
            if (!flagMore) {
                thisEle.find(".music-list").empty()
            }
            flagMore = false
            $.each(data, function (index, item) {
                var musicId = item["id"]
                var musicImg = "/upload/" + item["image"]
                var musicUrl = item["url"]
                var musicDes = item["des"]
                var musicTitle = item["name"]
                var musicHtml = "\n                <li class=\"music-item clear\" music-id=\"" + musicId + "\">\n                    <a href=\"" + musicUrl + "\" class=\"music-link\"  target=\"_blank\">\n                        <div class=\"music-img\" style=\"background-image: url(" + musicImg + ");\"></div>\n                        <div class=\"music-img-bg\"></div>\n                        <dt class=\"music-name text-ellipsis\" title =\"" + musicTitle + "\">" + musicTitle + "</dt>\n                        <dd class=\"music-singer text-ellipsis\" title =\"" + musicDes + "\">" + musicDes + "</dd>\n                    </a>\n                </li>\n             ";
                thisEle.find(".music-list").append(musicHtml)
            })
            thisEle.find(".music-loadMore").unbind()
            if (current_page == last_page) {
                thisEle.find(".music-loadMore").text("加载完毕")

            } else {
                thisEle.find(".music-loadMore").text("加载更多")
                clickMusicPage()
            }
        }


        // 报错
        function error() {
            alert("哦哦，链接失败了~")
        }

    }());
}
/**** 轮播 ****************************************************************** */
if (document.getElementsByClassName('index_wrap').length || (document.getElementsByClassName('det_wrap').length)) {
    /**
     * 首页
     * 头图轮播
     */
    (function () {

        /**
         * 首页
         * 头图轮播
         */
        var swiper = new Swiper('.swiper-container', {
            effect: "fade",
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });
        /**
         * web端
         * 开关头图
         */
        $(".suo-box").each(function () {
            $(this).on("click", function () {
                // 判断当前锁的状态
                // 开锁
                if ($(this).children(".icon-suo").attr("data-state") != "on") {
                    // 切换图标和状态
                    $(this).children(".icon-suo").attr("src", "/themes/simpleboot3/public/assets/img/web/suo2.png")
                    $(this).children(".icon-suo").attr("data-state", "on")
                    // 开启轮播
                    $(".swiper-container").find(".swiper-slide").each(function () {
                        $(this).removeClass("swiper-no-swiping")
                        $(this).attr("data-swiper-autoplay", "3000")
                    })
                    // 开启自动轮播
                    swiper.autoplay.start()
                    // 开启前进后退按钮
                    $(".swiper-button-next").each(function () {
                        $(this).css("pointerEvents", "auto")
                    })
                    $(".swiper-button-prev").each(function () {
                        $(this).css("pointerEvents", "auto")
                    })
                } else {
                    // 关锁
                    $(this).children(".icon-suo").attr("src", "/themes/simpleboot3/public/assets/img/web/suo.png")
                    $(this).children(".icon-suo").attr("data-state", "off")
                    // 停止轮播
                    $(".swiper-container").find(".swiper-slide").each(function () {
                        $(this).addClass("swiper-no-swiping")
                    })
                    // 停止自动轮播
                    swiper.autoplay.stop()
                    // 取消前进退后按键
                    $(".swiper-button-next").each(function () {
                        $(this).css("pointerEvents", "none")
                    })
                    $(".swiper-button-prev").each(function () {
                        $(this).css("pointerEvents", "none")
                    })
                }
            })
        })
        /**
         * 移动端
         * 头图开关
         */
        $(".m-controler").on("click", function () {
            var status = $(this).attr("data-status")
            if (status == "on") {
                $(this).children(".con-btn").attr("src", "/themes/simpleboot3/public/assets/img/mob/suo.png")
                $(this).find(".m-hid-btn").attr("src", "/themes/simpleboot3/public/assets/img/mob/mguan.png")
                $(this).attr("data-status", "off")
                // 停止轮播
                $(".swiper-container").find(".swiper-slide").each(function () {
                    $(this).addClass("swiper-no-swiping")
                })
                // 停止自动轮播
                swiper.autoplay.stop()
            } else {
                $(this).children(".con-btn").attr("src", "/themes/simpleboot3/public/assets/img/mob/suo2.png")
                $(this).find(".m-hid-btn").attr("src", "/themes/simpleboot3/public/assets/img/mob/mkai.png")
                $(this).attr("data-status", "on")
                // 开启轮播
                $(".swiper-container").find(".swiper-slide").each(function () {
                    $(this).removeClass("swiper-no-swiping")
                    $(this).attr("data-swiper-autoplay", "3000")
                })
                // 开启自动轮播
                swiper.autoplay.start()
            }
        });

        (function () {
            /**
             * 移动端
             * 开启 关闭
             * 夜间模式
             */
            // 声明缓存方法
            var nightMode
            // 插入缓存
            function add_nightItem() {
                var night_item = {
                    id: 0,
                    nightMode: nightMode,
                }
                LBC_night.add(night_item)
            }
            // 缓存方法
            var LBC_night = function () {
                return {
                    add: function add(value) {
                        localStorage.setItem("pageNight", JSON.stringify(value));
                    },
                    get: function get() {
                        return JSON.parse(localStorage.getItem("pageNight"));
                    },
                    remove: function remove() {
                        localStorage.removeItem("pageNight");
                    }
                };
            }();
            // 调取缓存状态，切换夜间模式
            function night_mode(nightMode) {
                if (nightMode == "day") {
                    // 夜间 
                    $("#indexWrap").addClass("night-mode")
                    $("#xfWrap").addClass("night-mode")
                    $("#mhWrap").addClass("night-mode")
                    $("#night_mode").children(".item-img").attr("src", "/themes/simpleboot3/public/assets/img/web/taiyang.png")
                    $("#mNightBtn").children(".m-swift").attr("src", "/themes/simpleboot3/public/assets/img/web/taiyang.png")
                } else {
                    // 白天
                    $("#indexWrap").removeClass("night-mode")
                    $("#xfWrap").removeClass("night-mode")
                    $("#mhWrap").removeClass("night-mode")
                    $("#night_mode").children(".item-img").attr("src", "/themes/simpleboot3/public/assets/img/web/yueliang.png")
                    $("#mNightBtn").children(".m-swift").attr("src", "/themes/simpleboot3/public/assets/img/web/yueliang.png")
                }
            }
            /**
             * 移动端 
             * 白天夜晚模式切换
             */
            $("#mNightBtn").on("click", function () {
                nightMode = $(this).attr("data-status")
                add_nightItem()
                night_mode()
                // 增删 白天夜晚 样式
                night_mode(nightMode)
                if (nightMode == "day") {
                    $(this).attr("data-status", "night")
                    $(this).find(".m-hid-btn").attr("src", "/themes/simpleboot3/public/assets/img/mob/mkai.png")
                } else {
                    $(this).attr("data-status", "day")
                    $(this).find(".m-hid-btn").attr("src", "/themes/simpleboot3/public/assets/img/mob/mguan.png")
                }
                return false;
            })
        })();
    })();
    /**
     * 资讯
     * 小轮播图
     */
    (function () {
        /**
         * 资讯
         * 小轮播图
         */
        var swiper_zixun = new Swiper('.swiper-container-zixun', {
            loop: true,
            effect: "fade",
            navigation: {
                nextEl: '.zx-next',
                prevEl: '.zx-prev',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });

        /**
         * banner图轮播
         */
        var swiper_banner = new Swiper('.swiper-container-banner', {
            loop: true,
            navigation: {
                nextEl: '.banner-next',
                prevEl: '.banner-prev',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });
        /**
         * banner2图轮播
         */
        var swiper_banner = new Swiper('.swiper-container-banner2', {
            loop: true,
            navigation: {
                nextEl: '.banner-next',
                prevEl: '.banner-prev',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });
    })();
    /**
     * 图榜轮播
     */
    (function () {
        init();
        if (this.pageW > 880) {
            /**
             * 图榜轮播
             */
            var swiper_tubang = new Swiper('.swiper-container-tubang', {
                slidesPerView: 5,
                spaceBetween: 18,
                navigation: {
                    nextEl: '.tubang-next',
                    prevEl: '.tubang-prev',
                },
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
            });
        } else if (this.pageW <= 880) {
            /**
             * 图榜轮播
             */
            var swiper_tubang = new Swiper('.swiper-container-tubang', {
                slidesPerView: 3,
                spaceBetween: 4,
                navigation: {
                    nextEl: '.tubang-next',
                    prevEl: '.tubang-prev',
                },
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
            });
        }
        /**
         * 初始属性
         */
        function init() {
            this.pageW = $(window).width()
        }
    })();
}
/**** 详情js ****************************************************************** */
if (document.getElementsByClassName('det_wrap').length || (document.getElementsByClassName('mianz_wrap').length) || (document.getElementsByClassName('footer_wrap').length)) {
    /**
     * 导航
     * 主页
     */
    /**
     * 初始属性
     */
    // 左侧菜单延迟显示
    setTimeout(() => {
        $('.left-fix-bar').css('display', 'block')
        console.log('xianshi11111')
    }, 300);
    $(document).ready(function () {
        /**
         * 资讯列表切换
         */
        $(".zx-r-item").each(function () {
            $(this).on("click", function () {
                var zx_index = $(this).attr("data-id")
                var text = ".zx-det-list[data-id=" + zx_index + "]"
                $(".zx-det-list").css("display", "none")
                $(".zx-r-item").removeClass("zx_r_active")
                $(text).css("display", "block")
            })
        });
        /**
         * 搜索功能
         * 单一职责原则
         */
        (function () {
            /**
             * 头部搜索功能
             * 展示、隐藏
             */
            // init();
            // document.getElementsByClassName("webs-item-hid")[0].style.display = "none"
            $(window).on("scroll", function () {
                var windowH = $(window).scrollTop()
                if (windowH >= 200) {
                    $(".search-header").css("display", "block")
                    $(".main_search").css("display", "none")
                } else {
                    $(".search-header").css("display", "none")
                    $(".main_search").css("display", "block")
                }
            })
            // 获取数据
            function GetData(callBackArr) {
                this.getData = function (url, param) {
                    $.ajax({
                        url: url,
                        data: param,
                        type: "GET",
                        dataType: "json",
                        beforeSend: this.LoadFn, //加载执行方法  
                        erro: this.erroFn, //错误执行方法  
                        success: this.succFn //成功执行方法  
                    })
                }
                // 进行
                this.LoadFn = function () {}
                // 成功
                this.succFn = function (data) {
                    $(data).each(function (index, item) {
                        // 初始化搜索栏
                        iR.initRender(item)
                        // 数据加入缓存
                        iC.catchData(item)
                        // 用户选择搜索模块和搜索网站
                        tR.selcet()
                        // 移动端模块和搜索切换
                        mS.mobSearch()
                    })
                }
                // 失败
                this.erroFn = function () {
                    alert(erro)
                }
            }
            var oG = new GetData([iR, tR, iC])
            var url = "http://daohang.zanhf.com/portal/index/getNavicon"
            oG.getData(url)
            // 初始化渲染
            function InitRender() {
                this.initRender = function (data) {
                    var data = data.data
                    for (var i = 0; i < 9; i++) {
                        var dataArr = data[i + 1]
                        // 当用户设置了这个搜索模块
                        if (dataArr != undefined) {
                            // 加载首个搜索
                            var html_search = "\n                                <li class=\"form_box\" category=\"" + (i + 1) + "\">\n                                    <form action=\"" + dataArr[0]["action"] + "\" method=\"GET\" target=\"_blank\" class=\"s-form\">\n                                        <div class=\"params\">\n                                            \n                                            <input class=\"params-item\" type=\"hidden\" name=\"" + dataArr[0]["params"] + "\" value=\"" + dataArr[0]["value"] + "\">\n                                            <input type=\"hidden\" name=\"ie\" value=\"utf-8\" style=\"\">\n                                        </div>\n                                        <div class=\"opt-wr\">\n                                            <div class=\"s-opt-container\" category=\"" + (i + 1) + "\">\n                                            </div>\n                                            <span class=\"s-opt-logo\">\n                                                <a href=\"" + dataArr[0]["home"] + "\" target=\"_blank\" class=\"baidu logo-show\" style=\"background-image: url(/upload/" + dataArr[0]["img"] + ");\">baidu</a>\n                                            </span>\n                                            <div class=\"toggle\"></div>\n                                        </div>\n                                        <span class=\"ipt-wr\">\n                                            <input type=\"text\" class=\"keyword\" name=\"" + dataArr[0]["ipt"] + "\" placeholder=\"" + dataArr[0]["placeholder"] + "\" autocomplete=\"off\" maxlength=\"100\">\n                                        </span>\n                                        <span class=\"btn-wr\">\n                                            <input type=\"submit\" class=\"search\" value=\"" + dataArr[0]["btn"] + "\">\n                                        </span>\n                                    </form>\n                                </li>\n                        ";
                            $(" .s-panel").append(html_search)
                            // 插入模块搜索选项
                            // 取出每一组所有id，图标，web
                            var len = dataArr.length
                            for (var j = 0; j < len; j++) {
                                var dataOpt = dataArr[j]
                                var opt_html = "\n   <a class=\"opt-img baidu\" category=\"" + j + "\" style=\"background-image: url(/upload/" + dataOpt["backgroundImage"] + ");\">" + dataOpt["web"] + "</a>\n                            ";
                                $(".s-opt-container").each(function () {
                                    if ($(this).attr("category") == i + 1) {
                                        // console.log(i)
                                        $(this).append(opt_html)
                                    }
                                })
                            }
                            if (i == 0) {
                                $(".s-panel .form_box").addClass("active")
                            }
                        }
                    }
                }
            }
            var iR = new InitRender()
            // 搜索信息加入缓存
            function InitCatch() {
                this.catchData = function (data) {
                    this.LBC_data().add(data)
                }
                this.LBC_data = function () {
                    return {
                        add: function add(value) {
                            localStorage.setItem("searchArr", JSON.stringify(value));
                        },
                        get: function get() {
                            return JSON.parse(localStorage.getItem("searchArr"));
                        },
                        remove: function remove() {
                            localStorage.removeItem("searchArr");
                        }
                    };
                };
            }
            var iC = new InitCatch()
            // 选择搜索模块渲染
            function TagRender() {
                // 选择模块
                this.selcet = function () {
                    $(".s-tab li").each(function () {
                        $(this).on("click", function () {
                            var id = $(this).attr("category")
                            $(".s-tab li").removeClass("active")
                            $(".s-tab li[category=" + id + "]").each(function () {
                                $(this).addClass("active")
                            })
                            $(".s-panel li").removeClass("active")
                            $(".s-panel li[category=" + id + "]").each(function () {
                                $(this).addClass("active")
                            })
                            // 切换到快递
                            // if ($(this).text() == "快递") {
                            //     specialSear("顺丰快递")
                            // }
                        })
                    })
                    sR.showSelect()
                }
            }
            var tR = new TagRender();
            // 选择搜索项渲染
            function SelRender() {
                this.showSelect = function () {
                    // 展开选项
                    $(".toggle").on("click", function () {
                        if ($(this).hasClass("open")) {
                            $(this).removeClass("open")
                            $(this).siblings(".s-opt-container").css("display", "none")
                        } else {
                            $(this).addClass("open")
                            $(this).siblings(".s-opt-container").css("display", "block")
                            //打开网址列表
                            //关闭标签列表
                            $(".m-select-category").prev(".s-tab").css("display", "none")
                            $(".m-select-category").attr("data-status", "off")
                            $(".m-select-category").find(".toggle").removeClass("open")
                        }
                    })
                    this.selSearch()
                }
                this.selSearch = function () {
                    // 获取被选择搜索项mid,页面id
                    var mid
                    var id
                    $(".opt-img").each(function () {
                        $(this).on("click", function () {
                            // 模块id
                            mid = $(this).parents(".form_box").attr("category")
                            // 搜索项id
                            id = $(this).attr("category")
                            sR.selRender(mid, id)
                            $(".toggle").removeClass("open")
                            $(".toggle").siblings(".s-opt-container").css("display", "none")
                            // 调用 特殊拼接地址搜索
                            var text = $(this).text()
                            specialSear(text)
                        })
                    })
                }
                this.selRender = function (catagoryId, id) {
                    // 获取缓存
                    var selected
                    var searchArr = iC.LBC_data().get()
                    // 根据id渲染搜索
                    var mid = catagoryId
                    var id = id
                    $(searchArr.data).each(function (index, item) {
                        selected = item[mid][id]
                        // 渲染到当天显示页面
                        $(".form_box").each(function () {
                            if ($(this).hasClass("active")) {
                                $(this).find(".s-form").attr("action", selected["action"])
                                $(this).find(".params .params-item").attr("name", selected["params"]).attr("value", selected["value"])
                                $(this).find(".keyword").attr("name", selected["ipt"]).attr("placeholder", selected["placeholder"])
                                $(this).find(".logo-show").attr("href", selected["action"])
                                $(this).find(".logo-show").css("backgroundImage", "url(" + "/upload/" + selected["img"] + ")")
                                $(this).find(".search").attr("value", selected["btn"])
                            }
                        })
                    })
                }

            }
            // 搜索特殊处理
            function specialSear(ele) {
                var eleForm
                var web = ele
                switch (web) {
                    case "NicoNico 搜索":
                        eleForm = $(".form_box").eq(1)
                        break
                    case "网易云音乐":
                        eleForm = $(".form_box").eq(5)
                        break
                    case "爱奇艺":
                        eleForm = $(".form_box").eq(1)
                        break
                    case "百度翻译":
                        eleForm = $(".form_box").eq(7)
                        break
                    case "日本亚马逊":
                        eleForm = $(".form_box").eq(2)
                        break
                    case "顺丰快递":
                        eleForm = $(".form_box").eq(8)
                        break
                    case "QQ音乐":
                        eleForm = $(".form_box").eq(5)
                        break
                }
                if (eleForm != undefined) {
                    var submitText = eleForm.find(".search").val()
                    // 非特殊网站
                    // 按钮类型改为submit
                    $(".btn-wr .search").each(function () {
                        $(this).attr("type", "submit")
                        $(this).unbind()
                    })
                } else {
                    // 非特殊网站
                    // 按钮类型改为submit
                    $(".btn-wr .search").each(function () {
                        $(this).attr("type", "submit")
                        $(this).unbind()
                    })
                }
                // 如果按钮切换到特殊网站
                // 按钮类型改为button
                if (submitText == web) {
                    $(".btn-wr .search").each(function () {
                        if ($(this).val() == web) {
                            $(this).attr("type", "button")
                            $(this).on("click", function () {
                                switch (web) {
                                    case "NicoNico 搜索":
                                        var keyword = $(this).parent(".btn-wr").prev(".ipt-wr").find("input").val()
                                        window.open("http://www.nicovideo.jp/search/" + keyword + "?ref=nicotop_search")
                                        break
                                    case "网易云音乐":
                                        var keyword = $(this).parent(".btn-wr").prev(".ipt-wr").find("input").val()
                                        window.open("https://music.163.com/#/search/m/?s=" + keyword + "&type=1")
                                        break
                                    case "爱奇艺":
                                        var keyword = $(this).parent(".btn-wr").prev(".ipt-wr").find("input").val()
                                        window.open("http://so.iqiyi.com/so/q_" + keyword + "?source=input&sr=953714572152")
                                        break
                                    case "百度翻译":
                                        var keyword = $(this).parent(".btn-wr").prev(".ipt-wr").find("input").val()
                                        window.open("https://fanyi.baidu.com/#zh/en/" + keyword)
                                        break
                                    case "日本亚马逊":
                                        var keyword = $(this).parent(".btn-wr").prev(".ipt-wr").find("input").val()
                                        window.open("https://www.amazon.co.jp/s/ref=nb_sb_noss?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=" + keyword)
                                        break
                                    case "顺丰快递":
                                        var keyword = $(this).parent(".btn-wr").prev(".ipt-wr").find("input").val()
                                        window.open("http://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/" + keyword)
                                        break
                                    case "QQ音乐":
                                        var keyword = $(this).parent(".btn-wr").prev(".ipt-wr").find("input").val()
                                        window.open("https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=" + keyword)
                                        break
                                }
                            })
                        }
                    })
                }
            }
            var sR = new SelRender()
            /**
             * 移动端
             * 搜索切换
             */
            function MobSearch() {
                this.mobSearch = function () {
                    /**
                     * 移动端 
                     * 动态赋值搜索标签宽度
                     */
                    var holyW = $(".m-search-container").find(".m-select-category").width() + $(".m-search-container").find(".opt-wr").width() + $(".m-search-container").find(".ipt-wr").width() + $(".m-search-container").find(".btn-wr").width() + 5
                    // console.log($(".m-search-container").find(".opt-wr").width())
                    // 赋值
                    $(".m-search-container .s-tab").css("width", holyW)
                    /**
                     * 移动端
                     * 展开网站标签列表
                     */
                    $(".m-select-category").on("click", function () {
                        var status = $(this).attr("data-status")
                        if (status == "off") {
                            $(this).prev(".s-tab").css("display", "block")
                            $(this).attr("data-status", "on")
                            $(this).find(".toggle").addClass("open")
                            //打开标签列表
                            //关闭标签列表
                            $(".opt-wr").find(".toggle").removeClass("open")
                            $(".opt-wr").find(".toggle").siblings(".s-opt-container").css("display", "none")
                            /**
                             * 移动端
                             * 选择标签
                             * 赋值给按钮
                             */
                            $(".m-search-container .s-tab").find("li").each(function () {
                                $(this).on("click", function () {
                                    var tag_val = $(this).attr("category")
                                    var tag_text = $(this).text()
                                    // console.log(tag_val)
                                    var cur_text = $(".m-select-category .m-c-tag").text()
                                    /**
                                     * 移动端
                                     * 商品和网页切换
                                     */
                                    $(".m-select-category .m-c-tag").text(tag_text)
                                    ele = $(this)
                                    switch (tag_val) {
                                        case "1":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='1']").addClass("active")
                                            break
                                        case "2":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='2']").addClass("active")
                                            break
                                        case "3":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='3']").addClass("active")
                                            break
                                        case "4":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='4']").addClass("active")
                                            break
                                        case "5":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='5']").addClass("active")
                                            break
                                        case "6":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='6']").addClass("active")
                                            break
                                        case "7":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='7']").addClass("active")
                                            break
                                        case "8":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='8']").addClass("active")
                                            break
                                        case "9":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='9']").addClass("active")
                                            break
                                    }

                                    $(this).text(cur_text)
                                    changeTag(cur_text, ele)

                                    function changeTag(text, ele) {
                                        switch (text) {
                                            case "网页":
                                                ele.attr("category", "1")
                                                break
                                            case "视频":
                                                ele.attr("category", "2")
                                                break
                                            case "商品":
                                                ele.attr("category", "3")
                                                break
                                            case "贴吧":
                                                ele.attr("category", "4")
                                                break
                                            case "音乐":
                                                ele.attr("category", "6")
                                                break
                                            case "图片":
                                                ele.attr("category", "5")
                                                break
                                            case "百科":
                                                ele.attr("category", "7")
                                                break
                                            case "翻译":
                                                ele.attr("category", "8")
                                                break
                                            case "快递":
                                                ele.attr("category", "9")
                                                break
                                        }
                                    }
                                    // if (tag_val == "2") {
                                    //     $(".s-tab li[category = 2]").css("display", "none")
                                    //     $(".s-tab li[category = 1]").css("display", "block")
                                    //     $(".m-c-tag").text(tag2_text)
                                    // } else if (tag_val == "1") {
                                    //     $(".s-tab li[category = 2]").css("display", "block")
                                    //     $(".s-tab li[category = 1]").css("display", "none")
                                    //     $(".m-c-tag").text(tag1_text)
                                    // } else {
                                    //     $(".m-c-tag").text(tag3_text)
                                    // }

                                    $(".m-search-container .s-tab").find("li").removeClass("active")
                                    $(this).addClass("active")
                                    //关闭网址列表
                                    $(".m-select-category").prev(".s-tab").css("display", "none")
                                    $(".m-select-category").attr("data-status", "off")
                                    $(".m-select-category").find(".toggle").removeClass("open")
                                    $(".m-search-container .s-tab").find("li").unbind()
                                    return false
                                })
                            })
                        } else {
                            $(this).prev(".s-tab").css("display", "none")
                            $(this).attr("data-status", "off")
                            $(this).find(".toggle").removeClass("open")
                        }
                    })
                }
            }
            var mS = new MobSearch()
        })();


        /**
         * 右侧固定栏
         */
        (function () {
            /**
             * 右侧固定菜单栏
             * 微信二维码
             */
            $(".wexin_item").hover(
                function () {
                    $(".code-box").css("display", "block")
                },
                function () {
                    $(".code-box").css("display", "none")
                })
            $(".code-box").hover(
                function () {
                    $(this).css("display", "block")
                },
                function () {
                    $(this).css("display", "none")
                })
            /**
             * 右侧固定菜单栏
             * 回到顶部
             */
            $(".top_item").on("click", function () {
                scrollToTop(".top_item");
            })

            function scrollToTop(anchorId) {
                var dis = $(window).scrollTop();
                $('html,body').animate({
                    scrollTop: '0px'
                }, 240);
            }
        })();
        /**
         * 导航栏隐藏导航
         */
        (function () {
            var pageW = $(window).width()
            // pc端 先调用方法
            pc_nav();
            // 移动端 调用方法
            mob_nav();
            // 视窗变化时，收起导航
            $(window).resize(function () {
                //视窗变化时，回复导航栏状态
                init();
                if (this.pageW >= 748) {
                    $(".nav-icon-wrap").css("height", "164px")
                    $(".nav-icon-wrap  .icon-box").css("height", "164px")
                    $(".right-shouqi").removeClass("down").addClass("up")
                    $(".right-shouqi").children(".shouqi-text").text("展开")
                    $(".icon-list .icon-item").css("marginBottom", "45px")
                } else if (this.pageW < 748) {
                    $(".nav-icon-wrap").css("height", "126px")
                    $(".nav-icon-wrap .icon-box").css("height", "96px")
                    $(".nav-icon-wrap").css("paddingBottom", "0")
                    $(".m-btn-img").attr("src", "/themes/simpleboot3/public/assets/img/mob/jiantou2.png")
                    $(this).attr("data-status", "off")
                }
            });
            // pc展开方法
            function pc_nav() {
                $(".right-shouqi").on("click", function () {
                    // 取内容实际高度
                    var panelH = $(".icon-content").height()
                    // 取导航状态
                    var panelState = $(".right-shouqi").attr("data-status")
                    if (panelState == "off") {
                        $(".nav-icon-wrap").css("height", panelH)
                        $(".icon-box").css("height", panelH)
                        $(this).children(".shouqi-text").text("收起")
                        $(".icon-list .icon-item").css("marginBottom", "34px")
                        $(this).addClass("down").removeClass("up")
                        $(".right-shouqi").attr("data-status", "on")
                    } else {
                        $(".nav-icon-wrap").css("height", "164px")
                        $(".nav-icon-wrap  .icon-box").css("height", "164px")
                        $(".right-shouqi").removeClass("down").addClass("up")
                        $(".right-shouqi").children(".shouqi-text").text("展开")
                        $(".icon-list .icon-item").css("marginBottom", "45px")
                        $(".right-shouqi").attr("data-status", "off")
                    }
                })
            };
            // 移动端展开方法
            function mob_nav() {
                $(".m-icon-show").on("click", function () {
                    // 获取内容高度
                    var mPanelH = $(".icon-content").height()
                    // 获取窗口状态
                    var state = $(".m-icon-show").attr("data-status")
                    if (state == "off") {
                        $(".nav-icon-wrap").css("height", mPanelH)
                        $(".nav-icon-wrap .icon-box").css("height", mPanelH)
                        $(".m-btn-img").attr("src", "/themes/simpleboot3/public/assets/img/mob/jiantou1.png")
                        $(".nav-icon-wrap").css("paddingBottom", "30px")
                        $(".m-icon-show").attr("data-status", "on")
                    } else {
                        $(".nav-icon-wrap").css("height", "126px")
                        $(".nav-icon-wrap .icon-box").css("height", "96px")
                        $(".m-btn-img").attr("src", "/themes/simpleboot3/public/assets/img/mob/jiantou2.png")
                        $(".nav-icon-wrap").css("paddingBottom", "0")
                        $(".m-icon-show").attr("data-status", "off")
                    }
                })
            };
        })();
        /**
         * 主题漫画
         * 切换
         */
        (function () {
            $(".mh-screen-con .mh-tag-item").each(function () {
                $(this).on("click", function () {
                    $(".mh-screen-con .mh-tag-item").removeClass("mh-cur")
                    $(this).addClass("mh-cur")
                    var tag_data = $(this).children(".mh-tag").attr("data-tag")
                    switch (tag_data) {
                        case "主线故事":
                            $(".zhuxian_p").css("display", "block");
                            $(".sige_p").css("display", "none");
                            $(".sheding_p").css("display", "none");
                            break;
                        case "日常四格":
                            $(".zhuxian_p").css("display", "none");
                            $(".sige_p").css("display", "block");
                            $(".sheding_p").css("display", "none");
                            break;
                        case "资料设定":
                            $(".zhuxian_p").css("display", "none");
                            $(".sige_p").css("display", "none");
                            $(".sheding_p").css("display", "block");
                            break;
                    }
                })
            })
        })();

        /**
         * 左侧固定栏
         */
        (function () {
            /**
             * 左侧固定栏 
             * 展开收起，存入缓存
             */


            var LBC_leftFix = function () {
                return {
                    add: function add(value) {
                        localStorage.setItem("leftFix", JSON.stringify(value));
                    },
                    get: function get() {
                        return JSON.parse(localStorage.getItem("leftFix"));
                    },
                    remove: function remove() {
                        localStorage.removeItem("leftFix");
                    }
                };
            }();

            function add_left() {
                var status = $(".fix-bar-btn").attr("data-status")
                if (status == "open") {
                    status == "off"
                } else {
                    status == "open"
                }
                var l_state = {
                    id: 0,
                    status: status,
                }
                LBC_leftFix.add(l_state)
                l_state = []
            }
            /**
             * 左侧固定栏
             * 屏幕小于1300 大于768
             * 收起
             */
            if (this.pageW > 768) {}
            if (LBC_leftFix.get()) {
                if (LBC_leftFix.get().status == "open") {
                    var eleTog = $(".fix-bar-btn")
                    var ele = $(".fix-bar-btn").children(".bar-btn-img")
                    $(".left-fix-bar").css("width", "0")
                    $(".fix-bar-panel").css("display", "none")
                    $(".fix-bar-bottom").css("display", "none")
                    eleTog.css("left", "0")
                    $("#fixOff").css("display", "inline-block")
                    $("#fixOpen").css("display", "none")
                    $(".left-list-box").css("display", "none")
                    $(".fix-bar-btn").attr("data-status", "off").css("left", "0")
                }
            }
            /**
             * 左侧固定栏
             * 展开关闭
             */
            $(".fix-bar-btn").on("click", function () {
                // 获取缓存
                add_left()
                var eleTog = $(this)
                var ele = $(this).children(".bar-btn-img")
                if ($(".fix-bar-btn").attr("data-status") == "off") {
                    $(".left-fix-bar").css("width", "170px")
                    $(".fix-bar-panel").css("display", "block")
                    $(".fix-bar-bottom").css("display", "block")
                    $(".fix-bar-btn").attr("data-status", "open")
                    eleTog.css("left", "170px")
                    $("#fixOpen").css("display", "inline-block")
                    $("#fixOff").css("display", "none")
                    setTimeout(function () {
                        $(".left-list-box").css("display", "block")
                    }, 200)
                } else {
                    $(".left-fix-bar").css("width", "0")
                    $(".fix-bar-panel").css("display", "none")
                    $(".fix-bar-bottom").css("display", "none")
                    eleTog.css("left", "0")
                    $("#fixOff").css("display", "inline-block")
                    $("#fixOpen").css("display", "none")
                    $(".left-list-box").css("display", "none")
                    $(".fix-bar-btn").attr("data-status", "off")
                }
                return false;
            })
            /**
             * 左侧固定栏
             * 切换城市
             */
            // 展开
            $(".switch-city").on("click", function () {
                $(".city-bar").css("display", "none");
                $(".select-city-bar").css("display", "block");
                /**
                 * 左侧固定栏选择
                 * 省、市赋值
                 */
                //赋值省份
                var prov_val;
                var prov
                $.each(city_data, function (index_1, item_1) {
                    prov_val = index_1;
                    prov = item_1;
                    var html_prov =
                        "<option  value=" + prov.name + ">" + prov.name + "</option> ";
                    $("#weather-prov").append(html_prov);
                });
                // 选择省份
                $("#weather-prov").on("click", function () {
                    var city_name = $(this).val();
                    $("#weather-city").empty();
                    $.each(city_data, function (index_1, item_1) {
                        prov_val = index_1;
                        prov = item_1;
                        // 赋值市
                        if (prov.name == city_name) {
                            $.each(prov.child, function (index_2, item_2) {
                                var city = item_2.name
                                var html_city =
                                    '<option value="' + city + '">' + city + "</option> ";
                                $("#weather-city").append(html_city);
                            })
                        }
                    });
                });
            });
            // 关闭 放弃更改
            $(".weather-cancel").on("click", function () {
                $(".city-bar").css("display", "block")
                $(".select-city-bar").css("display", "none")
            })
            //关闭 确认更改
            $(".weather-done").on("click", function () {
                var select_city = $("#weather-city").val()
                if (select_city == null) {
                    $(".city-bar").css("display", "block")
                    $(".select-city-bar").css("display", "none")
                } else if (select_city == "市辖区") {
                    $(".city-bar").css("display", "block")
                    $(".select-city-bar").css("display", "none")
                    $(".selected-city").text($("#weather-prov").val())
                } else if (select_city != "市辖区") {
                    $(".city-bar").css("display", "block")
                    $(".select-city-bar").css("display", "none")
                    $(".selected-city").text(select_city)
                }
            })
            /**
             * 左侧固定栏
             * 主列表
             */
            $(".list-show .list-item").each(function () {
                $(this).hover(function () {
                    $(".list-show .list-item").removeClass("fix-select");
                    // 隐藏二三级列表
                    hid_list();
                    $(this).toggleClass("fix-select");
                    var index_main = $(this).index() - 1;
                    if (index_main > -1) {
                        //展开对应的二级列表
                        show_detail(index_main);
                    }
                })
            })
            /**
             * 左侧固定栏
             * 二级列表
             */
            $(".list-detail .detail-item").each(function () {
                $(this).hover(function () {
                    $(".list-detail .detail-item").removeClass("xq-active");
                    $(this).addClass("xq-active");
                })
            })

            function hid_list() {
                $(".list-detail").css("display", "none")
                $(".list-main").css("display", "none")
            }

            function show_detail(index) {
                var ele = $(".list_xinfan").eq(index)
                var number = $(".list-show .xinfan_item").length
                topDis = ((index - number - 1) * 40) + "px"
                ele.css("margin-top", topDis)
                $(".main-list-panel").eq(index).find(".xinfan_show").css("margin-top", topDis)
                ele.css("display", "block")
                ele.find(".detail-item").hover(function () {
                    $(".main-list-panel").eq(index).find(".xinfan_show").css("display", "none")
                    var curIndex = $(this).index()
                    // console.log(curIndex)
                    var curEle = $(".main-list-panel").eq(index).find(".xinfan_show").eq(curIndex)

                    curEle.css("display", "block")
                })
            }
            /**
             * 左侧固定栏
             * hover 出区域
             * 关闭所有弹窗
             */
            $(".left-list-box").hover(function () {}, function () {
                $(".list-main").css("display", "none")
                $(".list-detail").css("display", "none")
            });
        })();


        /**
         * 收藏页面
         * 设为主页
         */
        (function () {
            $("#favorites").on("click", function () {
                var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL';
                if (document.all) {
                    window.external.addFavorite('http://www.test.com', '网站名称');
                } else if (window.sidebar) {
                    window.sidebar.addPanel('网站名称', 'http://www.test.com', "");
                } else {
                    alert('您可以通过快捷键' + ctrl + ' + D 加入到收藏夹');
                }
            })
            $("#setHome").on("click", function () {
                if (document.all) { //设置IE 
                    document.body.style.behavior = 'url(#default#homepage)';
                    document.body.setHomePage(document.URL);
                } else { //网上可以找到设置火狐主页的代码，但是点击取消的话会有Bug，因此建议手动设置 
                    // alert("设置首页失败，请手动设置！");
                }
            })
        })();

        /**
         * 开启天气
         */
        // $("#night_show").on("click", function () {
        //     $(this).css("display", "none")
        //     $(".iframe_2").css("display", "inline-block")
        // })
        // $("#day_show").on("click", function () {
        //     $(this).css("display", "none")
        //     $(".iframe_1").css("display", "inline-block")
        // })
        // 白
        function weatherBack1() {
            $(".weather-back").on("click", function () {
                $(".iframe_2").css("display", "none")
                $(".iframe_1").css("display", "none")
                $("#night_show").css("display", "inline-block")
                $(".check-weather").css("display", "block")
                $(".weather-back").css("display", "none")
            })
        }
        // 黑
        function weatherBack2() {
            $(".weather-back").on("click", function () {
                $(".iframe_2").css("display", "none")
                $(".iframe_1").css("display", "none")
                $("#day_show").css("display", "inline-block")
                $(".check-weather").css("display", "block")
                $(".weather-back").css("display", "none")
            })
        }
        // /**
        //  * 设为主页
        //  */ 

        function SetHome(url) {
            if (document.all) {
                document.body.style.behavior = 'url(#default#homepage)';
                document.body.setHomePage(url);
            } else {
                alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
            }
        }
        $("#setHome").on("click", function () {
            SetHome("http://daohang.zanhf.com")
        })
        $(".h-info-btn a").on("click", function () {
            $.ajax({
                url: 'http://daohang.zanhf.com/portal/index/getCartoon',
                datatype: 'json',
                type: "POST",
                success: sortRender
            });
        });

        function sortRender(data) {
            var data = data["data"];
            // console.log(data)
            // 当前模块
            var index;
            $(".mh-tag-item").each(function () {
                if ($(this).hasClass("mh-cur")) {
                    index = $(this).index();
                }
            });
            // 清空当前模块
            $(".mh-screen-list").eq(index).empty();
            // 当前排序
            var sort = $(".h-info-link").attr("sort");
            if (sort == "desc") {
                var arr = data[index];
                reMhItem(arr, index);
                $(".h-info-link").text("倒序");
                $(".h-info-link").attr("sort", "asc");
            } else {
                data[index].reverse();
                reMhItem(data[index], index);
                $(".h-info-link").text("正序");
                $(".h-info-link").attr("sort", "desc");
            }

            function reMhItem(arr, index) {
                arr.forEach(function (item) {
                    html = "\n\t\t\t\t\t\t\t\t\t\t\t<li class=\"mh-screen-item\">\n\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"/portal/manhua_detail.html?id=" + item["id"] + "\" target=\"\" class=\"mh-item-link\"><div class=\"mh-item-img\"><div class=\"item-img-show\" style=\"background-image: url(/upload/" + item["image"] + ");\"></div></div><div class=\"mh-item-right\"><dt class=\"mh-item-title\">" + item["name"] + "</dt><dd class=\"mh-item-des line-ellipsis\">" + item["intro"] + "</dd></div></a></li>\n\t\t\t\t\t\t\t\t\t\t\t";
                    $(".mh-screen-list").eq(index).append(html);
                });
            }
        }

    });
}
/**** 常用网站 ****************************************************************** */
if (document.getElementsByClassName('index_wrap').length) {
    (function () {
        /**
         * 常用网站
         * 排序，渲染
         */
        var LBC_webNum = function LBC_webNum() {
            return {
                add: function add(value) {
                    localStorage.setItem("webNum", JSON.stringify(value));
                },
                get: function get() {
                    return JSON.parse(localStorage.getItem("webNum"));
                },
                remove: function remove() {
                    localStorage.removeItem("webNum");
                }
            };
        };
        if (LBC_webNum().get()) {
            renderItem()
        }

        function commonWeb() {
            // 定义统计
            var itemArr = []
            var webItem = {}
            // 点击 增加统计数组 存入缓存
            $(".hid-list .hid-item").each(function () {
                $(this).on("click", function () {
                    var itemIndex = $(this).attr("data-id")
                    var flag = false
                    var name = $(this).find(".hid-web-link").text()
                    var link = $(this).find(".hid-web-link").attr("href")
                    var des = $(this).find(".des-text").text()

                    // console.log(dom)
                    if (LBC_webNum().get()) {
                        // 缓存非空
                        itemArr = LBC_webNum().get()
                        $.each(itemArr, function (index, item) {
                            if (itemIndex == item["dataId"]) {
                                item["num"] = item["num"] + 1
                                flag = true
                            }
                        })
                        if (!flag) {
                            webItem = {
                                dataId: itemIndex,
                                num: 1,
                                name: name,
                                link: link,
                                des: des
                            }
                            itemArr.push(webItem)
                        }
                        LBC_webNum().add(itemArr)
                        // 排序渲染
                        sortItem(itemArr)
                    } else {
                        // 缓存为空
                        webItem = {
                            dataId: itemIndex,
                            num: 1,
                            name: name,
                            link: link,
                            des: des
                        }
                        itemArr.push(webItem)
                        LBC_webNum().add(itemArr)
                        // 渲染
                        renderItem()
                    }
                })
            })
        }

        function sortItem(itemArr) {
            var temp = {}
            var len = itemArr.length
            for (var i = 0; i < len - 1; i++) {
                for (var j = 0; j < len - i - 1; j++) {
                    if (itemArr[j]["num"] < itemArr[j + 1]["num"]) {
                        temp = itemArr[j];
                        itemArr[j] = itemArr[j + 1];
                        itemArr[j + 1] = temp;
                    }
                }
            }
            LBC_webNum().add(itemArr)
            renderItem()
        }

        function renderItem() {
            $(".hid-list").eq(0).empty()
            // console.log(item)
            itemArr = LBC_webNum().get()
            itemArr.reverse()
            // console.log(itemArr)
            itemArr.forEach(function (item) {
                var dataId = item["dataId"]
                var name = item["name"]
                var link = item["link"]
                var des = item["des"]
                var html = "\n <li class=\"hid-item col-lg-3 col-md-4 col-sm-6 col-xs-6\" data-id=\"" + dataId + "\">\n <a href=" + link + " target=\"_blank\" class=\"hid-web-link\">" + name + "</a>\n   <span class=\"m-web-des\"></span>\n  <span class=\"web-link-des\"  style=\"display:none;\">\n  <span class=\"des-text\">\n " + des + "\n    </span>\n  </span>\n  </li>  \n  ";
                $(".hid-list").eq(0).append(html)
            })

        }
        // 调用函数
        commonWeb()
    }());
}
/**** pub.js ****************************************************************** */
if (document.getElementsByClassName('index_wrap').length) {
    console.log(document.getElementsByClassName('index_wrap'))
    /**
     * 导航
     * 主页
     */
    /**
     * 初始属性
     */
    // 左侧菜单延迟显示
    setTimeout(() => {
        $('.left-fix-bar').css('display', 'block')
        console.log('xianshi11111')
    }, 300);

    function init() {
        this.pageW = $(window).width()
    }
    $(document).ready(function () {
        /**
         * 搜索功能
         * 单一职责原则
         */
        (function () {
            /**
             * 头部搜索功能
             * 展示、隐藏
             */
            // init();
            // document.getElementsByClassName("webs-item-hid")[0].style.display = "none"
            $(window).on("scroll", function () {
                var windowH = $(window).scrollTop()
                if (windowH >= 200) {
                    $(".search-header").css("display", "block")
                    $(".main_search").css("display", "none")
                } else {
                    $(".search-header").css("display", "none")
                    $(".main_search").css("display", "block")
                }
            })
            // 获取数据
            function GetData(callBackArr) {
                this.getData = function (url, param) {
                    $.ajax({
                        url: url,
                        data: param,
                        type: "GET",
                        dataType: "json",
                        beforeSend: this.LoadFn, //加载执行方法  
                        erro: this.erroFn, //错误执行方法  
                        success: this.succFn //成功执行方法  
                    })
                }
                // 进行
                this.LoadFn = function () {}
                // 成功
                this.succFn = function (data) {
                    $(data).each(function (index, item) {
                        // 初始化搜索栏
                        iR.initRender(item)
                        // 数据加入缓存
                        iC.catchData(item)
                        // 用户选择搜索模块和搜索网站
                        tR.selcet()
                        // 移动端模块和搜索切换
                        mS.mobSearch()
                    })
                }
                // 失败
                this.erroFn = function () {
                    alert(erro)
                }
            }
            var oG = new GetData([iR, tR, iC])
            var url = "http://daohang.zanhf.com/portal/index/getNavicon"
            oG.getData(url)
            // 初始化渲染
            function InitRender() {
                this.initRender = function (data) {
                    var data = data.data
                    for (var i = 0; i < 9; i++) {
                        var dataArr = data[i + 1]
                        // 当用户设置了这个搜索模块
                        if (dataArr != undefined) {
                            // 加载首个搜索
                            var html_search = "\n                                <li class=\"form_box\" category=\"" + (i + 1) + "\">\n                                    <form action=\"" + dataArr[0]["action"] + "\" method=\"GET\" target=\"_blank\" class=\"s-form\">\n                                        <div class=\"params\">\n                                            \n                                            <input class=\"params-item\" type=\"hidden\" name=\"" + dataArr[0]["params"] + "\" value=\"" + dataArr[0]["value"] + "\">\n                                            <input type=\"hidden\" name=\"ie\" value=\"utf-8\" style=\"\">\n                                        </div>\n                                        <div class=\"opt-wr\">\n                                            <div class=\"s-opt-container\" category=\"" + (i + 1) + "\">\n                                            </div>\n                                            <span class=\"s-opt-logo\">\n                                                <a href=\"" + dataArr[0]["home"] + "\" target=\"_blank\" class=\"baidu logo-show\" style=\"background-image: url(/upload/" + dataArr[0]["img"] + ");\">baidu</a>\n                                            </span>\n                                            <div class=\"toggle\"></div>\n                                        </div>\n                                        <span class=\"ipt-wr\">\n                                            <input type=\"text\" class=\"keyword\" name=\"" + dataArr[0]["ipt"] + "\" placeholder=\"" + dataArr[0]["placeholder"] + "\" autocomplete=\"off\" maxlength=\"100\">\n                                        </span>\n                                        <span class=\"btn-wr\">\n                                            <input type=\"submit\" class=\"search\" value=\"" + dataArr[0]["btn"] + "\">\n                                        </span>\n                                    </form>\n                                </li>\n                        ";
                            $(" .s-panel").append(html_search)
                            // 插入模块搜索选项
                            // 取出每一组所有id，图标，web
                            var len = dataArr.length
                            for (var j = 0; j < len; j++) {
                                var dataOpt = dataArr[j]
                                var opt_html = "\n   <a class=\"opt-img baidu\" category=\"" + j + "\" style=\"background-image: url(/upload/" + dataOpt["backgroundImage"] + ");\">" + dataOpt["web"] + "</a>\n                            ";
                                $(".s-opt-container").each(function () {
                                    if ($(this).attr("category") == i + 1) {
                                        // console.log(i)
                                        $(this).append(opt_html)
                                    }
                                })
                            }
                            if (i == 0) {
                                $(".s-panel .form_box").addClass("active")
                            }
                        }
                    }
                }
            }
            var iR = new InitRender()
            // 搜索信息加入缓存
            function InitCatch() {
                this.catchData = function (data) {
                    this.LBC_data().add(data)
                }
                this.LBC_data = function () {
                    return {
                        add: function add(value) {
                            localStorage.setItem("searchArr", JSON.stringify(value));
                        },
                        get: function get() {
                            return JSON.parse(localStorage.getItem("searchArr"));
                        },
                        remove: function remove() {
                            localStorage.removeItem("searchArr");
                        }
                    };
                };
            }
            var iC = new InitCatch()
            // 选择搜索模块渲染
            function TagRender() {
                // 选择模块
                this.selcet = function () {
                    $(".s-tab li").each(function () {
                        $(this).on("click", function () {
                            var id = $(this).attr("category")
                            $(".s-tab li").removeClass("active")
                            $(".s-tab li[category=" + id + "]").each(function () {
                                $(this).addClass("active")
                            })
                            $(".s-panel li").removeClass("active")
                            $(".s-panel li[category=" + id + "]").each(function () {
                                $(this).addClass("active")
                            })
                            // 切换到快递
                            // if ($(this).text() == "快递") {
                            //     specialSear("顺丰快递")
                            // }
                        })
                    })
                    sR.showSelect()
                }
            }
            var tR = new TagRender();
            // 选择搜索项渲染
            function SelRender() {
                this.showSelect = function () {
                    // 展开选项
                    $(".toggle").on("click", function () {
                        if ($(this).hasClass("open")) {
                            $(this).removeClass("open")
                            $(this).siblings(".s-opt-container").css("display", "none")
                        } else {
                            $(this).addClass("open")
                            $(this).siblings(".s-opt-container").css("display", "block")
                            //打开网址列表
                            //关闭标签列表
                            $(".m-select-category").prev(".s-tab").css("display", "none")
                            $(".m-select-category").attr("data-status", "off")
                            $(".m-select-category").find(".toggle").removeClass("open")
                        }
                    })
                    this.selSearch()
                }
                this.selSearch = function () {
                    // 获取被选择搜索项mid,页面id
                    var mid
                    var id
                    $(".opt-img").each(function () {
                        $(this).on("click", function () {
                            // 模块id
                            mid = $(this).parents(".form_box").attr("category")
                            // 搜索项id
                            id = $(this).attr("category")
                            sR.selRender(mid, id)
                            $(".toggle").removeClass("open")
                            $(".toggle").siblings(".s-opt-container").css("display", "none")
                            // 调用 特殊拼接地址搜索
                            var text = $(this).text()
                            specialSear(text)
                        })
                    })
                }
                this.selRender = function (catagoryId, id) {
                    // 获取缓存
                    var selected
                    var searchArr = iC.LBC_data().get()
                    // 根据id渲染搜索
                    var mid = catagoryId
                    var id = id
                    $(searchArr.data).each(function (index, item) {
                        selected = item[mid][id]
                        // 渲染到当天显示页面
                        $(".form_box").each(function () {
                            if ($(this).hasClass("active")) {
                                $(this).find(".s-form").attr("action", selected["action"])
                                $(this).find(".params .params-item").attr("name", selected["params"]).attr("value", selected["value"])
                                $(this).find(".keyword").attr("name", selected["ipt"]).attr("placeholder", selected["placeholder"])
                                $(this).find(".logo-show").attr("href", selected["action"])
                                $(this).find(".logo-show").css("backgroundImage", "url(" + "/upload/" + selected["img"] + ")")
                                $(this).find(".search").attr("value", selected["btn"])
                            }
                        })
                    })
                }

            }
            // 搜索特殊处理
            function specialSear(ele) {
                var eleForm
                var web = ele
                switch (web) {
                    case "NicoNico 搜索":
                        eleForm = $(".form_box").eq(1)
                        break
                    case "网易云音乐":
                        eleForm = $(".form_box").eq(5)
                        break
                    case "爱奇艺":
                        eleForm = $(".form_box").eq(1)
                        break
                    case "百度翻译":
                        eleForm = $(".form_box").eq(7)
                        break
                    case "日本亚马逊":
                        eleForm = $(".form_box").eq(2)
                        break
                    case "顺丰快递":
                        eleForm = $(".form_box").eq(8)
                        break
                    case "QQ音乐":
                        eleForm = $(".form_box").eq(5)
                        break
                    case "PIXIV":
                        // eleForm = $(".form_box").eq(4)
                        // Web PIVIX搜索
                        $(".s-inner").each(function () {
                            var that = $(this)
                            PivixParma(that)
                        })
                        // 移动端PIVIX搜索
                        $(".m-search").each(function () {
                            var that = $(this)
                            PivixParma(that)
                        })
                        // p榜三种参数判断函数
                        function PivixParma(that) {
                            var eleForm = that.find(".form_box").eq(4)
                            eleForm.find(".s-form").on("submit", function () {
                                if ($(this).find(".ipt-wr input").val()) {
                                    var keyword = $(this).find(".ipt-wr input").val()
                                    var flag = keyword.indexOf("illust_id")
                                    var flagId = keyword.indexOf("id")
                                    // var flagId = 0
                                    var newKSeyword = keyword.split("=")[1]
                                    if (flag == 0) {
                                        $(undefined).attr('action', 'https://www.pixiv.net/member_illust.php?');
                                        $(undefined).find('.params input').eq(1).attr('name', 'mode').attr('value', 'medium');
                                        $(undefined).find('.keyword').val(newKSeyword);
                                        $(undefined).find('.keyword').attr('name', 'illust_id');
                                        setTimeout(function () {
                                            $(undefined).find('.keyword').val('');
                                        }, 300);
                                    } else if (flagId == 0) {
                                        $(undefined).attr('action', 'https://www.pixiv.net/member.php?');
                                        $(undefined).find('.params input').eq(0).attr('name', '').attr('value', '');
                                        $(undefined).find('.params input').eq(1).attr('name', '').attr('value', '');
                                        $(undefined).find('.keyword').val(newKSeyword);
                                        setTimeout(function () {
                                            $(undefined).find('.keyword').val('');
                                        }, 100);
                                        $(undefined).find('.keyword').attr('name', 'id');
                                    } else {
                                        $(undefined).attr('action', 'https://www.pixiv.net/search.php?');
                                        $(undefined).find('.params input').eq(0).attr('name', 's_mode').attr('value', 's_tag');
                                        setTimeout(function () {
                                            $(undefined).find('.keyword').val('');
                                        }, 100);
                                        $(undefined).find('.keyword').attr('name', 'word');
                                    }
                                }
                            })
                        }
                        break
                }
                if (eleForm != undefined) {
                    var submitText = eleForm.find(".search").val()
                    // 非特殊网站
                    // 按钮类型改为submit
                    $(".btn-wr .search").each(function () {
                        $(this).attr("type", "submit")
                        $(this).unbind()
                    })
                } else {
                    // 非特殊网站
                    // 按钮类型改为submit
                    $(".btn-wr .search").each(function () {
                        $(this).attr("type", "submit")
                        $(this).unbind()
                    })
                }
                // 如果按钮切换到特殊网站
                // 按钮类型改为button
                if (submitText == web) {
                    $(".btn-wr .search").each(function () {
                        if ($(this).val() == web) {
                            $(this).attr("type", "button")
                            $(this).on("click", function () {
                                switch (web) {
                                    case "NicoNico 搜索":
                                        var keyword = $(this).parent(".btn-wr").prev(".ipt-wr").find("input").val()
                                        window.open("http://www.nicovideo.jp/search/" + keyword + "?ref=nicotop_search")
                                        break
                                    case "网易云音乐":
                                        var keyword = $(this).parent(".btn-wr").prev(".ipt-wr").find("input").val()
                                        window.open("https://music.163.com/#/search/m/?s=" + keyword + "&type=1")
                                        break
                                    case "爱奇艺":
                                        var keyword = $(this).parent(".btn-wr").prev(".ipt-wr").find("input").val()
                                        window.open("http://so.iqiyi.com/so/q_" + keyword + "?source=input&sr=953714572152")
                                        break
                                    case "百度翻译":
                                        var keyword = $(this).parent(".btn-wr").prev(".ipt-wr").find("input").val()
                                        window.open("https://fanyi.baidu.com/#zh/en/" + keyword)
                                        break
                                    case "日本亚马逊":
                                        var keyword = $(this).parent(".btn-wr").prev(".ipt-wr").find("input").val()
                                        window.open("https://www.amazon.co.jp/s/ref=nb_sb_noss?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=" + keyword)
                                        break
                                    case "顺丰快递":
                                        var keyword = $(this).parent(".btn-wr").prev(".ipt-wr").find("input").val()
                                        window.open("http://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/" + keyword)
                                        break
                                    case "QQ音乐":
                                        var keyword = $(this).parent(".btn-wr").prev(".ipt-wr").find("input").val()
                                        window.open("https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=" + keyword)
                                        break
                                }
                            })
                        }
                    })
                }
            }
            var sR = new SelRender()
            /**
             * 移动端
             * 搜索切换
             */
            function MobSearch() {
                this.mobSearch = function () {
                    /**
                     * 移动端 
                     * 动态赋值搜索标签宽度
                     */
                    var holyW = $(".m-search-container").find(".m-select-category").width() + $(".m-search-container").find(".opt-wr").width() + $(".m-search-container").find(".ipt-wr").width() + $(".m-search-container").find(".btn-wr").width() + 5
                    // console.log($(".m-search-container").find(".opt-wr").width())
                    // 赋值
                    $(".m-search-container .s-tab").css("width", holyW)
                    /**
                     * 移动端
                     * 展开网站标签列表
                     */
                    $(".m-select-category").on("click", function () {
                        var status = $(this).attr("data-status")
                        if (status == "off") {
                            $(this).prev(".s-tab").css("display", "block")
                            $(this).attr("data-status", "on")
                            $(this).find(".toggle").addClass("open")
                            //打开标签列表
                            //关闭标签列表
                            $(".opt-wr").find(".toggle").removeClass("open")
                            $(".opt-wr").find(".toggle").siblings(".s-opt-container").css("display", "none")
                            /**
                             * 移动端
                             * 选择标签
                             * 赋值给按钮
                             */
                            $(".m-search-container .s-tab").find("li").each(function () {
                                $(this).on("click", function () {
                                    var tag_val = $(this).attr("category")
                                    var tag_text = $(this).text()
                                    // console.log(tag_val)
                                    var cur_text = $(".m-select-category .m-c-tag").text()
                                    /**
                                     * 移动端
                                     * 商品和网页切换
                                     */
                                    $(".m-select-category .m-c-tag").text(tag_text)
                                    ele = $(this)
                                    switch (tag_val) {
                                        case "1":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='1']").addClass("active")
                                            break
                                        case "2":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='2']").addClass("active")
                                            break
                                        case "3":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='3']").addClass("active")
                                            break
                                        case "4":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='4']").addClass("active")
                                            break
                                        case "5":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='5']").addClass("active")
                                            break
                                        case "6":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='6']").addClass("active")
                                            break
                                        case "7":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='7']").addClass("active")
                                            break
                                        case "8":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='8']").addClass("active")
                                            break
                                        case "9":
                                            $(".form_box").removeClass("active")
                                            $(".form_box[category='9']").addClass("active")
                                            break
                                    }

                                    $(this).text(cur_text)
                                    changeTag(cur_text, ele)

                                    function changeTag(text, ele) {
                                        switch (text) {
                                            case "网页":
                                                ele.attr("category", "1")
                                                break
                                            case "视频":
                                                ele.attr("category", "2")
                                                break
                                            case "商品":
                                                ele.attr("category", "3")
                                                break
                                            case "贴吧":
                                                ele.attr("category", "4")
                                                break
                                            case "音乐":
                                                ele.attr("category", "6")
                                                break
                                            case "图片":
                                                ele.attr("category", "5")
                                                break
                                            case "百科":
                                                ele.attr("category", "7")
                                                break
                                            case "翻译":
                                                ele.attr("category", "8")
                                                break
                                            case "快递":
                                                ele.attr("category", "9")
                                                break
                                        }
                                    }
                                    // if (tag_val == "2") {
                                    //     $(".s-tab li[category = 2]").css("display", "none")
                                    //     $(".s-tab li[category = 1]").css("display", "block")
                                    //     $(".m-c-tag").text(tag2_text)
                                    // } else if (tag_val == "1") {
                                    //     $(".s-tab li[category = 2]").css("display", "block")
                                    //     $(".s-tab li[category = 1]").css("display", "none")
                                    //     $(".m-c-tag").text(tag1_text)
                                    // } else {
                                    //     $(".m-c-tag").text(tag3_text)
                                    // }

                                    $(".m-search-container .s-tab").find("li").removeClass("active")
                                    $(this).addClass("active")
                                    //关闭网址列表
                                    $(".m-select-category").prev(".s-tab").css("display", "none")
                                    $(".m-select-category").attr("data-status", "off")
                                    $(".m-select-category").find(".toggle").removeClass("open")
                                    $(".m-search-container .s-tab").find("li").unbind()
                                    return false
                                })
                            })
                        } else {
                            $(this).prev(".s-tab").css("display", "none")
                            $(this).attr("data-status", "off")
                            $(this).find(".toggle").removeClass("open")
                        }
                    })
                }
            }
            var mS = new MobSearch()
        })();

        /**
         * 网页大全
         */
        (function () {
            /**
             * 网页大全
             * 属性设置
             */
            // 关闭菜单栏
            $(".webs-item").each(function () {
                $(this).on("click", function () {})
            })
            //获取屏幕宽度
            init();
            // 屏幕宽度大于1300 网页大全排版
            if (this.pageW >= 1300) {
                //上窜
                var marginH = $(".m-section-left").height() - $(".main-section").height() + 60
                // $(".web-all").css("marginTop", marginH)
                //隐藏菜单
                var webW = $(".webs-list").width()
                $(".webs-item-hid").css("width", webW)
                /**
                 * 网页大全
                 * 按钮切换
                 * 显示隐藏菜单
                 */
                var hids = document.getElementsByClassName("webs-item-hid")[0]
                var webEles = document.getElementsByClassName("webs-item")
                var showH = hids.offsetHeight
                $(".webs-item").each(function () {
                    $(this).on("click", function () {
                        if ($(this).find(".webs-item-btn").hasClass("click")) {
                            // 收起
                            $(".webs-item").css("marginTop", "5px")
                            $(".webs-item-btn").removeClass("click")
                            $(this).find(".webs-item-hid").css("display", "none")
                            $(".webs-list-wrp").css("marginBottom", '0px')
                        } else {
                            var index = $(this).index()
                            $(".webs-item-btn").removeClass("click")
                            $(this).children(".webs-item-btn").addClass("click")
                            hids = document.getElementsByClassName("webs-item-hid")
                            if (index < 4) {
                                var marginW = -($(".webs-item").width() + 5) * index
                            } else {
                                var marginW = -($(".webs-item").width() + 5) * (index % 4)
                            }
                            for (var i = 0; i < hids.length; i++) {
                                (function (j) {
                                    hids[j].style.display = 'none'
                                })(i);
                            };
                            hids[index].style.display = "block"
                            hids[index].style.left = marginW + 'px'
                            showH = hids[index].offsetHeight
                            var webEles = document.getElementsByClassName("webs-item")
                            var colNum = Math.floor(index / 4) + 1
                            $(".webs-item").each(function () {
                                $(this).css("marginTop", "5px")
                            })
                            //判断点开的是第几行 给出对应间距
                            switch (colNum) {
                                case 1:
                                    webEles[4].style.marginTop = showH + 30 + 'px'
                                    webEles[5].style.marginTop = showH + 30 + 'px'
                                    webEles[6].style.marginTop = showH + 30 + 'px'
                                    webEles[7].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 2:
                                    webEles[8].style.marginTop = showH + 30 + 'px'
                                    webEles[9].style.marginTop = showH + 30 + 'px'
                                    webEles[10].style.marginTop = showH + 30 + 'px'
                                    webEles[11].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 3:
                                    webEles[12].style.marginTop = showH + 30 + 'px'
                                    webEles[13].style.marginTop = showH + 30 + 'px'
                                    webEles[14].style.marginTop = showH + 30 + 'px'
                                    webEles[15].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 4:
                                    webEles[16].style.marginTop = showH + 30 + 'px'
                                    webEles[17].style.marginTop = showH + 30 + 'px'
                                    webEles[18].style.marginTop = showH + 30 + 'px'
                                    webEles[19].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 5:
                                    webEles[20].style.marginTop = showH + 30 + 'px'
                                    webEles[21].style.marginTop = showH + 30 + 'px'
                                    webEles[22].style.marginTop = showH + 30 + 'px'
                                    webEles[23].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 6:
                                    webEles[24].style.marginTop = showH + 30 + 'px'
                                    webEles[25].style.marginTop = showH + 30 + 'px'
                                    webEles[26].style.marginTop = showH + 30 + 'px'
                                    webEles[27].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 7:
                                    $(".webs-list-wrp").css("marginBottom", showH + 30 + 'px')
                                    break;
                            }
                        }
                    })
                })
            } else if (this.pageW >= 992 && this.pageW < 1300) {
                /**
                 * 移动端
                 * 开关 标签解释
                 */
                $(".m-web-des").each(function () {
                    $(this).on("click", function () {
                        var state = $(this).next(".web-link-des").css("display")
                        if (state == "none") {
                            $(".m-web-des").removeClass("show")
                            $(".web-link-des").css("display", "none")
                            $(this).next(".web-link-des").css("display", "inline-block")
                            $(this).addClass("show")
                        } else {
                            $(".web-link-des").css("display", "none")
                            $(this).removeClass("show")
                        }
                        return false;
                    })
                })
                $(".webs-item-hid").css("width", pageW)
                //获取第一个 webs-item-hid 高度
                // 展开第一项
                var hid_one_h = document.getElementsByClassName("webs-item-hid")[0].offsetHeight
                // document.getElementsByClassName("webs-item")[3].style.marginTop = hid_one_h + 30 + 'px'
                // document.getElementsByClassName("webs-item")[4].style.marginTop = hid_one_h + 30 + 'px'
                // document.getElementsByClassName("webs-item")[5].style.marginTop = hid_one_h + 30 + 'px'
                /**
                 * 网页大全
                 * 按钮切换
                 * 显示隐藏菜单
                 */
                $(".webs-item").each(function () {
                    $(this).on("click", function () {
                        if ($(this).find(".webs-item-btn").hasClass("click")) {
                            // 收起
                            $(".webs-item").css("marginTop", "5px")
                            $(".webs-item-btn").removeClass("click")
                            $(this).find(".webs-item-hid").css("display", "none")
                            $(".webs-list-wrp").css("marginBottom", '0px')
                        } else {
                            var index = $(this).index()
                            $(".webs-item-btn").removeClass("click")
                            $(this).children(".webs-item-btn").addClass("click")
                            hids = document.getElementsByClassName("webs-item-hid")
                            if (index < 3) {
                                var marginW = -($(".webs-item").width() + 5) * index
                            } else {
                                var marginW = -($(".webs-item").width() + 5) * (index % 3)
                            }
                            for (var i = 0; i < hids.length; i++) {
                                (function (j) {
                                    hids[j].style.display = 'none'
                                })(i);
                            };
                            hids[index].style.display = "block"
                            hids[index].style.left = marginW + 'px'
                            showH = hids[index].offsetHeight
                            var webEles = document.getElementsByClassName("webs-item")
                            var colNum = Math.floor(index / 3) + 1
                            $(".webs-item").each(function () {
                                $(this).css("marginTop", "5px")
                            })
                            $(".webs-list-wrp").css("marginBottom", "0")
                            //判断点开的是第几行 给出对应间距
                            switch (colNum) {
                                case 1:
                                    webEles[3].style.marginTop = showH + 30 + 'px'
                                    webEles[4].style.marginTop = showH + 30 + 'px'
                                    webEles[5].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 2:
                                    webEles[6].style.marginTop = showH + 30 + 'px'
                                    webEles[7].style.marginTop = showH + 30 + 'px'
                                    webEles[8].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 3:
                                    webEles[9].style.marginTop = showH + 30 + 'px'
                                    webEles[10].style.marginTop = showH + 30 + 'px'
                                    webEles[11].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 4:
                                    webEles[12].style.marginTop = showH + 30 + 'px'
                                    webEles[13].style.marginTop = showH + 30 + 'px'
                                    webEles[14].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 5:
                                    webEles[15].style.marginTop = showH + 30 + 'px'
                                    webEles[16].style.marginTop = showH + 30 + 'px'
                                    webEles[17].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 6:
                                    webEles[18].style.marginTop = showH + 30 + 'px'
                                    webEles[19].style.marginTop = showH + 30 + 'px'
                                    webEles[20].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 7:
                                    webEles[21].style.marginTop = showH + 30 + 'px'
                                    webEles[22].style.marginTop = showH + 30 + 'px'
                                    webEles[23].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 8:
                                    webEles[24].style.marginTop = showH + 30 + 'px'
                                    webEles[25].style.marginTop = showH + 30 + 'px'
                                    webEles[26].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 9:
                                    webEles[27].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 10:
                                    $(".webs-list-wrp").css("marginBottom", showH + 30 + 'px')
                                    break;
                            }
                        }
                    })
                })
            } else if (this.pageW <= 992 && this.pageW > 768) {
                /**
                 * 移动端
                 * 开关 标签解释
                 */
                $(".m-web-des").each(function () {
                    $(this).on("click", function () {
                        var state = $(this).next(".web-link-des").css("display")
                        if (state == "none") {
                            $(".m-web-des").removeClass("show")
                            $(".web-link-des").css("display", "none")
                            $(this).next(".web-link-des").css("display", "inline-block")
                            $(this).addClass("show")
                        } else {
                            $(".web-link-des").css("display", "none")
                            $(this).removeClass("show")
                        }
                        return false;
                    })
                })
                $(".webs-item-hid").css("width", pageW)
                //获取第一个 webs-item-hid 高度
                // 展开第一项
                var hid_one_h = document.getElementsByClassName("webs-item-hid")[0].offsetHeight
                /**
                 * 网页大全
                 * 按钮切换
                 * 显示隐藏菜单
                 */
                $(".webs-item").each(function () {
                    $(this).on("click", function () {
                        if ($(this).find(".webs-item-btn").hasClass("click")) {
                            // 收起
                            $(".webs-item").css("marginTop", "5px")
                            $(".webs-item-btn").removeClass("click")
                            $(this).find(".webs-item-hid").css("display", "none")
                            $(".webs-list-wrp").css("marginBottom", '0px')
                        } else {
                            var index = $(this).index()
                            $(".webs-item-btn").removeClass("click")
                            $(this).children(".webs-item-btn").addClass("click")
                            hids = document.getElementsByClassName("webs-item-hid")
                            if (index < 2) {
                                var marginW = -($(".webs-item").width() + 5) * index
                            } else {
                                var marginW = -($(".webs-item").width() + 5) * (index % 2)
                            }
                            for (var i = 0; i < hids.length; i++) {
                                (function (j) {
                                    hids[j].style.display = 'none'
                                })(i);
                            };
                            hids[index].style.display = "block"
                            hids[index].style.left = marginW + 'px'
                            showH = hids[index].offsetHeight
                            var webEles = document.getElementsByClassName("webs-item")
                            var colNum = Math.floor(index / 2) + 1
                            $(".webs-item").each(function () {
                                $(this).css("marginTop", "5px")
                            })
                            $(".webs-list-wrp").css("marginBottom", "0")
                            //判断点开的是第几行 给出对应间距
                            switch (colNum) {
                                case 1:
                                    webEles[2].style.marginTop = showH + 30 + 'px'
                                    webEles[3].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 2:
                                    webEles[4].style.marginTop = showH + 30 + 'px'
                                    webEles[5].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 3:
                                    webEles[6].style.marginTop = showH + 30 + 'px'
                                    webEles[7].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 4:
                                    webEles[8].style.marginTop = showH + 30 + 'px'
                                    webEles[9].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 5:
                                    webEles[10].style.marginTop = showH + 30 + 'px'
                                    webEles[11].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 6:
                                    webEles[12].style.marginTop = showH + 30 + 'px'
                                    webEles[13].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 7:
                                    webEles[14].style.marginTop = showH + 30 + 'px'
                                    webEles[15].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 8:
                                    webEles[16].style.marginTop = showH + 30 + 'px'
                                    webEles[17].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 9:
                                    webEles[18].style.marginTop = showH + 30 + 'px'
                                    webEles[19].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 10:
                                    webEles[20].style.marginTop = showH + 30 + 'px'
                                    webEles[21].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 11:
                                    webEles[22].style.marginTop = showH + 30 + 'px'
                                    webEles[23].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 12:
                                    webEles[24].style.marginTop = showH + 30 + 'px'
                                    webEles[25].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 13:
                                    webEles[26].style.marginTop = showH + 30 + 'px'
                                    webEles[27].style.marginTop = showH + 30 + 'px'
                                    break;
                                case 14:
                                    $(".webs-list-wrp").css("marginBottom", showH + 30 + 'px')
                                    break;
                            }
                        }
                    })
                })
            } else if (this.pageW <= 768) {
                /**
                 * 移动端
                 * 开关 标签解释
                 */
                $(".m-web-des").each(function () {
                    $(this).on("click", function () {
                        var state = $(this).next(".web-link-des").css("display")
                        if (state == "none") {
                            $(".m-web-des").removeClass("show")
                            $(".web-link-des").css("display", "none")
                            $(this).next(".web-link-des").css("display", "inline-block")
                            $(this).addClass("show")
                        } else {
                            $(".web-link-des").css("display", "none")
                            $(this).removeClass("show")
                        }
                        return false;
                    })
                })
                $(".webs-item-hid").css("width", pageW)
                //获取第一个 webs-item-hid 高度
                // 展开第一项
                var hid_one_h = document.getElementsByClassName("webs-item-hid")[0].offsetHeight
                /**
                 * 网页大全
                 * 按钮切换
                 * 显示隐藏菜单
                 */
                $(".webs-item").each(function () {
                    var thisEle = $(this)
                    thisEle.find(".item-text").on("click", function () {
                        $(".webs-item-hid").css("display", "none!important")
                        $(".webs-item").css("marginTop", "2px")
                        if (thisEle.find(".webs-item-btn").hasClass("click")) {
                            // 收起
                            $(".webs-item").css("marginTop", "2px")
                            $(".webs-item-btn").removeClass("click")
                            thisEle.find(".webs-item-hid").css("display", "none")
                            $(".web-link-des").css("display", "none")
                            $(".webs-list-wrp").css("marginBottom", '0px')
                        } else {
                            // 展开
                            var index = thisEle.index()
                            $(".webs-item-btn").removeClass("click")
                            thisEle.children(".webs-item-btn").addClass("click")
                            hids = document.getElementsByClassName("webs-item-hid")
                            if (index < 2) {
                                var marginW = -($(".webs-item").width()) * index
                            } else {
                                var marginW = -($(".webs-item").width()) * (index % 2)
                            }
                            for (var i = 0; i < hids.length; i++) {
                                (function (j) {
                                    hids[j].style.display = 'none'
                                })(i);
                            };
                            hids[index].style.display = "block"
                            hids[index].style.left = marginW - 10 + 'px'
                            showH = hids[index].offsetHeight + 20
                            var webEles = document.getElementsByClassName("webs-item")
                            var colNum = Math.floor(index / 2) + 1
                            $(".webs-item").each(function () {
                                thisEle.css("marginTop", "2px")
                            })
                            $(".webs-list-wrp").css("marginBottom", "0")
                            //判断点开的是第几行 给出对应间距
                            switch (colNum) {
                                case 1:
                                    webEles[2].style.marginTop = showH + 'px'
                                    webEles[3].style.marginTop = showH + 'px'
                                    break;
                                case 2:
                                    webEles[4].style.marginTop = showH + 'px'
                                    webEles[5].style.marginTop = showH + 'px'
                                    break;
                                case 3:
                                    webEles[6].style.marginTop = showH + 'px'
                                    webEles[7].style.marginTop = showH + 'px'
                                    break;
                                case 4:
                                    webEles[8].style.marginTop = showH + 'px'
                                    webEles[9].style.marginTop = showH + 'px'
                                    break;
                                case 5:
                                    webEles[10].style.marginTop = showH + 'px'
                                    webEles[11].style.marginTop = showH + 'px'
                                    break;
                                case 6:
                                    webEles[12].style.marginTop = showH + 'px'
                                    webEles[13].style.marginTop = showH + 'px'
                                    break;
                                case 7:
                                    webEles[14].style.marginTop = showH + 'px'
                                    webEles[15].style.marginTop = showH + 'px'
                                    break;
                                case 8:
                                    webEles[16].style.marginTop = showH + 'px'
                                    webEles[17].style.marginTop = showH + 'px'
                                    break;
                                case 9:
                                    webEles[18].style.marginTop = showH + 'px'
                                    webEles[19].style.marginTop = showH + 'px'
                                    break;
                                case 10:
                                    webEles[20].style.marginTop = showH + 'px'
                                    webEles[21].style.marginTop = showH + 'px'
                                    break;
                                case 11:
                                    webEles[22].style.marginTop = showH + 'px'
                                    webEles[23].style.marginTop = showH + 'px'
                                    break;
                                case 12:
                                    webEles[24].style.marginTop = showH + 'px'
                                    webEles[25].style.marginTop = showH + 'px'
                                    break;
                                case 13:
                                    webEles[26].style.marginTop = showH + 'px'
                                    webEles[27].style.marginTop = showH + 'px'
                                    break;
                                case 14:
                                    $(".webs-list-wrp").css("marginBottom", showH + 'px')
                                    break;
                            }
                        }
                    })
                })
            }
        })();
        /**
         * 右侧固定栏
         */
        (function () {
            /**
             * 右侧固定菜单栏
             * 微信二维码
             */
            $(".wexin_item").hover(
                function () {
                    $(".code-box").css("display", "block")
                },
                function () {
                    $(".code-box").css("display", "none")
                })
            $(".code-box").hover(
                function () {
                    $(this).css("display", "block")
                },
                function () {
                    $(this).css("display", "none")
                })
            /**
             * 右侧固定菜单栏
             * 回到顶部
             */
            $(".top_item").on("click", function () {
                scrollToTop(".top_item");
            })

            function scrollToTop(anchorId) {
                var dis = $(window).scrollTop();
                $('html,body').animate({
                    scrollTop: '0px'
                }, 240);
            }
        })();
        /**
         * 导航栏隐藏导航
         */
        (function () {
            var pageW = $(window).width()
            // pc端 先调用方法
            pc_nav();
            // 移动端 调用方法
            mob_nav();
            // 视窗变化时，收起导航
            $(window).resize(function () {
                //视窗变化时，回复导航栏状态
                init();
                if (this.pageW >= 748) {
                    $(".nav-icon-wrap").css("height", "164px")
                    $(".nav-icon-wrap  .icon-box").css("height", "164px")
                    $(".right-shouqi").removeClass("down").addClass("up")
                    $(".right-shouqi").children(".shouqi-text").text("展开")
                    $(".icon-list .icon-item").css("marginBottom", "45px")
                } else if (this.pageW < 748) {
                    $(".nav-icon-wrap").css("height", "126px")
                    $(".nav-icon-wrap .icon-box").css("height", "96px")
                    $(".nav-icon-wrap").css("paddingBottom", "0")
                    $(".m-btn-img").attr("src", "/themes/simpleboot3/public/assets/img/mob/jiantou2.png")
                    $(this).attr("data-status", "off")
                }
            });
            // pc展开方法
            function pc_nav() {
                $(".right-shouqi").on("click", function () {
                    // 取内容实际高度
                    var panelH = $(".icon-content").height()
                    // 取导航状态
                    var panelState = $(".right-shouqi").attr("data-status")
                    if (panelState == "off") {
                        $(".nav-icon-wrap").css("height", panelH)
                        $(".icon-box").css("height", panelH)
                        $(this).children(".shouqi-text").text("收起")
                        $(".icon-list .icon-item").css("marginBottom", "34px")
                        $(this).addClass("down").removeClass("up")
                        $(".right-shouqi").attr("data-status", "on")
                    } else {
                        $(".nav-icon-wrap").css("height", "164px")
                        $(".nav-icon-wrap  .icon-box").css("height", "164px")
                        $(".right-shouqi").removeClass("down").addClass("up")
                        $(".right-shouqi").children(".shouqi-text").text("展开")
                        $(".icon-list .icon-item").css("marginBottom", "45px")
                        $(".right-shouqi").attr("data-status", "off")
                    }
                })
            };
            // 移动端展开方法
            function mob_nav() {
                $(".m-icon-show").on("click", function () {
                    // 获取内容高度
                    var mPanelH = $(".icon-content").height()
                    // 获取窗口状态
                    var state = $(".m-icon-show").attr("data-status")
                    if (state == "off") {
                        $(".nav-icon-wrap").css("height", mPanelH)
                        $(".nav-icon-wrap .icon-box").css("height", mPanelH)
                        $(".m-btn-img").attr("src", "/themes/simpleboot3/public/assets/img/mob/jiantou1.png")
                        $(".nav-icon-wrap").css("paddingBottom", "30px")
                        $(".m-icon-show").attr("data-status", "on")
                    } else {
                        $(".nav-icon-wrap").css("height", "126px")
                        $(".nav-icon-wrap .icon-box").css("height", "96px")
                        $(".m-btn-img").attr("src", "/themes/simpleboot3/public/assets/img/mob/jiantou2.png")
                        $(".nav-icon-wrap").css("paddingBottom", "0")
                        $(".m-icon-show").attr("data-status", "off")
                    }
                })
            };
        })();

        /**
         * 左侧固定栏
         */
        (function () {
            /**
             * 左侧固定栏 
             * 展开收起，存入缓存
             */
            var LBC_leftFix = function () {
                return {
                    add: function add(value) {
                        localStorage.setItem("leftFix", JSON.stringify(value));
                    },
                    get: function get() {
                        return JSON.parse(localStorage.getItem("leftFix"));
                    },
                    remove: function remove() {
                        localStorage.removeItem("leftFix");
                    }
                };
            }();

            function add_left() {
                var status = $(".fix-bar-btn").attr("data-status")
                if (status == "open") {
                    status == "off"
                } else {
                    status == "open"
                }
                var l_state = {
                    id: 0,
                    status: status,
                }
                LBC_leftFix.add(l_state)
                l_state = []
            }
            /**
             * 左侧固定栏
             * 屏幕小于1300 大于768
             * 收起
             */
            if (this.pageW > 768) {
                // $(".fix-bar-btn .bar-btn-img").attr("src", "./img/web/jiantou6.png")
                //  $(".fix-bar-btn .iconfont").text("&#xf0344;")
                // $("#fixOff").css("display", "inline-block")
                // $("#fixOpen").css("display", "none")
                // $("fix-bar-btn").attr("data-status", "off")
            }
            if (LBC_leftFix.get()) {
                if (LBC_leftFix.get().status == "open") {
                    var eleTog = $(".fix-bar-btn")
                    var ele = $(".fix-bar-btn").children(".bar-btn-img")
                    $(".left-fix-bar").css("width", "0")
                    $(".fix-bar-panel").css("display", "none")
                    $(".fix-bar-bottom").css("display", "none")
                    eleTog.css("left", "0")
                    $("#fixOff").css("display", "inline-block")
                    $("#fixOpen").css("display", "none")
                    $(".left-list-box").css("display", "none")
                    $(".fix-bar-btn").attr("data-status", "off").css("left", "0")
                }
            }
            /**
             * 左侧固定栏
             * 展开关闭
             */
            $(".fix-bar-btn").on("click", function () {
                // 获取缓存
                add_left()
                var eleTog = $(this)
                var ele = $(this).children(".bar-btn-img")
                if ($(".fix-bar-btn").attr("data-status") == "off") {
                    $(".left-fix-bar").css("width", "170px")
                    $(".fix-bar-panel").css("display", "block")
                    $(".fix-bar-bottom").css("display", "block")
                    $(".fix-bar-btn").attr("data-status", "open")
                    eleTog.css("left", "170px")
                    $("#fixOpen").css("display", "inline-block")
                    $("#fixOff").css("display", "none")
                    setTimeout(function () {
                        $(".left-list-box").css("display", "block")
                    }, 200)
                } else {
                    $(".left-fix-bar").css("width", "0")
                    $(".fix-bar-panel").css("display", "none")
                    $(".fix-bar-bottom").css("display", "none")
                    eleTog.css("left", "0")
                    $("#fixOff").css("display", "inline-block")
                    $("#fixOpen").css("display", "none")
                    $(".left-list-box").css("display", "none")
                    $(".fix-bar-btn").attr("data-status", "off")
                }
                return false;
            })
            /**
             * 左侧固定栏
             * 切换城市
             */
            // 展开
            $(".switch-city").on("click", function () {
                $(".city-bar").css("display", "none");
                $(".select-city-bar").css("display", "block");
                /**
                 * 左侧固定栏选择
                 * 省、市赋值
                 */
                //赋值省份
                var prov_val;
                var prov
                $.each(city_data, function (index_1, item_1) {
                    prov_val = index_1;
                    prov = item_1;
                    var html_prov =
                        "<option  value=" + prov.name + ">" + prov.name + "</option> ";
                    $("#weather-prov").append(html_prov);
                });
                // 选择省份
                $("#weather-prov").on("click", function () {
                    var city_name = $(this).val();
                    $("#weather-city").empty();
                    $.each(city_data, function (index_1, item_1) {
                        prov_val = index_1;
                        prov = item_1;
                        // 赋值市
                        if (prov.name == city_name) {
                            $.each(prov.child, function (index_2, item_2) {
                                var city = item_2.name
                                var html_city =
                                    '<option value="' + city + '">' + city + "</option> ";
                                $("#weather-city").append(html_city);
                            })
                        }
                    });
                });
            });
            // 关闭 放弃更改
            $(".weather-cancel").on("click", function () {
                $(".city-bar").css("display", "block")
                $(".select-city-bar").css("display", "none")
            })
            //关闭 确认更改
            $(".weather-done").on("click", function () {
                var select_city = $("#weather-city").val()
                if (select_city == null) {
                    $(".city-bar").css("display", "block")
                    $(".select-city-bar").css("display", "none")
                } else if (select_city == "市辖区") {
                    $(".city-bar").css("display", "block")
                    $(".select-city-bar").css("display", "none")
                    $(".selected-city").text($("#weather-prov").val())
                } else if (select_city != "市辖区") {
                    $(".city-bar").css("display", "block")
                    $(".select-city-bar").css("display", "none")
                    $(".selected-city").text(select_city)
                }
            })
            /**
             * 左侧固定栏
             * 主列表
             */
            $(".list-show .list-item").each(function () {
                $(this).hover(function () {
                    $(".list-show .list-item").removeClass("fix-select");
                    // 隐藏二三级列表
                    hid_list();
                    $(this).toggleClass("fix-select");
                    var index_main = $(this).index() - 1;
                    if (index_main > -1) {
                        //展开对应的二级列表
                        show_detail(index_main);
                    }
                })
            })
            /**
             * 左侧固定栏
             * 二级列表
             */
            $(".list-detail .detail-item").each(function () {
                $(this).hover(function () {
                    $(".list-detail .detail-item").removeClass("xq-active");
                    $(this).addClass("xq-active");
                })
            })

            function hid_list() {
                $(".list-detail").css("display", "none")
                $(".list-main").css("display", "none")
            }

            function show_detail(index) {
                var ele = $(".list_xinfan").eq(index)
                var number = $(".list-show .xinfan_item").length
                topDis = ((index - number - 1) * 40) + "px"
                ele.css("margin-top", topDis)
                $(".main-list-panel").eq(index).find(".xinfan_show").css("margin-top", topDis)
                ele.css("display", "block")
                ele.find(".detail-item").hover(function () {
                    $(".main-list-panel").eq(index).find(".xinfan_show").css("display", "none")
                    var curIndex = $(this).index()
                    // console.log(curIndex)
                    var curEle = $(".main-list-panel").eq(index).find(".xinfan_show").eq(curIndex)

                    curEle.css("display", "block")
                })
            }
            /**
             * 左侧固定栏
             * hover 出区域
             * 关闭所有弹窗
             */
            $(".left-list-box").hover(function () {}, function () {
                $(".list-main").css("display", "none")
                $(".list-detail").css("display", "none")
            });
        })();


        /**
         * 收藏页面
         * 设为主页
         */
        (function () {
            $("#favorites").on("click", function () {
                var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL';
                if (document.all) {
                    window.external.addFavorite('http://www.test.com', '网站名称');
                } else if (window.sidebar) {
                    window.sidebar.addPanel('网站名称', 'http://www.test.com', "");
                } else {
                    alert('您可以通过快捷键' + ctrl + ' + D 加入到收藏夹');
                }
            })
            $("#setHome").on("click", function () {
                if (document.all) { //设置IE 
                    document.body.style.behavior = 'url(#default#homepage)';
                    document.body.setHomePage(document.URL);
                } else { //网上可以找到设置火狐主页的代码，但是点击取消的话会有Bug，因此建议手动设置 
                    // alert("设置首页失败，请手动设置！");
                }
            })
        })();

        /**
         * 开启天气
         */
        // 白
        function weatherBack1() {
            $(".weather-back").on("click", function () {
                $(".iframe_2").css("display", "none")
                $(".iframe_1").css("display", "none")
                $("#night_show").css("display", "inline-block")
                $(".check-weather").css("display", "block")
                $(".weather-back").css("display", "none")
            })
        }
        // 黑
        function weatherBack2() {
            $(".weather-back").on("click", function () {
                $(".iframe_2").css("display", "none")
                $(".iframe_1").css("display", "none")
                $("#day_show").css("display", "inline-block")
                $(".check-weather").css("display", "block")
                $(".weather-back").css("display", "none")
            })
        }
        // /**
        //  * 设为主页
        //  */ 

        function SetHome(url) {
            if (document.all) {
                document.body.style.behavior = 'url(#default#homepage)';
                document.body.setHomePage(url);
            } else {
                alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
            }
        }
        $("#setHome").on("click", function () {
            SetHome("http://daohang.zanhf.com")
        })
    });
}

/**** 切换 ****************************************************************** */
if (document.getElementsByClassName('index_wrap').length || document.getElementsByClassName('det_wrap').length || document.getElementsByClassName('mxf_wrap').length) {
    /**
     * 导航栏的切换
     * 各模块显示隐藏
     * 其他页面 切换回主页
     */
    $(document).ready(function () {

        /**
         * 移动端 -新番列表
         * 展示公众号
         */
        $("#mGongzhong").on("click", function () {
            $(".m-gzh-panel").css("display", "flex")
            $(".m-gzh-panel").on("click", function () {
                $(this).css("display", "none")
            })
        })

        /**
         * 初始属性
         */
        function init() {
            this.pageW = $(window).width()
        }

        /**
         * 其他页面跳转回主页 
         * localstorage 缓存跳转回来的页面
         */
        /**
         * 图标导航
         */
        (function () {
            /**
             * web端
             * 图标导航
             * 点击切换
             */
            $(".tag-list .tag-item").on("click", function () {

                $(".tag-list .tag-item").removeClass("active")
                $(this).addClass("active")
                var tag_text = $(this).text()
                // console.log(tag_text)
                switch (tag_text) {
                    case "导航":
                        $("#fst_p").css("display", "block")
                        $("#sec_p").css("display", "none")
                        $("#th_p").css("display", "none")
                        $("#fou_p").css("display", "none")
                        $("#fif_p").css("display", "none")
                        $("#six_p").css("display", "none")
                        $("#sev_p").css("display", "none")
                        break;
                    case "资讯":
                        $("#fst_p").css("display", "none")
                        $("#sec_p").css("display", "block")
                        $("#th_p").css("display", "none")
                        $("#fou_p").css("display", "none")
                        $("#fif_p").css("display", "none")
                        $("#six_p").css("display", "none")
                        $("#sev_p").css("display", "none")
                        break;
                    case "图榜":
                        $("#fst_p").css("display", "none")
                        $("#sec_p").css("display", "none")
                        $("#th_p").css("display", "block")
                        $("#fou_p").css("display", "none")
                        $("#fif_p").css("display", "none")
                        $("#six_p").css("display", "none")
                        $("#sev_p").css("display", "none")
                        break;
                    case "漫画":
                        $("#fst_p").css("display", "none")
                        $("#sec_p").css("display", "none")
                        $("#th_p").css("display", "none")
                        $("#fou_p").css("display", "block")
                        $("#fif_p").css("display", "none")
                        $("#six_p").css("display", "none")
                        $("#sev_p").css("display", "none")
                        break;
                    case "周边":
                        $("#fst_p").css("display", "none")
                        $("#sec_p").css("display", "none")
                        $("#th_p").css("display", "none")
                        $("#fou_p").css("display", "none")
                        $("#fif_p").css("display", "block")
                        $("#six_p").css("display", "none")
                        $("#sev_p").css("display", "none")
                        break;
                    case "音乐":
                        $("#fst_p").css("display", "none")
                        $("#sec_p").css("display", "none")
                        $("#th_p").css("display", "none")
                        $("#fou_p").css("display", "none")
                        $("#fif_p").css("display", "none")
                        $("#six_p").css("display", "block")
                        $("#sev_p").css("display", "none")
                        break;
                }
            })
            init();
            /**
             * 移动端 左侧固定导航栏
             */
            $(".m-nav-btn").on("click", function () {
                var status = $(".m-nav-btn").attr("data-status")
                if (status == "off") {
                    $(".m-nav-hid").css("display", "block")
                    $(".m-hid-list").css("width", "87px")
                    $(".m-nav-btn").attr("data-status", "on")
                    return false;
                } else {
                    $(".m-hid-list").css("width", "0")
                    $(".m-nav-hid").css("display", "none")
                    $(".m-nav-btn").attr("data-status", "off")
                }
            })
            // 


            /**
             * 移动端
             * 图标导航
             * 点击切换
             */
            $(".m-hid-item .hid-item-link").each(function () {
                $(this).on("click", function () {
                    $(".m-hid-item .hid-item-link").removeClass("hid-item-cur")
                    var mTag_text = $(this).text()
                    $(this).addClass("hid-item-cur")
                    switch (mTag_text) {
                        case "导航":
                            $("#fst_p").css("display", "block")
                            $("#sec_p").css("display", "none")
                            $("#th_p").css("display", "none")
                            $("#fou_p").css("display", "none")
                            $("#fif_p").css("display", "none")
                            $("#six_p").css("display", "none")
                            $("#sev_p").css("display", "none")
                            close_nav()
                            break;
                        case "资讯":
                            $("#fst_p").css("display", "none")
                            $("#sec_p").css("display", "block")
                            $("#th_p").css("display", "none")
                            $("#fou_p").css("display", "none")
                            $("#fif_p").css("display", "none")
                            $("#six_p").css("display", "none")
                            $("#sev_p").css("display", "none")
                            close_nav()
                            break;
                        case "图榜":
                            $("#fst_p").css("display", "none")
                            $("#sec_p").css("display", "none")
                            $("#th_p").css("display", "block")
                            $("#fou_p").css("display", "none")
                            $("#fif_p").css("display", "none")
                            $("#six_p").css("display", "none")
                            $("#sev_p").css("display", "none")
                            close_nav()
                            break;
                        case "漫画":
                            $("#fst_p").css("display", "none")
                            $("#sec_p").css("display", "none")
                            $("#th_p").css("display", "none")
                            $("#fou_p").css("display", "block")
                            $("#fif_p").css("display", "none")
                            $("#six_p").css("display", "none")
                            $("#sev_p").css("display", "none")
                            close_nav()
                            break;
                        case "周边":
                            $("#fst_p").css("display", "none")
                            $("#sec_p").css("display", "none")
                            $("#th_p").css("display", "none")
                            $("#fou_p").css("display", "none")
                            $("#fif_p").css("display", "block")
                            $("#six_p").css("display", "none")
                            $("#sev_p").css("display", "none")
                            close_nav()
                            break;
                        case "音乐":
                            $("#fst_p").css("display", "none")
                            $("#sec_p").css("display", "none")
                            $("#th_p").css("display", "none")
                            $("#fou_p").css("display", "none")
                            $("#fif_p").css("display", "none")
                            $("#six_p").css("display", "block")
                            $("#sev_p").css("display", "none")
                            close_nav()
                            break;
                    }
                })
            })
            //关闭移动导航
            function close_nav() {
                $(".m-hid-list").css("width", "0px")
                $(".m-nav-hid").css("display", "none")
                $(".m-nav-btn").attr("data-status", "off")
            }
            /**
             * 自定网站
             * 展示 关闭
             */
            $("#settingBtn").on("click", function () {
                $("#fst_p").css("display", "none")
                $("#sec_p").css("display", "none")
                $("#th_p").css("display", "none")
                $("#fou_p").css("display", "none")
                $("#fif_p").css("display", "none")
                $("#six_p").css("display", "none")
                $("#sev_p").css("display", "block")
                // 关闭周边详情
                $("#zhoubianWrap").css("display", "none")
                // 关闭资讯详情
                $("#zixunWrap").css("display", "none")
            });

        })();
    });
}
/**** 自定义网站 ****************************************************************** */
if (document.getElementsByClassName('index_wrap').length || document.getElementsByClassName('det_wrap').length) {
    /**
     * 自定义网站
     */

    (function () {
        /**
         * 渲染列表
         * 删除、增加、还原
         */
        // 缓存一 要展示网站 下
        var curList = []
        var LBC_cur = function () {
            return {
                add: function add(value) {
                    localStorage.setItem("curList", JSON.stringify(value));
                },
                get: function get() {
                    return JSON.parse(localStorage.getItem("curList"));
                },
                remove: function remove() {
                    localStorage.removeItem("curList");
                }
            };
        }();

        // 初始化
        if (!LBC_cur.get()) {
            init();
        } else {
            show_bottom()
        }
        // 1.还原预设站点
        $("#rezjBtn").on("click", function () {
            alert("提示：此操作不可恢复哦，确定要恢复初始网址么？")
            init();
        })
        // 初始化
        function init() {
            // ajax获取预设站点,推入缓存, 
            // 渲染下方列表
            // 根据下方列表获取选中项
            // 根据选中项,渲染上方列表
            resetWeb();
        }

        function resetWeb() {
            $("#zdyForm").empty();
            $("#iconList").empty()
            // 获取原始网站列表
            $.ajax({
                type: "GET",
                url: 'http://daohang.zanhf.com/portal/index/getLinks',
                data: "",
                dataType: "json",
                success: function (data) {
                    // 把数据存入要列表缓存 并显示
                    var len = data.data.length
                    for (var i = 0; i < len; i++) {
                        (function (index) {
                            var id = data.data[index].id
                            var checked = data.data[index].checked
                            var name = data.data[index].name
                            var url = data.data[index].url
                            var image = data.data[index].image
                            var list = {
                                id: id,
                                child: {
                                    checked: checked,
                                    name: name,
                                    url: url,
                                    image: image,
                                }
                            }
                            curList.push(list)
                        })(i);
                    }
                    LBC_cur.add(curList)
                    curList = []
                    // 渲染在下列表
                    show_bottom()
                }
            })
        }

        function show_bottom() {
            // 清空原有下方列表
            var id
            var checked
            var url
            var name
            var image
            $("#zdyForm").empty()
            var len = LBC_cur.get().length
            for (var i = 0; i < len; i++) {
                (function (index) {
                    id = LBC_cur.get()[index].id
                    checked = LBC_cur.get()[index].child.checked
                    name = LBC_cur.get()[index].child.name
                    url = LBC_cur.get()[index].child.url
                    image = LBC_cur.get()[index].child.image
                    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g; //正则表达式判断http：//    https：//  为合法
                    // 渲染到下列表
                    if (!checked) {
                        if (reg.test(image) == true) {
                            var html_false = "\n   <div class=\"zdy-f-item\">\n                            <input type=\"checkbox\"  class=\"zdy-web-select\" name=\"sel_web\"\n                                value=\"" + name + "\" data-id=\"" + id + "\">\n                            <span class=\"zdy-web-icon\">\n                                <img src=\"" + image + "\" class=\"icon-img\">\n                            </span>\n                            <label class=\"zdy-f-lab text-ellipsis\" for=\"sel_web\" data-site=\"" + url + "\">" + name + "</label>\n                            <span class=\"delet-icon\">\n                                <img src=\"/themes/simpleboot3/public/assets/img/web/delet.png\" alt=\"\u5220\" class=\"icon-img\">\n                            </span>\n                        </div>\n                     ";
                            $("#zdyForm").append(html_false)
                        } else {
                            if (image == '/themes/simpleboot3/public/assets/img/web/newWeb.png') {
                                var html_false = "\n                        <div class=\"zdy-f-item\">\n                            <input type=\"checkbox\"  class=\"zdy-web-select\" name=\"sel_web\"\n                                value=\"" + name + "\" data-id=\"" + id + "\">\n                            <span class=\"zdy-web-icon\">\n                                <img src=\"" + image + "\" class=\"icon-img\">\n                            </span>\n                            <label class=\"zdy-f-lab text-ellipsis\" for=\"sel_web\" data-site=\"" + url + "\">" + name + "</label>\n                            <span class=\"delet-icon\">\n                                <img src=\"/themes/simpleboot3/public/assets/img/web/delet.png\" alt=\"\u5220\" class=\"icon-img\">\n                            </span>\n                        </div>\n                     ";
                                $("#zdyForm").append(html_false)
                            } else {
                                html_false = "\n <div class=\"zdy-f-item\">\n <input type=\"checkbox\"  class=\"zdy-web-select\" name=\"sel_web\"\n value=\"" + name + "\" data-id=\"" + id + "\">\n   <span class=\"zdy-web-icon\">\n<img src=\"/upload/" + image + "\" class=\"icon-img\">\n   </span>\n  <label class=\"zdy-f-lab text-ellipsis\" for=\"sel_web\" data-site=\"" + url + "\">" + name + "</label>\n     <span class=\"delet-icon\">\n     <img src=\"/themes/simpleboot3/public/assets/img/web/delet.png\" alt=\"\u5220\" class=\"icon-img\">\n    </span>\n </div>\n ";
                                $("#zdyForm").append(html_false)
                            }
                        }

                    } else {
                        if (reg.test(image) == true) {
                            // 渲染页面设置网站图标
                            var html = "\n                        <div class=\"zdy-f-item\">\n                            <input type=\"checkbox\" checked=\"checked\" class=\"zdy-web-select\" name=\"sel_web\"\n                                value=\"" + name + "\" data-id=\"" + id + "\">\n                            <span class=\"zdy-web-icon zdy-active\">\n                                <img src=\"" + image + "\" class=\"icon-img\">\n                            </span>\n                            <label class=\"zdy-f-lab text-ellipsis\" for=\"sel_web\" data-site=\"" + url + "\">" + name + "</label>\n                            <span class=\"delet-icon\">\n                                <img src=\"/themes/simpleboot3/public/assets/img/web/delet.png\" alt=\"\u5220\" class=\"icon-img\">\n                            </span>\n                        </div>\n                     ";
                            $("#zdyForm").append(html)

                        } else {
                            // 渲染后台上传网站图标
                            if (image == '/themes/simpleboot3/public/assets/img/web/newWeb.png') {
                                var html = "\n                        <div class=\"zdy-f-item\">\n                            <input type=\"checkbox\" checked=\"checked\" class=\"zdy-web-select\" name=\"sel_web\"\n                                value=\"" + name + "\" data-id=\"" + id + "\">\n                            <span class=\"zdy-web-icon zdy-active\">\n                                <img src=\"" + image + "\" class=\"icon-img\">\n                            </span>\n                            <label class=\"zdy-f-lab text-ellipsis\" for=\"sel_web\" data-site=\"" + url + "\">" + name + "</label>\n                            <span class=\"delet-icon\">\n                                <img src=\"/themes/simpleboot3/public/assets/img/web/delet.png\" alt=\"\u5220\" class=\"icon-img\">\n                            </span>\n                        </div>\n                     ";
                                $("#zdyForm").append(html)
                            } else {
                                html = "\n  <div class=\"zdy-f-item\">\n  <input type=\"checkbox\" checked=\"checked\" class=\"zdy-web-select\" name=\"sel_web\"\n  value=\"" + name + "\" data-id=\"" + id + "\">\n <span class=\"zdy-web-icon zdy-active\">\n  <img src=\"/upload/" + image + "\" class=\"icon-img\">\n  </span>\n  <label class=\"zdy-f-lab text-ellipsis\" for=\"sel_web\" data-site=\"" + url + "\">" + name + "</label>\n   <span class=\"delet-icon\">\n  <img src=\"/themes/simpleboot3/public/assets/img/web/delet.png\" alt=\"\u5220\" class=\"icon-img\">\n                            </span>\n </div>\n ";

                                $("#zdyForm").append(html)
                            }
                        }
                    }

                })(i);
            }
            // 渲染到上方列表
            show_top()
        }

        function show_top() {
            $("#iconList").empty()
            // 网站上设置图标
            var web_setting = "\n  <a href=\"/portal/index.html\" class=\"icon-item\" id=\"iconSetting\">\n <dt class=\"icon-pic-wrp\" id=\"settingBtn\">\n <img class=\"icon-pic\" src=\"/themes/simpleboot3/public/assets/img/web/shezhi.png\" alt=\"\u81EA\u5B9A\u4E49\">\n </dt>\n <dd class=\"ico-des text-ellipsis\">\u81EA\u5B9A\u4E49</dd>\n </a> \n";
            $("#iconList").append(web_setting)

            // 绑定事件
            open_set();
            // 循环渲染选中缓存
            var len = LBC_cur.get().length
            for (var i = 0; i < len; i++) {
                (function (index) {
                    var id = LBC_cur.get()[index].id
                    var checked = LBC_cur.get()[index].child.checked
                    var name = LBC_cur.get()[index].child.name
                    var url = LBC_cur.get()[index].child.url
                    var image = LBC_cur.get()[index].child.image
                    if (checked) {
                        var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g; //正则表达式判断http：//    https：//  为合法
                        if (reg.test(image) == true) {
                            // 渲染到上列表
                            var html_top = "\n<a href=\"" + url + "\" class=\"icon-item\" target=\"_blank\"  data-id=\"" + id + "\">\n                            <div class=\"icon-pic-wrp\">\n  <img src=\"" + image + "\"\n   alt=\"\" class=\"icon-pic\">\n  </div>\n                     <dd class=\"ico-des text-ellipsis\">" + name + "</dd>\n   </a>\n ";
                            $("#iconList").append(html_top)
                        } else {
                            // 渲染到上列表
                            if (image == '/themes/simpleboot3/public/assets/img/web/newWeb.png') {
                                var html_top = "\n<a href=\"" + url + "\" class=\"icon-item\" target=\"_blank\"  data-id=\"" + id + "\">\n                            <div class=\"icon-pic-wrp\">\n  <img src=\"" + image + "\"\n   alt=\"\" class=\"icon-pic\">\n  </div>\n                     <dd class=\"ico-des text-ellipsis\">" + name + "</dd>\n   </a>\n ";
                                $("#iconList").append(html_top)
                            } else {
                                var html_top = "\n<a href=\"" + url + "\" class=\"icon-item\" target=\"_blank\"  data-id=\"" + id + "\">\n                            <div class=\"icon-pic-wrp\">\n  <img src=\"/upload/" + image + "\"\n   alt=\"\" class=\"icon-pic\">\n  </div>\n                     <dd class=\"ico-des text-ellipsis\">" + name + "</dd>\n   </a>\n ";
                                $("#iconList").append(html_top)
                            }
                        }
                    }
                })(i);
            }

            // 2、删
            delet_web();
            // 3、改
            select_web();
        }

        // 1、增
        add_web()

        function add_web() {
            $("#zjBtn").on("click", function () {
                var webNum = LBC_cur.get().length
                // console.log(webNum)
                if (webNum == 60) {
                    alert("自定网站已经达到上限！")
                } else {
                    // 获取id 网站名 网址 网站图标 推送给列表缓存
                    var add_id = Number(LBC_cur.get()[LBC_cur.get().length - 1].id) + 1
                    var add_name = $("#zjName").val()
                    var add_web = $("#zjSite").val()
                    // 判断是用户自定义网址
                    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g; //正则表达式判断http：//    https：//  为合法
                    if (reg.test(add_web) == true) {
                        add_web = $("#zjSite").val()
                    } else {
                        add_web = "https://" + $("#zjSite").val()
                        // console.log(add_web)
                    }
                    var add_icon = $("#zjIcon").val()
                    // 没有图标给默认图标
                    if (add_icon == "") {
                        add_icon = "/themes/simpleboot3/public/assets/img/web/newWeb.png"
                    }
                    $("#zjName").val("")
                    $("#zjSite").val("")
                    $("#zjIcon").val("")
                    if (add_name != "" && add_web != "" && add_icon != "") {
                        // 推入 列表缓存
                        var list = {
                            id: add_id,
                            child: {
                                checked: true,
                                name: add_name,
                                url: add_web,
                                image: add_icon,
                            }
                        }
                        curList = LBC_cur.get()
                        curList.push(list)
                        // 推入新缓存
                        LBC_cur.add(curList)
                        curList = []
                    } else {
                        return false;
                    }
                    // 渲染 下方 新列表
                    show_bottom()

                }
            })
        }
        // 2、删
        // 写在show_top函数内
        function delet_web() {
            $(".delet-icon").each(function () {
                $(this).on("click", function () {
                    // 获取删除的对象 id
                    var delId = $(this).siblings(".zdy-web-select").attr("data-id")
                    // 删除对应id的列表缓存项
                    var len = LBC_cur.get().length
                    for (var i = 0; i < len; i++) {
                        if (delId == LBC_cur.get()[i].id) {
                            var arr = LBC_cur.get()
                            list = arr.splice(i, 1)
                            LBC_cur.remove()
                            // 删除后的列表推入缓存
                            LBC_cur.add(arr)
                            // 再次根据新缓存渲染 下方列表
                            show_bottom()
                        }
                    }
                })
            })
        }
        // 3、改
        // 写在show_top函数内
        function select_web() {
            $(".zdy-f-item").each(function () {
                $(this).on("click", function () {
                    // 定义被选择网站信息
                    var sel_id
                    var status = $(this).children(".zdy-web-select").attr("checked")
                    if (status == "checked") {
                        // 取消选中
                        $(this).children(".zdy-web-select").removeAttr("checked")
                        $(this).children(".zdy-web-icon").removeClass("zdy-active")
                        // 获取网站id
                        sel_id = $(this).children(".zdy-web-select").attr("data-id")
                        // 改变缓存的check属性
                        var arr_loc = LBC_cur.get()
                        $.each(arr_loc, function (index, item) {
                            if (sel_id == item.id) {
                                item.child.checked = false
                            }
                        })
                        LBC_cur.remove()
                        LBC_cur.add(arr_loc)
                        // 重新渲染
                        show_bottom();

                    } else {
                        // 选中
                        $(this).children(".zdy-web-select").attr("checked", "checked")
                        $(this).children(".zdy-web-icon").addClass("zdy-active")
                        sel_id = $(this).children(".zdy-web-select").attr("data-id")
                        sel_name = $(this).children(".zdy-web-select").val()
                        sel_web = $(this).children(".zdy-f-lab").attr("data-site")
                        sel_icon = $(this).children(".zdy-web-icon").children(".icon-img").attr("src")
                        // 获取点击对象id
                        sel_id = $(this).children(".zdy-web-select").attr("data-id")
                        // 改变缓存的check属性
                        var arr_loc = LBC_cur.get()
                        $.each(arr_loc, function (index, item) {
                            if (sel_id == item.id) {
                                item.child.checked = true
                            }
                        })
                        LBC_cur.remove()
                        LBC_cur.add(arr_loc)
                        // 重新渲染
                        show_bottom();

                    }
                })
            })
        }

        /**
         * 自定网站
         * 展示 关闭
         */
        var LBC_nav = function () {
            return {
                add: function add(value) {
                    localStorage.setItem("navItem", JSON.stringify(value));
                },
                get: function get() {
                    return JSON.parse(localStorage.getItem("navItem"));
                },
                remove: function remove() {
                    localStorage.removeItem("navItem");
                }
            };
        }();

        function open_set() {
            $("#settingBtn").on("click", function () {
                $("#fst_p").css("display", "none")
                $("#sec_p").css("display", "none")
                $("#th_p").css("display", "none")
                $("#fou_p").css("display", "none")
                $("#fif_p").css("display", "none")
                $("#six_p").css("display", "none")
                $("#sev_p").css("display", "block")
                // 关闭周边详情
                $("#zhoubianWrap").css("display", "none")
                // 关闭资讯详情
                $("#zixunWrap").css("display", "none")
                var push_item = {
                    id: 0,
                    navItem: "自定义",
                }
                LBC_nav.add(push_item)
                navItem = ''
            });
        }

    })();
}

/**** 导航切换 ****************************************************************** */
if (document.getElementsByClassName('index_wrap').length || document.getElementsByClassName('det_wrap').length || document.getElementsByClassName('mxf_wrap').length) {
    /**
     * 主页获取缓存的导航
     */
    (function () {
        // 定义获取的导航
        var navItem

        function add_navItem() {
            var push_item = {
                id: 0,
                navItem: navItem,
            }
            LBC_nav.add(push_item)
            navItem = ''
        }

        var LBC_nav = function () {
            return {
                add: function add(value) {
                    localStorage.setItem("navItem", JSON.stringify(value));
                },
                get: function get() {
                    return JSON.parse(localStorage.getItem("navItem"));
                },
                remove: function remove() {
                    localStorage.removeItem("navItem");
                }
            };
        }();
        //移动端 导航
        $(".m-hid-item").each(function () {
            $(this).on("click", function () {
                navItem = $(this).children(".hid-item-link").text()
                add_navItem()
            })
        })
        // pc端导航
        $(".tag-item").each(function () {
            $(this).on("click", function () {
                navItem = $(this).text()
                add_navItem()
            })
        })

        $("#mbackBtn").on("click", function () {
            navItem = "导航"
            add_navItem()
            $(".tag-item").removeClass("active")
            $(".m-hid-item").children(".hid-item-link").removeClass("hid-item-cur")
            $("#fst_p").css("display", "block")
            $("#sec_p").css("display", "none")
            $("#th_p").css("display", "none")
            $("#fou_p").css("display", "none")
            $("#fif_p").css("display", "none")
            $("#six_p").css("display", "none")
            $("#sev_p").css("display", "none")
            $("#mbackBtn").css("display", "none")
            document.getElementsByClassName("tag-item")[0].classList.add("active")
            document.getElementsByClassName("hid-item-link")[0].classList.add("hid-item-cur")
            var push_item = {
                id: 0,
                navItem: "导航",
            }
            LBC_nav.add(push_item)
        })
        /**
         * 导航-图榜
         * 更多
         */
        $("#tubangMore").on("click", function () {
            navItem = "图榜"
            add_navItem()
            $("#fst_p").css("display", "none")
            $("#sec_p").css("display", "none")
            $("#th_p").css("display", "block")
            $("#fou_p").css("display", "none")
            $("#fif_p").css("display", "none")
            $("#six_p").css("display", "none")
            $("#sev_p").css("display", "none")
            $("#sec_p").css("display", "none")
            $("#mbackBtn").css("display", "inline-block")
            $(".tag-list .tag-item").removeClass("active")
            document.getElementsByClassName("tag-item")[2].classList.add("active")
            push_item = {
                id: 0,
                navItem: "图榜",
            }
            LBC_nav.add(push_item)
        })

        $("#zixunMore").on("click", function () {
            navItem = "资讯"
            add_navItem()
            $("#fst_p").css("display", "none")
            $("#sec_p").css("display", "block")
            $("#th_p").css("display", "none")
            $("#fou_p").css("display", "none")
            $("#fif_p").css("display", "none")
            $("#six_p").css("display", "none")
            $("#sev_p").css("display", "none")
            $("#mbackBtn").css("display", "inline-block")
            $(".tag-list .tag-item").removeClass("active")
            document.getElementsByClassName("tag-item")[1].classList.add("active")
            push_item = {
                id: 0,
                navItem: "资讯",
            }
            LBC_nav.add(push_item)
        })

        $(".zhoubian-more").on("click", function () {
            navItem = "周边"
            add_navItem()
            $("#fst_p").css("display", "none")
            $("#sec_p").css("display", "none")
            $("#th_p").css("display", "none")
            $("#fou_p").css("display", "none")
            $("#fif_p").css("display", "block")
            $("#six_p").css("display", "none")
            $("#sev_p").css("display", "none")
            $("#mbackBtn").css("display", "inline-block")
            $(".tag-list .tag-item").removeClass("active")
            document.getElementsByClassName("tag-item")[3].classList.add("active")
            push_item = {
                id: 0,
                navItem: "周边",
            }
            LBC_nav.add(push_item)
            var locData = LBC_Zhoubian().get()
        })

        $(".yinyue-more").on("click", function () {
            navItem = "音乐"
            add_navItem()
            $("#fst_p").css("display", "none")
            $("#sec_p").css("display", "none")
            $("#th_p").css("display", "none")
            $("#fou_p").css("display", "none")
            $("#fif_p").css("display", "none")
            $("#six_p").css("display", "block")
            $("#sev_p").css("display", "none")
            $("#mbackBtn").css("display", "inline-block")
            $(".tag-list .tag-item").removeClass("active")
            document.getElementsByClassName("tag-item")[4].classList.add("active")
            push_item = {
                id: 0,
                navItem: "音乐",
            }
            LBC_nav.add(push_item)
        })


        //  自定义网站 导航
        $("#iconSetting").on("click", function () {
            navItem = $(this).children(".ico-des").text()
            add_navItem()
            $("#mbackBtn").css("display", "inline-block")
        })
        /**
         * 关闭自定义网站
         */
        $("#zdClose").on("click", function () {
            var push_item = {
                id: 0,
                navItem: "导航",
            }
            LBC_nav.add(push_item)
            $("#fst_p").css("display", "block")
            $("#sec_p").css("display", "none")
            $("#th_p").css("display", "none")
            $("#fou_p").css("display", "none")
            $("#fif_p").css("display", "none")
            $("#six_p").css("display", "none")
            $("#sev_p").css("display", "none")
            $("#mbackBtn").css("display", "none")
            document.getElementsByClassName("tag-item")[0].classList.add("active")
            document.getElementsByClassName("hid-item-link")[0].classList.add("hid-item-cur")
        })
        var store_nav = LBC_nav.get()
        if (store_nav) {
            var store_nav = LBC_nav.get().navItem
            $(".tag-item").removeClass("active")
            $(".m-hid-item").children(".hid-item-link").removeClass("hid-item-cur")
            switch (store_nav) {
                case "导航":
                    $("#fst_p").css("display", "block")
                    $("#sec_p").css("display", "none")
                    $("#th_p").css("display", "none")
                    $("#fou_p").css("display", "none")
                    $("#fif_p").css("display", "none")
                    $("#six_p").css("display", "none")
                    $("#sev_p").css("display", "none")
                    $("#mbackBtn").css("display", "none")
                    document.getElementsByClassName("tag-item")[0].classList.add("active")
                    document.getElementsByClassName("hid-item-link")[0].classList.add("hid-item-cur")

                    break;
                case "资讯":
                    $("#fst_p").css("display", "none")
                    $("#sec_p").css("display", "block")
                    $("#th_p").css("display", "none")
                    $("#fou_p").css("display", "none")
                    $("#fif_p").css("display", "none")
                    $("#six_p").css("display", "none")
                    $("#sev_p").css("display", "none")
                    $("#mbackBtn").css("display", "inline-block")
                    document.getElementsByClassName("tag-item")[1].classList.add("active")
                    document.getElementsByClassName("hid-item-link")[1].classList.add("hid-item-cur")
                    break;
                case "图榜":
                    $("#fst_p").css("display", "none")
                    $("#sec_p").css("display", "none")
                    $("#th_p").css("display", "block")
                    $("#fou_p").css("display", "none")
                    $("#fif_p").css("display", "none")
                    $("#six_p").css("display", "none")
                    $("#sev_p").css("display", "none")
                    $("#mbackBtn").css("display", "inline-block")
                    document.getElementsByClassName("tag-item")[2].classList.add("active")
                    document.getElementsByClassName("hid-item-link")[2].classList.add("hid-item-cur")
                    break;
                case "漫画":
                    $("#fst_p").css("display", "none")
                    $("#sec_p").css("display", "none")
                    $("#th_p").css("display", "none")
                    $("#fou_p").css("display", "block")
                    $("#fif_p").css("display", "none")
                    $("#six_p").css("display", "none")
                    $("#sev_p").css("display", "none")
                    $("#mbackBtn").css("display", "inline-block")
                    document.getElementsByClassName("tag-item")[5].classList.add("active")
                    document.getElementsByClassName("hid-item-link")[5].classList.add("hid-item-cur")
                    break;
                case "周边":
                    $("#fst_p").css("display", "none")
                    $("#sec_p").css("display", "none")
                    $("#th_p").css("display", "none")
                    $("#fou_p").css("display", "none")
                    $("#fif_p").css("display", "block")
                    $("#six_p").css("display", "none")
                    $("#sev_p").css("display", "none")
                    $("#mbackBtn").css("display", "inline-block")
                    document.getElementsByClassName("tag-item")[3].classList.add("active")
                    document.getElementsByClassName("hid-item-link")[3].classList.add("hid-item-cur")
                    break;
                case "音乐":
                    $("#fst_p").css("display", "none")
                    $("#sec_p").css("display", "none")
                    $("#th_p").css("display", "none")
                    $("#fou_p").css("display", "none")
                    $("#fif_p").css("display", "none")
                    $("#six_p").css("display", "block")
                    $("#sev_p").css("display", "none")
                    $("#mbackBtn").css("display", "inline-block")
                    document.getElementsByClassName("tag-item")[4].classList.add("active")
                    document.getElementsByClassName("hid-item-link")[4].classList.add("hid-item-cur")
                    break;
                case "新番列表":
                    $("#fst_p").css("display", "none")
                    $("#sec_p").css("display", "none")
                    $("#th_p").css("display", "none")
                    $("#fou_p").css("display", "none")
                    $("#fif_p").css("display", "none")
                    $("#six_p").css("display", "none")
                    $("#sev_p").css("display", "none")
                    $("#mbackBtn").css("display", "inline-block")
                    document.getElementsByClassName("hid-item-link")[6].classList.add("hid-item-cur")
                    break;
                case "自定义":
                    $("#fst_p").css("display", "none")
                    $("#sec_p").css("display", "none")
                    $("#th_p").css("display", "none")
                    $("#fou_p").css("display", "none")
                    $("#fif_p").css("display", "none")
                    $("#six_p").css("display", "none")
                    $("#sev_p").css("display", "block")
                    $("#mbackBtn").css("display", "inline-block")
                    break;
            }
        }
        $(".m-nav-hid").on("click", function () {
            close_nav()
        })
        //关闭移动导航
        function close_nav() {
            $(".m-hid-list").css("width", "0px")
            $(".m-nav-hid").css("display", "none")
            $(".m-nav-btn").attr("data-status", "off")
        }
        //   console.log(LBC_nav.get())

    })();
}
/**** 夜间模式 ****************************************************************** */
if (document.getElementsByClassName('index_wrap').length || document.getElementsByClassName('det_wrap').length || document.getElementsByClassName('mxf_wrap').length || (document.getElementsByClassName('mianz_wrap').length) || (document.getElementsByClassName('footer_wrap').length)) {
    /**
     * 开启 关闭
     * 夜间模式
     */
    console.log("夜间模式");
    (function () {
        // 声明缓存方法
        var nightMode
        // 插入缓存
        function add_nightItem() {
            var night_item = {
                id: 0,
                nightMode: nightMode,
            }
            LBC_night.add(night_item)
        }
        // 缓存方法
        var LBC_night = function () {
            return {
                add: function add(value) {
                    localStorage.setItem("pageNight", JSON.stringify(value));
                },
                get: function get() {
                    return JSON.parse(localStorage.getItem("pageNight"));
                },
                remove: function remove() {
                    localStorage.removeItem("pageNight");
                }
            };
        }();
        // 调取缓存状态，切换夜间模式
        function night_mode(nightMode) {
            if (nightMode == "day") {
                // 夜间 
                $("#indexWrap").addClass("night-mode")
                $("#xfWrap").addClass("night-mode")
                $("#mhWrap").addClass("night-mode")
                $("#night_mode").children(".item-img").attr("src", "/upload/img/web/taiyang.png")
                $("#mNightBtn").children(".m-swift").attr("src", "/upload/img/web/taiyang.png")
                $("#dnImg").attr("src", "/themes/simpleboot3/public/assets/img/mob/mkai.png")
                if ($(".iframe_1").css("display") != "inline-block" && $(".iframe_2").css("display") != "inline-block") {
                    $("#day_show").css("display", "none")
                    $("#night_show").css("display", "inline-block")
                }
            } else {
                // 白天
                $("#indexWrap").removeClass("night-mode")
                $("#xfWrap").removeClass("night-mode")
                $("#mhWrap").removeClass("night-mode")
                $("#night_mode").children(".item-img").attr("src", "/upload/img/web/yueliang.png")
                $("#mNightBtn").children(".m-swift").attr("src", "/upload/img/web/yueliang.png")
                $("#dnImg").attr("src", "/themes/simpleboot3/public/assets/img/mob/mguan.png")
                if ($(".iframe_1").css("display") != "inline-block" && $(".iframe_2").css("display") != "inline-block") {
                    $("#day_show").css("display", "inline-block")
                    $("#night_show").css("display", "none")
                }
            }
        }
        $("#night_mode").on("click", function () {
            console.log('新夜间模式！！！')
            nightMode = $(this).attr("data-status")
            add_nightItem()
            night_mode()
            // 增删 白天夜晚 样式
            night_mode(nightMode)
            if (nightMode == "day") {
                $(this).attr("data-status", "night")
                $("#mNight").attr("data-status", "night")
                showLeft()
            } else {
                $(this).attr("data-status", "day")
                $("#mNight").attr("data-status", "day")
                showLeft()
            }

        })
        if (LBC_night.get()) {
            if (LBC_night.get().nightMode != "day") {
                $("#night_mode").attr("data-status", "day")
                $("#mNightBtn").attr("data-status", "day")
                $("#dnImg").attr("src", "/themes/simpleboot3/public/assets/img/mob/mkai.png")
            } else {
                $("#night_mode").attr("data-status", "night")
                $("#mNightBtn").attr("data-status", "night")
                $("#dnImg").attr("src", "/themes/simpleboot3/public/assets/img/mob/mguan.png")
            }
        }

        function showLeft() {
            // 增删 白天夜晚 样式
            if (LBC_night.get()) {
                night_mode(LBC_night.get().nightMode)
            }

            if ($("#night_mode").attr("data-status") == "day") {
                $("#tianqiBtn").unbind()
                $(".icon_day").css("display", "inline-block")
                $(".icon_night").css("display", "none")
                $("#tianqiBtn").hover(function () {
                    $(".iframe_1").css("display", "inline-block")
                }, function () {
                    $(".iframe_1").css("display", "none")
                })
            } else {
                $("#tianqiBtn").unbind()
                $(".icon_day").css("display", "none")
                $(".icon_night").css("display", "inline-block")

                $("#tianqiBtn").hover(function () {
                    $(".iframe_2").css("display", "inline-block")
                }, function () {
                    $(".iframe_2").css("display", "none")
                })
            }
        }

        // 调用
        showLeft()

    })();
}

/**** 资讯模块 ****************************************************************** */
if (document.getElementsByClassName('index_wrap').length) {
    /**
     * 获取咨询
     * ajax
     */
    (function () {
        /**
         * 资讯列表切换
         */
        $(".zx-r-item").each(function () {
            $(this).on("click", function () {
                var zx_index = $(this).attr("data-id")
                $(".zx-det-list").css("display", "none")
                $(".zx-r-item").removeClass("zx_r_active")
                $(this).addClass("zx_r_active")
                // console.log( $(this))
                $(".zx-det-list").each(function () {
                    var dataId = $(this).attr("data-id")
                    if (dataId == zx_index) {
                        $(this).css("display", "block")
                    }
                })
                return false
                // document.getElementsByClassName("zx-det-list")[index].style.display = "block"
            })
        });
        // 获取6组数据
        // ajax

        var _slicedToArray = function () {
            function sliceIterator(arr, i) {
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = undefined;
                try {
                    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                        _arr.push(_s.value);
                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = true;
                    _e = err;
                } finally {
                    try {
                        if (!_n && _i["return"]) _i["return"]();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function (arr, i) {
                if (Array.isArray(arr)) {
                    return arr;
                } else if (Symbol.iterator in Object(arr)) {
                    return sliceIterator(arr, i);
                } else {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                }
            };
        }();

        function getDate(url, _ref, sucFn, errorFn, beforeFn) {
            var _ref2 = _slicedToArray(_ref, 2),
                typeid = _ref2[0],
                page = _ref2[1];

            $.ajax({
                url: url + "?typeid=" + typeid + "&page=" + page,
                type: "GET",
                dataType: "json",
                beforeSend: beforeFn,
                //加载执行方法  
                erro: errorFn,
                //错误执行方法  
                success: sucFn
                //成功执行方法  
            });
        }
        // 全部咨询
        function initFn(data) {
            var from
            var time
            var content
            var img
            var intro
            var title
            var id = data.cate
            var url
            var icon
            var lastPage = data.data.last_page
            var curPge = data.data.current_page
            var zxArr = data.data.data
            $.each(zxArr, function (index, ele) {
                init(ele, id)
            })

            if (lastPage == curPge) {
                $(".zx-det-list").eq(id).find(".zx-loadMore").text("加载完毕")
            }
        }

        function error() {
            alert("连接失败，请重试！")
        }

        function init(ele, id) {
            from = ele.news_from
            time = "更新于 " + ele.time_
            contetnt = ele.content
            img = ele.img
            intro = ele.intro
            title = ele.title
            url = ele.url
            icon = ele.icon
            typeid = ele.typeid
            // time = timestampToTime(time)
            if (typeid == 1) {
                urlId = ele.id
                url = "http://daohang.zanhf.com/portal/zixun_detail.html?id=" + urlId
            }
            if (typeid != 1) {
                // 图片无法抓取
                if (typeid == 4 || typeid == 9 || typeid == 8 || typeid == 11) {
                    var htmlAll = "\n                <li class=\"zx-l-item\" typeid = " + id + ">\n                    <a target=\"_blank\" href=\"" + url + "\" class=\"zx-l-link\">\n                        <div class=\"l-des l-des-null\">\n                            <div class=\"des-title\">\n                                <img src=\"/upload/" + icon + "\" class=\"title-icon\">\n                                <h3 class=\"title-text text-ellipsis\">" + title + "</h3>\n                            </div>\n                            <span class=\"des-text line-ellipsis\">\n                                " + intro + "\n                            </span>\n                            <div class=\"des-bot\">\n                                <span class=\"bot-left text-ellipsis\">\u4F5C\u8005\uFF1A" + from + "</span>\n                                <span class=\"bot-right\">\n                                    <img src=\"/themes/simpleboot3/public/assets/img/web/shijian1.png\" class=\"icon-time\">\n                                    <span class=\"time-desc text-ellipsis\">" + time + "</span>\n                                </span>\n                            </div>\n                        </div>\n                    </a>\n                </li>\n            ";
                    $(".zx-det-box").eq(id).append(htmlAll)

                } else {
                    // 图片可以抓取
                    var htmlAll = "\n                <li class=\"zx-l-item\" typeid = " + id + ">\n                    <a target=\"_blank\" href=\"" + url + "\" class=\"zx-l-link\">\n                        <div class=\"l-des\">\n                            <div class=\"des-title\">\n                                <img src=\"/upload/" + icon + "\" class=\"title-icon\">\n                                <h3 class=\"title-text text-ellipsis\">" + title + "</h3>\n                            </div>\n                            <span class=\"des-text line-ellipsis\">\n                                " + intro + "\n                            </span>\n                            <div class=\"des-bot\">\n                                <span class=\"bot-left text-ellipsis\">\u4F5C\u8005\uFF1A" + from + "</span>\n                                <span class=\"bot-right\">\n                                    <img src=\"/themes/simpleboot3/public/assets/img/web/shijian1.png\" class=\"icon-time\">\n                                    <span class=\"time-desc text-ellipsis\">" + time + "</span>\n                                </span>\n                            </div>\n                        </div>\n                        <div class=\"l-img\">\n                            <div class=\"img-box\">\n                                <div class=\"zixun-img-show\" style=\"background-image: url(" + img + ");\"></div>\n                            </div>\n                        </div>\n                    </a>\n                </li>\n            ";

                    $(".zx-det-box").eq(id).append(htmlAll)
                }

            } else {
                var htmlAll = "\n            <li class=\"zx-l-item\" typeid = " + id + ">\n                <a target=\"\" href=\"" + url + "\" class=\"zx-l-link\">\n                    <div class=\"l-des\">\n                        <div class=\"des-title\">\n                            <img src=\"/upload/" + icon + "\" class=\"title-icon\">\n                            <h3 class=\"title-text text-ellipsis\">" + title + "</h3>\n                        </div>\n                        <span class=\"des-text line-ellipsis\">\n                            " + intro + "\n                        </span>\n                        <div class=\"des-bot\">\n                            <span class=\"bot-left text-ellipsis\">\u4F5C\u8005\uFF1A" + from + "</span>\n                            <span class=\"bot-right\">\n                                <img src=\"/themes/simpleboot3/public/assets/img/web/shijian1.png\" class=\"icon-time\">\n                                <span class=\"time-desc text-ellipsis\">" + time + "</span>\n                            </span>\n                        </div>\n                    </div>\n                    <div class=\"l-img\">\n                        <div class=\"img-box\">\n                            <div class=\"zixun-img-show\" style=\"background-image: url(/upload/" + img + ");\"></div>\n                        </div>\n                    </div>\n                </a>\n            </li>\n        ";
                $(".zx-det-box").eq(id).append(htmlAll)
            }


        }
        // 对应模块懒加载
        function bindClick() {
            $(".zx-loadMore").each(function () {
                $(this).on("click", function () {
                    var btnEq = $(this).attr("data-id")
                    var page = $(this).attr("page")
                    getDate(urlAll, [btnEq, page], initFn, error)
                    page++
                    $(this).attr("page", page)
                })
            })
        }

        // 时间戳转换
        function timestampToTime(timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            // var h = date.getHours() + ':';
            // var m = date.getMinutes() + ':';
            // var s = date.getSeconds();
            return Y + M + D;
        }
        // // 调用
        // // 初始化
        var urlAll = "http://daohang.zanhf.com/portal/index/getNews"
        // // 展示对应模块
        function showZixun() {
            $(".zx-r-list .zx-r-item").each(function () {
                var typeid = $(this).attr("data-id")
                getDate(urlAll, [typeid, 1], initFn, error)
            })
            bindClick()
        }
        showZixun()

    }());
}
/**** 移动新番模块 ****************************************************************** */
if (document.getElementsByClassName('mxf_wrap').length) {
    $(".m-nav-hid").on("click", function () {
        close_nav()
    })
    //关闭移动导航
    function close_nav() {
        $(".m-hid-list").css("width", "0px")
        $(".m-nav-hid").css("display", "none")
        $(".m-nav-btn").attr("data-status", "off")
    }
    (function () {
        /**
         * 移动端
         * 开启 关闭
         * 夜间模式
         */
        // 声明缓存方法
        var nightMode
        // 插入缓存
        function add_nightItem() {
            var night_item = {
                id: 0,
                nightMode: nightMode,
            }
            LBC_night.add(night_item)
        }
        // 缓存方法
        var LBC_night = (function () {
            return {
                add(value) {
                    localStorage.setItem("pageNight", JSON.stringify(value))
                },
                get() {
                    return JSON.parse(localStorage.getItem("pageNight"))
                },
                remove() {
                    localStorage.removeItem("pageNight")
                }
            }
        })();
        // 调取缓存状态，切换夜间模式
        function night_mode(nightMode) {
            if (nightMode == "day") {
                // 夜间 
                $("#indexWrap").addClass("night-mode")
                $("#xfWrap").addClass("night-mode")
                $("#mhWrap").addClass("night-mode")
                $("#night_mode").children(".item-img").attr("src", "__TMPL__/public/assets/img/web/taiyang.png")
                $("#mNightBtn").children(".m-swift").attr("src", "__TMPL__/public/assets/img/web/taiyang.png")
            } else {
                // 白天
                $("#indexWrap").removeClass("night-mode")
                $("#xfWrap").removeClass("night-mode")
                $("#mhWrap").removeClass("night-mode")
                $("#night_mode").children(".item-img").attr("src",
                    "__TMPL__/public/assets/img/web/yueliang.png")
                $("#mNightBtn").children(".m-swift").attr("src", "__TMPL__/public/assets/img/web/yueliang.png")
            }
        }
        /**
         * 移动端 
         * 白天夜晚模式切换
         */
        $("#mNightBtn").on("click", function () {
            nightMode = $(this).attr("data-status")
            add_nightItem()
            night_mode()
            // 增删 白天夜晚 样式
            night_mode(nightMode)
            if (nightMode == "day") {
                $(this).attr("data-status", "night")
                $(this).find(".m-hid-btn").attr("src",
                    "/themes/simpleboot3/public/assets/img/mob/mkai.png")
            } else {
                $(this).attr("data-status", "day")
                $(this).find(".m-hid-btn").attr("src",
                    "/themes/simpleboot3/public/assets/img/mob/mguan.png")
            }
            return false;
        })
    })();

    /**
     * 移动端
     * 新番列表
     */
    (function () {

        // 选择分类
        $(".choice-list .choice-item").each(function () {
            $(this).on("click", function () {
                $(".choice-list .choice-item").removeClass("cur-tag")
                $(this).toggleClass("cur-tag")
                var dataId = $(this).attr("data-id")
                var ele = ".m-xf-main" + "[data-id=" + dataId + "]"
                $(".m-xf-main").css("display", "none")
                $(ele).css("display", "block")
                // 切换分类展示当前日期内容
                $(".xf-week-list .xf-week-item").each(function () {
                    if ($(this).hasClass("m-xf-active")) {
                        var curIndex = $(this).index()
                        // console.log(curIndex)
                        $(ele).find(".xf-main-list").eq(curIndex).css("display", "flex")
                    }
                })

                // 分类内日期切换
                $(".xf-week-item").each(function () {
                    $(this).on("click", function () {
                        xf_item = $(this).index()
                        $(".xf-main-list").css("display", "none")
                        $(".xf-week-item").removeClass("m-xf-active")
                        $(this).addClass("m-xf-active")
                        $(ele).find(".xf-main-list").eq(xf_item).css("display", "flex")
                    })
                })

            })
        })

        function xinfanInit() {
            // 分类内日期切换
            $(".xf-week-item").each(function () {
                $(this).on("click", function () {
                    xf_item = $(this).index()
                    $(".xf-main-list").css("display", "none")
                    $(".xf-week-item").removeClass("m-xf-active")
                    $(this).addClass("m-xf-active")
                    $(".m-xf-main").find(".xf-main-list").eq(xf_item).css("display", "flex")
                })
            })
        }

        xinfanInit()

    })();
}