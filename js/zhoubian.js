(function () {

    /**
     * 周边
     * 切换
     * 单一功能原则
     */
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
                    console.log("这个dataId" + dataId)
                }
            })
            if (ifAll) {
                dataId = $(this).attr("data-id")
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
    initZoubian()
    // 展示单个模块周边
    function SingleZb() {
        this.single = function (status, dataId) {
            if (!status) {
                // $(".zb-screen-con .zb-b").css("display", "none")
                $(".zb-screen-con .zb-b").each(function () {
                    if ($(this).attr("data-id") == dataId) {
                        $(this).css("display", "block")
                    }
                })
                var curPageId = dataId
                // $(".data-id").attr("data-id",dataId)
                $(".zb-p .zb-b").attr("data-id", dataId)
                initZbSort(curPageId)
            }
        }
    }

    // 点击标签触发切换
    function EventZb() {
        this.select = function () {
            $(".zb-top-tag .zb-tag-item").each(function () {
                $(this).on("click", function () {
                    if (!$(this).hasClass("zb-cur")) {
                        $(".zb-top-tag .zb-tag-item").removeClass("zb-cur")
                        $(this).addClass("zb-cur")
                        // 每次点击调用
                        allZb.all()
                    } else {
                        $(".zb-top-tag .zb-tag-item").removeClass("zb-cur")
                        // 每次点击调用
                        allZb.all()
                        initZoubian()
                    }
                })
            })
        }
    }

    var codeZb
    var pageZb
    var thisEle
    // 全局定义当前所处模块 id 
    // 方便调取

    // 初始化周边 所有
    function initZoubian() {
        $(".zb-p .zb-b").attr("data-id","0")
        var page = 1
        var url = "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/zbAll?sort_id=0"
        getZbData(url, page)
    }
    // 初始化周边对应的 分类
    function initZbSort(curPageId) {
        var page = 1
        var url = "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/zbFenlei?sort_id=" + curPageId
        console.log(url)
        getZbData(url, page)
    }

    // 判断是否触发的是加载更多
    var flagMore = false
    // 点击加载更多
    // 加载对应模块 对应页面更多
    function clickZbPage() {
        $(".zb-b").each(function () {
            var curPageId = Number($(this).attr("data-id"))
            $(this).find(".zb-loadMore").on("click", function (event) {
                var curPageNum = $(this).attr("page")
                thisEle = $(this).parent(".zb-b")
                flagMore = true
                if (curPageId === 0) {
                    console.log("所有")
                    // 1. 所有分类 url=> "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/zbAll?sort_id=0
                    var url = "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/zbAll?sort_id=0"
                    getZbData(url, curPageNum)
                } else {
                    console.log("分类分类")
                    // 2.独立模块url = "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/zbFenlei?sort_id=" + curPageId
                    var url = "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/zbFenlei?sort_id=" + curPageId
                    getZbData(url, curPageNum)
                }
            })
        })
    }

    // 加载 周边 页面内容
    function getZbData(url, page) {
        console.log(url + "&page=" + page)
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
        console.log(data)
        var current_page = Number(data["data"]["current_page"])
        var last_page = Number(data["data"]["last_page"])
        console.log(current_page, last_page)
        console.log(thisEle)
        if (!thisEle) {
            thisEle = $(".zb-b").eq(0)
            console.log("清空")
        } else {
            thisEle.find(".zb-loadMore").attr("page", current_page + 1)
        }

        data = data["data"]["data"]
        if (!flagMore) {
            thisEle.find(".zb-list").empty()
        }
        flagMore = false
        $.each(data, function (index, item) {
            var zbId = item["id"]
            var zbImg = "/upload/" + item["url"]
            var zbTime = item["time"]
            var zbTitle = item["title"]
            var zbHtml = `
                <li class="zb-item">
                    <a href="/portal/zhoubian_detail.html?id=${zbId}" target="_blank" class="zb-link">
                        <div class="zb-img-box">
                            <div class="zb-img-show" style="background-image: url(${zbImg});"></div>
                        </div>
                        <div class="zb-link-des">
                            <dt class="zb-des-title text-ellipsis">${zbTitle}</dt>
                            <dd class="zb-des-time">${zbTime}</dd>
                        </div>
                    </a>
                </li>
             `
            thisEle.find(".zb-list").append(zbHtml)
        })
        thisEle.find(".zb-loadMore").unbind()
        if (current_page == last_page) {
            thisEle.find(".zb-loadMore").text("加载完毕")

        } else {
            thisEle.find(".zb-loadMore").text("加载更多")
            clickZbPage()
        }
    }


    // 报错
    function error() {
        alert("哦哦，链接失败了~")
    }

}())