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
            $("#night_mode").children(".item-img").attr("src", "./img/web/taiyang.png")
            $("#mNightBtn").children(".m-swift").attr("src", "./img/web/taiyang.png")
        } else {
            // 白天
            $("#indexWrap").removeClass("night-mode")
            $("#xfWrap").removeClass("night-mode")
            $("#mhWrap").removeClass("night-mode")
            $("#night_mode").children(".item-img").attr("src", "./img/web/yueliang.png")
            $("#mNightBtn").children(".m-swift").attr("src", "./img/web/yueliang.png")
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
            $(this).find(".m-hid-btn").attr("src", "./img/mob/mkai.png")
        } else {
            $(this).attr("data-status", "day")
            $(this).find(".m-hid-btn").attr("src", "./img/mob/mguan.png")
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
            $(".xf-week-list .xf-week-item").each(function(){
                if($(this).hasClass("m-xf-active")){
                    var curIndex = $(this).index()
                    console.log(curIndex)
                    $(ele).find(".xf-main-list").eq(curIndex).css("display","block")
                }
            })
            // 分类内日期切换
            $(".xf-week-item").each(function () {
                $(this).on("click", function () {
                    xf_item = $(this).index()
                    $(".xf-main-list").css("display", "none")
                    $(".xf-week-item").removeClass("m-xf-active")
                    $(this).addClass("m-xf-active")
                    $(ele).find(".xf-main-list").eq(xf_item).css("display","block")
                })
            })
           

        })
    })
    // 分类内日期切换
    // $(".xf-week-item").each(function () {
    //     $(this).on("click", function () {
    //         var xf_item = $(this).index()
    //         $(".xf-main-list").css("display", "none")
    //         $(".xf-week-item").removeClass("m-xf-active")
    //         $(this).addClass("m-xf-active")
    //         document.getElementsByClassName("xf-main-list")[xf_item].style.display = "block"
    //     })
    // })






})();