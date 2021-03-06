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
            console.log(tag_text)
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
                case "主题漫画":
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
                    case "主题漫画":
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
})