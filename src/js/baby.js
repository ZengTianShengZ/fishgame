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

    this.babyTailTime = 0;
    this.babyTailCount = 0;
    this.babyEyeTime = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;
    this.babyBodyTime = 0;
    this.babyBodyCount = 0;
}
babyObj.prototype.init = function () {
    this.x = canWidth * 0.5 -50;
    this.y = canHeight * 0.5 -50;
    this.angle = 0;
    this.babyEys.src = "src/imgs/babyEye0.png";
    this.babyBody.src = "src/imgs/baby.png";
   // this.babyTail.src = "src/imgs/babyTail0.png";

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

    // 让小鱼的尾巴 一摆一摆
    this.babyTailTime += deltaTime;
    // 50ms 小鱼的尾巴数组加 1
    if(this.babyTailTime > 50){
        this.babyTailCount  = ( this.babyTailCount +1 ) % 8;
        this.babyTailTime %= 50;
    }

    // 让小鱼的眼睛一眨一眨
    this.babyEyeTime += deltaTime;
    if( this.babyEyeTime > this.babyEyeInterval){
        this.babyEyeCount  = ( this.babyEyeCount +1 ) % 2;
        // 记得 清零
        this.babyEyeTime %= this.babyEyeInterval;

        // 控制 this.babyEyeInterval 的时间 ，让小鱼的睁眼时间比较长 ， 闭眼时间 就 200 ms
        if(this.babyEyeCount == 0){
            this.babyEyeInterval = Math.random()*1500 + 2000 ; // [2000 , 3500)
        }else{
            this.babyEyeInterval = 200;
        }

    }

    // 让小鱼的 身体 慢慢 变白
    this.babyBodyTime += deltaTime;
    if(this.babyBodyTime > 300){
        this.babyBodyCount  =  this.babyBodyCount +1 ;
        this.babyBodyTime %= 300;

        if(this.babyBodyCount >= 19){
            this.babyBodyCount = 19;
            // Game Over
        }
    }

    ctx1.save();
    // 把绘制点移动到画布的中心， 不然绘制点是以画布左上角为绘制中心的
    ctx1.translate(this.x,this.y);
    // rotate 用于旋转画布
    ctx1.rotate(this.angle);
    var babyTailCount = this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount] ,-babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);
    var babyBodyCount = this.babyBodyCount ;
    ctx1.drawImage(babyBody[babyBodyCount] , -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount] , -babyEye[babyEyeCount] .width * 0.5, -babyEye[babyEyeCount] .height * 0.5);

    ctx1.restore();
}