<template>
    <div>
        <form @submit.prevent>
            <!--Вывод источника замера-->
            <div class="metrics">
                <h4>Источник замера</h4>
                <select v-model="selectedSource"  @change="this.sourceID=$event.target.options[$event.target.selectedIndex].__vnode.key" >
                    <option disabled value="">Выберите из списка</option>
                    <option v-for="source in sources" :key="source.source_id" >
                        {{ source.source_name }}
                    </option>
                </select>
                <!--Вывод состояние замера-->
                <h4>Состояние замера</h4>
                <select v-model="selectedState" @change="this.stateID=$event.target.options[$event.target.selectedIndex].__vnode.key">
                    <option disabled value="">Выберите из списка</option>
                    <option v-for="msrState in msrStates" :key="msrState.msr_state_id">
                        {{ msrState.msr_state_sname }}
                    </option>
                </select>
                <!--Вывод типа замера-->
                <h4>Тип замера</h4>
                <select v-model="selectedType" @change="this.typeID = $event.target.options[$event.target.selectedIndex].__vnode.key">
                    <option disabled value="">Выберите из списка</option>
                    <option v-for="typeMsr in typeMsrs" :key="typeMsr.msr_type_id">
                    {{ typeMsr.msr_type_name }}
                    </option>
                </select>
                
                <!--Вывод  объектов-->
                <h4>Объекты</h4>
                <select v-model="selectedFacility" @change="this.facilityID=$event.target.options[$event.target.selectedIndex].__vnode.key">
                    <option disabled value="">Выберите из списка</option>
                    <option v-for="facility in facilities" :key="facility.facility_id">
                    {{ facility.facility_name }} {{ facility.facility_type_id.facility_type_name }}
                    </option>
                </select>
                <my-input  v-model="dataOfMsrValue.value" @input="(dataOfMsrValue.value = $event.target.value)" type="number" placeholder="Значение замера"/>
                <h4>Тип значения</h4>
                <select v-model="selectedValueType" @change="this.valueTypeID = checkMsrDesc($event)">
                    <option disabled value="">Выберите из списка</option>
                    <option v-for="valueType in valueTypes" :key="valueType.value_type_id">
                    {{ valueType.value_type_name }}
                    </option>
                </select>
                <my-input disabled v-model="dataMsr.msr_desc" :value="dataMsr.msr_desc" @input="(dataMsr.msr_desc = $event.target.value)" type="text" placeholder="Примечание к замеру"/>
                
            </div>
            

            <div class="dynamogram_data">
                <h3>Данные об объекте</h3>
                    <br /><my-input v-model="dynamogramData.stress_min" @input="(dynamogramData.stress_min = $event.target.value)"
                    type="number" step="0.01" placeholder="Минимальное давление" />
                <br /><my-input v-model="dynamogramData.stress_max" @input="(dynamogramData.stress_max = $event.target.value)"
                    type="number" step="0.01" placeholder="Максимальное давление" />
                <br /><my-input v-model="dynamogramData.l_stroke" @input="(dynamogramData.l_stroke = $event.target.value)"
                    type="number" step="0.01" placeholder="Длина хода штанги" />
                <br /><my-input v-model="dynamogramData.n_frequency" @input="(dynamogramData.n_frequency = $event.target.value)"
                    type="number" step="0.01" placeholder="Кол-во качаний" />
                <br /><my-input v-model="dynamogramData.Cpusk" @input="(dynamogramData.Cpusk = $event.target.value)"
                    type="number" step="0.01" placeholder="C пуск" />
                <br /><my-input v-model="dynamogramData.Dpl" @input="(dynamogramData.Dpl = $event.target.value)" type="number"
                    step="0.01" placeholder="D пл" />
                <br /><my-input v-model="dynamogramData.dyn_desc" @input="(dynamogramData.dyn_desc = $event.target.value)"
                    type="text" placeholder="Описание" />
                <br /><my-input v-model="dynamogramData.dyn_conclusion"
                    @input="(dynamogramData.dyn_conclusion = $event.target.value)" type="text" placeholder="Заключение" />
            </div>
            <div class="addBtn">
                <my-button class="currenBtn" @click="isEmpty">Сохранить</my-button>
            </div>
            

        </form>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        data(){
            return{

                //Данные о динамограмме 
                dynamogramList:[],
                dynamogramData: {
                    stress_min: 0,
                    stress_max: 0,
                    l_stroke: 0,
                    n_frequency: 0,
                    Cpusk: 0,
                    Dpl: 0,
                    dyn_desc: "",
                    dyn_conclusion: ""
                },
                //Данные о замере
                sources:[],
                selectedSource: '',
                typeMsrs:[],
                selectedType:'',
                msrStates:[],
                selectedState: '',
                facilities:[],
                selectedFacility:'',
                valueTypes:[],
                selectedValueType:'',
                msrs:[],
                valueOfMsr: '',
                sourceID: 0,
                stateID: 0,
                typeID: 0,
                facilityID: 0,
                valueTypeID: 0,
                dataMsr:{
                    msr_desc: ''
                },
                dataOfMsrValue:{
                    value: null
                },

                //График
                x_massive1:[],
                x_massive2:[],
                x_massive3:[],
                x_massive4: [],
                y_massive1:[],
                y_massive2:[],
                result_massive:[],
                x: null,
                y:null
                

            }
        },
        
        methods:{
            //рандомная генерация точек для графика(для наглядности)
            charDataGenerate(){

                
                    for(let i = 0;i<=300;i++){
                        
                        this.y = Math.random()*(3000-0)+0;
                        this.x = Math.random()*(5000-1800)+1800;
                        if (this.x_massive1.length === 75){
                            this.x_massive2.push(this.x)
                        }
                        else if(this.x_massive2.length === 75)
                        {
                            this.x_massive3.push(this.x);
                        }else if (this.x_massive3.length === 75){
                            this.x_massive4.push(this.x)
                        }
                        
                        else if (this.x_massive2.length !== 75){
                            this.x_massive1.push(this.x)
                        }

                        if (this.y_massive1.length === 150){
                            this.y_massive2.push(this.y)
                        }
                        else
                        {
                            this.y_massive1.push(this.y);
                        }
                        
                    }
                    this.y_massive1.sort((a, b) => a - b);
                    this.y_massive2.sort((a, b) => b - a);

                    this.y_massive1 = [...this.y_massive1,...this.y_massive2];

                    this.x_massive1.sort((a, b) => a - b);
                    this.x_massive2.sort((a, b) => b - a);
                    this.x_massive3.sort((a,b) => a - b);
                    this.x_massive4.sort((a,b)=> b - a);

                    this.x_massive1 = [...this.x_massive1,...this.x_massive2,...this.x_massive3,...this.x_massive4];
                    

                    this.y_massive1.forEach((elem)=>{
                        this.result_massive.push({x: elem, y: null });
                    });
                    
                    for(let i = 0;i<this.x_massive1.length;i++){
                        this.result_massive[i]['y'] = this.x_massive1[i];
                    }

                },
                //получение истоников замера
                async getSources(){
                    try{
                        const response = await axios.get('http://localhost:8081/source/all');
                        this.sources = response.data;
                        console.log(this.sources);
                    }catch(e){
                        alert('Error')
                    }
                },
                //получение типов нпо
                async getMsrTypes(){
                    try{
                        const response = await axios.get('http://localhost:8081/msr_type/all');
                        this.typeMsrs = response.data;
                        console.log(this.typeMsrs);
                    }catch(e){
                        alert('Error')
                    }
                },
                //получение состояние нпо
                async getMsrStates(){
                    try{
                        const response = await axios.get('http://localhost:8081/msr_state/all');
                        this.msrStates = response.data;
                        console.log(this.msrStates);
                    }catch(e){
                        alert('Error')
                    }
                },
                async getfacilities(){
                    try{
                        const response = await axios.get('http://localhost:8081/facility/all');
                        this.facilities = response.data;
                        console.log(this.facilities);
                        
                    }catch(e){
                        alert('Error');
                    }
                },

                //получение типов замера
                async getMsrValueType(){
                    try{
                        const response = await axios.get('http://localhost:8081/msr_value_type/all');
                        this.valueTypes = response.data;
                        console.log(this.valueTypes);
                        
                    }catch(e){
                        alert('Error');
                    }
                },
                async getMsrData(){
                    try{
                        const response =  await axios.get('http://localhost:8081/msr/all');
                        this.msrs = response.data;
                        console.log(this.msrs);
                    }catch(e){
                        alert('Error');
                    }
            },
            //добавление данных об нпо
            async addDatatoMsr(){
                
                const response = await axios.post('http://localhost:8081/msr',this.dataMsr,{
                    params:{
                        typeID: this.typeID,
                        sourceID: this.sourceID,
                        stateID: this.stateID,
                        facilityID: this.facilityID
                    }
                });
                
                this.getMsrData();
                
                this.charDataGenerate();
                setTimeout(()=>{
                    this.addDataMsrValue();
                },100);
                setTimeout(()=>{
                    this.AddDataToDynamogram();
                },500);
                
                
            },
            //добавление данных о замере
            async addDataMsrValue(){
                const response = await axios.post('http://localhost:8081/msr_value',this.dataOfMsrValue,{
                    params:{
                        msrID: this.msrs[this.msrs.length-1].msr_id,
                        valueTypeID: this.valueTypeID
                    }
                });
            },
            //полчение данных о динамометрировании для присвоения в будущем id в таблицу с графиками
            async getAllDynamograms(){
                try{
                    const response = await axios.get("http://localhost:8081/dynamogram/all");
                    this.dynamogramList = response.data;
                    console.log(this.dynamogramList)
                    
                }catch(e){
                    alert('Error')
                }
            },
            //добавление данных для графика
            async addDynGraficData(data){
               
                        try{
                        const response = await axios.post('http://localhost:8081/dyngrafic', data, {
                            params: {
                                dynamogramID: this.dynamogramList[this.dynamogramList.length-1].id
                            }
                        });
                        
                    }catch(e){
                        alert('Error')
                    }
                
                
            },
            //добавление данных о динамометрировании
            async AddDataToDynamogram() {
                const requestData = {
                    stress_min: this.dynamogramData.stress_min,
                    stress_max: this.dynamogramData.stress_max,
                    l_stroke: this.dynamogramData.l_stroke,
                    n_frequency: this.dynamogramData.n_frequency,
                    cpusk: this.dynamogramData.Cpusk,
                    dpl: this.dynamogramData.Dpl,
                    dyn_desc: this.dynamogramData.dyn_desc,
                    dyn_conclusion: this.dynamogramData.dyn_conclusion
                };
                const response = await axios.post('http://localhost:8081/dynamogram', requestData, {
                    params: {
                        msrID: this.msrs[this.msrs.length-1].msr_id
                    }
                });
            
                this.getAllDynamograms();
                setTimeout(()=>{
                    this.result_massive.forEach((elem)=>{
                        setTimeout(()=>{
                            this.addDynGraficData(elem);
                        },100);
                    },100);
                })
                

            },
            test(event){
                console.log()
                    console.log(event.target.options.selectedIndex)
                   
            },
            //Вывод примечания замера в зависимости от значения замера и его единцы измерения
            checkMsrDesc(event){
                if(  event.
                    target.
                    options[event.target.selectedIndex].
                    __vnode.ctx.data.
                    valueTypes[event.target.options.selectedIndex-1].min_value <= this.dataOfMsrValue.value && 
                     event.
                    target.
                    options[event.target.selectedIndex].
                    __vnode.ctx.data.
                    valueTypes[event.target.options.selectedIndex-1].max_value >= this.dataOfMsrValue.value){
                        this.dataMsr.msr_desc = "Замер находится в пределах нормы";
                    }
                    else if(  event.
                    target.
                    options[event.target.selectedIndex].
                    __vnode.ctx.data.
                    valueTypes[event.target.options.selectedIndex-1].min_value >= this.dataOfMsrValue.value ){
                        this.dataMsr.msr_desc = "Замер находится ниже нормы";
                    }
                    else if( event.
                    target.
                    options[event.target.selectedIndex].
                    __vnode.ctx.data.
                    valueTypes[event.target.options.selectedIndex-1].max_value <= this.dataOfMsrValue.value){
                        this.dataMsr.msr_desc = "Замер находится выше нормы";
                    }
                return event.target.options[event.target.selectedIndex].__vnode.key;
            },
            //Проверка полей на пустоту
            isEmpty(){
                if (this.sourceID === 0 ||
                    this.stateID === 0 ||
                    this.typeID === 0 ||
                    this.facilityID === 0 ||
                    this.dataOfMsrValue.value === null ||
                    this.valueTypeID === 0 ||
                    this.dataMsr.msr_desc.trim() == '' ||
                    this.dynamogramData.stress_min === 0 ||
                    this.dynamogramData.stress_max === 0 ||
                    this.dynamogramData.l_stroke === 0 ||
                    this.dynamogramData.n_frequency === 0 ||
                    this.dynamogramData.Cpusk === 0 ||
                    this.dynamogramData.Dpl === 0 ||
                    this.dynamogramData.dyn_desc.trim() == '' ||
                    this.dynamogramData.dyn_conclusion.trim() == ''){
                        alert("Заполните все поля");
                    }
                else{
                        this.addDatatoMsr();
                        alert("Данные о замере были успешно добавлены")
                    }
            }
            

        },

        mounted(){
            this.getSources();
            this.getMsrTypes();
            this.getMsrStates();
            this.getfacilities();
            this.getMsrValueType()
            
            
            
        },
        
        
    }

</script>

<style  scoped>
form{
    display: flex;
    flex-direction: row;
}
.metrics{
    display: flex;
    flex-direction: column;
}
.dynamogram_data{
    display: flex;
    flex-direction: column;
}
select{
    width: auto;
    height: 30px;
    border: 1px solid black
}
.currenBtn{
    width: 150px;
}
.addBtn{
    text-align: center;
    
}
</style>