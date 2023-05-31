<template>
  <div>
    <div>
      <nav-bar @showDialog="showDialog"></nav-bar>
      <msr-table ></msr-table>
    </div>
    <dialog-window  v-model:show="dialogVisble">
      <my-button @click="hideDialog">x</my-button>
      <AddMetricsForm></AddMetricsForm>
    </dialog-window>
    <!-- <dialog-window  v-model:show="dialogVisbleEdit">
      <EditMetricsForm></EditMetricsForm>
    </dialog-window> -->
  </div>
</template>

<script>
import MsrTable from '@/components/MsrTable';
import AddMetricsForm from '@/components/AddMetricsForm.vue';
  export default {
    components:{
      MsrTable,
      AddMetricsForm,
      //EditMetricsForm
    },
    data(){
      return{
        dialogVisble:false,
        //dialogVisbleEdit:false
      }
    },
    methods:{
      showDialog(){
          this.dialogVisble = true;
      },
      hideDialog(){
        this.dialogVisble = false;
      }
      // showDialogEdit(){
      //     this.dialogVisbleEdit = true;
      // }
    }
  }
</script>

<style  scoped>

</style>