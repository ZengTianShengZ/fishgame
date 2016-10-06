/**
 * Created by Administrator on 2016/10/6.
 */

var fruitObj = function () {
    this.alive = []; // booleam
    this.x = [];
    this.y = [];
    this.l = [];
    this.spd = [];
    this.fruitType = [];

    this.orange = new Image();
    this.blue = new Image();

}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function () {
    for(var i=0,len=this.num; i<len; i++){
        // 为什么要初始化 ，应为 数组里面能存放仍会类型值，初始化指定要存放的类型值
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;

        this.spd[i] = Math.random() * 0.01 + 0.003;
        this.born(i);
    }
    this.orange.src = "src/imgs/fruit.png";
    this.blue.src = "src/imgs/blue.png";
}
fruitObj.prototype.draw = function () {
    var pic;
    for(var i=0,len=this.num; i<len; i++){
        if( this.alive[i]){
            if(this.fruitType[i] == "blue"){
                pic = this.blue;
            }else{
                pic = this.orange;
            }
            if(this.l[i] <= 14 ){
                this.l[i] += this.spd[i] * deltaTime;
            }else {
                this.y[i] -= this.spd[i] * 7 * deltaTime;
            }
            ctx2.drawImage(pic, this.x[i]-this.l[i] / 2, this.y[i]-this.l[i] / 2, this.l[i], this.l[i]);
            // ctx2.drawImage(this.orange, this.x[i] - this.l[i] * 0.5 , this.y[i] -this.l[i]*0.5,this.l[i],this.l[i]);
            if(this.y[i] < 10){
                this.alive[i] = false;
            }
        }

    }
}
fruitObj.prototype.born = function (i) {

    var aneID = Math.floor( Math.random() * ane.num ) ;
    this.x[i] = ane.x[aneID];
    this.y[i] = canHeight -  ane.len[aneID];
    this.l[i] = 0;
    this.alive[i] = true;

    var rd = Math.random();
    if(rd < 0.2){
        this.fruitType[i] = 'blue';
    }else{
        this.fruitType[i] = 'fruit';
    }
}

function fruitMonitor() {
    var alive_num = 0;
    for(var i=0,len=fruit.num; i<len; i++){
        if(fruit.alive[i]){
            alive_num ++;
        }
    }
    if(alive_num < 15){

        sendFruit();
        return;
    }
}
function sendFruit() {

    for(var i=0,len=fruit.num; i<len; i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return ;
        }
    }
}