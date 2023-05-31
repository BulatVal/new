<template>
    <div class="navbar">
        <my-button @click="$router.push('/workerform')">Назад</my-button>
    </div>
    <div class="chart" v-if="showchart">
        <canvas class="mychart" id="myChart"></canvas>
    </div>
    <div class="scroll">
        <table  cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <th>Объект</th>
                    <th>Дата</th> 
                    <th>P min</th> 
                    <th>P max</th> 
                    <th>L ход</th> 
                    <th>N кач</th>
                    <th>C пуск</th> 
                    <th>D пл</th>
                    <th>Примечание</th>
                    <th>Заключение</th>
                    <th>График</th>   
                </tr>
                <tr v-for="dynamogram in dynamogramList" :key="dynamogram.id">
                    <td>{{dynamogram.msr_id.facility_id.facility_type_id.facility_type_name}} {{  dynamogram.msr_id.facility_id.facility_name }}</td>
                    <td>{{dynamogram.msr_id.msr_date}}</td> 
                    <td>{{ dynamogram.stress_min }}</td> 
                    <td>{{ dynamogram.stress_max }}</td> 
                    <td>{{ dynamogram.l_stroke }}</td> 
                    <td>{{dynamogram.n_frequency}}</td>
                    <td>{{dynamogram.cpusk}}</td> 
                    <td>{{dynamogram.dpl}}</td>
                    <td>{{dynamogram.dyn_desc}}</td>
                    <td>{{dynamogram.dyn_conclusion}}</td>
                    <td><button class="drawChartButton" @click="selectedDynamogram(dynamogram)">Показать</button></td>  
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { shallowRef } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';
import AddDynamogramData from '@/components/AddDynamogramData.vue';

    export default {
        components:{
            AddDynamogramData
        },
        data(){
            return{
                dialogVisble:false,
                dynamogramList: [],
                showchart: true,
                dynChartData:[],
                NUMBER_CFG: {count: 7, rmin: 5, rmax: 15, min: 0, max: 100},
                chart_data: [],
                chart_line:[],
                myChart: null,
                config: {
                    type: 'bubble',
                    data: {
                    datasets: [{
                        label: 'Точки',
                        data: [],
                        borderColor: '#fff',
                        backgroundColor: ['yellow']
                    },
                    {
                        type: 'line',
                        label: 'Фактическая динамограмма',
                        data: [],
                        borderColor: 'red',
                        backgroundColor: ['black'],
                        borderWidth: 1
                    },
                    {
                        type: 'line',
                        label: 'Теоретическая динамограмма',
                        data:[{
                            x:100,
                            y:2000,
                        },
                        {
                            x:500,
                            y:4000,
                        },
                        {
                            x:2500,
                            y:4000,
                        },
                        {
                            x:2100,
                            y:2000,
                        },
                        {
                            x:100,
                            y:2000,
                        },],
                        borderColor: 'blue',
                        backgroundColor: ['blue'],
                        borderWidth: 1
                    }]
                    },
                    options: {
                    scales: {
                        y: {
                        beginAtZero: false
                        }
                    }
                    }
                }
            }
        },
        methods:{
            //Построение графика по определенному замеру
            selectedDynamogram(dynamogramSelect){
                this.chart_data =[];
                this.chart_line = [];
               
                const dataChart = this.dynChartData.filter(p => p.dynamogram_id.id === dynamogramSelect.id);
                dataChart.forEach((x) => {
                    this.chart_data.push({x:x['x'],y:null,r:5});
                    this.chart_line.push({x:x['x'],y:null})

                });
                for(let i = 0;i<dataChart.length;i++){
                    this.chart_data[i]['y'] = dataChart[i]['y'];
                    this.chart_line[i]['y'] = dataChart[i]['y'];

               }
                
                this.myChart.data.datasets[0].data = this.chart_data;
                
                this.myChart.data.datasets[1].data = this.chart_line;
                this.myChart.update();
              
              
            },
            dataForBubbleChart(){
                return this.chart_data;
            },
            dataForLineChart(){
                return this.chart_line;
            },
            showDialog(){
                this.dialogVisble = true;
            },
            hideDialog(){
                this.dialogVisble = false;
            },
            
            async getAllDynamograms(){
                try{
                    const response = await axios.get("http://localhost:8081/dynamogram/all");
                    this.dynamogramList = response.data;
                    console.log(this.dynamogramList)
                    
                }catch(e){
                    alert('Error')
                }
            },
            async getAllDataAboutChart(){
                try{
                    const response = await axios.get("http://localhost:8081/dyngrafic/all")
                    this.dynChartData = response.data;
                    console.log(this.dynChartData);
                }catch(e){
                    alert('Error')
                }
            },
            createChart(){
                this.showchart = true;
                const ctx = document.getElementById('myChart');
                 this.myChart = shallowRef(new Chart(ctx, this.config)) ;
            }
        },

        
       mounted(){
            
            this.getAllDynamograms();
            this.createChart();
            this.getAllDataAboutChart();

            
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
.drawChartButton{
    background: none;
    width: 130px;
    
    cursor: pointer;
    transition: 0.35s;

}
.chart{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    
 
}

.drawChartButton:hover{
    background-color: #FF9966;
    border: 2px solid black
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
.navbar{
    height: 50px;
    background-color: #FF9966;
    box-shadow: 2px 2px 4px gray ;
    display: flex;
    flex-direction: row;
    align-items:center;
    padding: 0 15px;
}
button{
        font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
        background-color: #FF9966;
        border: 2px solid black;
        height: 50px;
        width: 150px;
        border-radius: 5px;
        padding: 1px;
        font-size: 14px;
        font-weight: bold;
    }
</style>