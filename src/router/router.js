import AuthForm from '@/pages/AuthForm'
import WorkerForm from '@/pages/WorkerForm'
import AdminForm from '@/pages/AdminForm'
import DynamometryForm from '@/pages/DynamometryForm'
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: "/",
        component: AuthForm
    },
    {
        path: "/workerform",
        component: WorkerForm 
    },
    {
        path: "/adminform",
        component: AdminForm,
        
    },
    {
        path: "/dynamometryform",
        component: DynamometryForm
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;