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
    // /**
    //  * 音乐
    //  * 切换
    //  * 单一功能原则
    //  */
    // (function () {
    //     // 实例化
    //     var allMusic = new AllMusic()
    //     var singleMusic = new SingleMusic()
    //     var eventMusic = new EventMusic()
    //     // 触发事件
    //     eventMusic.select()

    //     // 展示所有音乐
    //     function AllMusic() {
    //         this.all = function () {
    //             // 如果标签中所有标签都未被选中，显示第一个ul
    //             var ifAll = true
    //             var dataId
    //             $(".music-top-tag .music-tag-item").each(function () {
    //                 if ($(this).hasClass("music-cur")) {
    //                     ifAll = false
    //                     dataId = $(this).attr("data-id")
    //                 }
    //             })
    //             if (ifAll) {
    //                 $(".music-screen-con .music-list").css("display", "none")
    //                 $(".music-screen-con .music-list:first").css("display", "block")
    //             }
    //             singleMusic.single(ifAll, dataId)
    //         }
    //     }
    //     // 展示单个模块音乐
    //     function SingleMusic() {
    //         this.single = function (status, dataId) {
    //             if (!status) {
    //                 $(".music-screen-con .music-b").css("display", "none")
    //                 $(".music-screen-con .music-b").each(function () {
    //                     if ($(this).attr("data-id") == dataId) {
    //                         $(this).css("display", "block")
    //                     }
    //                 })
    //             }
    //         }
    //     }
    //     // 点击标签触发切换
    //     function EventMusic() {
    //         this.select = function () {
    //             $(".music-top-tag .music-tag-item").each(function () {
    //                 $(this).on("click", function () {
    //                     if (!$(this).hasClass("music-cur")) {
    //                         $(".music-top-tag .music-tag-item").removeClass("music-cur")
    //                         $(this).addClass("music-cur")
    //                         // 每次点击调用
    //                         allMusic.all()
    //                     } else {
    //                         $(".music-top-tag .music-tag-item").removeClass("music-cur")
    //                         // 每次点击调用
    //                         allMusic.all()
    //                     }

    //                 })
    //             })
    //         }
    //     }
    // })();

   
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
                                console.log(tag_val)
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
                console.log(curIndex)
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
            SetHome(this, window.location)
        })

        function SetHome(obj, url) {
            try {
                obj.style.behavior = 'url(#default#homepage)';
                obj.setHomePage(url);
            } catch (e) {
                if (window.netscape) {
                    try {
                        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                    } catch (e) {
                        alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
                    }
                } else {
                    alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
                }
            }
        }
    })();

    /**
     * 开启天气
     */
    // $("#night_show").on("click", function () {
    //     var ele = $(this)
    //     $(".weather-back").css("display", "block")
    //     $(".check-weather").css("display", "none")
    //     $(this).css("display", "none")
    //     $(".iframe_2").css("display", "inline-block")
    //     weatherBack1()
    // })
    // $("#day_show").on("click", function () {
    //     var ele = $(this)
    //     $(".weather-back").css("display", "block")
    //     $(".check-weather").css("display", "none")
    //     $(this).css("display", "none")
    //     $(".iframe_1").css("display", "inline-block")
    //     weatherBack2()
    // })
    // 天气返回
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
    $("#setHome").on("click",function(){
        console.log(123214)
        SetHome("http://daohang.zanhf.com")
    })

    
    // 漫画排序
    // (function () {
    //     $(".h-info-btn a").on("click", function () {
    //         $.ajax({
    //             url: 'http://daohang.zanhf.com/portal/index/getCartoon',
    //             datatype: 'json',
    //             type: "POST",
    //             success: sortRender
    //         });
    //     });

    //     function sortRender(data) {
    //         var data = data["data"];
            
    //         console.log(data)
    //         // 当前模块
    //         var index;
    //         $(".mh-tag-item").each(function () {
    //             if ($(this).hasClass("mh-cur")) {
    //                 index = $(this).index();
    //             }
    //         });
    //         // 清空当前模块
    //         $(".mh-screen-list").eq(index).empty();
    //         // 当前排序
    //         var sort = $(".h-info-link").attr("sort");
    //         if (sort == "desc") {
    //             var arr = data[index];
    //             reMhItem(arr, index);
    //             $(".h-info-link").text("倒序");
    //             $(".h-info-link").attr("sort", "asc");
    //         } else {
    //             data[index].reverse();
    //             reMhItem(data[index], index);
    //             $(".h-info-link").text("正序");
    //             $(".h-info-link").attr("sort", "desc");
    //         }

    //         function reMhItem(arr, index) {
    //             arr.forEach(function (item) {
    //                 html = "\n\t\t\t\t\t\t\t\t\t\t\t<li class=\"mh-screen-item\">\n\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"/portal/manhua_detail.html?id=" + item["id"] + "\" target=\"_blank\" class=\"mh-item-link\"><div class=\"mh-item-img\"><div class=\"item-img-show\" style=\"background-image: url(/upload/" + item["image"] + ");\"></div></div><div class=\"mh-item-right\"><dt class=\"mh-item-title\">" + item["name"] + "</dt><dd class=\"mh-item-des line-ellipsis\">" + item["intro"] + "</dd></div></a></li>\n\t\t\t\t\t\t\t\t\t\t\t";
    //                 $(".mh-screen-list").eq(index).append(html);
    //             });
    //         }
    //     }
    // }())


})