<template>
    <div>
        <h1>Mi Lista de Tareas</h1>

        <TaskForm :task="currentTask || {}"
            @create-task="handleCreateTask"
            @update-task="handleUpdateTask"
            @delete-task="handleDeleteTask"
            />

            <TaskList
            :tasks="tasks"
            @edit-task="handleEditTask"
            @delete-task="handleDeleteTask"
        />
    </div>
</template>

<script>
import TaskList from '@/components/TaskList.vue';
import TaskForm from '../components/TaskForm.vue';
import { getTask, createTask, updateTask, deleteTask } from '../services/taskService.js'; 
export default {
    name: 'HomePage',
    components: {
        TaskForm,
        TaskList
    },
    data() {
        return {
            tasks: [],
            currentTask: {} 
        };
    },
    mounted() {
        this.fetchTasks();  
    },
    methods: {
        async fetchTasks() {
            try {
                this.tasks = await getTask(); 
            } catch (error) {
                console.error("Error al obtener tareas:", error);
            }
        },
        async handleCreateTask(task) {
            try {
                const newTask = await createTask(task);  
                this.tasks.push(newTask);  
                this.currentTask = {};  
            } catch (error) {
                console.error("Error al crear tarea:", error);
            }
        },
        async handleUpdateTask(task) {
            try {
                const updatedTask = await updateTask(task.id, task);  
                const taskIndex = this.tasks.findIndex(t => t.id === updatedTask.id);
                if (taskIndex !== -1) {
                    this.tasks[taskIndex] = updatedTask;  
                }
                this.currentTask = {};  
            } catch (error) {
                console.error("Error al actualizar tarea:", error);
            }
        },
        async handleDeleteTask(taskId) {
            try {
                await deleteTask(taskId);  
                this.tasks = this.tasks.filter(task => task.id !== taskId); 
            } catch (error) {
                console.error("Error al eliminar tarea:", error);
            }
        },
        handleEditTask(task) {
            this.currentTask = { ...task };
        }
    }
}
</script>