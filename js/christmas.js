/**
 * Created by Administrator on 2017/3/2.
 */
function changePage(element,effect,callback) {
    element
        .addClass(effect)
        //.one(event,data,function) 每个元素只能触发一次事件处理函数
        //event 必需 一个或多个 空格分开
        //data 可选 传递到函数的额外数据
        //function 必需 事件发生时运行的函数
        .one('animationend webkitAnimationEnd',function () {
            // 判断callback是否存在
            //直接写callback（），当callback不存在是就会报错
            callback && callback();
        })
}
//背景音乐
function HTML5Audio(url, loop) {
    var audio = new Audio(url);
    audio.autoplay = true;
    audio.loop = loop || false; //是否循环
    audio.play();
    return {
        end: function(callback) {
            audio.addEventListener('ended', function() {
                callback()
            }, false);
        }
    }
}

var christmas = function () {
    var $pageA = $('.page-a');
    var $pageB = $('.page-b');
    var $pageC = $('.page-c');
    //切换
    // $('#choose').on('change',function (e) {
    //     var event = e || window.event;
    //     var pageName = event.target.value;
    //     switch (pageName) {
    //         case 'page-b':
    //             changePage($pageA,'effect-out',function () {
    //
    //             });
    //             break;
    //         case 'page-c':
    //             changePage($pageC,'effect-in',function () {
    //
    //             });
    //             break;
    //     }
    // })
    //观察者
    var observer = new Observer();
    //A场景页面
    new pageA(function () {
        observer.publish('completePageA');
    });
    //进入B场景页面
    observer.subscribe('pageB',function () {
        new pageB(function () {
            observer.publish('completePageB')
        })
    });
    //进入C场景
    observer.subscribe('pageC',function () {
        new pageC();
    });
    //页面A-B场景切换
    observer.subscribe('completePageA',function () {
        changePage($pageA,'effect-out',function () {
            observer.publish('pageB');
        })
    });
    // 页面B-C场景切换
    observer.subscribe('completePageB',function () {
        changePage($pageC,'effect-in',function () {
            observer.publish('pageC');
        })
    });
};
$(function () {
    $('body').click(function () {
        //HTML5Audio('music/scene.mp3');
        //christmas();
        var $pageA = $('.page-a');
        new pageA($pageA);
    })
});