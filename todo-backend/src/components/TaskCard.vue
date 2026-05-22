<template>
  <div :class="['task-card', { completed: task.is_completed }]">
    <div class="task-left">
      <button
        :class="['check-btn', { checked: task.is_completed }]"
        @click="$emit('toggle', task)"
      >
        <span v-if="task.is_completed">✓</span>
      </button>
      <div class="task-text">
        <p class="task-title">{{ task.title }}</p>
        <p v-if="task.description" class="task-desc">{{ task.description }}</p>
      </div>
    </div>
    <div class="task-right">
      <span class="task-date">{{ formatDate(task.created_at) }}</span>
      <button class="icon-btn edit" @click="$emit('edit', task)">✎</button>
      <button class="icon-btn delete" @click="$emit('delete', task.id)">
        ✕
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: { task: Object },
  emits: ["toggle", "edit", "delete"],
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
      });
    },
  },
};
</script>
