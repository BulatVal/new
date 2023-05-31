<template>
    <div class="filtres">
        <div class="filter">
            <!-- Фильр по диапазону дат -->
            <my-input v-model="startDate" @input="( startDate = $event.target.value)" :value="startDate" type="date" placeholder="Введите первую дату"></my-input>
            <my-input v-model="endDate" @input="( endDate = $event.target.value)" :value="endDate" type="date" placeholder="Введите вторую дату"></my-input>
            <!-- Поиск -->
            <my-input v-model="NPOsearch" @input="(NPOsearch = $event.target.value)" :value="NPOsearch" type="text" placeholder="Поиск..."></my-input>
            <my-button class="currentbtn" @click="emptyFiltres">Убрать фильтры</my-button>
        </div>
    </div>
    <div class="tableMsr">
        <my-table :msrs="searchAndSortByDate" @remove="removeMsr"></my-table>

    </div>
   
</template>

<script>
import axios from 'axios';

    export default {
      
        data(){
            return{
                msrs:[],
                startDate: null,
                endDate: null,
                NPOsearch: ""
                
            }
        },
        methods:{
           //получение данных нпо
            async loadMsrdata(){
                try{
                    const response = await axios.get('http://localhost:8081/msr_value/all');
                    this.msrs = response.data
                    console.log(this.msrs)
                }catch(e){
                    alert("Error")
                }
            },
            // удаление данных о замере и нпо (вызов)
            async removeMsr(msr){
                this.msrs = this.msrs.filter(p => p.msr_value_id !== msr.msr_value_id);
                
                await this.deleteMsrValueData(msr.msr_value_id);
                
                await this.deleteMsrData(msr.msr_id.msr_id);
                
                
                
                
            },
            //удаление данных о замере
            async deleteMsrValueData(msr_value_id){
                try{
                    const response = await axios.delete('http://localhost:8081/msr_value/'+msr_value_id);
                    console.log('Запись успешно удалена');
                }catch(e){
                    alert('Error');
                }
            },
            //удаление данных о нпо
            async deleteMsrData(msr_id){
                try{
                    const response = await axios.delete('http://localhost:8081/msr/'+msr_id);
                    console.log('Запись успешно удалена');
                }catch(e){
                    alert('Error');
                }
                
            },
            // очистка фильтров
            emptyFiltres(){
                this.startDate = null;
                this.endDate =  null;
                this.NPOsearch = "";
            }

        },
        //метод который выполнет дейтствия при загрузке странице
        mounted(){
           this.loadMsrdata();
           console.log(this.startDate);
           console.log(this.endDate);
        },
        //метод для отслеживания изменений
        computed:{
            //сортировка по датам
            sortedByDate(){
                if (this.startDate === null || this.endDate === null){
                    return this.msrs;
                }
                else{
                    return this.msrs.filter(p => p.msr_id.msr_date >= this.startDate && p.msr_id.msr_date <= this.endDate )
                }
            },
            //поиск по НПО
            searchAndSortByDate(){
                if (this.NPOsearch === ""){
                    return this.sortedByDate;
                }else{
                    return this.sortedByDate.filter(p => p.msr_id.facility_id.facility_name.includes(this.NPOsearch));
                }
            }
            
        }
    }
</script>

<style  scoped>
.filtres{
    background-color: beige;
    border:2px solid black;
    margin-top:10px;
    border-radius:10px
}
.currentbtn{
    width: 150px;
}
.tableMsr {
    
    height: 500px;
    border: 2px solid black;
    overflow-x: scroll;
    overflow-y: scroll;
    border-radius: 10px;
    margin-right: 15px;
    margin-top: 10px;
}

</style>