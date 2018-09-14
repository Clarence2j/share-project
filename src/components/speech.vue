<template>
    <div
        class="topic-speech"
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
            <div class="fa-box" v-show="!isShow">
                <echarts ref="echart" @closeAllFn="closeFn"></echarts>
            </div>
        </transition>
        <div class="btn-group hand-point">
            <div v-show="chooseStopState != 3">
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
            </div>
            <div class="btn" @click="changeStopFn">
                <transition 
                    name="change-tr1"
                    @enter="changeEnterFn"
                    @after-enter="changeAfterEnterFn"
                    @leave="changeLeaveFn"
                    @after-leave="changeAfterLeaveFn"
                >
                    <div class="change-btn1 img-btn" v-show="chooseStopState == 0"></div>
                </transition>
                <transition 
                    name="change-tr2"
                >
                    <div class="change-btn2 img-btn" v-show="chooseStopState == 1"></div>
                </transition>
                <transition 
                    name="change-tr2"
                    @enter="changeEnterFn"
                    @after-enter="changeAfterEnterFn"
                    @leave="changeLeaveFn"
                    @after-leave="changeAfterLeaveFn"
                >
                    <div class="change-btn3 img-btn" v-show="chooseStopState == 2"></div>
                </transition>
                <transition 
                    name="change-tr3"
                >
                    <div class="change-btn4 img-btn" v-show="chooseStopState == 3"></div>
                </transition>
                <h1 :style="{color : chooseStopState == 3 ? '#dee1e1' : '#514f48'}">{{chooseStopWordArr[chooseStopState]}}</h1>
            </div>
            <div class="btn" @click="closeFn">
                <div class="img-btn closeBtn" :class="chooseStopState == 3 ? 'btn-transition2' : 'btn-transition1'" id="closeBtn"></div>
                <h1 :style="{color : chooseStopState == 3 ? '#dee1e1' : '#514f48'}">关闭</h1>
            </div>
        </div>
        <topic-time v-if="showWater" :maxSendNum="peopleNum" ref="water"></topic-time>
        <alert-box 
            :flag="showReLoadAlert" 
            :alertType="btnType"
            :propsParentText="alertMsg1"
            :propsParentBtn="btnText1"
            :propsParentBtn2="btnText2"
            @leaveHereFn="alertLoadingFn" 
            @stateHereFn="cancleFn"
            @sendOnce="recycleQuestionFn"
        ></alert-box>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import CanvasA from './CanvasA'
import TopicTime from './TopicTime'
import Echarts from './Echarts'
import AlertBox from './AlertBox'

