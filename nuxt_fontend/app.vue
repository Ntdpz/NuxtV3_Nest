<template>
  <div class="todo-container">
    <h1 class="title">To-Do List</h1>

    <div class="input-container">
      <input
        v-model="newTask"
        type="text"
        placeholder="Add a new task"
        class="task-input"
      />
      <button @click="addTask" class="add-btn">Add</button>
    </div>

    <ul class="task-list">
      <li v-for="(task, index) in tasks" :key="index" class="task-item">
        <div v-if="!task.editing" class="task-display">
          <span :class="{ done: task.completed }" @click="toggleComplete(index)">
            {{ task.text }}
          </span>
          <div class="task-actions">
            <button @click="editTask(index)" class="edit-btn">Edit</button>
            <button @click="deleteTask(index)" class="delete-btn">Delete</button>
          </div>
        </div>

        <div v-else class="task-edit">
          <input v-model="task.text" class="edit-input" />
          <button @click="saveTask(index)" class="save-btn">Save</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tasks = ref([
  { text: 'Learn Nuxt.js 3', completed: false, editing: false },
  { text: 'Build a To-Do App', completed: false, editing: false },
]);
const newTask = ref('');

const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push({ text: newTask.value, completed: false, editing: false });
    newTask.value = '';
  }
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};

const toggleComplete = (index) => {
  tasks.value[index].completed = !tasks.value[index].completed;
};

const editTask = (index) => {
  tasks.value[index].editing = true;
};

const saveTask = (index) => {
  tasks.value[index].editing = false;
};
</script>

<style scoped>
.todo-container {
  max-width: 500px;
  margin: 50px auto;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}

.task-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #45a049;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.task-item:last-child {
  border-bottom: none;
}

.task-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.task-display span {
  cursor: pointer;
}

.done {
  text-decoration: line-through;
  color: #888;
}

.task-actions button {
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
  margin-left: 10px;
}

.task-actions button:hover {
  text-decoration: underline;
}

.task-edit {
  display: flex;
  gap: 10px;
}

.edit-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.save-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #0056b3;
}
</style>
