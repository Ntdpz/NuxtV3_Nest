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
      <li v-for="(task, index) in tasks" :key="task.id" class="task-item">
        <div v-if="!task.editing" class="task-display">
          <div class="task-checkbox">
            <input
              type="checkbox"
              :checked="task.completed"
              @change="toggleComplete(task.id)"
            />
          </div>
          <div class="task-details">
            <span class="task-text" :class="{ done: task.completed }">
              {{ task.text }}
            </span>
            <div class="task-meta">
              <span class="created-at">Created: {{ task.created_at }}</span>
              <span class="updated-at">Updated: {{ task.updated_at }}</span>
            </div>
          </div>
          <div class="task-actions">
            <button @click="editTask(task.id)" class="edit-btn">Edit</button>
            <button @click="deleteTask(task.id)" class="delete-btn">Delete</button>
          </div>
        </div>

        <div v-else class="task-edit">
          <input v-model="task.text" class="edit-input" />
          <button @click="saveTask(task.id)" class="save-btn">Save</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Sample tasks with additional fields
const tasks = ref([
  { id: 1, text: 'Learn Nuxt.js 3', completed: false, editing: false, created_at: '2024-01-01 12:00:00', updated_at: '2024-01-01 12:00:00' },
  { id: 2, text: 'Build a To-Do App', completed: false, editing: false, created_at: '2024-01-02 14:30:00', updated_at: '2024-01-02 14:30:00' },
]);

const newTask = ref('');

const addTask = () => {
  if (newTask.value.trim() !== '') {
    const newTaskObj = {
      id: tasks.value.length + 1, // Simple auto-increment logic
      text: newTask.value,
      completed: false,
      editing: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    tasks.value.push(newTaskObj);
    newTask.value = '';
  }
};

const deleteTask = (id) => {
  const index = tasks.value.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.value.splice(index, 1);
  }
};

const toggleComplete = (id) => {
  const task = tasks.value.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    task.updated_at = new Date().toISOString(); // Update timestamp on completion
  }
};

const editTask = (id) => {
  const task = tasks.value.find(task => task.id === id);
  if (task) {
    task.editing = true;
  }
};

const saveTask = (id) => {
  const task = tasks.value.find(task => task.id === id);
  if (task) {
    task.editing = false;
    task.updated_at = new Date().toISOString(); // Update timestamp on saving
  }
};
</script>

<style scoped>
.todo-container {
  max-width: 500px;
  margin: 50px auto;
  background: #333; /* Dark background */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #fff; /* Light text */
}

.title {
  text-align: center;
  color: #fff; /* Light text */
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
  border: 1px solid #555; /* Dark border */
  border-radius: 4px;
  background: #444; /* Dark background input */
  color: #fff; /* Light text */
}

.add-btn {
  background-color: #007bff; /* Blue button */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #0056b3; /* Darker blue */
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
  border-bottom: 1px solid #555; /* Dark border */
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

.task-checkbox {
  flex: 0 0 auto;
}

.task-details {
  flex: 1 1 auto;
}

.task-text {
  flex: 1 1 auto;
}

.done {
  text-decoration: line-through;
  color: #888;
}

.task-meta {
  margin-top: 5px;
  font-size: 0.8em;
  color: #aaa;
}

.task-actions {
  flex: 0 0 auto;
  display: flex;
  gap: 10px;
}

.task-actions button {
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff; /* Blue text */
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
  border: 1px solid #555; /* Dark border */
  border-radius: 4px;
  background: #444; /* Dark background input */
  color: #fff; /* Light text */
}

.save-btn {
  background-color: #007bff; /* Blue button */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #0056b3; /* Darker blue */
}
</style>
