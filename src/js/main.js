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

var aneObj;

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

    canWidth = can1.width;
    canHeight = can1.height;

    bgPic = new Image();
    bgPic.src = "src/imgs/background.jpg"
    bgPic.onload = function () {
        drawBackgrond();
    }

    aneObj = new aneObj();
    aneObj.init();

}
function gameloop() {
    requestAnimFrame(gameloop); // 根据浏览器的实时性能绘制每一贞 ，不会丢帧，但每一帧的时间间隔可能会不一样，相比setTimeout，setTimeout严格定时
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;

    aneObj.draw();

}