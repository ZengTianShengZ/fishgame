/**
 * Created by Administrator on 2016/10/6.
 */

var aneObj = function () {
    this.x = [];
    this.l = [];
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function () {
    for(var i = 0; i<this.num ; i++){
        this.x[i] = i*20 + Math.random()*20;
        this.l[i] = 200 + Math.random()*50;
    }
}
aneObj.prototype.draw = function () {

    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "#3b154e";
    for(var i=0,len=this.num; i<len; i++){
        ctx2.beginPath();
        ctx2.moveTo(this.x[i],canHeight);
        ctx2.lineTo(this.x[i],canHeight-this.l[i]);
        ctx2.stroke();
    }
    // 释放画笔，给其他程序绘制用
    ctx2.restore();
}