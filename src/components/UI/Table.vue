<template>
    <table cellspacing="0" cellpadding="0">
        <tbody>
            <tr>
                
            <th colspan="5">Объект</th>
            <th colspan="5">Исходный замер</th>
            <!-- <th colspan="6">Отбраковка</th> -->
           </tr>
           <tr>
            <td colspan="3">?</td>
            <td>Источник</td>
            <td>Тип НПО</td>
            <td>НПО</td>
            <td>Дата</td>
            <td>Замер</td>
            <td>Единицы измерения</td>
            <td>Примечание к замерам</td> 
            
            
           </tr>
           <tr v-for="msr in msrs" :key="msr.msr_value_id" >

            
            <td><my-button @click="showDialogDelete(msr)">х</my-button>
                    
            </td>
            <td>
                <div v-if="msr.msr_id.source_id.source_name !== 'Ручной замер'">
                    -
                </div>
                <div v-else><my-button @click="this.selectedMsrID=showDialogEdit(msr)">↻</my-button></div>
            </td>
            <td><my-button @click="this.selectedMsrValueId = showInfoDialog(msr)">Инфо</my-button>
            </td>
            <td>{{ msr.msr_id.source_id.source_name }}</td>
            <td>{{ msr.msr_id.facility_id.facility_type_id.facility_type_name }}</td>
            <td>{{ msr.msr_id.facility_id.facility_name }}</td>
            <td>{{ msr.msr_id.msr_date }}</td>
            <td>{{ msr.value}}</td>
            <td>{{ msr.msr_value_type_id.value_type_name}}</td>
            <td>{{ msr.msr_id.msr_desc }}</td>

           </tr>     
        </tbody>
           
    </table>

    <div>
        <dialog-window  v-model:show="dialogVisibleDelete">
            <div>
                <h2>Вы уверены что хотите удалить данную запись?</h2>
                <div class="yesNoButtons">
                    <div>
                        <form >
                            <my-button  @click="$emit('remove',this.msr)">Да</my-button>
                        </form>
                            
                        
                    </div>
                    <div class="noDelete">
                        <my-button @click="hideDialogDelete">Нет</my-button>
                    </div>
                </div>
            </div>
        </dialog-window>
    </div>

    <div>
        <dialog-window  v-model:show="dialogVisbleEdit">
            <my-button @click="hideDialogEdit">x</my-button>
            <EditMetricsForm :selected-msr="selectedMsrID" ></EditMetricsForm>
        </dialog-window>
    </div>
    <div>
        <dialog-window v-model:show="dialogVisbleInfo">
            <my-button @click="hideDialogInfo">x</my-button>
            <MsrInfoForm :list-msr-value="selectedRow" :selected-msr-value-i-d="selectedMsrValueId"></MsrInfoForm>
        </dialog-window>
    </div>
</template>

<script>

import EditMetricsForm from '../EditMetricsForm.vue';
import MsrInfoForm from '../MsrInfoForm.vue';
    export default {
        components:{
            EditMetricsForm,
            MsrInfoForm
        },
        data(){
            return{
                selectedMsrID: 0,
                dialogVisbleEdit:false,
                selectedMsrValueId: 0,
                dialogVisbleInfo: false,
                dialogVisibleDelete: false,
                selectedRow:[]
                
            }
        },
        
        
        name: 'my-table',
        props:{
            msrs:{
                type: Array,
                required: true
            }
                
        },
        methods:{

            //методы для показа и скрытия окон
            showDialogEdit(msr){
                this.dialogVisbleEdit = true;
                
                return msr.msr_id.msr_id
            },
            hideDialogEdit(){
                this.dialogVisbleEdit = false;
            },
            showInfoDialog(msr){
                this.dialogVisbleInfo = true;
                this.selectedRow = this.msrs.filter(p => p.msr_value_id === msr.msr_value_id);
                return msr.msr_value_id;
            },
            hideDialogInfo(){
                this.dialogVisbleInfo = false;
            },
            showDialogDelete(msr){
                this.dialogVisibleDelete = true;
                this.msr = msr;
            },
            hideDialogDelete(){
                this.dialogVisibleDelete = false;
            }
            
            
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
.yesNoButtons{
    display: flex;
    flex-direction: row;
}
.noDelete{
    margin-left: 7px;
}
</style>