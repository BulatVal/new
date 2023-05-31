<template>
    <div v-for="list in listMsrValue" :key="list.msr_value_id">
        <div>
            <label> <b>Объект</b> </label>
            <div>{{list.msr_id.facility_id.facility_name  }} {{list.msr_id.facility_id.facility_type_id.facility_type_name}}</div>
        </div>
        <div>
            <label> <b>Дата проведенного замера</b> </label>
            <div>{{ list.msr_id.msr_date}}</div>
        </div>
        <div>
            <label> <b>Значение замера</b> </label>
            <div>{{list.value}}</div>
        </div>
        <div>
            <label> <b>Дата отбраковки</b> </label>
            <div>{{ list.msr_id.rejection_date}}</div>
        </div>
        <div>
            <label> <b>Источник замера</b> </label>
            <div>{{ list.msr_id.source_id.source_name}}</div>
        </div>
        <div>
            <label> <b>Состояние объекта</b> </label>
            <div v-if="list.msr_id.msr_state_id.msr_state_name === null">
                Запись отсутсвует
            </div>
            <div v-else>{{ list.msr_id.msr_state_id.msr_state_name}}</div>
        </div>
        <div>
            <label> <b>Тип замера</b> </label>
            <div v-if="list.msr_id.msr_type_id.msr_type_sysname === null">
                Запись отсутсвует
            </div>
            <div v-else>{{ list.msr_id.msr_type_id.msr_type_sysname}}</div>
        </div>
        <div>
            <label><b>Группа исследований</b></label>
            <div>{{ list.msr_id.msr_type_id.msr_group_id.msr_group_name}}</div>
        </div>
        <div>
            <label> <b>Единица измерения</b> </label>
            <div>{{ list.msr_value_type_id.value_type_name}}</div>
        </div>
        <div>
            <label> <b>Примечание к замерам</b> </label>
            <div>{{ list.msr_id.msr_desc}}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    data(){
        return{
            selectedMsrValueData: []
        }
    },
    props:{
        selectedMsrValueID:{
            type: Number
        },
        listMsrValue:{
            type: Array
        }
        
    },
    methods:{
        //получение конкретного нпо
        async getMsrValueData(){
            const response = await axios.get("http://localhost:8081/msr_value",{
                params:{
                    id: this.selectedMsrValueID
                }
            });
            this.selectedMsrValueData = response.data;
            console.log(this.selectedMsrValueData);
        }
    },
    created(){
        console.log(this.listMsrValue);
    }
    
}
</script>

<style>

</style>