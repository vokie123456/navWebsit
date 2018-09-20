  /**
   * 其他页面跳转回首页
   * 存入缓存
   */

  /**
   * 主页获取缓存的导航
   */
  (function () {
      // 定义获取的导航
      var navItem

      function add_navItem() {
          var push_item = {
              id: 0,
              navItem: navItem,
          }
          LBC_nav.add(push_item)
          navItem = ''
      }

      var LBC_nav = ((function () {
          return {
              add(value) {
                  localStorage.setItem("navItem", JSON.stringify(value))
              },
              get() {
                  return JSON.parse(localStorage.getItem("navItem"))
              },
              remove() {
                  localStorage.removeItem("navItem")
              }
          }
      })());
      //移动端 导航
      $(".m-hid-item").each(function () {
          $(this).on("click", function () {
              navItem = $(this).children(".hid-item-link").text()
              add_navItem()
          })
      })
      // pc端导航
      $(".tag-item").each(function () {
          $(this).on("click", function () {
              navItem = $(this).text()
              add_navItem()
          })
      })

      $("#mbackBtn").on("click", function () {
          navItem = "导航"
          add_navItem()
          $(".tag-item").removeClass("active")
          $(".m-hid-item").children(".hid-item-link").removeClass("hid-item-cur")
          $("#fst_p").css("display", "block")
          $("#sec_p").css("display", "none")
          $("#th_p").css("display", "none")
          $("#fou_p").css("display", "none")
          $("#fif_p").css("display", "none")
          $("#six_p").css("display", "none")
          $("#sev_p").css("display", "none")
          $("#mbackBtn").css("display", "none")
          document.getElementsByClassName("tag-item")[0].classList.add("active")
          document.getElementsByClassName("hid-item-link")[0].classList.add("hid-item-cur")
      })
      /**
       * 导航-图榜
       * 更多
       */
      $("#tubangMore").on("click", function () {
          navItem = "图榜"
          add_navItem()
          $("#fst_p").css("display", "none")
          $("#sec_p").css("display", "none")
          $("#th_p").css("display", "block")
          $("#fou_p").css("display", "none")
          $("#fif_p").css("display", "none")
          $("#six_p").css("display", "none")
          $("#sev_p").css("display", "none")
          $("#sec_p").css("display", "none")
          $("#mbackBtn").css("display", "inline-block")
          $(".tag-list .tag-item").removeClass("active")
          document.getElementsByClassName("tag-item")[2].classList.add("active")
      })

      $("#zixunMore").on("click", function () {
          navItem = "资讯"
          add_navItem()
          $("#fst_p").css("display", "none")
          $("#sec_p").css("display", "block")
          $("#th_p").css("display", "none")
          $("#fou_p").css("display", "none")
          $("#fif_p").css("display", "none")
          $("#six_p").css("display", "none")
          $("#sev_p").css("display", "none")
          $("#mbackBtn").css("display", "inline-block")
          $(".tag-list .tag-item").removeClass("active")
          document.getElementsByClassName("tag-item")[1].classList.add("active")
      })
      //  自定义网站 导航
      $("#iconSetting").on("click", function () {
          navItem = $(this).children(".ico-des").text()
          add_navItem()
          $("#mbackBtn").css("display", "inline-block")
      })
      /**
       * 关闭自定义网站
       */
      $("#zdClose").on("click", function () {
          var push_item = {
              id: 0,
              navItem: "导航",
          }
          LBC_nav.add(push_item)
          $("#fst_p").css("display", "block")
          $("#sec_p").css("display", "none")
          $("#th_p").css("display", "none")
          $("#fou_p").css("display", "none")
          $("#fif_p").css("display", "none")
          $("#six_p").css("display", "none")
          $("#sev_p").css("display", "none")
          $("#mbackBtn").css("display", "none")
          document.getElementsByClassName("tag-item")[0].classList.add("active")
          document.getElementsByClassName("hid-item-link")[0].classList.add("hid-item-cur")
      })
      var store_nav = LBC_nav.get()
      if (store_nav) {
          var store_nav = LBC_nav.get().navItem
          $(".tag-item").removeClass("active")
          $(".m-hid-item").children(".hid-item-link").removeClass("hid-item-cur")
          switch (store_nav) {
              case "导航":
                  $("#fst_p").css("display", "block")
                  $("#sec_p").css("display", "none")
                  $("#th_p").css("display", "none")
                  $("#fou_p").css("display", "none")
                  $("#fif_p").css("display", "none")
                  $("#six_p").css("display", "none")
                  $("#sev_p").css("display", "none")
                  $("#mbackBtn").css("display", "none")
                  document.getElementsByClassName("tag-item")[0].classList.add("active")
                  document.getElementsByClassName("hid-item-link")[0].classList.add("hid-item-cur")
                  break;
              case "资讯":
                  $("#fst_p").css("display", "none")
                  $("#sec_p").css("display", "block")
                  $("#th_p").css("display", "none")
                  $("#fou_p").css("display", "none")
                  $("#fif_p").css("display", "none")
                  $("#six_p").css("display", "none")
                  $("#sev_p").css("display", "none")
                  $("#mbackBtn").css("display", "inline-block")
                  document.getElementsByClassName("tag-item")[1].classList.add("active")
                  document.getElementsByClassName("hid-item-link")[1].classList.add("hid-item-cur")
                  break;
              case "图榜":
                  $("#fst_p").css("display", "none")
                  $("#sec_p").css("display", "none")
                  $("#th_p").css("display", "block")
                  $("#fou_p").css("display", "none")
                  $("#fif_p").css("display", "none")
                  $("#six_p").css("display", "none")
                  $("#sev_p").css("display", "none")
                  $("#mbackBtn").css("display", "inline-block")
                  document.getElementsByClassName("tag-item")[2].classList.add("active")
                  document.getElementsByClassName("hid-item-link")[2].classList.add("hid-item-cur")
                  break;
              case "主题漫画":
                  $("#fst_p").css("display", "none")
                  $("#sec_p").css("display", "none")
                  $("#th_p").css("display", "none")
                  $("#fou_p").css("display", "block")
                  $("#fif_p").css("display", "none")
                  $("#six_p").css("display", "none")
                  $("#sev_p").css("display", "none")
                  $("#mbackBtn").css("display", "inline-block")
                  document.getElementsByClassName("tag-item")[4].classList.add("active")
                  document.getElementsByClassName("hid-item-link")[4].classList.add("hid-item-cur")
                  break;
              case "周边":
                  $("#fst_p").css("display", "none")
                  $("#sec_p").css("display", "none")
                  $("#th_p").css("display", "none")
                  $("#fou_p").css("display", "none")
                  $("#fif_p").css("display", "block")
                  $("#six_p").css("display", "none")
                  $("#sev_p").css("display", "none")
                  $("#mbackBtn").css("display", "inline-block")
                  document.getElementsByClassName("tag-item")[3].classList.add("active")
                  document.getElementsByClassName("hid-item-link")[3].classList.add("hid-item-cur")
                  break;
              case "音乐":
                  $("#fst_p").css("display", "none")
                  $("#sec_p").css("display", "none")
                  $("#th_p").css("display", "none")
                  $("#fou_p").css("display", "none")
                  $("#fif_p").css("display", "none")
                  $("#six_p").css("display", "block")
                  $("#sev_p").css("display", "none")
                  $("#mbackBtn").css("display", "inline-block")
                  document.getElementsByClassName("tag-item")[5].classList.add("active")
                  document.getElementsByClassName("hid-item-link")[5].classList.add("hid-item-cur")
                  break;
              case "新番列表":
                  $("#fst_p").css("display", "none")
                  $("#sec_p").css("display", "none")
                  $("#th_p").css("display", "none")
                  $("#fou_p").css("display", "none")
                  $("#fif_p").css("display", "none")
                  $("#six_p").css("display", "none")
                  $("#sev_p").css("display", "none")
                  $("#mbackBtn").css("display", "inline-block")
                  document.getElementsByClassName("hid-item-link")[6].classList.add("hid-item-cur")
                  break;
              case "自定义":
                  $("#fst_p").css("display", "none")
                  $("#sec_p").css("display", "none")
                  $("#th_p").css("display", "none")
                  $("#fou_p").css("display", "none")
                  $("#fif_p").css("display", "none")
                  $("#six_p").css("display", "none")
                  $("#sev_p").css("display", "block")
                  $("#mbackBtn").css("display", "inline-block")
                  break;
          }
      }
      $(".m-nav-hid").on("click", function () {
          close_nav()
      })
      //关闭移动导航
      function close_nav() {
          $(".m-hid-list").css("width", "0px")
          $(".m-nav-hid").css("display", "none")
          $(".m-nav-btn").attr("data-status", "off")
      }
  })();