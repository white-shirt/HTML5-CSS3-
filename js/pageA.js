/**
 * Created by Administrator on 2017/3/2.
 */
function pageA (element) {
    //根元素
    this.$root = element;
    //小男孩
    this.$boy = element.find(".chs-boy");
    //窗户
    this.$window = element.find('.window');
    this.$leftWin  = this.$window.find(".window-left");
    this.$rightWin = this.$window.find(".window-right");
    //运行动画
    this.run();
}

//雪橇动画
pageA.prototype.next = function(options) {
    var dfd = $.Deferred();
    this.$boy.transition(options.style, options.time, "linear",function() {
        dfd.resolve()
    });
    return dfd;
};

//开窗动画
pageA.prototype.openWindow = function() {
    this.$leftWin.addClass('window-transition').addClass("window-left_hover");
    this.$rightWin.addClass('window-transition').addClass("window-right_hover");
};


//停止走路
pageA.prototype.stopWalk = function(){
    this.$boy.removeClass("chs-boy-deer")
};

//运行路径
pageA.prototype.run = function(callback){
    var that = this;
    var next = function() {
        return this.next.apply(this, arguments)
    }.bind(this);

    //运动到左侧
    next({
        "time": 10000,
        "style": {
            "top": "4rem",
            "right": "16rem",
            "scale": "1.2"
        }
    })
        //掉头
        .then(function() {
            return next({
                "time":500,
                "style": {
                    "rotateY" : "-180",
                    "scale": "1.5"
                }
            })
        })
        //运动到地面
        .then(function() {
            return next({
                "time": 7000,
                "style": {
                    "top"   :"7.8rem",
                    "right" : "1.2rem"
                }
            })
        })
        //停止运动
        .then(function(){
            that.stopWalk();
            that.openWindow();
        })

};