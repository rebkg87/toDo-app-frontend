<!-- src/components/TaskList.vue -->
<template>
    <div>
        <h1>Task List</h1>
        <div>
            <button @click="loadTasks">Load Tasks</button>
            <button @click="loadCompletedTasks">Load Completed Tasks</button>
            <button @click="loadPendingTasks">Load Pending Tasks</button>
        </div>
        <ul>
            <li v-for="task in tasks" :key="task.id">
                {{ task.title }} - {{ task.completed ? "Completed" : "Pending" }}
                <button @click="deleteTask(task.id)">Delete</button>
                <button @click="editTask(task)">Edit</button>
            </li>
        </ul>
        <task-form @task-created="loadTasks" :task="selectedTask" v-if="showForm" />
    </div>
</template>

<script>
import {
    getTasks,
    deleteTask,
    getTasksByStatus,
} from "../services/taskService";
import TaskForm from "./TaskForm.vue";

export default {
    components: { TaskForm },
    data() {
        return {
            tasks: [],
            showForm: false,
            selectedTask: null,
        };
    },
    methods: {
        async loadTasks() {
            try {
                this.tasks = await getTasks();
            } catch (error) {
                console.error(error);
            }
        },
        async loadCompletedTasks() {
            try {
                this.tasks = await getTasksByStatus(true);
            } catch (error) {
                console.error(error);
            }
        },
        async loadPendingTasks() {
            try {
                this.tasks = await getTasksByStatus(false);
            } catch (error) {
                console.error(error);
            }
        },
        async deleteTask(taskId) {
            try {
                await deleteTask(taskId);
                this.loadTasks();
            } catch (error) {
                console.error(error);
            }
        },
        editTask(task) {
            this.selectedTask = { ...task }; 
            this.showForm = true;
        },
    },
    mounted() {
        this.loadTasks();
    },
};
</script>
