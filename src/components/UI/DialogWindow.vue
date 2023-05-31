<template>
    <div class="dialog" v-if="show" @click="hideDialog">
        <div @click.stop class="dialog__content">
            
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dialog-window',
        props:{
            show :{
                type:Boolean,
                default:false
            }
        },
        methods:{
            //emit позволяет прокидывать события из родителя в дочерние компоненты (скрытие диалогового окна)
            hideDialog(){
                this.$emit('update:show',true);
            }
        }
        
    }
</script>

<style  scoped>
.dialog{
    top:0;
    bottom: 0;
    right:0;
    left: 0;
    background: rgba(0,0,0,0.5);
    position: fixed;
    display: flex;
}
.dialog__content{
    margin: auto;
    background:white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 12px;
    display: flex;
    flex-direction: column;
}
</style>