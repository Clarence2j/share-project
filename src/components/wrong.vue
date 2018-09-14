<template>
    <div 
        class="wrong-speech" 
        ref="hidden-box"
    >
        <transition 
            name="slide-left"
            @before-enter="beforeEnterFn" 
            @after-enter="afterEnterFn"
            @before-leave="beforeLeaveFn" 
            @after-leave="afterLeaveFn"
        >
            <div 
                class="fa-box"
                v-show="isShow"
            >
                <canvas-a
                    :banBoxMove="banBoxMove"
                    :banPenUse="banPenUse"
                    :imgUrl="imgUrl1"
                    :offLeft="offLeft"
                    :offTop="offTop"
                    @emitBigStateFn="emitBigStateFn"
                    ref="boxA"
                ></canvas-a>
            </div>
        </transition>
        <transition name="slide-right">
            <div 
                class="fa-box"
                v-show="!isShow"
            >
                <canvas-b
                    :banBoxMove="banBoxMove"
                    :banPenUse="banPenUse"
                    :imgUrl="imgUrl2"
                    @emitBigStateFn="emitBigStateFn"
                    :offLeft="offLeft"
                    :offTop="offTop"
                    ref="boxB"
                ></canvas-b>
            </div>
        </transition>
        <div class="btn-group hand-point">
            <div class="btn" @click="bigFn">
                <transition name="big-tr1">
                    <div class="img-btn big-btn1" v-show="bigState == 1"></div>
                </transition>
                <transition name="big-tr2">
                    <div class="img-btn big-btn2" v-show="bigState == 2"></div>
                </transition>
                <transition name="big-tr3">
                    <div class="img-btn big-btn3" v-show="bigState == 3"></div>
                </transition>
                <h1>放大</h1>
            </div>
            <div class="btn">
                <div class="btn" @click="choosePenFn">
                    <transition 
                        name="pen-tr1"
                        @before-enter="penBeforeEnterFn"
                        @enter="penEnterFn"
                        @after-enter="penAfterEnterFn"
                        @leave="penLeaveFn"
                        @after-leave="penAfterLeaveFn"
                    >
                        <div class="pen-btn1 img-btn" v-show="choosePenState == 0"></div>
                    </transition>
                    <transition 
                        name="pen-tr2"
                    >
                        <div class="pen-btn2 img-btn" v-show="choosePenState == 1"></div>
                    </transition>
                    <h1>{{choosePenNameArr[choosePenState]}}</h1>
                </div>

                
                <transition name="pen-eraser">
                    <div class="alert-btn" v-show="choosePen">
                        <div class="img img-pen" id="imgPen" @click="clickPenFn"></div>
                        <div class="img img-eraser" @click="clear"></div>
                    </div>
                </transition>
            </div>
            <div class="btn" @click="chagneFn">
                <transition name="pen-tr1">
                    <div class="same-btn1 img-btn" v-show="changeState == 0"></div>
                </transition>
                <transition 
                    name="pen-tr2"
                >
                    <div class="same-btn2 img-btn" v-show="changeState == 1"></div>
                </transition>
                <h1>{{sameNameArr[changeState]}}</h1>
            </div>
            <div class="btn" @click="closeFn">
                <div class="img-btn" :style="{backgroundImage : 'url(' + require('./../assets/class/close@2x.png') + ')'}"></div>
                <h1>关闭</h1>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import CanvasA from './CanvasA'
import CanvasB from './CanvasB'

