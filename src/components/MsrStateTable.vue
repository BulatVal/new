<template>
    <div class="msrState" v-if="showMsrState" @click="hideDialog">
        <my-button class="currentButton" @click="showDialog" >Добавить запись</my-button>
        <div class="scroll">
            <table cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <th>Действие</th>
                        <th>Полное наименование</th>
                        <th>Краткое наименование</th> 
                        <th>Описание</th>
                    </tr>
                    <tr v-for="msrState in msrStates" :key="msrState.msr_state_id" >
                        <td><my-button @click="showDialogDelete(msrState)">x</my-button></td>
                        <td>{{ msrState.msr_state_name}}</td>
                        <td>{{ msrState.msr_state_sname}}</td>
                        <td>{{ msrState.msr_state_desc}}</td>
                    </tr>     
                </tbody>
            </table>
        </div>
        
        <dialog-window v-model:show="dialogVisble">
                <div class="exitBtn">
                    <my-button @click="closeDialog">х</my-button>
                </div>
                <my-input v-model="dataMsrState.msr_state_name" @input="(dataMsrState.msr_state_name = $event.target.value)" type="text" placeholder="Полное наименование"></my-input>
                <my-input v-model="dataMsrState.msr_state_sname" @input="(dataMsrState.msr_state_sname = $event.target.value)" type="text" placeholder="Краткое наименование"></my-input>
                <my-input v-model="dataMsrState.msr_state_desc" @input="(dataMsrState.msr_state_desc = $event.target.value)" type="text" placeholder="Описание"></my-input>
                <div class="saveBtn">
                    <my-button class="currentButton" @click="addMsrState">Сохранить</my-button>
                </div>
        </dialog-window>
        <div>
            <dialog-window  v-model:show="dialogVisibleDelete">
                <div>
                    <h2>Вы уверены что хотите удалить данную запись?</h2>
                    <div class="yesNoButtons">
                        <div>
                            <form>
                                <my-button  @click="deleteMsrState">Да</my-button>
                            </form>
                        </div>
                        <div class="noDelete">
                            <my-button @click="hideDialogDelete">Нет</my-button>
                        </div>
                    </div>
                </div>
            </dialog-window>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return{
                msrStates:[],
                dialogVisble: false,
                dialogVisibleDelete:false,
                dataMsrState:{
                    msr_state_name:'',
                    msr_state_sname:'',
                    msr_state_desc: ''
                },
                msrState: null
            }
        },
        props:{
            showMsrState:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            showDialogDelete(msrState){
                this.msrState = msrState;
                this.dialogVisibleDelete =true;
            },
            hideDialogDelete(){
                this.dialogVisibleDelete = false;
            },
            async deleteMsrState(){
                try{
                    const response = await axios.delete("http://localhost:8081/msr_state/" + this.msrState.msr_state_id);
                    alert("Состояние замера удален");
                }catch(e){
                    alert("Error")
                }
            },
            hideDialog(){
                this.$emit('update:show',true);
            },
            closeDialog(){
                this.dialogVisble =false;
            },
            showDialog(){
                this.dialogVisble =true;
            },
            addMsrState(){
                
                if (this.dataMsrState.msr_state_name === '' || this.dataMsrState.msr_state_sname === '' || this.dataMsrState.msr_state_desc === ''){
                        alert('Заполните все поля')
                
                }else{
                    this.addMsrStateToDB();
                    this.closeDialog();
                    this.dataMsrState.msr_state_desc = '';
                    this.dataMsrState.msr_state_name = '';
                    this.dataMsrState.msr_state_sname = '';
                    
                }
            },
            async getAllMsrStates(){
                try{
                    const response = await axios.get("http://localhost:8081/msr_state/all");
                    this.msrStates = response.data;
                    
                }catch(e){
                    alert('Error')
                }
                
            },
            async addMsrStateToDB(){
                try{
                    const response = await axios.post("http://localhost:8081/msr_state",this.dataMsrState);
                    alert('Добавлено новое состояние');
                }catch(e){
                    alert('Error');
                }
            }
        },
        mounted(){
            this.getAllMsrStates();
        }
    }
        

</script>

<style  scoped>
table{
    width: 100%;
    font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
   font-size: 14px;
   border-radius: 15px;
   border-spacing: 0;
   text-align: center;
  
    
}
.msrState{
    margin-top: 30px;
}
form{
    display: flex;
    flex-direction: column;
}
.saveBtn{
    text-align: center;
}
.exitBtn{
    text-align: right;
}
.currentButton{
    width: 150px;
}
.scroll{
    height: 500px;
    border: 2px solid black;
    overflow-x: scroll;
    overflow-y: scroll;
    border-radius: 10px;
    margin-right: 15px;
    margin-top: 10px;
}

table tr:last-child td:first-child{
   border-radius: 0 0 0 10px;
}
table tr:last-child td:last-child{
   border-radius: 0 0 10px 0;
}  

table tr:first-child th:last-child{
   border-radius: 0 10px 0 0;
}  
table tr:first-child th:first-child{
   border-radius: 10px 0 0 0;
}  

th{
    border: 1px solid black;
    margin: 0px;
    text-align: center;
    background-color: beige;
    font-size: 13pt;
}
td{
    border: 1px solid black;
    text-align: center;
}
.noDelete{
    margin-left: 7px;
}
.yesNoButtons{
    display: flex;
    flex-direction:row;

}
</style>