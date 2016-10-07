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
var data;
var wave;

var babyTail = [];  // 小鱼
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOra = [];  //大鱼橙色身体
var momBodyBlue = [];  //大鱼蓝色身体

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

    for(var i=0; i<8; i++){
        babyTail[i] = new Image();
        babyTail[i].src = "src/imgs/babyTail"+i+".png";
    }
    for(var i=0; i<2; i++){
        babyEye[i] = new Image();
        babyEye[i].src = "src/imgs/babyEye"+i+".png";
    }
    for(var i=0; i<20; i++){
        babyBody[i] = new Image();
        babyBody[i].src = "src/imgs/babyFade"+i+".png";
    }

    //初始化大鱼尾巴数组
    for(var mi = 0; mi < 8; mi++) {
        momTail[mi] = new Image();
        momTail[mi].src = "src/imgs/bigTail" + mi + ".png";
    }
    for(var mj = 0; mj < 2; mj++) {
        momEye[mj] = new Image();
        momEye[mj].src = "src/imgs/bigEye" + mj + ".png";
    }
    for(var i = 0; i < 8; i++) {
        momBodyOra[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOra[i].src = "src/imgs/bigSwim" + i + ".png";
        momBodyBlue[i].src = "src/imgs/bigSwimBlue" + i + ".png";
    }

    ctx1.fillStyle = "#FFF";
    ctx1.font = "30px Verdana";
    ctx1.textAlign = "center";

    ane = new aneObj();
    ane.init();
    fruit = new fruitObj();
    fruit.init();
    mom = new momObj();
    mom.init();
    baby = new babyObj();
    baby.init();
    data = new dataObj();
    wave = new waveObj();
    wave.init();

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
    data.draw();
    wave.draw();

    momFruitsCollision();
    momBabyCollision();

}
function onMouseMove(e) {
    if(!data.gameOver){
        if(e.offsetX || e.layerX){
            mx = e.offsetX === undefined ?  e.layerX : e.offsetX;
            my = e.offsetY === undefined ?  e.layerY : e.offsetY;
        }
    }
}