export default{
    name : 'WrongSpeech',
    data(){
        return {
            firstChange : 0,
            choosePenArr : [
                require('./../assets/class/hb@2x.png'),
                require('./../assets/class/tc@2x.png')
            ],
            banChoosePen : require('./../assets/class/hb-j@2x.png'),
            choosePen : false,
            choosePenNameArr : ['画笔' , '返回'],
            choosePenState : 0,//0默认笔刷按钮
            isShow : true,//切换
            showAlert : false,
            imgUrl1 : 'http://i9.download.fd.pchome.net/t_640x1136/g1/M00/08/0A/oYYBAFOC9yGIfcXiAAEqyDQLgUAAABjmgHeRjMAASrg977.jpg',
            imgUrl2 : 'http://img.zcool.cn/community/014a52554064690000005b03d35d4e.jpg@2o.jpg',
            bigUrlArr : [
                require('./../assets/class/1b@2x.png'),
                require('./../assets/class/2b@2x.png'),
                require('./../assets/class/3b@2x.png')
            ],
            bigState : 1,
            /*拖拽参数*/
            banBoxMove : false,
            /*画笔参数*/
            banPenUse : true,
            offLeft : 0,
            offTop : 0,
            /*同类型*/
            sameUrlArr : [
                require('./../assets/class/tl@2x.png'),
                require('./../assets/class/fh@2x.png')
            ],
            sameNameArr : ['同类型题' , '返回原题'],
            changeState : 0,            
            banClick : false,
            canClickArr : {
                bigCanClick : true,
                penCanClick : true
            },
            bigTimer : '',
            penTimer : ''
        }
    },
    components : {
        CanvasA,
        CanvasB
    },
    computed: {
      ...mapGetters([ 
        "viewHeight",
        "COURSEID",
        "CLASSID",
        "BOOKSID",
        "TEACHID"
      ]),
    },
    props : {
        imgUrl1 : {
            type : String,
            // default : ''
        },
        imgUrl2 : {
            type : String,
            // default : ''
        }
    },
    methods : {
        beforeEnterFn(){
            this.banClickFn();
        },
        afterEnterFn(){
            this.useClickFn();
        },
        beforeLeaveFn(){
            this.banClickFn();
        },
        afterLeaveFn(){
            this.useClickFn();
        },
        banClickFn(){
            this.banClick = true;
        },
        useClickFn(){
            this.banClick = false;
        },
        //画笔
        penBeforeEnterFn(){
            this.choosePen = false;
        },
        penEnterFn(){
            this.$set(this.canClickArr, 'penCanClick' , false);
        },
        penLeaveFn(){
            this.$set(this.canClickArr, 'penCanClick' , false);
        },
        penAfterEnterFn(){
            this.$set(this.canClickArr, 'penCanClick' , true);
        },
        penAfterLeaveFn(){
            this.$set(this.canClickArr, 'penCanClick' , true);
            this.choosePen = true;
        },

        clickPenFn(){
            imgPen.style.backgroundImage = `url(${this.banChoosePen})`;
            this.choosePen = true;
            this.banPenUse = false;
            this.banBoxMove = true;
        },
        choosePenFn(){
            if(!this.canClickArr.penCanClick) return;
            if(this.choosePenState >= 1){
                this.choosePenState = 0;
                this.banPenUse = true;
                this.banBoxMove = false;
            }else{
                this.choosePenState ++;//1为返回按钮
                this.banPenUse = false;
                this.banBoxMove = true;
            }
        },
        /*     切换    */
        chagneFn(){
            if(this.banClick) return;
            this.firstChange ++;
            this.changeState = this.changeState >= 1 ? 0 : this.changeState + 1;
            

            this.banPenUse = true;
            this.banBoxMove = false;
            this.isShow = !this.isShow;
            this.choosePen = false;
            this.choosePenState = 0;

            this.changeBigStateShowFn();
            this.changeReloadFn();
        },
        /*     缩放    */
        bigFn(){
            if(!this.canClickArr.bigCanClick) return;
            console.log(this.bigState)
            this.$set(this.canClickArr, 'bigCanClick' , false);
            this.bigTimer && clearTimeout(this.bigTimer);
            this.bigTimer = setTimeout(() => {
                this.$set(this.canClickArr, 'bigCanClick' , true);
            } , 500);
            if(this.isShow){
                //显示A
                this.$refs.boxA.bigFn();
            }else{
                //显示B
                this.$refs.boxB.bigFn();
            }
        },
        changeBigStateShowFn(){
            if(this.isShow){
                //显示boxA
                this.$refs.boxA.changeBigStateFn();
            }else{
                //显示boxB
                this.$refs.boxB.changeBigStateFn();
            }
        },
        changeReloadFn(){
            if(this.firstChange == 1){
                this.$refs.boxB.imgLoadFn();
            }
        },
        emitBigStateFn(value){
            this.bigState = value;
        },
        /*     画笔    */
        banBoxMoveFn(){
            this.banBoxMove = true;
            this.banPenUse = !this.banBoxMove;
        },
        clear(){
            imgPen.style.backgroundImage = `url(${this.choosePenArr[0]})`;
            this.banBoxMove = false;
            this.banPenUse = true;
            if(this.isShow){
                //显示boxA
                this.$refs.boxA.clear();
            }else{
                //显示boxB
                this.$refs.boxB.clear();
            }
        },
        /*     显隐    */
        closeFn(){
            this.$emit('closeCanvasFn')
        },
        openFn(){
            this.$nextTick(() => {
                this.offLeft = this.$refs['hidden-box'].offsetLeft;
                this.offTop = this.$refs['hidden-box'].offsetTop;
                // console.log(this.offTop,this.offLeft)
            })
        },
        
    }
}
</script>
<style lang="scss" scoped>
.wrong-speech{
    width : 1000px;
    height : 800px;
    @include center;
    z-index : 50;
    background : $color-bg-e9d5;
    overflow: hidden;
}
.fa-box{
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
}
.hidden-box-div{
    width : 100%;
    height : 100%;
    position : relative;
}

