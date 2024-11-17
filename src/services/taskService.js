import { BASE_URL } from "@/config/config";
import axios from "axios";

export const getTask = async () => {
    try {
        const response = await axios.get(BASE_URL)
        return response.data
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error
    }
}

export const createTask = async (task) => {
    try {
        const response = await axios.post(BASE_URL, task);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

export const updateTask = async (taskId, task) => {
    try {
        const response = await axios.put(`${BASE_URL}/${taskId}`, task);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}

export const deleteTask = async (taskId) => {
    try {
        await axios.delete(`${BASE_URL}/${taskId}`);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}

export const getTasksByStatus = async (completed) => {
    try {
        const response = await axios.get(`${BASE_URL}/completed/${completed}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks by status:', error);
        throw error;
    }
}


