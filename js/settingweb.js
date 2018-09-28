/**
 * 自定义网站
 */
(function () {
    /**
     * 渲染列表
     * 删除、增加、还原
     */
    // 缓存一 要展示网站 下
    var curList = []
    var LBC_cur = (function () {
        return {
            add(value) {
                localStorage.setItem("curList", JSON.stringify(value))
            },
            get() {
                return JSON.parse(localStorage.getItem("curList"))
            },
            remove() {
                localStorage.removeItem("curList")
            }
        }
    })();


    // 初始化
    if (!LBC_cur.get()) {
        init();
    } else {
        show_bottom()
    }
    // 1.还原预设站点
    $("#rezjBtn").on("click", function () {
        alert("提示：此操作不可恢复哦，确定要恢复初始网址么？")
        init();
    })
    // 初始化
    function init() {
        // ajax获取预设站点,推入缓存, 
        // 渲染下方列表
        // 根据下方列表获取选中项
        // 根据选中项,渲染上方列表
        resetWeb();
    }
    function resetWeb() {
        $("#zdyForm").empty();
        $("#iconList").empty()
        // 获取原始网站列表
        $.ajax({
            type: "GET",
            // url: "https://www.easy-mock.com/mock/5b1f6c63932dab78e63b3984/hscourt/orig_list",
            url:'../api/web.json',
            data: "",
            dataType: "json",
            success: function (data) {
                // 把数据存入要列表缓存 并显示
                var len = data.data.length
                for (var i = 0; i < len; i++) {
                    (function (index) {
                        var id = data.data[index].id
                        var checked = data.data[index].checked
                        var name = data.data[index].name
                        var url = data.data[index].url
                        var image = data.data[index].image
                        var list = {
                            id: id,
                            child: {
                                checked: checked,
                                name: name,
                                url: url,
                                image: image,
                            }
                        }
                        curList.push(list)
                    })(i);
                }
                LBC_cur.add(curList)
                curList = []
                // 渲染在下列表
                show_bottom()
            }
        })
    }

    function show_bottom() {
        // 清空原有下方列表
        var id
        var checked
        var url
        var name
        var image
        $("#zdyForm").empty()
        var len = LBC_cur.get().length
        for (var i = 0; i < len; i++) {
            (function (index) {
                id = LBC_cur.get()[index].id
                checked = LBC_cur.get()[index].child.checked
                name = LBC_cur.get()[index].child.name
                url = LBC_cur.get()[index].child.url
                image = LBC_cur.get()[index].child.image
                // 渲染到下列表
                if (!checked) {
                    var html_false = `
                        <div class="zdy-f-item">
                            <input type="checkbox"  class="zdy-web-select" name="sel_web"
                                value="${name}" data-id="${id}">
                            <span class="zdy-web-icon">
                                <img src="/upload/${image}" class="icon-img">
                            </span>
                            <label class="zdy-f-lab" for="sel_web" data-site="${url}">${name}</label>
                            <span class="delet-icon">
                                <img src="./img/web/delet.png" alt="删" class="icon-img">
                            </span>
                        </div>
                     `
                    $("#zdyForm").append(html_false)
                } else {
                    var html = `
                        <div class="zdy-f-item">
                            <input type="checkbox" checked="checked" class="zdy-web-select" name="sel_web"
                                value="${name}" data-id="${id}">
                            <span class="zdy-web-icon zdy-active">
                                <img src="${image}" class="icon-img">
                            </span>
                            <label class="zdy-f-lab" for="sel_web" data-site="${url}">${name}</label>
                            <span class="delet-icon">
                                <img src="./img/web/delet.png" alt="删" class="icon-img">
                            </span>
                        </div>
                     `
                    $("#zdyForm").append(html)
                }

            })(i);
        }
        // 渲染到上方列表
        show_top()
    }

    function show_top() {
        $("#iconList").empty()
        // 网站上设置图标
        var web_setting = `
                <a class="icon-item" id="iconSetting">
                    <dt class="icon-pic-wrp" id="settingBtn">
                        <img class="icon-pic" src="./img/web/shezhi.png" alt="自定义">
                    </dt>
                    <dd class="ico-des text-ellipsis">自定义</dd>
                </a>    
                `
        $("#iconList").append(web_setting)
        // 绑定事件
        open_set();
        // 循环渲染选中缓存
        var len = LBC_cur.get().length
        for (var i = 0; i < len; i++) {
            (function (index) {
                var id = LBC_cur.get()[index].id
                var checked = LBC_cur.get()[index].child.checked
                var name = LBC_cur.get()[index].child.name
                var url = LBC_cur.get()[index].child.url
                var image = LBC_cur.get()[index].child.image
                if (checked) {
                    // 渲染到上列表
                    var html_top = `
                        <a href="${url}" class="icon-item" target="_blank"  data-id="${id}">
                            <div class="icon-pic-wrp">
                                <img src="${image}"
                                    alt="" class="icon-pic">
                            </div>
                            <dd class="ico-des text-ellipsis">${name}</dd>
                        </a>
                    `
                    $("#iconList").append(html_top)
                }
            })(i);
        }

        // 2、删
        delet_web();
        // 3、改
        select_web();
    }

    // 1、增
    add_web()

    function add_web() {
        $("#zjBtn").on("click", function () {
            // 获取id 网站名 网址 网站图标 推送给列表缓存
            var add_id = Number(LBC_cur.get()[LBC_cur.get().length - 1].id) + 1
            var add_name = $("#zjName").val()
            var add_web = $("#zjSite").val()
            var add_icon = $("#zjIcon").val()
            $("#zjName").val("")
            $("#zjSite").val("")
            $("#zjIcon").val("")
            if (add_name != "" && add_web != "" && add_icon != "") {
                // 推入 列表缓存
                var list = {
                    id: add_id,
                    child: {
                        checked: true,
                        name: add_name,
                        url: add_web,
                        image: add_icon,
                    }
                }
                curList = LBC_cur.get()
                curList.push(list)
                // 推入新缓存
                LBC_cur.add(curList)
                curList = []
            } else {
                return false;
            }
            // 渲染 下方 新列表
            show_bottom()
        })

    }
    // 2、删
    // 写在show_top函数内
    function delet_web() {
        $(".delet-icon").each(function () {
            $(this).on("click", function () {
                // 获取删除的对象 id
                var delId = $(this).siblings(".zdy-web-select").attr("data-id")
                // 删除对应id的列表缓存项
                var len = LBC_cur.get().length
                for (var i = 0; i < len; i++) {
                    if (delId == LBC_cur.get()[i].id) {
                        var arr = LBC_cur.get()
                        list = arr.splice(i, 1)
                        LBC_cur.remove()
                        // 删除后的列表推入缓存
                        LBC_cur.add(arr)
                        // 再次根据新缓存渲染 下方列表
                        show_bottom()
                    }
                }
            })
        })
    }
    // 3、改
    // 写在show_top函数内
    function select_web() {
        $(".zdy-f-item").each(function () {
            $(this).on("click", function () {
                // 定义被选择网站信息
                var sel_id
                var status = $(this).children(".zdy-web-select").attr("checked")
                if (status == "checked") {
                    // 取消选中
                    $(this).children(".zdy-web-select").removeAttr("checked")
                    $(this).children(".zdy-web-icon").removeClass("zdy-active")
                    // 获取网站id
                    sel_id = $(this).children(".zdy-web-select").attr("data-id")
                    // 改变缓存的check属性
                    var arr_loc = LBC_cur.get()
                    $.each(arr_loc, function (index, item) {
                        if (sel_id == item.id) {
                            item.child.checked = false
                        }
                    })
                    LBC_cur.remove()
                    LBC_cur.add(arr_loc)
                    // 重新渲染
                    show_bottom();

                } else {
                    // 选中
                    $(this).children(".zdy-web-select").attr("checked", "checked")
                    $(this).children(".zdy-web-icon").addClass("zdy-active")
                    sel_id = $(this).children(".zdy-web-select").attr("data-id")
                    sel_name = $(this).children(".zdy-web-select").val()
                    sel_web = $(this).children(".zdy-f-lab").attr("data-site")
                    sel_icon = $(this).children(".zdy-web-icon").children(".icon-img").attr("src")
                    // 获取点击对象id
                    sel_id = $(this).children(".zdy-web-select").attr("data-id")
                    // 改变缓存的check属性
                    var arr_loc = LBC_cur.get()
                    $.each(arr_loc, function (index, item) {
                        if (sel_id == item.id) {
                            item.child.checked = true
                        }
                    })
                    LBC_cur.remove()
                    LBC_cur.add(arr_loc)
                    // 重新渲染
                    show_bottom();

                }
            })
        })
    }

    /**
     * 自定网站
     * 展示 关闭
     */
    var LBC_nav = (function () {
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
    })();

    function open_set() {
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
            var push_item = {
                id: 0,
                navItem: "自定义",
            }
            LBC_nav.add(push_item)
            navItem = ''
        });
    }
})();