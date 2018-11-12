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
                    console.log("这个dataId" + dataId)
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
        var url = "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/musicAll?sort_id=0"
        getMusicData(url, page)
    }
    // 初始化周边对应的 分类
    function initMusicSort(curPageId) {
        var page = 1
        var url = "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/musicFenlei?sort_id=" + curPageId
        console.log(url)
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
                    console.log("所有")
                    // 1. 所有分类 url=> "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/musicAll?sort_id=0
                    var url = "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/musicAll?sort_id=0"
                    getMusicData(url, curPageNum)
                } else {
                    console.log("分类分类")
                    // 2.独立模块url = "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/musicFenlei?sort_id=" + curPageId
                    var url = "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/musicFenlei?sort_id=" + curPageId
                    getMusicData(url, curPageNum)
                }
            })
        })
    }

    // 加载 周边 页面内容
    function getMusicData(url, page) {
        console.log(url + "&page=" + page)
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
        console.log(data)
        var current_page = Number(data["data"]["current_page"])
        var last_page = Number(data["data"]["last_page"])
        console.log(current_page, last_page)
        console.log(thisEle)
        if (!thisEle) {
            thisEle = $(".music-b").eq(0)
            console.log("清空")
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
            var musicHtml = `
                <li class="music-item clear" music-id="${musicId}">
                    <a href="${musicUrl}" class="music-link">
                        <div class="music-img" style="background-image: url(https://p1.music.126.net/5pPUU5B_eRSXhiDVAairmw==/109951163277987820.jpg);"></div>
                        <div class="music-img-bg"></div>
                        <dt class="music-name text-ellipsis">${musicTitle}</dt>
                        <dd class="music-singer text-ellipsis">${musicDes}</dd>
                    </a>
                </li>
             `
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

}())