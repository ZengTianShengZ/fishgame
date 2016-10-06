/**
 * Created by Administrator on 2016/10/6.
 */
/**
 * 大鱼碰到果实
 */
function momFruitsCollision() {
    if(!data.gameOver){
        for(var i=0,len=fruit.num; i<len; i++){
            if(fruit.alive[i]){
                // 求 两点之间的距离 平方
                var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
                if(l < 900){
                    // fruit eaten
                    fruit.dead(i);
                    data.fruitNum ++ ;
                    mom.momBodyCount ++;
                    if(mom.momBodyCount > 7){
                        mom.momBodyCount = 7;
                    }
                    if(fruit.fruitType[i] == "blue") {   //蓝色果实加倍
                        data.doubles = 2;
                    }
                }
            }
        }
    }

}
/**
 * 大鱼喂小鱼
 */
function momBabyCollision() {
    if(!data.gameOver){
        if(data.fruitNum != 0){
            var l = calLength2(baby.x,baby.y,mom.x,mom.y);
            if(l < 900){
                baby.babyBodyCount = 0;
                mom.momBodyCount = 0;  //碰撞后大鱼身体恢复
                data.addScore();
            }
        }

    }
}
