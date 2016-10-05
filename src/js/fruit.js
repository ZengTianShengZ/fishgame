/**
 * Created by Administrator on 2016/10/6.
 */

var fruitObj = function () {
    this.alive = []; // booleam
    this.x = [];
    this.y = [];


    this.orange = new Image();
    this.blue = new Image();

}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function () {
    for(var i=0,len=this.num; i<len; i++){
        // 为什么要初始化 ，应为 数组里面能存放仍会类型值，初始化指定要存放的类型值
        this.x[i] = 0;
        this.y[i] = 0;
        this.born(i);
    }
    this.orange.src = "src/imgs/fruit.png";
    this.blue.src = "src/imgs/blue.png";
}
fruitObj.prototype.draw = function () {
    for(var i=0,len=this.num; i<len; i++){
         ctx1.drawImage(this.orange,this.x[i] - this.orange.width * 0.5 ,this.y[i]);
    }
}
fruitObj.prototype.born = function (i) {
    var aneID = Math.floor( Math.random() * aneObj.num ) ;
    this.x[i] = aneObj.x[aneID];
    this.y[i] = canHeight -  aneObj.len[aneID];
}
