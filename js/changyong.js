(function () {
    /**
     * 常用网站
     * 排序，渲染
     */
    var LBC_webNum = function () {
        return {
            add(value) {
                localStorage.setItem("webNum", JSON.stringify(value))
            },
            get() {
                return JSON.parse(localStorage.getItem("webNum"))
            },
            remove() {
                localStorage.removeItem("webNum")
            }
        }
    }
    if (LBC_webNum().get()) {
        renderItem()
    }

    function commonWeb() {
        // 定义统计
        var itemArr = []
        var webItem = {}
        // 点击 增加统计数组 存入缓存
        $(".hid-list .hid-item").each(function () {
            $(this).on("click", function () {
                var itemIndex = $(this).attr("data-id")
                var flag = false
                var name = $(this).find(".hid-web-link").text()
                var link = $(this).find(".hid-web-link").attr("href")
                var des = $(this).find(".des-text").text()

                // console.log(dom)
                if (LBC_webNum().get()) {
                    // 缓存非空
                    itemArr = LBC_webNum().get()
                    $.each(itemArr, function (index, item) {
                        if (itemIndex == item["dataId"]) {
                            item["num"] = item["num"] + 1
                            flag = true
                        }
                    })
                    if (!flag) {
                        webItem = {
                            dataId: itemIndex,
                            num: 1,
                            name: name,
                            link: link,
                            des: des
                        }
                        itemArr.push(webItem)
                    }
                    LBC_webNum().add(itemArr)
                    // 排序渲染
                    sortItem(itemArr)
                } else {
                    // 缓存为空
                    webItem = {
                        dataId: itemIndex,
                        num: 1,
                        name: name,
                        link: link,
                        des: des
                    }
                    itemArr.push(webItem)
                    LBC_webNum().add(itemArr)
                    // 渲染
                    renderItem()
                }
            })
        })
    }

    function sortItem(itemArr) {
        var temp = {}
        var len = itemArr.length
        for (var i = 0; i < len - 1; i++) {
            for (var j = 0; j < len - i - 1; j++) {
                if (itemArr[j]["num"] < itemArr[j + 1]["num"]) {
                    temp = itemArr[j];
                    itemArr[j] = itemArr[j + 1];
                    itemArr[j + 1] = temp;
                }
            }
        }
        LBC_webNum().add(itemArr)
        renderItem()
    }

    function renderItem() {
        $(".hid-list").eq(0).empty()
        itemArr = LBC_webNum().get()
        console.log(itemArr)
        itemArr.forEach(function (item) {
            var dataId = item["dataId"]
            var name = item["name"]
            var link = item["link"]
            var des = item["des"]
            // $(".hid-list .hid-item").each(function () {
            //     if ($(this).attr("data-id") == dataId) {
            //     }
            // })
            var html = `
                    <li class="hid-item col-lg-3 col-md-4 col-sm-6 col-xs-6" data-id="${dataId}">
                        <a href=${link} target="_blank" class="hid-web-link">${name}</a>
                        <span class="m-web-des"></span>
                        <span class="web-link-des">
                            <span class="des-text">
                                 ${des}
                            </span>
                        </span>
                    </li>  
                 `
            $(".hid-list").eq(0).append(html)
        })

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
    }
    
    // 调用函数
    commonWeb()

}())