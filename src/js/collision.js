/**
 * Created by Administrator on 2016/10/6.
 */
function momFruitsCollision() {
    for(var i=0,len=fruit.num; i<len; i++){
        if(fruit.alive[i]){
            // 求 两点之间的距离 平方
            var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
            if(l < 900){
                // fruit eaten
                fruit.dead(i);
            }
        }
    }
}