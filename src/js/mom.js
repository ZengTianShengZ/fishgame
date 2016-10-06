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

    this.momTailTimer = 0;
    this.momTailCount = 0;

    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;

    this.momBodyCount = 0;
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


    // 让小鱼的尾巴 一摆一摆
    this.momTailTimer += deltaTime;
    // 50ms 小鱼的尾巴数组加 1
    if(this.momTailTimer > 50){
        this.momTailCount  = ( this.momTailCount +1 ) % 8;
        this.momTailTimer %= 50;
    }

    // 让小鱼的眼睛一眨一眨
    this.momEyeTimer += deltaTime;
    if( this.momEyeTimer > this.momEyeInterval){
        this.momEyeCount  = ( this.momEyeCount +1 ) % 2;
        // 记得 清零
        this.momEyeTimer %= this.momEyeInterval;

        // 控制 this.babyEyeInterval 的时间 ，让小鱼的睁眼时间比较长 ， 闭眼时间 就 200 ms
        if(this.momEyeCount == 0){
            this.momEyeInterval = Math.random()*1500 + 2000 ; // [2000 , 3500)
        }else{
            this.momEyeInterval = 200;
        }

    }


    ctx1.save();
    // 把绘制点移动到画布的中心， 不然绘制点是以画布左上角为绘制中心的
    ctx1.translate(this.x,this.y);
    // rotate 用于旋转画布
    ctx1.rotate(this.angle);

    var momTailCount =  this.momTailCount;
    ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);
    var momBodyCount = this.momBodyCount;
    if(data.doubles == 1){
        ctx1.drawImage(momBodyOra[momBodyCount] , -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
    }else{
        ctx1.drawImage(momBodyBlue[momBodyCount] , -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);

    }
    //ctx1.drawImage(this.bigBody , -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);
    var momEyeCount  = this.momEyeCount;
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);

    ctx1.restore();
}