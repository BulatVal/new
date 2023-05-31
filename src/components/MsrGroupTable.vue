<template>
   <div class="msrGroup" v-if="showMsrGroup" @click="hideDialog">
        <my-button class="currentButton" @click="showDialog" >Добавить запись</my-button>
        <div class="scroll">
            <table cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <th>Действие</th>
                        <th>Полное наименование</th>
                        <th>Краткое наименование</th> 
                    </tr>
                    <tr v-for="msrGroup in msrGroups" :key="msrGroup.msr_group_id" >
                        <td><my-button @click="showDialogDelete(msrGroup)">x</my-button></td>
                        <td>{{ msrGroup.msr_group_name}}</td>
                        <td>{{ msrGroup.msr_group_sname}}</td>
                    </tr>     
                </tbody>
            </table>
        </div>
        
        <dialog-window v-model:show="dialogVisble">
                <div class="exitBtn">
                    <my-button @click="closeDialog">х</my-button>
                </div>
                <my-input v-model="dataMsrGroup.msr_group_name" @input="(dataMsrGroup.msr_group_name = $event.target.value)" type="text" placeholder="Полное наименование"></my-input>
                <my-input v-model="dataMsrGroup.msr_group_sname" @input="(dataMsrGroup.msr_group_sname = $event.target.value)" type="text" placeholder="Краткое наименование"></my-input>
                <div class="saveBtn">
                    <my-button class="currentButton" @click="addMsrGroup">Сохранить</my-button>
                </div>
        </dialog-window>

        <div>
            <dialog-window  v-model:show="dialogVisibleDelete">
                <div>
                    <h2>Вы уверены что хотите удалить данную запись?</h2>
                    <div class="yesNoButtons">
                        <div>
                            <form>
                                <my-button  @click="deleteMsrGroup">Да</my-button>
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
                msrGroups:[],
                dialogVisble: false,
                dialogVisibleDelete:false,
                dataMsrGroup:{
                    msr_group_name:'',
                    msr_group_sname:''
                },
                msrGroup: null
            }
        },
        props:{
            showMsrGroup:{
                type:Boolean,
                default:false
            }
        },
        methods:{

            showDialogDelete(msrGroup){
                this.msrGroup = msrGroup;
                this.dialogVisibleDelete =true;
            },
            hideDialogDelete(){
                this.dialogVisibleDelete = false;
            },
            async deleteMsrGroup(){
                try{
                    const response = await axios.delete("http://localhost:8081/msr_group/" + this.msrGroup.msr_group_id);
                    alert("Тип НПО успешно удален");
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
            addMsrGroup(){
                
                if (this.dataMsrGroup.msr_group_name === '' || this.dataMsrGroup.msr_group_sname === ''){
                        alert('Заполните все поля')
                
                }else{
                    this.addMsrGroupToDB();
                    this.closeDialog();
                    this.dataMsrGroup.msr_group_name = '';
                    this.dataMsrGroup.msr_group_sname = '';
                    
                }
            },
            async getAllMsrGroups(){
                try{
                    const response = await axios.get("http://localhost:8081/msr_group/all");
                    this.msrGroups = response.data;
                    
                }catch(e){
                    alert('Error')
                }
                
            },
            async addMsrGroupToDB(){
                try{
                    const response = await axios.post("http://localhost:8081/msr_group",this.dataMsrGroup);
                    alert('Новая группа добавлена');
                }catch(e){
                    alert('Error');
                }
            }
        },
        mounted(){
            this.getAllMsrGroups();
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
.noDelete{
    margin-left: 7px;
}
.yesNoButtons{
    display: flex;
    flex-direction:row;

}
.msrGroup{
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
</style>