.slide-right-enter-active{
    will-change: transform;
    transition: all 1s;
    position: absolute;
    left:0;
}
.slide-left-enter-active{
    will-change: transform;
    transition: all 1s;
    position: absolute;
    left:0;
}
.slide-right-leave-active{
    will-change : transform;
    transition: all 1s;
    position: absolute;
    left : 0;
}
.slide-left-leave-active{
    will-change : transform;
    transition: all 1s;
    position: absolute;
    left:-100%;
}
.slide-right-enter {
    transform: translateX(100%);
}
.slide-right-leave-active {
    transform: translateX(100%);
}
.slide-left-enter {
    transform: translateX(-100%);
}
.slide-left-leave-active {
    transform: translateX(-100%);
}

.hidden-bg{
    width: 100%;
    height : 100%;
    position: absolute;
    top : 0;
    left : 0;
}

.btn-group{
    position : absolute;
    bottom : 70px;
    right : 12px;
    z-index: 2;
    h1{
        font-size : 14px;
        font-family : $font-yahei;
        text-align : center;
        color : $color-000;
        line-height : 18px;
        position : absolute;
        bottom : 8px;
        left : 0;
        width : 100%;
    }
    .img-btn{
        width : 66px;
        height : 66px;
        border-radius : 50%;
        background-color : $color-bg-black1;
        background-position : center;
        // background-size : 35px 34px;
        background-repeat : no-repeat;
        position : absolute;
        top : 0;
        left : 0;
        transform-style : preserve-3d;
    }
    /*  放大    */
    .big-btn1{
        background-image : url('./../assets/class/1b@2x.png');
    }
    .big-btn2{
        background-image : url('./../assets/class/2b@2x.png');
    }
    .big-btn3{
        background-image : url('./../assets/class/3b@2x.png');
    }
    /*  画笔    */
    .pen-btn1{
        background-image : url('./../assets/class/hb@2x.png');
    }
    .pen-btn2{
        background-image : url('./../assets/class/tc@2x.png');
    }
    /*  同类型  */
    .same-btn1{
        background-image : url('./../assets/class/tl@2x.png');
    }
    .same-btn2{
        background-image : url('./../assets/class/fh@2x.png');
    }
    .btn{
        width : 66px;
        height : 94px;
        position : relative;
        /*  放大    */
        .big-tr1-enter{
            opacity : 0;
            transform : rotateY(180deg);
        }
        .big-tr1-enter-to{
            opacity : 1;
            transform : rotateY(0deg);
        }
        .big-tr1-enter-active{
            animation: bigTr1Enter 0.45s;
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
            animation : bigTr1Leave 0.45s;
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
            animation : bigTr2Enter 0.45s;
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
            animation : bigTr2Leave 0.45s;
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
            animation : bigTr3Enter 0.45s;
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
            animation : bigTr3Leave 0.45s;
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
        /*  画笔    */
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

        

        .alert-btn{
            width : 48px;
            position : absolute;
            top : -17px;
            left : -48px;
            .img{
                width : 48px;
                height : 48px;
                margin-bottom : 5px;
                border-radius : 50%;
                background-color : $color-bg-black1;
                background-position : center;
                background-size : 26px 26px;
                background-repeat : no-repeat;
            }
            .img-pen{
                background-image : url('./../assets/class/hb-j@2x.png');
            }
            .img-eraser{
                background-image : url('./../assets/class/qc@2x.png');
            }
            .img-eraser:active{
                background-image : url('./../assets/class/qc-j@2x.png');
            }
        }
    }
}

</style>

