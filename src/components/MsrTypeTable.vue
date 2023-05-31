<template>
    <div class="msrType" v-if="showMsrType" @click="hideDialog">
        <my-button class="currentButton" @click="showDialog" >Добавить запись</my-button>
        <div class="scroll">
            <table cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <th>Действие</th>
                        <th>Полное наименование</th>
                        <th>Краткое наименование</th>
                        <th>Описание типа замера</th>
                        <th>Группа</th>  
                    </tr>
                    <tr v-for="msrType in msrTypes" :key="msrType.msr_type_id" >
                        <td><my-button @click="showDialogDelete(msrType)">x</my-button></td>
                        <td>{{ msrType.msr_type_name}}</td>
                        <td>{{ msrType.msr_type_sname}}</td>
                        <td>{{ msrType.msr_type_desc }}</td>
                        <td>{{ msrType.msr_group_id.msr_group_name}}</td>
                    </tr>     
                </tbody>
            </table>
        </div>
        
        <dialog-window v-model:show="dialogVisble">
                <div class="exitBtn">
                    <my-button @click="closeDialog">х</my-button>
                </div>
                
                <my-input v-model="dataMsrType.msr_type_name" @input="(dataMsrType.msr_type_name = $event.target.value)" type="text" placeholder="Полное наименование"></my-input>
                <my-input v-model="dataMsrType.msr_type_sname" @input="(dataMsrType.msr_type_sname = $event.target.value)" type="text" placeholder="Краткое наименование"></my-input>
                <my-input v-model="dataMsrType.msr_type_desc" @input="(dataMsrType.msr_type_desc = $event.target.value)" type="text" placeholder="Описание"></my-input>
                <select v-model="selectedTypeText" @change="this.selectedType=$event.target.options[$event.target.options.selectedIndex].__vnode.key">
                    <option disabled value="">Выберите из списка</option>
                    <option v-for="msrGroup in msrGroups" :key="msrGroup.msr_group_id">
                    {{ msrGroup.msr_group_name }}
                    </option>
                </select>
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
                                <my-button  @click="deleteMsrType">Да</my-button>
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
                msrTypes:[],
                msrGroups:[],
                dialogVisble: false,
                dialogVisibleDelete: false,
                selectedType: 0,
                selectedTypeText: '',
                dataMsrType:{
                    msr_type_name:'',
                    msr_type_sname:'',
                    msr_type_desc:''
                },
                msrType: null
            }
        },
        props:{
            showMsrType:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            showDialogDelete(msrType){
                this.msrType = msrType;
                this.dialogVisibleDelete =true;
            },
            hideDialogDelete(){
                this.dialogVisibleDelete = false;
            },
            async deleteMsrType(){
                try{
                    alert("Тип замера успешно удален");
                    const response = await axios.delete("http://localhost:8081/msr_type/" + this.msrType.msr_type_id);
                    
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
                
                if (this.dataMsrType.msr_type_name === '' || this.dataMsrType.msr_type_sname === '' || this.dataMsrType.msr_type_desc === ''){
                        alert('Заполните все поля')
                        
                }else{
                    this.addMsrTypeToDB();
                    this.closeDialog();
                    
                    this.dataMsrType.msr_type_desc = '';
                    this.dataMsrType.msr_type_name = '';
                    this.dataMsrType.msr_type_sname = '';
                    this.selectedType = 0;
                    this.selectedTypeText = '';
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
            async getAllTypes(){
                try{
                    const response = await axios.get("http://localhost:8081/msr_type/all");
                    this.msrTypes = response.data;
                    
                    
                }catch(e){
                    alert('Error')
                }
                
            },
            async addMsrTypeToDB(){
                try{
                    const response = await axios.post("http://localhost:8081/msr_type",this.dataMsrType,{
                        params:{
                            groupID: this.selectedType
                        }
                    });
                    alert('Тип замера добавлен');
                }catch(e){
                    alert('Error');
                }
            }
        },
        mounted(){
            this.getAllTypes();
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
.saveBtn{
    text-align: center;
}
.exitBtn{
    text-align: right;

}
.noDelete{
    margin-left: 7px;
}
.yesNoButtons{
    display: flex;
    flex-direction:row;

}
.currentButton{
    width: 150px;
}
.msrType{
    margin-top: 30px;
}
form{
    display: flex;
    flex-direction: column;
}
select{
    height: 30px;
    width: auto;
    margin-bottom: 7px;
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