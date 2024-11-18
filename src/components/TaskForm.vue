<template>
    <div>
        <h3>{{ task.id ? "Actualizar tarea" : "Crear tarea" }}</h3>
        <form @submit.prevent="submitTask">
            <div>
                <input type="text" id="title" v-model="localTask.title" placeholder="Ingresa el título de la tarea"
                    required />
            </div>
            <button type="submit">{{ task.id ? "Actualizar" : "Crear" }}</button>
        </form>
        <div v-if="task.id">
            <button @click="deleteTask" class="delete-btn">Eliminar tarea</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "TaskForm",
    props: {
        task: {
            type: Object,
            required: false,
        },
    },
    data() {
        return {
            localTask: this.task ? { ...this.task } : { title: "", completed: false },
        };
    },
    methods: {
        submitTask() {
            if (this.task && this.task.id) {
                this.$emit("update-task", this.localTask);
            } else {
                this.$emit("create-task", this.localTask);
            }
        },
        deleteTask() {
            this.$emit("delete-task", this.task.id);
        },
    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
}

input[type="text"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 120px;
}

button:hover {
    background-color: #45a049;
}

.delete-btn {
    padding: 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    width: 120px;
    margin-top: 10px;
}

.delete-btn:hover {
    background-color: #e53935;
}
</style>
