<template>
    <div>
        <h3>Lista de Tareas</h3>

        <div>
            <button @click="loadTasks">Load All Tasks</button>
            <button @click="loadCompletedTasks">Completed Tasks</button>
            <button @click="loadPendingTasks">Pending Tasks</button>
        </div>

        <ul>
            <li v-for="task in filteredTasks" :key="task.id">
                <label>
                    <input 
                        type="checkbox" 
                        v-model="task.completed" 
                        @change="updateTaskStatus(task)"
                    />
                    {{ task.title }} - {{ task.completed ? "Completed" : "Pending" }}
                </label>
                <button @click="editTask(task)">Edit</button>
                <button @click="deleteTaskHandler(task.id)" class="delete-btn">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { getTasks, getTasksByStatus } from "../services/taskService";

export default {
    name: 'TaskList',
    props: {
        tasks: {
            type: Array,
            required: true
        }
    },data() {
        return {
            filteredTasks: [...this.tasks] 
        };
    },
    watch: {
        tasks(newTasks) {
            this.filteredTasks = [...newTasks];  
        }
    },
    methods: {
        loadTasks() {
            getTasks().then(tasks => {
                this.filteredTasks = tasks; 
            }).catch(error => {
                console.error("Error loading tasks:", error);
            });
        },
        loadCompletedTasks() {
            getTasksByStatus(true).then(tasks => {
                this.filteredTasks = tasks;
            }).catch(error => {
                console.error("Error loading completed tasks:", error);
            });
        },
        loadPendingTasks() {
            getTasksByStatus(false).then(tasks => {
                this.filteredTasks = tasks; 
            }).catch(error => {
                console.error("Error loading pending tasks:", error);
            });
        },
        editTask(task) {
            this.$emit("edit-task", task); 
        },
        deleteTaskHandler(taskId) {
            this.$emit("delete-task", taskId); 
        }
    }
}
</script>

<style scoped>
button {
    padding: 8px 16px;
    cursor: pointer;
    margin: 5px;
}

.delete-btn {
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

h3 {
    text-align: center;
    margin-bottom: 20px;
}
</style>
