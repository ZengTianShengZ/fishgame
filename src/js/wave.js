/**
 * Created by Administrator on 2016/10/6.
 */

var waveObj = function () {
    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
}
// 创建一个 数量为 10  的 圈圈 池子
waveObj.prototype.num = 10;
waveObj.prototype.init = function () {
    for(var i=0,len=this.num; i<len; i++){
        this.alive[i] = false;
        this.r[i] = 0;
    }
}
waveObj.prototype.draw = function () {

    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "white";
    for(var i=0,len=this.num; i<len; i++){
        if(this.alive[i]){

            this.r[i] += deltaTime * 0.04;
            // 当半径扩大到 50 ，让 圈圈 死掉
            if( this.r[i] > 50){
                this.alive[i] = false;
            }
            var alpha = 1 - this.r[i] / 50 ;
            //api

            //draw
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i],this.r[i], 0, Math.PI*2);
            ctx1.closePath();
            ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")";
            ctx1.stroke();
        }
    }
    ctx1.restore();
}
waveObj.prototype.born = function (x , y ) {
    for(var i=0,len=this.num; i<len; i++){
        if(!this.alive[i]){
            //born
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = x;    //来自大鱼和果实碰撞时的坐标值
            this.y[i] = y;
            return;  //跳出循环，避免所有的都出生
        }
    }

}
