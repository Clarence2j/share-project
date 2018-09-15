<template>
    <div class="swipper3">
        <span class="area1" @click="isGet(1)" :class="c1">tap1</span>
        <span class="area1" @click="isGet(2)" :class="c2">tap2</span>
        <span class="area1" @click="isGet(3)" :class="c3">tap3</span>
        <div class="view-box">
            <transition 
                name="hide"
            >
                <component :is="keet" keep-alive></component>
            </transition>
        </div>
    </div>
</template>
<script>
export default{
    name : 'swipper3',
    data(){
        return {
            keet:"first",
            c1:'add_active',
            c2:'',
            c3:''
        }
    },
    methods : {
        isGet:function(val){
            switch(val){
                case 1:
                    this.keet = "first";
                    this.c1='add_active';
                    this.c2="";
                    this.c3="";
                break;
                case 2:
                    this.keet = "second";
                    this.c1="";
                    this.c2="add_active";
                    this.c3="";
                break;
                case 3:
                    this.keet = "third";
                    this.c1="";
                    this.c2="";
                    this.c3="add_active";
                break;
            }
        }
    },
    components : {
        first:{
            template:"<div class='red box'>1</div>"
        },
        second:{
            template:"<div class='yellow box'>2</div>"
        },
        third:{
            template:"<div class='aqua box'>3</div>"
        }
  },
}
</script>
<style scoped>
.area1{
    display : inline-block;
    width : 80px;
    height : 80px;
    border : 1px solid #ccc;
}
div div div{
    width : 200px; 
    height : 200px;
    background : #abcdef;
    line-height : 200px;
    margin-top : 20px; 
    text-align : center;
    font-size : 30px;
}
.add_active{
    border : 1px solid #f00;
}
.view-box{
    position : relative;
    width : 200px;
    height : 200px;
    overflow : hidden;
}
.red{
    background : red;
    width : 200px;
    height : 200px;
    position : absolute;
    top : 0;
    left : 0;
}
.yellow{
    background : yellow;
    width : 200px;
    height : 200px;
    position : absolute;
    top : 0;
    left : 0;
}
.aqua{
    background : aqua;
    width : 200px;
    height : 200px;
    position : absolute;
    top : 0;
    left : 0;
}
.hide-enter{
    left : 100%;
}
.hide-enter-to{
    left : 0;
}
.hide-enter-active{
    transition : all 1s;
}
.hide-leave{
    left : 0;
}
.hide-leave-to{
    left : -100%;
}
.hide-leave-active{
    transition : all 1s;
}
</style>

