/**
 * 开启 关闭
 * 夜间模式
 */
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
    var LBC_night = ((function () {
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
    })())
    // 调取缓存状态，切换夜间模式
    function night_mode(nightMode) {
        if (nightMode == "day") {
            // 夜间 
            $("#indexWrap").addClass("night-mode")
            $("#xfWrap").addClass("night-mode")
            $("#mhWrap").addClass("night-mode")
            $("#night_mode").children(".item-img").attr("src", "./img/web/taiyang.png")
            $("#mNightBtn").children(".m-swift").attr("src", "./img/web/taiyang.png")
            $("#dnImg").attr("src", "./img/mob/mkai.png")
            if ($(".iframe_1").css("display") != "inline-block" && $(".iframe_2").css("display") != "inline-block") {
                $("#day_show").css("display", "none")
                $("#night_show").css("display", "inline-block")
            }
        } else {
            // 白天
            $("#indexWrap").removeClass("night-mode")
            $("#xfWrap").removeClass("night-mode")
            $("#mhWrap").removeClass("night-mode")
            $("#night_mode").children(".item-img").attr("src", "./img/web/yueliang.png")
            $("#mNightBtn").children(".m-swift").attr("src", "./img/web/yueliang.png")
            $("#dnImg").attr("src", "./img/mob/mguan.png")
            if ($(".iframe_1").css("display") != "inline-block" && $(".iframe_2").css("display") != "inline-block") {
                $("#day_show").css("display", "inline-block")
                $("#night_show").css("display", "none")
            }
        }
    }
    $("#night_mode").on("click", function () {
        nightMode = $(this).attr("data-status")
        add_nightItem()
        night_mode()
        // 增删 白天夜晚 样式
        night_mode(nightMode)
        if (nightMode == "day") {
            $(this).attr("data-status", "night")
            $("#mNight").attr("data-status", "night")
        } else {
            $(this).attr("data-status", "day")
            $("#mNight").attr("data-status", "day")
        }
    })
    if (LBC_night.get()) {
        if (LBC_night.get().nightMode != "day") {
            $("#night_mode").attr("data-status", "day")
            $("#mNightBtn").attr("data-status", "day")
            $("#dnImg").attr("src", "./img/mob/mkai.png")
        } else {
            $("#night_mode").attr("data-status", "night")
            $("#mNightBtn").attr("data-status", "night")
            $("#dnImg").attr("src", "./img/mob/mguan.png")
        }
    }
    // 增删 白天夜晚 样式
    if (LBC_night.get()) {
        night_mode(LBC_night.get().nightMode)
    }

})();