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
     */
    (function () {
        /**
         * 头部搜索功能
         * 展示、隐藏
         */
        init();
        // document.getElementsByClassName("webs-item-hid")[0].style.display = "none"
        $(window).on("scroll", function () {
            var windowH = $(window).scrollTop()
            // console.log("不该打印的打印"+windowH)
            if (windowH >= 200) {
                $(".search-header").css("display", "block")
                $(".main_search").css("display", "none")
            } else {
                $(".search-header").css("display", "none")
                $(".main_search").css("display", "block")
            }
        })

        /**
         * 搜索功能
         * 标签切换
         * 对应form表单切换
         */
        $(".s-tab li").each(function () {
            $(this).on("click", function () {
                var tab = $(this).attr("category")
                $(".s-tab li").removeClass("active")
                $(".s-tab li[category=" + tab + "]").each(function () {
                    $(this).addClass("active")
                })
                // $(this).addClass("active")
                // console.log($(".s-panel li[category= " + tab + "]"))
                $(".s-panel li").css("display", "none")
                $(".s-panel li[category=" + tab + "]").each(function () {
                    $(this).css("display", "block")
                })

            })
        })
        init();
        if (this.pageW > 768) {
            /**
             * 展开搜索选项
             */
            $(".toggle").on("click", function () {
                if ($(this).hasClass("open")) {
                    $(this).removeClass("open")
                    $(this).siblings(".s-opt-container").css("display", "none")
                } else {
                    $(this).addClass("open")
                    $(this).siblings(".s-opt-container").css("display", "block")
                }
            })
        }

        /**
         * 选择对应的搜索页面
         */
        $(".opt-img").each(function () {
            $(this).on("click", function () {
                var form_tab;
                $(this).parent(".s-opt-container").css("display", "none")
                $(this).parent(".s-opt-container").siblings(".toggle").removeClass("open")
                $(".s-tab li").each(function () {
                    // 获取点击当前搜索分类
                    if ($(this).hasClass("active")) {
                        form_tab = $(this).attr("category")
                    }
                })
                var ele = $(this).parent(".s-opt-container").next(".s-opt-logo").children(".logo-show")
                var category = $(this).attr("category")
                // 后台获取对应搜索页面结构
                // 只模拟了 “网页” “视频” 数据
                $.ajax({
                    type: "GET",
                    url: "https://www.easy-mock.com/mock/5b1f6c63932dab78e63b3984/hscourt/search",
                    data: form_tab,
                    success: function (data, state) {
                        switch (form_tab) {
                            case "web":
                                var webData = data.data.web
                                var action
                                var name_params
                                var val_params
                                var form = $(".form_box[category = web]")
                                // 确定选中的搜索网页
                                switch (category) {
                                    case "baidu":
                                        action = webData.baidu.action
                                        form.children(".s-form").attr("action", action)
                                        var len = webData.baidu.params.length
                                        form.find(".params").empty()
                                        for (var i = 0; i < len; i++) {
                                            (function (index) {
                                                name_params = webData.baidu.params[index].name
                                                val_params = webData.baidu.params[index].value
                                                var html =
                                                    '<input type="hidden" name="' +
                                                    name_params +
                                                    '" value="' +
                                                    val_params +
                                                    '"> ';
                                                form.find(".params").append(html)
                                            })(i);
                                        }
                                        var name = webData.baidu.ipt.name
                                        var placeholder = webData.baidu.ipt.placeholder
                                        form.find(".keyword").attr("name", name).attr("placeholder", placeholder)
                                        var home = webData.baidu.home
                                        var backgroundImage = webData.baidu.backgroundImage
                                        var html_logo =
                                            '<a href="' + home + '" target="_blank" class="baidu logo-show" style="background-image:' +
                                            backgroundImage + ';">' + category + "</a>";
                                        form.find(".s-opt-logo").empty().append(html_logo)
                                        form.find(".search").val(webData.baidu.btn.value)
                                        break;
                                    case "google":
                                        action = webData.google.action
                                        form.children(".s-form").attr("action", action)
                                        var len = webData.google.params.length
                                        form.find(".params").empty()
                                        for (var i = 0; i < len; i++) {
                                            (function (index) {
                                                name_params = webData.google.params[index].name
                                                val_params = webData.google.params[index].value
                                                var html =
                                                    '<input type="hidden" name="' +
                                                    name_params +
                                                    '" value="' +
                                                    val_params +
                                                    '"> ';
                                                form.find(".params").empty().append(html)
                                            })(i);
                                        }
                                        var name = webData.google.ipt.name
                                        var placeholder = webData.google.ipt.placeholder
                                        form.find(".keyword").attr("name", name).attr("placeholder", placeholder)
                                        var home = webData.google.home
                                        var backgroundImage = webData.google.backgroundImage
                                        var html_logo =
                                            '<a href="' + home + '" target="_blank" class="google logo-show" style="background-image: ' +
                                            backgroundImage + ';">' + category + "</a>";
                                        form.find(".s-opt-logo").empty().append(html_logo)
                                        form.find(".search").val(webData.google.btn.value)
                                        break;
                                }
                                break;
                            case "video":
                                var webData = data.data.video
                                var action
                                var name_params
                                var val_params
                                var form = $(".form_box[category = video]")
                                switch (category) {
                                    case "bilibili":
                                        action = webData.bilibili.action
                                        form.children(".s-form").attr("action", action)
                                        var len = webData.bilibili.params.length
                                        form.find(".params").empty()
                                        for (var i = 0; i < len; i++) {
                                            (function (index) {
                                                name_params = webData.bilibili.params[index].name
                                                val_params = webData.bilibili.params[index].value
                                                var html =
                                                    '<input type="hidden" name="' +
                                                    name_params +
                                                    '" value="' +
                                                    val_params +
                                                    '"> ';
                                                form.find(".params").append(html)
                                            })(i);
                                        }
                                        var name = webData.bilibili.ipt.name
                                        var placeholder = webData.bilibili.ipt.placeholder
                                        form.find(".keyword").attr("name", name).attr("placeholder", placeholder)
                                        var home = webData.bilibili.home
                                        var backgroundImage = webData.bilibili.backgroundImage
                                        var html_logo =
                                            '<a href="' + home + '" target="_blank" class="bilibili logo-show" style="background-image:' +
                                            backgroundImage + ';">' + category + "</a>";
                                        form.find(".s-opt-logo").empty().append(html_logo)
                                        form.find(".search").val(webData.bilibili.btn.value)
                                        break;
                                    case "acfun":
                                        action = webData.acfun.action
                                        form.children(".s-form").attr("action", action)
                                        var len = webData.acfun.params.length
                                        form.find(".params").empty()
                                        for (var i = 0; i < len; i++) {
                                            (function (index) {
                                                name_params = webData.acfun.params[index].name
                                                val_params = webData.acfun.params[index].value
                                                var html =
                                                    '<input type="hidden" name="' +
                                                    name_params +
                                                    '" value="' +
                                                    val_params +
                                                    '"> ';
                                                form.find(".params").empty().append(html)
                                            })(i);
                                        }
                                        var name = webData.acfun.ipt.name
                                        var placeholder = webData.acfun.ipt.placeholder
                                        form.find(".keyword").attr("name", name).attr("placeholder", placeholder)
                                        var home = webData.acfun.home
                                        var backgroundImage = webData.acfun.backgroundImage
                                        var html_logo =
                                            '<a href="' + home + '" target="_blank" class="acfun logo-show" style="background-image: ' +
                                            backgroundImage + ';">' + category + "</a>";
                                        form.find(".s-opt-logo").empty().append(html_logo)
                                        form.find(".search").val(webData.acfun.btn.value)
                                        break;
                                }
                                break;
                            default:
                                break;
                        }
                    },
                })
            })
        })
        if (pageW > 768 && pageW <= 992) {
            /**
             * 移动端
             * 确定搜索
             */
            $(".btn-wr")
        }
        if (pageW <= 768) {
            /**
             * 移动端 
             * 动态赋值搜索标签宽度
             */
            var holyW = $(".m-search-container").find(".m-select-category").width() + $(".m-search-container").find(".opt-wr").width() + $(".m-search-container").find(".ipt-wr").width() + $(".m-search-container").find(".btn-wr").width() + 5
            // console.log(holyW)
            // 赋值
            // $(".m-search-container .s-tab").css("width", holyW)
            /**
             * 展开搜索选项
             */
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
                        $(this).on("click", function () {
                            var tag_val = $(this).text()
                            /**
                             * 移动端
                             * 商品和网页切换
                             */
                            if (tag_val == "商品") {
                                $(".s-tab li[category = goods]").css("display", "none")
                                $(".s-tab li[category = web]").css("display", "block")
                            } else if (tag_val == "网页") {
                                $(".s-tab li[category = goods]").css("display", "block")
                                $(".s-tab li[category = web]").css("display", "none")
                            }
                            $(".m-c-tag").text(tag_val)
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
     */
    (function () {
        $(".music-tag-item").each(function () {
            $(this).on("click", function () {
                var music_tag = $(this).attr("data-tag")
                if ($(this).hasClass("music-cur")) {
                    $(this).removeClass("music-cur")
                    $("#all_js").css("display", "block")
                    $("#op_js").css("display", "none")
                    $("#ost_js").css("display", "none")
                    $("#other_js").css("display", "none")
                } else {
                    $(".music-tag-item").removeClass("music-cur")
                    $(this).addClass("music-cur")
                    switch (music_tag) {
                        case "op_ed":
                            $("#op_js").css("display", "block")
                            $("#ost_js").css("display", "none")
                            $("#other_js").css("display", "none")
                            $("#all_js").css("display", "none")
                            break;
                        case "ost":
                            $("#op_js").css("display", "none")
                            $("#ost_js").css("display", "block")
                            $("#other_js").css("display", "none")
                            $("#all_js").css("display", "none")
                            break;
                        case "other":
                            $("#op_js").css("display", "none")
                            $("#ost_js").css("display", "none")
                            $("#other_js").css("display", "block")
                            $("#all_js").css("display", "none")
                            break;
                    }
                }

            })
        })
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
})