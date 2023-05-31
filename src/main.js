import components from '@/components/UI';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   
import Row from 'primevue/row';  
import "primevue/resources/themes/lara-light-indigo/theme.css";     

import "primevue/resources/primevue.min.css";  

const app =  createApp(App);

components.forEach(component => {
    app.component(component.name,component);
    
});

app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);

app
.use(router)
.mount('#app')
