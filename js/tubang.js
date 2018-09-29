/**
 * 定义函数
 */
(function (root) {
    var cache

    function tubang() {
        var imgData
        this.getDate = function (url, fn) {
            $.ajax({
                type: "GET",
                url: url,
                success: fn,
                erro: this.error,
            })
        }
        // 滚动加载
        this.scrollLoad = function () {
            window.onscroll = function () {
                preLoad(cache)
            }
        }
    }

    // 预加载
    function preLoad(data) {
        var loadNum = 50
        cache = data.data
        // console.log(cache)
        // 初始化
        initLoad(loadNum, cache)
        var items = document.getElementById('tubangBox').children
        window.onscroll = function () {
            // console.log(25477)
            if (getClient().height + getScrollTop() >= items[items.length - 1].offsetTop) {
                if (cache.length > loadNum) {
                    cache.splice(0, loadNum)
                    initLoad(loadNum, cache)
                }
            }
        }
    }

    function initLoad(loadNum, cache) {
        // 一次加载5张图片
        for (var i = 0; i <= loadNum; i++) {
            (function (i) {
                var img = new Image()
                var index = i
                // console.log(index)
                if (cache[index]) {
                    img.src = cache[index]["url"]
                    var name = cache[index]["name"]
                    var link = cache[index]["link"]
                    var from = cache[index]["from"]

                    img.setAttribute("class", "img-show")
                    lazyLoad(index, img, [name, link, from])
                    i++
                }
            })(i)
        }
    }

    // 懒加载
    function lazyLoad(index, imgDom,data) {
        var index = (index % 5)
        var name = data[0]
        var link = data[1]
        var from = data[2]
        var i = 0
        var htmlTb =
            ` <li class="tubang-item">
                <a href="${link}" target="_blank" class="tubang-link">
                    <div class="tb-top-img"></div>
                    <div class="tb-bot-des">
                        <span class="tb-des-text line-ellipsis">${name}</span>
                        <div class="tb-illus-text">
                            <span class="illus-tag">lllus by</span>
                            <strong class="illus-strong">${from}</strong>
                        </div>
                    </div>
                </a>
            </li>
            `
        $(".tb-screen-list").each(function () {
            if (i == index) {
                $(this).append(htmlTb)
                $(this).find(".tb-top-img:last").append(imgDom)
            }
            i++
        })
    }

    tubang.prototype = {
        error: function () {
            console.log("error!")
        }
    }

    // clientWidth 处理兼容性
    function getClient() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
    }
    // scrollTop兼容性处理
    function getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    root.tubang = tubang
    root.preLoad = preLoad
    root.lazyLoad = lazyLoad
}(window.tubang || (window.tubang = {})))

/**
 * 定义变量
 */
var root = window.tubang
var tubang = new root.tubang
var preLoad = root.preLoad
var lazyLoad = root.lazyLoad
var url = "../api/imgs.json"

/**
 * 调用变量
 */
tubang.getDate(url, preLoad)