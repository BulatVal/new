<template>
    <div>
    <dialog-window  v-model:show="dialogVisble">
        <AuthComponents></AuthComponents>
    </dialog-window>
    </div>
</template>

<script>
import AuthComponents from '@/components/AuthComponents.vue';
    export default {
        components:{
            AuthComponents
        },
        data(){
            return{
                dialogVisble: true
            }
        }
        
    }
</script>

<style  scoped>

</style>