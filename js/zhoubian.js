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
                }
            })
            if (ifAll) {
                $(".zb-screen-con .zb-b").css("display", "none")
                $(".zb-screen-con .zb-b:first").css("display", "block")
            }
            singleZb.single(ifAll, dataId)
        }
    }
    // 展示单个模块周边
    function SingleZb() {
        this.single = function (status, dataId) {
            if (!status) {
                $(".zb-screen-con .zb-b").css("display", "none")
                $(".zb-screen-con .zb-b").each(function () {
                    if ($(this).attr("data-id") == dataId) {
                        $(this).css("display", "block")
                    }
                })
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
                    }
                })
            })
        }
    }

    var codeZb
    var pageZb
    var thisEle
    clickZb()

    function clickZb() {
        $(".zb-b").each(function () {
            var sort = $(this).attr("data-id")
            $(this).find(".zb-loadMore").on("click", function (event) {
                var page = $(this).attr("page")
                console.log( event.target)
                thisEle = $(this).parent(".zb-b")
                console.log(sort, page)
                var dataArr = {
                    "page": page,
                    "sort": sort
                }
                var url = "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/zhoubian"
                getZbData(url, dataArr)
            })
        })
    }

    // 加载 周边 页面内容
    function getZbData(url, dataArr) {
        $.ajax({
            url: url,
            dataType: "JSON",
            type: 'GET',
            data: dataArr,
            success: renderZb,
            error: error
        })
    }

    // 渲染页面
    function renderZb(data) {
        var current_page = Number(data["data"]["current_page"])
        var last_page = Number(data["data"]["last_page"])
        console.log(current_page, last_page)

        thisEle.find(".zb-loadMore").attr("page", current_page + 1)
        if (current_page == last_page) {
            thisEle.find(".zb-loadMore").text("加载完毕")
        }
        data = data["data"]["data"]
        console.log(data)
        $.each(data, function (index, item) {
            var zbImg = item["url"]
            var zbTime = item["time"]
            var zbTitle = item["title"]
            var zbHtml = `
             <li class="zb-item">
                <a href="./zhoubian_detail.html" target="_blank" class="zb-link">
                    <div class="zb-img-box">
                        <div class="zb-img-show" style="background-image: url(./img/mob/shouban1.jpg);"></div>
                    </div>
                    <div class="zb-link-des">
                        <dt class="zb-des-title text-ellipsis">${zbTitle}</dt>
                        <dd class="zb-des-time">${zbTime}</dd>
                    </div>
                </a>
              </li>
            `
            console.log(thisEle)
            thisEle.find(".zb-list").append(zbHtml)

        })

    }

    // 报错
    function error() {
        alert("哦哦，链接失败了~")
    }

}())