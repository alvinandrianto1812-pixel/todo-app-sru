<template>
  <div class="app">
    <Toast :show="toast.show" :message="toast.message" :type="toast.type" />

    <Sidebar
      v-model="filter"
      :total="tasks.length"
      :active="tasks.filter((t) => !t.is_completed).length"
      :done="tasks.filter((t) => t.is_completed).length"
      :percent="percent"
    />

    <main class="main">
      <header class="main-header">
        <div>
          <h1>{{ filterLabel }}</h1>
          <p class="subtitle">{{ today }}</p>
        </div>
        <div class="search-wrap">
          <span class="search-icon">⌕</span>
          <input
            v-model="search"
            @input="fetchTasks"
            placeholder="Cari task..."
            class="search-input"
          />
        </div>
      </header>

      <TaskForm @submit="createTask" />

      <div class="task-list">
        <transition-group name="task">
          <TaskCard
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            @toggle="toggleTask"
            @edit="openEdit"
            @delete="deleteTask"
          />
        </transition-group>
        <div v-if="filteredTasks.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <p>Tidak ada task di sini</p>
          <span>Tambahkan task baru di atas</span>
        </div>
      </div>
    </main>

    <EditModal
      :show="editModal.show"
      :title="editModal.title"
      :description="editModal.description"
      @close="editModal.show = false"
      @save="updateTask"
    />
  </div>
</template>

<script>
import {
  getTasks,
  createTask,
  toggleTask,
  updateTask,
  deleteTask,
} from "./api/tasks";
import Sidebar from "./components/Sidebar.vue";
import TaskForm from "./components/TaskForm.vue";
import TaskCard from "./components/TaskCard.vue";
import EditModal from "./components/EditModal.vue";
import Toast from "./components/Toast.vue";

export default {
  components: { Sidebar, TaskForm, TaskCard, EditModal, Toast },
  data() {
    return {
      tasks: [],
      search: "",
      filter: "all",
      editModal: { show: false, id: null, title: "", description: "" },
      toast: { show: false, message: "", type: "success" },
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter((t) => {
        if (this.filter === "active") return !t.is_completed;
        if (this.filter === "done") return t.is_completed;
        return true;
      });
    },
    filterLabel() {
      return { all: "Semua Task", active: "Task Aktif", done: "Task Selesai" }[
        this.filter
      ];
    },
    percent() {
      return Math.round(
        (this.tasks.filter((t) => t.is_completed).length /
          (this.tasks.length || 1)) *
          100,
      );
    },
    today() {
      return new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      const res = await getTasks(this.search);
      this.tasks = res.data;
    },
    async createTask({ title, description }) {
      if (!title.trim()) return this.showToast("Judul wajib diisi", "error");
      await createTask({ title, description });
      this.fetchTasks();
      this.showToast("Task berhasil ditambahkan");
    },
    async toggleTask(task) {
      await toggleTask(task.id);
      this.fetchTasks();
      this.showToast("Status diperbarui");
    },
    async deleteTask(id) {
      await deleteTask(id);
      this.fetchTasks();
      this.showToast("Task dihapus");
    },
    openEdit(task) {
      this.editModal = {
        show: true,
        id: task.id,
        title: task.title,
        description: task.description || "",
      };
    },
    async updateTask({ title, description }) {
      if (!title.trim()) return this.showToast("Judul wajib diisi", "error");
      await updateTask(this.editModal.id, { title, description });
      this.editModal.show = false;
      this.fetchTasks();
      this.showToast("Task berhasil diperbarui");
    },
    showToast(message, type = "success") {
      this.toast = { show: true, message, type };
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },
  },
};
</script>
