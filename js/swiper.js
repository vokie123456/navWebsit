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
        $(this).children(".icon-suo").attr("src", "./img/web/suo2.png")
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
        $(this).children(".icon-suo").attr("src", "./img/web/suo.png")
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
      $(this).children(".con-btn").attr("src", "./img/mob/suo.png")
      $(this).find(".m-hid-btn").attr("src", "./img/mob/mguan.png")
      $(this).attr("data-status", "off")
      // 停止轮播
      $(".swiper-container").find(".swiper-slide").each(function () {
        $(this).addClass("swiper-no-swiping")
      })
      // 停止自动轮播
      swiper.autoplay.stop()
    } else {
      $(this).children(".con-btn").attr("src", "./img/mob/suo2.png")
      $(this).find(".m-hid-btn").attr("src", "./img/mob/mkai.png")
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
        $(this).find(".m-hid-btn").attr("src","./img/mob/mkai.png")
      } else {
        $(this).attr("data-status", "day")
        $(this).find(".m-hid-btn").attr("src","./img/mob/mguan.png")
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