/**
 * Created by Administrator on 2016/10/6.
 */
var momObj = function () {
    this.x;
    this.y;
    this.angle;
    this.bigEys = new Image();
    this.bigBody = new Image();
    this.bigTail = new Image();
}
momObj.prototype.init = function () {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    this.bigEys.src = "src/imgs/bigEye0.png";
    this.bigBody.src = "src/imgs/bigSwim0.png";
    this.bigTail.src = "src/imgs/bigTail0.png";
}
momObj.prototype.draw = function () {
    // 下面涉及到数学计算，勾股定理， delta 
    // lerpDistance 封装了 一个函数， 让 this.x 趋向于 mx 值 ，0.98 为趋向速度 ，
    this.x = lerpDistance(mx ,this.x,0.98 );
    this.y = lerpDistance(my ,this.y,0.98 );
    // delta angle
    // Math.atan2(y,x)
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    //勾股定理计算出角度
    var beta = Math.atan2(deltaY,deltaX) + Math.PI; // - pi  , +pi
    // lerp angle
    // 跟上面一样，让角度趋向于目标值
    this.angle = lerpAngle(beta, this.angle,0.7);

    ctx1.save();
    // 把绘制点移动到画布的中心， 不然绘制点是以画布左上角为绘制中心的
    ctx1.translate(this.x,this.y);
    // rotate 用于旋转画布
    ctx1.rotate(this.angle);
    ctx1.drawImage(this.bigEys , -this.bigEys.width * 0.5, -this.bigEys.height * 0.5);
    ctx1.drawImage(this.bigBody , -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);
    ctx1.drawImage(this.bigTail ,-this.bigTail.width * 0.5 + 30, -this.bigTail.height * 0.5);
    ctx1.restore();
}