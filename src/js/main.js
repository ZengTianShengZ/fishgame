/**
 * Created by Administrator on 2016/10/6.
 */
var can1;
var ctx1;
var can2;
var ctx2;

var lastTime;
var deltaTime;

var bgPic;

var canWidth; // 画布宽高
var canHeight;

var mx;// 鼠标坐标
var my;

var ane;
var fruit;
var mom;
var baby;

document.body.onload = game;
function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}
function init() {
    can1 = document.getElementById("canvas1");
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2");
    ctx2 = can1.getContext("2d");

    can1.addEventListener("mousemove",onMouseMove,false);

    canWidth = can1.width;
    canHeight = can1.height;

    mx = canWidth * 0.5;
    my = canHeight * 0.5;    //初始化鼠标开始的位置

    bgPic = new Image();
    bgPic.src = "src/imgs/background.jpg"
 /*   bgPic.onload = function () {
        drawBackgrond();
    }*/

    ane = new aneObj();
    ane.init();
    fruit = new fruitObj();
    fruit.init();
    mom = new momObj();
    mom.init();
    baby = new babyObj();
    baby.init();

}
function gameloop() {
    requestAnimFrame(gameloop); // 根据浏览器的实时性能绘制每一贞 ，不会丢帧，但每一帧的时间间隔可能会不一样，相比setTimeout，setTimeout严格定时
    var now = Date.now();
    deltaTime = now - lastTime;
    if(deltaTime > 40){
        deltaTime = 40;
    }
    lastTime = now;


    // 背景图要一直重绘，用于覆盖果实避免果实成一条直线
    drawBackgrond();

    ane.draw();
    fruitMonitor();
    fruit.draw();
    mom.draw();
    baby.draw();

    momFruitsCollision();

}
function onMouseMove(e) {
    if(e.offsetX || e.layerX){
        mx = e.offsetX === undefined ?  e.layerX : e.offsetX;
        my = e.offsetY === undefined ?  e.layerY : e.offsetY;
    }
}