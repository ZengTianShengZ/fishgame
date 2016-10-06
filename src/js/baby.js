/**
 * Created by Administrator on 2016/10/6.
 */
var babyObj = function () {
    this.x;
    this.y;
    this.angle;
    this.babyEys = new Image();
    this.babyBody = new Image();
    this.babyTail = new Image();
}
babyObj.prototype.init = function () {
    this.x = canWidth * 0.5 -50;
    this.y = canHeight * 0.5 -50;
    this.angle = 0;
    this.babyEys.src = "src/imgs/babyEye0.png";
    this.babyBody.src = "src/imgs/baby.png";
    this.babyTail.src = "src/imgs/babyTail0.png";

}
babyObj.prototype.draw = function () {
    // 下面涉及到数学计算，勾股定理， delta
    // lerpDistance 封装了 一个函数， 让 this.x 趋向于 mx 值 ，0.98 为趋向速度 ，
    this.x = lerpDistance(mom.x ,this.x,0.98 );
    this.y = lerpDistance(mom.y ,this.y,0.98 );
    // delta angle
    // Math.atan2(y,x)
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
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

    ctx1.drawImage(this.babyBody , -this.babyBody.width * 0.5, -this.babyBody.height * 0.5);
    ctx1.drawImage(this.babyEys , -this.babyEys.width * 0.5, -this.babyEys.height * 0.5);
    ctx1.drawImage(this.babyTail ,-this.babyTail.width * 0.5 + 23, -this.babyTail.height * 0.5);
    ctx1.restore();
}