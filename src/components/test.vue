<template>
    <div class="box">
        <div class="btn-group">
            <div class="big group" @click="bigFn">
                <div class="big-group btn-box">
                    <transition name="big-tr1">
                        <div class="big-btn1 big-box-box" v-show="bigState % 3 == 0"></div>
                    </transition>
                    <transition name="big-tr2">
                        <div class="big-btn2 big-box-box" v-show="bigState % 3 == 1"></div>
                    </transition>
                    <transition name="big-tr3">
                        <div class="big-btn3 big-box-box" v-show="bigState % 3 == 2"></div>
                    </transition>
                </div>
                <p>放大</p>
            </div>
            <div class="pen group" @click="penFn">
                <div class="pen-group btn-box">
                    <transition 
                        name="pen-tr1"
                        @before-enter="penBeforeEnterFn"
                        @enter="penEnterFn"
                        @after-enter="penAfterEnterFn"
                        @leave="penLeaveFn"
                        @after-leave="penAfterLeaveFn"
                    >
                        <div class="pen-btn1 big-box-box" v-show="penState % 2 == 0"></div>
                    </transition>
                    <transition 
                        name="pen-tr2"
                    >
                        <div class="pen-btn2 big-box-box" v-show="penState % 2 == 1"></div>
                    </transition>
                </div>
                <p>放大</p>
                <transition name="pen-eraser">
                    <div class="pen-pen" v-show="isShowPen"></div>
                </transition>
            </div>
            <div class="pen group" @click="changeFn">
                <div class="pen-group btn-box">
                    <transition 
                        name="change-tr1"
                    >
                        <div class="change-btn1 big-box-box" v-show="changeState % 4 == 0"></div>
                    </transition>
                    <transition 
                        name="change-tr2"
                    >
                        <div class="change-btn2 big-box-box" v-show="changeState % 4 == 1"></div>
                    </transition>
                    <transition 
                        name="change-tr2"
                    >
                        <div class="change-btn3 big-box-box" v-show="changeState % 4 == 2"></div>
                    </transition>
                    <transition 
                        name="change-tr3"
                    >
                        <div class="change-btn4 big-box-box" v-show="changeState % 4 == 3"></div>
                    </transition>
                </div>
                <p>放大</p>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name :'box',
    data(){
        return{
            bigState : 0,
            penState : 0,
            isShowPen : false,
            isClick : true,
            changeState : 0
        }
    },
    methods :{
        bigFn(){
            this.bigState ++;
        },
        penFn(){
            if(!this.isClick) return;
            this.penState ++;
        },
        penBeforeEnterFn(){
            this.isShowPen = false;
        },
        penEnterFn(){
            this.isClick = false;
        },
        penLeaveFn(){
            this.isClick = false;
        },
        penAfterEnterFn(){
            this.isClick = true;
        },
        penAfterLeaveFn(){
            this.isClick = true;
            this.isShowPen = true;
        },

        changeFn(){
            this.changeState ++;
        }
    }
}
</script>
<style lang="scss" scoped>
.box{
    width : 1000px;
    height : 800px;
    border : 1px solid #ccc;
    position: fixed;
    top : 50%;
    left : 50%;
    background : #fff;
    @include transform-translate-xy;
}
.big-box-box{
    width : 100px;
    height : 100px;
    border : 1px solid #ccc;
    position :absolute;
    top :0;
    right :0;
}
.group{
    width : 100%;
    height : 100px;
}
p{
    width : 100%;
    text-align : center;
}
.btn-group{
    width : 66px;
    position : absolute;
    bottom : 0;
    right : 0;
}
.big-group{
    width : 100%;
    height : 80px;
    .big-tr1-enter{
        opacity : 0;
        transform : rotateY(180deg);
    }
    .big-tr1-enter-to{
        opacity : 1;
        transform : rotateY(0deg);
    }
    .big-tr1-enter-active{
        animation: bigTr1Enter 0.5s;
    }
    @keyframes bigTr1Enter {
        0%{
            opacity : 0;
            transform : rotateY(180deg);
        }
        49%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        50%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        51%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        100%{
            opacity : 1;
            transform : rotateY(0deg);
        }
    }
    .big-tr1-leave{
        transform : rotateY(0deg);
    }
    .big-tr1-leave-to{
        transform : rotateY(180deg);
    }
    .big-tr1-leave-active{
        animation : bigTr1Leave 0.5s;
    }
    @keyframes bigTr1Leave {
        0%{
            opacity : 1;
            transform : rotateY(0deg);
        }
        49%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        50%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        51%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        100%{
            opacity : 0;
            transform : rotateY(180deg);
        }
    }
    
    .big-tr2-enter{
        transform : rotateY(180deg);
    }
    .big-tr2-enter-to{
        transform : rotateY(0deg);
    }
    .big-tr2-enter-active{
        animation : bigTr2Enter 0.5s;
    }
    @keyframes bigTr2Enter {
        0%{
            opacity : 0;
            transform : rotateY(180deg);
        }
        49%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        50%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        51%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        100%{
            opacity : 1;
            transform : rotateY(0deg);
        }
    }
    .big-tr2-leave{
        transform : rotateY(0deg);
    }
    .big-tr2-leave-to{
        transform : rotateY(180deg);
    }
    .big-tr2-leave-active{
        animation : bigTr2Leave 0.5s;
    }
    @keyframes bigTr2Leave {
        0%{
            opacity : 1;
            transform : rotateY(0deg);
        }
        49%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        50%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        51%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        100%{
            opacity : 0;
            transform : rotateY(180deg);
        }
    }
    
    
    .big-tr3-enter{
        transform : rotateY(180deg);
    }
    .big-tr3-enter-to{
        transform : rotateY(0deg);
    }
    .big-tr3-enter-active{
        animation : bigTr3Enter 0.5s;
    }
    @keyframes bigTr3Enter {
        0%{
            opacity : 0;
            transform : rotateY(180deg);
        }
        49%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        50%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        51%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        100%{
            opacity : 1;
            transform : rotateY(0deg);
        }
    }
    .big-tr3-leave{
        opacity : 1;
        transform : rotateY(0deg);
    }
    .big-tr3-leave-to{
        opacity : 0;
        transform : rotateY(-180deg);
    }
    .big-tr3-leave-active{
        animation : bigTr3Leave 0.5s;
    }
    @keyframes bigTr3Leave {
        0%{
            opacity : 1;
            transform : rotateY(0deg);
        }
        49%{
            opacity : 1;
            transform : rotateY(-90deg);
        }
        50%{
            opacity : 0;
            transform : rotateY(-90deg);
        }
        51%{
            opacity : 0;
            transform : rotateY(-90deg);
        }
        100%{
            opacity : 0;
            transform : rotateY(-180deg);
        }
    }
}
.pen-pen{
    position : absolute;
    left : -60px;
    bottom : 0;
    width : 60px;
    height : 60px;
    background : red;
}
.pen-group{
    width : 100%;
    height : 80px;
    .pen-tr1-enter{
        opacity : 0;
        transform : rotateY(180deg);
    }
    .pen-tr1-enter-to{
        opacity : 1;
        transform : rotateY(0deg);
    }
    .pen-tr1-enter-active{
        animation: penTr1Enter 0.5s;
    }
    @keyframes penTr1Enter {
        0%{
            opacity : 0;
            transform : rotateY(180deg);
        }
        49%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        50%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        51%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        100%{
            opacity : 1;
            transform : rotateY(0deg);
        }
    }
    .pen-tr1-leave{
        transform : rotateY(0deg);
    }
    .pen-tr1-leave-to{
        transform : rotateY(180deg);
    }
    .pen-tr1-leave-active{
        animation : penTr1Leave 0.5s;
    }
    @keyframes penTr1Leave {
        0%{
            opacity : 1;
            transform : rotateY(0deg);
        }
        49%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        50%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        51%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        100%{
            opacity : 0;
            transform : rotateY(180deg);
        }
    }
    
    
    .pen-tr2-enter{
        transform : rotateY(180deg);
    }
    .pen-tr2-enter-to{
        transform : rotateY(0deg);
    }
    .pen-tr2-enter-active{
        animation : bigTr3Enter 0.5s;
    }
    @keyframes bigTr3Enter {
        0%{
            opacity : 0;
            transform : rotateY(180deg);
        }
        49%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        50%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        51%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        100%{
            opacity : 1;
            transform : rotateY(0deg);
        }
    }
    .pen-tr2-leave{
        opacity : 1;
        transform : rotateY(0deg);
    }
    .pen-tr2-leave-to{
        opacity : 0;
        transform : rotateY(-180deg);
    }
    .pen-tr2-leave-active{
        animation : bigTr3Leave 0.5s;
    }
    @keyframes bigTr3Leave {
        0%{
            opacity : 1;
            transform : rotateY(0deg);
        }
        49%{
            opacity : 1;
            transform : rotateY(-90deg);
        }
        50%{
            opacity : 0;
            transform : rotateY(-90deg);
        }
        51%{
            opacity : 0;
            transform : rotateY(-90deg);
        }
        100%{
            opacity : 0;
            transform : rotateY(-180deg);
        }
    }
}
.pen-eraser-enter{
    opacity : 0;
}
.pen-eraser-enter-to{
    opacity : 1;
}
.pen-eraser-enter-active{
    transition : all 0.2s;
}
.pen-eraser-leave{
    opacity : 1;
}
.pen-eraser-leave-to{
    opacity : 0;
}
.pen-eraser-leave-active{
    transition : all 0.2s;
}


