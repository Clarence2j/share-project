<template>
    <div class="ddd">
        <h2>{{item.author_name}}:</h2>
        <h1>{{item.title}}</h1>
        <p>---{{item.date}}</p>
        <img :src="item.thumbnail_pic_s" alt="">
        <div class="move">
            <div class="box" :class="isMove ? 'move-animation' : ''">{{isMove}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name : 'Ddd',
    data(){
        return {}
    },
    props : {
        item : {
            type : Object,
            default(){
                return {}
            }
        },
        isMove : {
            type : Boolean,
            default : false
        }
    }
}
</script>
<style scoped lang="scss">
.move{
    width : 100%;
    height : 100px;
    border : 1px solid aqua;
    position : relative;
    .box{
        width : 50px;
        height : 50px;
        background : aqua;
        position : absolute;
        top : 50%;
        left : 50%;
        @include center;
    }
    .move-animation{
        transform: rotate(360deg);
        transition: all 1s;
    }
}
.ddd{
    width : 100%;
    height : 100%;
}
h1{
    font-size : 14px;
    text-align : center;
    height : 20px;
    line-height : 20px;
}
p{
    font-size : 12px;
    text-align : right;
    margin-top : 5px;
    height : 18px;
    line-height : 18px;
}
h2{
    height : 16px;
    line-height : 16px;
    text-align : left;
    font-size : 14px;
}
</style>


