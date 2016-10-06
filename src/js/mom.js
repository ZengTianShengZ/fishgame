/**
 * Created by Administrator on 2016/10/6.
 */
var momObj = function () {
    this.x;
    this.y;
    this.bigEys = new Image();
    this.bigBody = new Image();
    this.bigTail = new Image();
}
momObj.prototype.init = function () {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.bigEys.src = "src/imgs/bigEye0.png";
    this.bigBody.src = "src/imgs/bigSwim0.png";
    this.bigTail.src = "src/imgs/bigTail0.png";
}
momObj.prototype.draw = function () {
    ctx1.save();
    // 把绘制点移动到画布的中心， 不然绘制点是以画布左上角为绘制中心的
    ctx1.translate(this.x,this.y);
    ctx1.drawImage(this.bigEys , -this.bigEys.width * 0.5, -this.bigEys.height * 0.5);
    ctx1.drawImage(this.bigBody , -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);
    ctx1.drawImage(this.bigTail ,-this.bigTail.width * 0.5 + 30, -this.bigTail.height * 0.5);
    ctx1.restore();
}