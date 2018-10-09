/**
 * 导航
 * 主页
 */
/**
 * 初始属性
 */
function init() {
    this.pageW = $(window).width()
}
$(document).ready(function () {
    /**
     * 资讯列表切换
     */
    $(".zx-r-item").each(function () {
        $(this).on("click", function () {
            var zx_index = $(this).index()
            $(".zx-det-list").css("display", "none")
            $(".zx-r-item").removeClass("zx_r_active")
            document.getElementsByClassName("zx-det-list")[zx_index].style.display = "block"
            document.getElementsByClassName("zx-r-item")[zx_index].classList.add("zx_r_active")
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
        var url = "../api/search.json"
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
                        var html_search = `
                                <li class="form_box" category="${i+1}">
                                    <form action="${dataArr[0]["action"]}" method="GET" target="_blank" class="s-form">
                                        <div class="params">
                                            
                                            <input class="params-item" type="hidden" name="${dataArr[0]["params"]}" value="${dataArr[0]["value"]}">
                                            <input type="hidden" name="ie" value="utf-8" style="">
                                        </div>
                                        <div class="opt-wr">
                                            <div class="s-opt-container" category="${i+1}">
                                            </div>
                                            <span class="s-opt-logo">
                                                <a href="${dataArr[0]["home"]}" target="_blank" class="baidu logo-show" style="background-image: url(/upload/${dataArr[0]["img"]});">baidu</a>
                                            </span>
                                            <div class="toggle"></div>
                                        </div>
                                        <span class="ipt-wr">
                                            <input type="text" class="keyword" name="${dataArr[0]["ipt"]}" placeholder="${dataArr[0]["placeholder"]}" autocomplete="off" maxlength="100">
                                        </span>
                                        <span class="btn-wr">
                                            <input type="submit" class="search" value="${dataArr[0]["btn"]}">
                                        </span>
                                    </form>
                                </li>
                        `
                        $(" .s-panel").append(html_search)
                        // 插入模块搜索选项
                        // 取出每一组所有id，图标，web
                        var len = dataArr.length
                        for (var j = 0; j < len; j++) {
                            var dataOpt = dataArr[j]
                            var opt_html = `
                                <a class="opt-img baidu" category="${j}" style="background-image: url(/upload/${dataOpt["backgroundImage"]});">${dataOpt["web"]}</a>
                            `
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
                    add(value) {
                        localStorage.setItem("searchArr", JSON.stringify(value))
                    },
                    get() {
                        return JSON.parse(localStorage.getItem("searchArr"))
                    },
                    remove() {
                        localStorage.removeItem("searchArr")
                    }
                }
            }
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
                    console.log(selected)
                    // 渲染到当天显示页面
                    $(".form_box").each(function () {
                        if ($(this).hasClass("active")) {
                            console.log(selected["value"])
                            console.log($(this).find(".params .params-item"))
                            $(this).find(".s-form").attr("action", selected["action"])
                            $(this).find(".params .params-item").attr("name", selected["params"]).attr("value", selected["value"])
                            $(this).find(".keyword").attr("name", selected["ipt"]).attr("placeholder", selected["placeholder"])
                            $(this).find(".search").attr("value", selected["btn"])
                        }
                    })
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
                        $(".m-search-container").find(".s-tab li").each(function () {
                            var tag1_text
                            var tag2_text
                            var tag3_text
                            if ($(this).attr("category") == "1") {
                                tag1_text = $(this).text()
                            } else if ($(this).attr("category") == "2") {
                                tag2_text = $(this).text()
                            } else {
                                tag3_text = $(this).text()
                            }
                            $(this).on("click", function () {
                                var tag_val = $(this).attr("category")
                                /**
                                 * 移动端
                                 * 商品和网页切换
                                 */
                                if (tag_val == "2") {
                                    $(".s-tab li[category = 2]").css("display", "none")
                                    $(".s-tab li[category = 1]").css("display", "block")
                                    $(".m-c-tag").text(tag2_text)
                                } else if (tag_val == "1") {
                                    $(".s-tab li[category = 2]").css("display", "block")
                                    $(".s-tab li[category = 1]").css("display", "none")
                                    $(".m-c-tag").text(tag1_text)
                                } else {
                                    $(".m-c-tag").text(tag3_text)
                                }
                                //关闭网址列表
                                $(".m-select-category").prev(".s-tab").css("display", "none")
                                $(".m-select-category").attr("data-status", "off")
                                $(".m-select-category").find(".toggle").removeClass("open")
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
            $(".web-all").css("marginTop", marginH)
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
            // webEles[4].style.marginTop = showH + 30 + 'px'
            // webEles[5].style.marginTop = showH + 30 + 'px'
            // webEles[6].style.marginTop = showH + 30 + 'px'
            // webEles[7].style.marginTop = showH + 30 + 'px'
            $(".webs-item").each(function () {
                $(this).on("click", function () {
                    if ($(this).find(".webs-item-btn").hasClass("click")) {
                        // 收起
                        $(".webs-item").css("marginTop", "5px")
                        $(".webs-item-btn").removeClass("click")
                        $(this).find(".webs-item-hid").css("display", "none")
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
                        }
                    }
                })
            })
        } else if (this.pageW >= 992 && this.pageW < 1300) {
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
            $(".webs-item-hid").css("width", pageW)
            //获取第一个 webs-item-hid 高度
            // 展开第一项
            var hid_one_h = document.getElementsByClassName("webs-item-hid")[0].offsetHeight
            // document.getElementsByClassName("webs-item")[2].style.marginTop = hid_one_h + 30 + 'px'
            // document.getElementsByClassName("webs-item")[3].style.marginTop = hid_one_h + 30 + 'px'
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
            // document.getElementsByClassName("webs-item")[2].style.marginTop = hid_one_h + 30 + 'px'
            // document.getElementsByClassName("webs-item")[3].style.marginTop = hid_one_h + 30 + 'px'
            /**
             * 网页大全
             * 按钮切换
             * 显示隐藏菜单
             */
            $(".webs-item").each(function () {
                $(this).on("click", function () {
                    if ($(this).find(".webs-item-btn").hasClass("click")) {
                        // 收起
                        $(".webs-item").css("marginTop", "2px")
                        $(".webs-item-btn").removeClass("click")
                        $(this).find(".webs-item-hid").css("display", "none")
                        $(".web-link-des").css("display", "none")
                    } else {
                        // 展开
                        var index = $(this).index()
                        $(".webs-item-btn").removeClass("click")
                        $(this).children(".webs-item-btn").addClass("click")
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
                            $(this).css("marginTop", "2px")
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
     * 左侧固定栏
     */
    (function () {
        /**
         * 左侧固定栏 
         * 展开收起，存入缓存
         */
        var LBC_leftFix = (function () {
            return {
                add(value) {
                    localStorage.setItem("leftFix", JSON.stringify(value))
                },
                get() {
                    return JSON.parse(localStorage.getItem("leftFix"))
                },
                remove() {
                    localStorage.removeItem("leftFix")
                }
            }
        })();

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
                $(this).addClass("fix-select");
                var index_main = $(this).index();
                //展开对应的二级列表
                show_detail(index_main);
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
            switch (index) {
                case 0:
                    $(".list_xinfan").css("display", "block")
                    //展开三级列表
                    xinfan_show(".xinfan_item", "xinfan_show")
                    break;
                case 1:
                    $(".list_shouban").css("display", "block")
                    //无三级内容 加右边看
                    $(".list_shouban").css("borderRight", "1px solid #e1e1e1")
                    break;
                case 2:
                    $(".list_gonggao").css("display", "block")
                    $(".list_gonggao").css("borderRight", "1px solid #e1e1e1")
                    break;
                case 3:
                    $(".list_mianze").css("display", "block")
                    $(".list_mianze").css("borderRight", "1px solid #e1e1e1")
                    break;
            }
        }

        function xinfan_show(eleSec, eleTh) {
            $(eleSec).hover(function () {
                var index_xq = $(this).index()
                $('.' + eleTh).css("display", "none")
                switch (index_xq) {
                    case 0:
                        $(".xf_mon").css("display", "block")
                        /**
                         * 左侧固定栏
                         * 三级列表hover
                         */
                        xinfan_detail(".xf_mon");
                        break;
                    case 1:
                        $(".xf_tues").css("display", "block")
                        xinfan_detail(".xf_tues");
                        break;
                    case 2:
                        $(".xf_wen").css("display", "block")
                        xinfan_detail(".xf_wen");
                        break;
                    case 3:
                        $(".xf_thur").css("display", "block")
                        xinfan_detail(".xf_thur");
                        break;
                    case 4:
                        $(".xf_fri").css("display", "block")
                        xinfan_detail(".xf_fri");
                        break;
                    case 5:
                        $(".xf_sat").css("display", "block")
                        xinfan_detail(".xf_sat");
                        break;
                    case 6:
                        $(".xf_sun").css("display", "block")
                        xinfan_detail(".xf_sun");
                        break;
                }
                var ele = document.getElementsByClassName(eleTh)
                ele[index_xq].style.display = "block"
            })
            // 展开三级列表
            document.getElementsByClassName(eleTh)[0].style.display = "block"
        }

        function xinfan_detail(eleXf) {
            $(eleXf + " " + ".xinfan-item").each(function () {
                $(this).hover(function () {
                    $(eleXf + " " + ".xinfan-item").removeClass("f-l-active")
                    $(this).addClass("f-l-active")
                }, function () {
                    $(".xinfan-item").removeClass("f-l-active")
                })
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
                $(".m-btn-img").attr("src", "./img/mob/jiantou2.png")
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
                    $(".m-btn-img").attr("src", "./img/mob/jiantou1.png")
                    $(".nav-icon-wrap").css("paddingBottom", "30px")
                    $(".m-icon-show").attr("data-status", "on")
                } else {
                    $(".nav-icon-wrap").css("height", "126px")
                    $(".nav-icon-wrap .icon-box").css("height", "96px")
                    $(".m-btn-img").attr("src", "./img/mob/jiantou2.png")
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
     * 音乐
     * 切换
     * 单一功能原则
     */
    (function () {
        // 实例化
        var allMusic = new AllMusic()
        var singleMusic = new SingleMusic()
        var eventMusic = new EventMusic()
        // 触发事件
        eventMusic.select()

        // 展示所有音乐
        function AllMusic() {
            this.all = function () {
                // 如果标签中所有标签都未被选中，显示第一个ul
                var ifAll = true
                var dataId
                $(".music-top-tag .music-tag-item").each(function () {
                    if ($(this).hasClass("music-cur")) {
                        ifAll = false
                        dataId = $(this).attr("data-id")
                    }
                })
                if (ifAll) {
                    $(".music-screen-con .music-list").css("display", "none")
                    $(".music-screen-con .music-list:first").css("display", "block")
                }
                singleMusic.single(ifAll, dataId)
            }
        }
        // 展示单个模块音乐
        function SingleMusic() {
            this.single = function (status, dataId) {
                if (!status) {
                    $(".music-screen-con .music-list").css("display", "none")
                    $(".music-screen-con .music-list").each(function () {
                        if ($(this).attr("data-id") == dataId) {
                            $(this).css("display", "block")
                        }
                    })
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
                        }

                    })
                })
            }
        }
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
    $("#night_show").on("click", function () {
        $(this).css("display", "none")
        $(".iframe_2").css("display", "inline-block")
    })
    $("#day_show").on("click", function () {
        console.log(213213213)
        $(this).css("display", "none")
        $(".iframe_1").css("display", "inline-block")
    })

    // /**
    //  * 设为主页
    //  */ 

    // function SetHome(url) {
    //     if (document.all) {
    //         document.body.style.behavior = 'url(#default#homepage)';
    //         document.body.setHomePage(url);
    //     } else {
    //         alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
    //     }
    // }
    // $("#setHome").on("click",function(){
    //     console.log(123214)
    //     SetHome("http://daohang.zanhf.com")
    // })

})