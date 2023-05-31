<template>
    <div>
        <h2>Авторизация</h2>
        <div class="inputs__class">
            <my-input v-model="login" @input="(login = $event.target.value)" type="text" placeholder="Логин"/>
            <my-input v-model="password" @input="(password = $event.target.value)" type="password" placeholder="Пароль"/>
        </div>
        <div class="authBtn">
            <my-button @click="signIN($router)">Войти</my-button>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return{
                login: '',
                password:'',
                users:[]
            }
        },
        methods:{
            //авторизация
            signIN(router){
                console.log(this.login , this.password);
                this.users = this.users.filter(p => p.user_login === this.login && p.user_password === this.password);
                if (this.users.length === 1){
                    if(this.login === "admin"){
                        router.push('/adminform');
                    }else{
                        router.push('/workerform');
                    }
                    
                    
                }else{
                    alert("Неверный пароль или логин");
                    this.getAllUsers();
                }
                
            },
            //получение списка всех пользователей
            async getAllUsers(){
                try{
                    const response = await axios.get('http://localhost:8081/users/all');
                    this.users = response.data;
                    console.log(this.users);
                }catch(e){
                    alert("Error")
                }
            }
            
        },
        mounted(){
            this.getAllUsers();
            
            
        }
    }
</script>

<style scoped>
h2{
    text-align: center;
}
.inputs__class{
    display:flex;
    flex-direction: column;
}
.authBtn{
   text-align: center;
   
}
</style>