export default{
    name : 'TopicSpeech',
    data(){
        return {
            choosePenArr : [
                require('./../assets/class/hb@2x.png'),
                require('./../assets/class/tc@2x.png')
            ],
            banChoosePen : require('./../assets/class/hb-j@2x.png'),
            choosePen : false,
            choosePenState : 0,//0默认笔刷按钮
            choosePenNameArr : ['画笔' , '返回'],
            chooseStopArr : [
                require('./../assets/class/ft@2x.png'),
                require('./../assets/class/st@2x.png'),
                require('./../assets/class/xq@2x.png'),
                require('./../assets/class/fh-white@2x.png')
            ],
            chooseStopWordArr : ['发题' , '收题' , '学情统计' , '返回'],
            chooseStopState : 0,
            isShow : true,//切换
            showAlert : false,
            bigUrlArr : [
                require('./../assets/class/1b@2x.png'),
                require('./../assets/class/2b@2x.png'),
                require('./../assets/class/3b@2x.png')
            ],
            bigState : 1,
            /*拖拽参数*/
            banBoxMove : false,
            /*画笔参数*/
            penBaseState : false,
            banPenUse : true,
            offLeft : 0,
            offTop : 0,
            changeState : 0,
            /*水杯效果*/
            showWater : false,
            /*发题弹窗*/
            showReLoadAlert : false,
            btnType : 0,
            alertMsg1 : '',
            alertMsg2 : '',
            btnText1 : '',
            btnText2 : '',
            closeUrl : [
                require('./../assets/class/close@2x.png'),
                require('./../assets/class/close-white@2x.png')
            ],
            canClick : true,
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
        TopicTime,
        Echarts,
        AlertBox
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
        lookType : {
            type : Boolean,
            default : false
        },
        imgUrl1 : {
            type : String,
            default : ''
        },
        peopleNum : {
            type : String,
            default : '1'
        },
        isLockType : {
            type : String,
            default : '0'
        },
        qid : {
            type : String,
            default : '0'
        }
    },
    mounted(){
        this.openFn();
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
        //切换
        changeEnterFn(){
            this.canClick = false;
        },
        changeAfterEnterFn(){
            this.canClick = true;
        },
        changeLeaveFn(){
            this.canClick = false;
        },
        changeAfterLeaveFn(){
            this.canClick = true;
        },

        clickPenFn(){
            imgPen.style.backgroundImage = `url(${this.banChoosePen})`;
            this.choosePen = true;
            this.banPenUse = false;
            this.banBoxMove = true;
        },
        choosePenFn(){
            if(!this.canClickArr.penCanClick) return;
            this.$set(this.canClickArr, 'penCanClick' , false);
            this.penTimer && clearTimeout(this.penTimer);
            this.penTimer = setTimeout(() => {
                this.$set(this.canClickArr, 'penCanClick' , true);
            } , 500);
            imgPen.style.backgroundImage = `url(${this.banChoosePen})`;
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
            this.changeState = this.changeState >= 1 ? 0 : this.changeState + 1;
            this.banPenUse = true;
            this.banBoxMove = false;
            this.isShow = !this.isShow;
            this.changeBigStateShowFn();
        },
        finshChangeStopFn(){
            this.chooseStopState = this.chooseStopState >= 3 ? 0 : this.chooseStopState + 1;
        },
        changeStopFn(){
            if(this.lookType)return;
            if(!this.canClick) return;
            switch (this.chooseStopState + 1){
                case 1:
                    this.alertLoadingFn();
                    this.canClick = false;
                break;
                case 2:
                    this.recycleQuestionFn();
                    this.canClick = false;
                break;
                case 3:
                    this.lookAnswerFn();
                break;
                case 4:
                    this.goBackIndexFn();
                break;
            }
        },
        //发题，弹loading
        alertLoadingFn(){
            //弹loading
            this.$store.dispatch('LOADINGMSG' , '正在发送题目，请稍后');
            //开始发题
            this.$get('class-room/api-switch-test' , {
                params : {
                    teachid : this.TEACHID,
                    booksid : this.BOOKSID,
                    courseid : this.COURSEID,
                    qid : this.qid,
                    isopen : 1
                }
            })
                .then(res => {
                    this.canClick = true;
                    if(res.result == 1){
                        //请求成功展示水杯
                        this.showWater = true;
                        //关闭从新发题弹窗
                        this.showReLoadAlert = false;
                        //请求成功切换按钮状态
                        this.finshChangeStopFn();
                        this.$nextTick().then(() => {
                            this.showWater && this.$refs['water'].start();
                        })
                    }else{
                        this.btnType = 2;
                        this.alertMsg1 = '题目发送失败';
                        this.alertMsg2 = '是否重新发送？';
                        this.btnText1 = '取消发送';
                        this.btnText2 = '重新发送';
                        this.showReLoadAlert = true;
                        this.chooseStopState = 0;
                    }
                })
                .catch(err => {
                    this.canClick = true;
                    //请求失败展示重新发题弹窗
                    this.showReLoadAlert = true;
                    this.chooseStopState = 0;
                })
        },
        cancleFn(){
            this.showReLoadAlert = false;
        },
        //收题
        recycleQuestionFn(){
            this.$store.dispatch('LOADINGMSG' , '题目收取中');
            //开始收题
            this.$get('class-room/api-switch-test' , {
                params : {
                    teachid : this.TEACHID,
                    booksid : this.BOOKSID,
                    courseid : this.COURSEID,
                    qid : this.qid,
                    isopen : 0
                }
            })
                .then(res => {
                    this.canClick = true;
                    //请求成功切换按钮状态
                    if(res.result == 1){
                        //请求成功展示水杯
                        this.showWater = true;
                        //关闭从新发题弹窗
                        this.showReLoadAlert = false;
                        //请求成功切换按钮状态
                        this.finshChangeStopFn();
                        this.$nextTick().then(() => {
                            this.showWater && this.$refs['water'].cancelNumFn();
                        })
                    }else{
                        this.btnType = 3;
                        this.alertMsg1 = '收取题目失败';
                        this.btnText1 = '放弃收题';
                        this.btnText2 = '重新收题';
                        this.showReLoadAlert = true;
                        this.chooseStopState = 1;
                    }
                })
                .catch(err => {
                    this.canClick = true;
                    //请求失败展示重新发题弹窗
                    this.showReLoadAlert = true;
                })
        },
        //查询结果
        lookAnswerFn(){
            this.showWater = false;
            this.changeState = this.changeState >= 1 ? 0 : this.changeState + 1;
            this.banPenUse = true;
            this.banBoxMove = false;
            this.isShow = !this.isShow;
            this.$refs['echart'].init();
            this.finshChangeStopFn();

            //更改按钮
            closeBtn.style.backgroundImage = `url(${this.closeUrl[1]})`;
            this.choosePen = false;
            this.banPenUse = true;
            this.banBoxMove = false;
            this.choosePenState = 0;
        },
        //返回
        goBackIndexFn(){
            if(this.banClick) return;
            //完成后
            this.showWater = false;
            this.changeState = this.changeState >= 1 ? 0 : this.changeState + 1;
            this.banPenUse = true;
            this.banBoxMove = false;
            this.isShow = !this.isShow;
            this.finshChangeStopFn();
            //改回按钮图片
            closeBtn.style.backgroundImage = `url(${this.closeUrl[0]})`;

        },
        /*     缩放    */
        bigFn(){
            if(!this.canClickArr.bigCanClick) return;
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
            this.showWater && this.$refs['water'] && this.$refs['water'].cancelNumFn();
            this.$emit('closeCanvasFn');
        },
        openFn(){
            this.$nextTick(() => {
                this.offLeft = this.$refs['hidden-box'].offsetLeft;
                this.offTop = this.$refs['hidden-box'].offsetTop;
            })
        },

    }
}
</script>
<style lang="scss" scoped>
.topic-speech{
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
    transition: all $duration-btn;
    position: absolute;
    left:0;
}
.slide-left-enter-active{
    will-change: transform;
    transition: all $duration-btn;
    position: absolute;
    left:0;
}
.slide-right-leave-active{
    will-change : transform;
    transition: all $duration-btn;
    position: absolute;
    left : 0;
}
.slide-left-leave-active{
    will-change : transform;
    transition: all $duration-btn;
    position: absolute;
    left:-100%;
}
.slide-right-enter {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
    -moz-transform: translateX(100%);
}
.slide-right-leave-active {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
    -moz-transform: translateX(100%);
}
.slide-left-enter {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    -moz-transform: translateX(-100%);
}
.slide-left-leave-active {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    -moz-transform: translateX(-100%);
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
    /*  收发题  */
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

    .btn{
        width : 66px;
        height : 94px;
        position : relative;
        /*  放大    */
        .big-tr1-enter{
            opacity : 0;
            transform : rotateY(180deg);
            -webkit-transform : rotateY(180deg);
            -moz-transform : rotateY(180deg);
        }
        .big-tr1-enter-to{
            opacity : 1;
            transform : rotateY(0deg);
            -webkit-transform : rotateY(0deg);
            -moz-transform : rotateY(0deg);
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
        @-webkit-keyframes bigTr1Enter {
            0%{
                opacity : 0;
                -webkit-transform : rotateY(180deg);
            }
            49%{
                opacity : 0;
                -webkit-transform : rotateY(90deg);
            }
            50%{
                opacity : 1;
                -webkit-transform : rotateY(90deg);
            }
            51%{
                opacity : 1;
                -webkit-transform : rotateY(90deg);
            }
            100%{
                opacity : 1;
                -webkit-transform : rotateY(0deg);
            }
        }
        @-moz-keyframes bigTr1Enter {
            0%{
                opacity : 0;
                -moz-transform : rotateY(180deg);
            }
            49%{
                opacity : 0;
                -moz-transform : rotateY(90deg);
            }
            50%{
                opacity : 1;
                -moz-transform : rotateY(90deg);
            }
            51%{
                opacity : 1;
                -moz-transform : rotateY(90deg);
            }
            100%{
                opacity : 1;
                -moz-transform : rotateY(0deg);
            }
        }
        .big-tr1-leave{
            transform : rotateY(0deg);
            -moz-transform : rotateY(0deg);
            -webkit-transform : rotateY(0deg);
        }
        .big-tr1-leave-to{
            transform : rotateY(180deg);
            -moz-transform : rotateY(180deg);
            -webkit-transform : rotateY(180deg);
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
        @-webkit-keyframes bigTr1Leave {
            0%{
                opacity : 1;
                -webkit-transform : rotateY(0deg);
            }
            49%{
                opacity : 1;
                -webkit-transform : rotateY(90deg);
            }
            50%{
                opacity : 0;
                -webkit-transform : rotateY(90deg);
            }
            51%{
                opacity : 0;
                -webkit-transform : rotateY(90deg);
            }
            100%{
                opacity : 0;
                -webkit-transform : rotateY(180deg);
            }
        }
        @-moz-keyframes bigTr1Leave {
            0%{
                opacity : 1;
                -moz-transform : rotateY(0deg);
            }
            49%{
                opacity : 1;
                -moz-transform : rotateY(90deg);
            }
            50%{
                opacity : 0;
                -moz-transform : rotateY(90deg);
            }
            51%{
                opacity : 0;
                -moz-transform : rotateY(90deg);
            }
            100%{
                opacity : 0;
                -moz-transform : rotateY(180deg);
            }
        }
        
        .big-tr2-enter{
            transform : rotateY(180deg);
            -moz-transform : rotateY(180deg);
            -webkit-transform : rotateY(180deg);
        }
        .big-tr2-enter-to{
            transform : rotateY(0deg);
            -moz-transform : rotateY(0deg);
            -webkit-transform : rotateY(0deg);
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
        @-webkit-keyframes bigTr2Enter {
            0%{
                opacity : 0;
                -webkit-transform : rotateY(180deg);
            }
            49%{
                opacity : 0;
                -webkit-transform : rotateY(90deg);
            }
            50%{
                opacity : 1;
                -webkit-transform : rotateY(90deg);
            }
            51%{
                opacity : 1;
                -webkit-transform : rotateY(90deg);
            }
            100%{
                opacity : 1;
                -webkit-transform : rotateY(0deg);
            }
        }
        @-moz-keyframes bigTr2Enter {
            0%{
                opacity : 0;
                -moz-transform : rotateY(180deg);
            }
            49%{
                opacity : 0;
                -moz-transform : rotateY(90deg);
            }
            50%{
                opacity : 1;
                -moz-transform : rotateY(90deg);
            }
            51%{
                opacity : 1;
                -moz-transform : rotateY(90deg);
            }
            100%{
                opacity : 1;
                -moz-transform : rotateY(0deg);
            }
        }
        .big-tr2-leave{
            transform : rotateY(0deg);
            -moz-transform : rotateY(0deg);
            -webkit-transform : rotateY(0deg);
        }
        .big-tr2-leave-to{
            transform : rotateY(180deg);
            -moz-transform : rotateY(180deg);
            -webkit-transform : rotateY(180deg);
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
        @-webkit-keyframes bigTr2Leave {
            0%{
                opacity : 1;
                -webkit-transform : rotateY(0deg);
            }
            49%{
                opacity : 1;
                -webkit-transform : rotateY(90deg);
            }
            50%{
                opacity : 0;
                -webkit-transform : rotateY(90deg);
            }
            51%{
                opacity : 0;
                -webkit-transform : rotateY(90deg);
            }
            100%{
                opacity : 0;
                -webkit-transform : rotateY(180deg);
            }
        }
        @-moz-keyframes bigTr2Leave {
            0%{
                opacity : 1;
                -moz-transform : rotateY(0deg);
            }
            49%{
                opacity : 1;
                -moz-transform : rotateY(90deg);
            }
            50%{
                opacity : 0;
                -moz-transform : rotateY(90deg);
            }
            51%{
                opacity : 0;
                -moz-transform : rotateY(90deg);
            }
            100%{
                opacity : 0;
                -moz-transform : rotateY(180deg);
            }
        }
        
        
        .big-tr3-enter{
            transform : rotateY(180deg);
            -moz-transform : rotateY(180deg);
            -webkit-transform : rotateY(180deg);
        }
        .big-tr3-enter-to{
            transform : rotateY(0deg);
            -moz-transform : rotateY(0deg);
            -webkit-transform : rotateY(0deg);
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
        @-webkit-keyframes bigTr3Enter {
            0%{
                opacity : 0;
                -webkit-transform : rotateY(180deg);
            }
            49%{
                opacity : 0;
                -webkit-transform : rotateY(90deg);
            }
            50%{
                opacity : 1;
                -webkit-transform : rotateY(90deg);
            }
            51%{
                opacity : 1;
                -webkit-transform : rotateY(90deg);
            }
            100%{
                opacity : 1;
                -webkit-transform : rotateY(0deg);
            }
        }
        @-moz-keyframes bigTr3Enter {
            0%{
                opacity : 0;
                -moz-transform : rotateY(180deg);
            }
            49%{
                opacity : 0;
                -moz-transform : rotateY(90deg);
            }
            50%{
                opacity : 1;
                -moz-transform : rotateY(90deg);
            }
            51%{
                opacity : 1;
                -moz-transform : rotateY(90deg);
            }
            100%{
                opacity : 1;
                -moz-transform : rotateY(0deg);
            }
        }

        .big-tr3-leave{
            opacity : 1;
            transform : rotateY(0deg);
            -moz-transform : rotateY(0deg);
            -webkit-transform : rotateY(0deg);
        }
        .big-tr3-leave-to{
            opacity : 0;
            transform : rotateY(-180deg);
            -moz-transform : rotateY(-180deg);
            -webkit-transform : rotateY(-180deg);
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
        @-webkit-keyframes bigTr3Leave {
            0%{
                opacity : 1;
                -webkit-transform : rotateY(0deg);
            }
            49%{
                opacity : 1;
                -webkit-transform : rotateY(-90deg);
            }
            50%{
                opacity : 0;
                -webkit-transform : rotateY(-90deg);
            }
            51%{
                opacity : 0;
                -webkit-transform : rotateY(-90deg);
            }
            100%{
                opacity : 0;
                -webkit-transform : rotateY(-180deg);
            }
        }
        @-moz-keyframes bigTr3Leave {
            0%{
                opacity : 1;
                -moz-transform : rotateY(0deg);
            }
            49%{
                opacity : 1;
                -moz-transform : rotateY(-90deg);
            }
            50%{
                opacity : 0;
                -moz-transform : rotateY(-90deg);
            }
            51%{
                opacity : 0;
                -moz-transform : rotateY(-90deg);
            }
            100%{
                opacity : 0;
                -moz-transform : rotateY(-180deg);
            }
        }
        /*  画笔    */
        .pen-tr1-enter{
            opacity : 0;
            transform : rotateY(180deg);
            -moz-transform : rotateY(180deg);
            -webkit-transform : rotateY(180deg);
        }
        .pen-tr1-enter-to{
            opacity : 1;
            transform : rotateY(0deg);
            -moz-transform : rotateY(0deg);
            -webkit-transform : rotateY(0deg);
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
        @-webkit-keyframes penTr1Enter {
            0%{
                opacity : 0;
                -webkit-transform : rotateY(180deg);
            }
            49%{
                opacity : 0;
                -webkit-transform : rotateY(90deg);
            }
            50%{
                opacity : 1;
                -webkit-transform : rotateY(90deg);
            }
            51%{
                opacity : 1;
                -webkit-transform : rotateY(90deg);
            }
            100%{
                opacity : 1;
                -webkit-transform : rotateY(0deg);
            }
        }
        @-moz-keyframes penTr1Enter {
            0%{
                opacity : 0;
                -moz-transform : rotateY(180deg);
            }
            49%{
                opacity : 0;
                -moz-transform : rotateY(90deg);
            }
            50%{
                opacity : 1;
                -moz-transform : rotateY(90deg);
            }
            51%{
                opacity : 1;
                -moz-transform : rotateY(90deg);
            }
            100%{
                opacity : 1;
                -moz-transform : rotateY(0deg);
            }
        }

        .pen-tr1-leave{
            transform : rotateY(0deg);
            -moz-transform : rotateY(0deg);
            -webkit-transform : rotateY(0deg);
        }
        .pen-tr1-leave-to{
            transform : rotateY(180deg);
            -moz-transform : rotateY(180deg);
            -webkit-transform : rotateY(180deg);
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
        @-webkit-keyframes penTr1Leave {
            0%{
                opacity : 1;
                -webkit-transform : rotateY(0deg);
            }
            49%{
                opacity : 1;
                -webkit-transform : rotateY(90deg);
            }
            50%{
                opacity : 0;
                -webkit-transform : rotateY(90deg);
            }
            51%{
                opacity : 0;
                -webkit-transform : rotateY(90deg);
            }
            100%{
                opacity : 0;
                -webkit-transform : rotateY(180deg);
            }
        }
        @-moz-keyframes penTr1Leave {
            0%{
                opacity : 1;
                -moz-transform : rotateY(0deg);
            }
            49%{
                opacity : 1;
                -moz-transform : rotateY(90deg);
            }
            50%{
                opacity : 0;
                -moz-transform : rotateY(90deg);
            }
            51%{
                opacity : 0;
                -moz-transform : rotateY(90deg);
            }
            100%{
                opacity : 0;
                -moz-transform : rotateY(180deg);
            }
        }
          
            
        .pen-tr2-enter{
            transform : rotateY(180deg);
            -webkit-transform : rotateY(180deg);
            -moz-transform : rotateY(180deg);
        }
        .pen-tr2-enter-to{
            transform : rotateY(0deg);
            -webkit-transform : rotateY(0deg);
            -moz-transform : rotateY(0deg);
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
        @-webkit-keyframes bigTr3Enter {
            0%{
                opacity : 0;
                -webkit-transform : rotateY(180deg);
            }
            49%{
                opacity : 0;
                -webkit-transform : rotateY(90deg);
            }
            50%{
                opacity : 1;
                -webkit-transform : rotateY(90deg);
            }
            51%{
                opacity : 1;
                -webkit-transform : rotateY(90deg);
            }
            100%{
                opacity : 1;
                -webkit-transform : rotateY(0deg);
            }
        }
        @-moz-keyframes bigTr3Enter {
            0%{
                opacity : 0;
                -moz-transform : rotateY(180deg);
            }
            49%{
                opacity : 0;
                -moz-transform : rotateY(90deg);
            }
            50%{
                opacity : 1;
                -moz-transform : rotateY(90deg);
            }
            51%{
                opacity : 1;
                -moz-transform : rotateY(90deg);
            }
            100%{
                opacity : 1;
                -moz-transform : rotateY(0deg);
            }
        }

        .pen-tr2-leave{
            opacity : 1;
            transform : rotateY(0deg);
            -moz-transform : rotateY(0deg);
            -webkit-transform : rotateY(0deg);
        }
        .pen-tr2-leave-to{
            opacity : 0;
            transform : rotateY(-180deg);
            -moz-transform : rotateY(-180deg);
            -webkit-transform : rotateY(-180deg);
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
        @-webkit-keyframes bigTr3Leave {
            0%{
                opacity : 1;
                -webkit-transform : rotateY(0deg);
            }
            49%{
                opacity : 1;
                -webkit-transform : rotateY(-90deg);
            }
            50%{
                opacity : 0;
                -webkit-transform : rotateY(-90deg);
            }
            51%{
                opacity : 0;
                -webkit-transform : rotateY(-90deg);
            }
            100%{
                opacity : 0;
                -webkit-transform : rotateY(-180deg);
            }
        }
        @-moz-keyframes bigTr3Leave {
            0%{
                opacity : 1;
                -moz-transform : rotateY(0deg);
            }
            49%{
                opacity : 1;
                -moz-transform : rotateY(-90deg);
            }
            50%{
                opacity : 0;
                -moz-transform : rotateY(-90deg);
            }
            51%{
                opacity : 0;
                -moz-transform : rotateY(-90deg);
            }
            100%{
                opacity : 0;
                -moz-transform : rotateY(-180deg);
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


        /*  收发题  */
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



        .closeBtn{
            background-image : url('./../assets/class/close@2x.png');
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

