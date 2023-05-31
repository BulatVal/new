<template>
    <div class="navbar">
        
            <my-button class="currentButton" @click="showUsersTable " >Пользователи</my-button>
            <my-button class="currentButton" @click="showFacilityTypesTable">Тип объекта</my-button>
            <my-button class="currentButton" @click="showFacilityTable">Объект</my-button>
            <my-button class="currentButton" @click="showMsrGroupTable">Группы исследований</my-button>
            <my-button class="currentButton" @click="showMsrTypeTable">Типы замеров</my-button>
            <my-button class="currentButton" @click="showMsrStateTable" >Состояние замера</my-button>
            <my-button class="currentButton" @click="showMsrValueTypeTable">Тип замеряемых величин</my-button>
            <my-button class="currentButtonexit" @click="$router.push('/')">Выйти</my-button>
        
    </div>
    <UsersTableForm v-model:showUsers="showUsers"></UsersTableForm>
    <FacilityTypeTable v-model:showfacilityType="showFacilityTypes"></FacilityTypeTable>
    <FacilityTable v-model:showfacility="showFacilities"></FacilityTable>
    <MsrGroupTable v-model:showMsrGroup="showGroupTable"></MsrGroupTable>
    <MsrTypeTable v-model:showMsrType="showType"></MsrTypeTable>
    <MsrValueTypeTable v-model:showMsrValueType="showValueType"></MsrValueTypeTable>
    <MsrStateTable v-model:showMsrState="showState"></MsrStateTable>

</template>

<script>

import UsersTableForm from '@/components/UsersTableForm.vue';
import FacilityTypeTable from '@/components/FacilityTypeTable.vue';
import FacilityTable from '@/components/FacilityTable.vue';
import MsrGroupTable from '@/components/MsrGroupTable.vue';
import MsrTypeTable from '@/components/MsrTypeTable.vue';
import MsrValueTypeTable from '@/components/MsrValueTypeTable.vue'
import MsrStateTable from '@/components/MsrStateTable.vue';
    export default {
        components:{
            UsersTableForm,
            FacilityTypeTable,
            FacilityTable,
            MsrGroupTable,
            MsrTypeTable,
            MsrValueTypeTable,
            MsrStateTable
        },
        data(){
            return{
                showUsers: false,
                showFacilityTypes: false,
                showFacilities: false,
                showGroupTable:false,
                showType:false,
                showValueType: false,
                showState:false

            }
        },
        methods:{
            showUsersTable(){
                this.showUsers = true;
                this.showFacilityTypes = false;
                this.showFacilities =false;
                this.showGroupTable=false
                this.showType = false;
                this.showValueType = false;
                this.showState = false;
            },
            showFacilityTypesTable(){
                this.showUsers = false;
                this.showFacilities =false;
                this.showFacilityTypes = true;
                this.showGroupTable=false;
                this.showType = false;
                this.showValueType = false;
                this.showState = false;
            },
            showFacilityTable(){
                this.showUsers = false;
                this.showFacilityTypes = false;
                this.showFacilities =true;
                this.showGroupTable=false;
                this.showType = false;
                this.showValueType = false;
                this.showState = false;

            },
            showMsrGroupTable(){
                this.showUsers = false;
                this.showFacilityTypes = false;
                this.showFacilities =false;
                this.showGroupTable=true;
                this.showType = false;
                this.showValueType = false;
                this.showState = false;
            },
            showMsrTypeTable(){
                this.showUsers = false;
                this.showFacilityTypes = false;
                this.showFacilities =false;
                this.showGroupTable=false;
                this.showType = true;
                this.showValueType = false;
                this.showState = false;
            },
            showMsrValueTypeTable(){
                this.showUsers = false;
                this.showFacilityTypes = false;
                this.showFacilities =false;
                this.showGroupTable=false;
                this.showType = false;
                this.showValueType = true;
                this.showState = false;
            },
            showMsrStateTable(){
                this.showUsers = false;
                this.showFacilityTypes = false;
                this.showFacilities =false;
                this.showGroupTable=false;
                this.showType = false;
                this.showValueType = false;
                this.showState = true;
            }
        },
       
    }
</script>

<style  scoped>
.currentButton{
    width: 150px;
    margin-left: 7px;
}
.currentButtonexit{
    width: 150px;
    margin-left: 260px;
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
</style>