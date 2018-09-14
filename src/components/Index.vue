<template>
    <div class="index">
        我是伪swipper
        
        <div 
            class="view-group"
            id="viewGroup"
            @touchstart="startFn"
            @touchmove="moveFn"
            @touchend="endFn"
        >
            <ul class="title-group clearfix">
                <li
                    class="title-btn fl"
                    v-for="(item , index) in titleArr"
                    :key="index"
                    :class="curState == index ? 'cur' : ''"
                    @click="chooseFn(index)"
                ></li>
            </ul>
            <transition 
                :name="!contrary ? 'side' : 'hide'"
                @enter="enterFn"
                @after-leave="afterLeaveFn"
            >
                <div 
                    class="view-box"
                    v-show="curState == 0"
                >
                    <aaa
                        :item="articles[0]"
                        :isMove="curState == 0 && !banClick ? true : false"
                    ></aaa>
                </div>
            </transition>
            <transition 
                :name="!contrary ? 'side' : 'hide'"
                @enter="enterFn"
                @after-leave="afterLeaveFn"
            >
                <div 
                    class="view-box"
                    v-show="curState == 1"
                >
                    <bbb
                        :item="articles[1]"
                        :isMove="curState == 1 && !banClick ? true : false"
                    ></bbb>
                </div>
            </transition>
            <transition 
                :name="!contrary ? 'side' : 'hide'"
                @enter="enterFn"
                @after-leave="afterLeaveFn"
            >
                <div 
                    class="view-box"
                    v-show="curState == 2"
                >
                    <ccc
                        :item="articles[2]"
                        :isMove="curState == 2 && !banClick ? true : false"
                    ></ccc>
                </div>
            </transition>
            <transition 
                :name="!contrary ? 'side' : 'hide'"
                @enter="enterFn"
                @after-leave="afterLeaveFn"
            >
                <div 
                    class="view-box"
                    v-show="curState == 3"
                >
                    <ddd
                        :item="articles[3]"
                        :isMove="curState == 3 && !banClick ? true : false"
                    ></ddd>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import Aaa from './aaa'
import Bbb from './bbb'
import Ccc from './ccc'
import Ddd from './ddd'

export default {
    name : 'Index',
    data(){
        return {
            articles : '',
            //标题状态
            curState : 0,
            //禁止点击状态
            banClick : false,
            touchState : false,
            //拖动距离
            startX : 0,
            curX : 0,
            //点击还是滑动判断标识
            isMove : false,
            //反向
            contrary : false,
            // startY : 0,
            titleArr : [
                {
                    name : '我是Aaa'
                },
                {
                    name : '我是Bbb'
                },
                {
                    name : '我是Ccc'
                },
                {
                    name : '我是Ddd'
                }
            ]
        }
    },


    created(){
        this.$post('yufang-api' , {
            type : 1
        })
            .then( res => {
                console.log(res);
                let resData = res.data;
                this.articles = resData.articles;
            })
            .catch( err => {
                console.log(err);
            })
    },


    methods : {
        chooseFn(key){
            if(this.banClick) return;
            this.contrary = false;
            this.$nextTick().then(() => {
                this.curState = key;
            })
        },
        banClickFn(){
            this.banClick = true;
        },
        canClickFn(){
            this.banClick = false;
        },
        enterFn(){
            this.banClickFn();
        },
        afterLeaveFn(){
            this.canClickFn();
        },
        startFn(e){
            //移动中不可拖拽
            if(this.banClick) return;
            let ev = e.touches[0];
            this.startX = ev.clientX;
            // this.startY = ev.clientY;
            this.touchState = true;
            this.isMove = true;
        },
        moveFn(e){
            //未触发触摸事件，移动无效
            if(!this.touchState) return;
            let ev = e.touches[0];
            this.curX = ev.clientX;
            this.isMove = false;
        },
        endFn(){
            //防止拖拽逻辑影响点击
            if(this.isMove) return;
            this.touchState = false;
            let num = this.curX - this.startX;
            if(num > 150){
                //右移，看上一个
                this.contrary = true;
                this.$nextTick().then(() => {
                    this.curState = this.curState - 1 < 0 ? 3 : this.curState - 1;
                })
            }else if(num < -150){
                //左移，看下一个
                this.contrary = false;
                this.$nextTick().then(() => {
                    this.curState = this.curState + 1 > 3 ? 0 : this.curState + 1;
                })
            }
            //防止拖拽逻辑影响点击
            this.curX = this.startX = 0;
        }
    },


    components : {
        Aaa,
        Bbb,
        Ccc,
        Ddd
    }
}
</script>
<style scoped>
.index{
    width : 100%;
    height : 100%;
}

.title-group{
    width : 100%;
    height : 40px;
    display : flex;
    justify-content: center;
    position : absolute;
    bottom : 10px;
    left : 0;
    z-index : 2;
}
.title-btn{
    width : 20px;
    height : 20px;
    background: #ccc;
    margin-right : 10px;
    border-radius : 50%;
}
.cur{
    background : aqua;
}

.view-group{
    width : 100%;
    height : 60%;
    overflow : hidden;
    border-bottom : 1px solid #ccc;
    border-top : 1px solid #ccc;
    position : relative;
}
.view-box{
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
}
/*view的过渡*/
/*移入*/
.side-enter{
    left : 100%;
}
.side-enter-to{
    left : 0
}
.side-enter-active{
    will-change : transform;
    transition : all 0.5s;
}
/*移出*/
.side-leave{
    left : 0;
}
.side-leave-to{
    left : -100%;
}
.side-leave-active{
    will-change : transform;
    transition : all 0.5s;
}
/*反向*/
/*移入*/
.hide-enter{
    left : -100%;
}
.hide-enter-to{
    left : 0;
}
.hide-enter-active{
    will-change : transform;
    transition : all 0.5s;
}
/*移出*/
.hide-leave{
    left : 0;
}
.hide-leave-to{
    left : 100%;
}
.hide-leave-active{
    will-change : transform;
    transition : all 0.5s;
}
</style>


