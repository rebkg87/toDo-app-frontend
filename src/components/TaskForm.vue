<template>
    <div>
        <h2>{{ task ? 'Edit Task' : 'Create Task' }}</h2>
        <form @submit.prevent="saveTask">
            <div>
                <label for="title">Title</label>
                <input type="text" v-model="task.title" required />
            </div>
            <div>
                <label for="completed">Completed</label>
                <input type="checkbox" v-model="task.completed" />
            </div>
            <button type="submit">{{ task ? 'Update' : 'Create' }}</button>
        </form>
    </div>
</template>

<script>
import { createTask, updateTask } from '../services/taskService';

export default {
    props: {
        task: Object,
    },
    data() {
        return {
            task: this.task ? { ...this.task } : { title: '', completed: false },
        };
    },
    methods: {
        async saveTask() {
            try {
                if (this.task.id) {
                    await updateTask(this.task.id, this.task);
                } else {
                    await createTask(this.task);
                }
                this.$emit('task-created');
                this.task = { title: '', completed: false };
            } catch (error) {
                console.error('Error saving task:', error);
            }
        }
    }
}
</script>