.pen-group{
    width : 100%;
    height : 80px;
    .change-tr1-enter{
        opacity : 0;
        transform : rotateY(180deg);
    }
    .change-tr1-enter-to{
        opacity : 1;
        transform : rotateY(0deg);
    }
    .change-tr1-enter-active{
        animation: changeTr1Enter 0.5s;
    }
    @keyframes changeTr1Enter {
        0%{
            opacity : 0;
            transform : rotateY(180deg);
        }
        49%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        50%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        51%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        100%{
            opacity : 1;
            transform : rotateY(0deg);
        }
    }
    .change-tr1-leave{
        transform : rotateY(0deg);
    }
    .change-tr1-leave-to{
        transform : rotateY(180deg);
    }
    .change-tr1-leave-active{
        animation : changeTr1Leave 0.5s;
    }
    @keyframes changeTr1Leave {
        0%{
            opacity : 1;
            transform : rotateY(0deg);
        }
        49%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        50%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        51%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        100%{
            opacity : 0;
            transform : rotateY(180deg);
        }
    }
    
    
    .change-tr2-enter{
        transform : rotateY(180deg);
    }
    .change-tr2-enter-to{
        transform : rotateY(0deg);
    }
    .change-tr2-enter-active{
        animation : changeTr2Enter 0.5s;
    }
    @keyframes changeTr2Enter {
        0%{
            opacity : 0;
            transform : rotateY(180deg);
        }
        49%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        50%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        51%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        100%{
            opacity : 1;
            transform : rotateY(0deg);
        }
    }
    .change-tr2-leave{
        opacity : 1;
        transform : rotateY(0deg);
    }
    .change-tr2-leave-to{
        opacity : 0;
        transform : rotateY(180deg);
    }
    .change-tr2-leave-active{
        animation : changeTr2Leave 0.5s;
    }
    @keyframes changeTr2Leave {
        0%{
            opacity : 1;
            transform : rotateY(0deg);
        }
        49%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        50%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        51%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        100%{
            opacity : 0;
            transform : rotateY(180deg);
        }
    }
    .change-tr3-enter{
        transform : rotateY(180deg);
    }
    .change-tr3-enter-to{
        transform : rotateY(0deg);
    }
    .change-tr3-enter-active{
        animation : changeTr3Enter 0.5s;
    }
    @keyframes changeTr3Enter {
        0%{
            opacity : 0;
            transform : rotateY(180deg);
        }
        49%{
            opacity : 0;
            transform : rotateY(90deg);
        }
        50%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        51%{
            opacity : 1;
            transform : rotateY(90deg);
        }
        100%{
            opacity : 1;
            transform : rotateY(0deg);
        }
    }
    .change-tr3-leave{
        opacity : 1;
        transform : rotateY(0deg);
    }
    .change-tr3-leave-to{
        opacity : 0;
        transform : rotateY(-180deg);
    }
    .change-tr3-leave-active{
        animation : changeTr3Leave 0.5s;
    }
    @keyframes changeTr3Leave {
        0%{
            opacity : 1;
            transform : rotateY(0deg);
        }
        49%{
            opacity : 1;
            transform : rotateY(-90deg);
        }
        50%{
            opacity : 0;
            transform : rotateY(-90deg);
        }
        51%{
            opacity : 0;
            transform : rotateY(-90deg);
        }
        100%{
            opacity : 0;
            transform : rotateY(-180deg);
        }
    }
}


.btn-box{
    width : 100%;
    height : 80px;
    position : relative;
}
.big-box-box{
    width : 66px;
    height : 66px;
    border-radius : 50%;
    background-color : $color-bg-black1;
    background-position : center;
    background-repeat : no-repeat;
    position : absolute;
    top : 0;
    left : 0;
    transform-style : preserve-3d;
}
.big-btn1{
    background-image : url('./../assets/class/1b@2x.png');
}
.big-btn2{
    background-image : url('./../assets/class/2b@2x.png');
}
.big-btn3{
    background-image : url('./../assets/class/3b@2x.png');
}
.pen-btn1{
    background-image : url('./../assets/class/hb@2x.png');
}
.pen-btn2{
    background-image : url('./../assets/class/tc@2x.png');
}

.change-btn1{
    background-image : url('./../assets/class/ft@2x.png');
}
.change-btn2{
    background-image : url('./../assets/class/st@2x.png');
}
.change-btn3{
    background-image : url('./../assets/class/xq@2x.png');
}
.change-btn4{
    background-image : url('./../assets/class/fh-white@2x.png');
}


    
</style>

