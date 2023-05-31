<template>
    <div>
        <form >
            <!--Вывод источника замера-->

            <h4>Объект</h4>
            <select v-model="selectedObject"
                @change="this.msrID = $event.target.options[$event.target.selectedIndex].__vnode.key.msr_id">
                <option disabled selected value="">Выберите из списка</option>
                <option v-for="msr in msrs" :key="msr.msr_id">
                    {{ msr.msr_id.facility_id.facility_type_id.facility_type_name }} {{ msr.msr_id.facility_id.facility_name
                    }}
                </option>
            </select>
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

            <my-button @click="isEmpty">Сохранить</my-button>



        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            selectedObject: "",
            msrs: [],
            msrID: 0,
            dynamogramData: {
                stress_min: 0,
                stress_max: 0,
                l_stroke: 0,
                n_frequency: 0,
                Cpusk: 0,
                Dpl: 0,
                dyn_desc: "",
                dyn_conclusion: ""
            }
        }

    },
    methods: {
        async getMsr() {
            try {
                const response = await axios.get('http://localhost:8081/msr_value/all');
                this.msrs = response.data;
                console.log(this.msrs);

            } catch (e) {
                alert('Error');
            }
        },
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
                    msrID: this.msrID
                }
            });
            


        },
        isEmpty() {

            if (this.selectedObject.trim() == '' ||
                this.dynamogramData.stress_min === 0 ||
                this.dynamogramData.stress_max === 0 ||
                this.dynamogramData.l_stroke === 0 ||
                this.dynamogramData.n_frequency === 0 ||
                this.dynamogramData.Cpusk === 0 ||
                this.dynamogramData.Dpl === 0 ||
                this.dynamogramData.dyn_desc.trim() == '' ||
                this.dynamogramData.dyn_conclusion.trim() == '' ||
                this.msrID === 0) {
                alert("Зполните все поля")
            } else {

                this.AddDataToDynamogram();
                
            }


        }

    },
    mounted() {
        this.getMsr();
    }
}
</script>

<style>
select {
    width: 300px;
    margin-left: 15px;
    height: 30px;
    border: 1px solid black
}
</style>