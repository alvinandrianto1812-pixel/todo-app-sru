<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-icon">✓</div>
      <span>TaskFlow</span>
    </div>
    <nav class="sidebar-nav">
      <button :class="['nav-item', { active: modelValue === 'all' }]" @click="$emit('update:modelValue', 'all')">
        <span class="nav-icon">◈</span> Semua Task
        <span class="nav-badge">{{ total }}</span>
      </button>
      <button :class="['nav-item', { active: modelValue === 'active' }]" @click="$emit('update:modelValue', 'active')">
        <span class="nav-icon">◉</span> Aktif
        <span class="nav-badge">{{ active }}</span>
      </button>
      <button :class="['nav-item', { active: modelValue === 'done' }]" @click="$emit('update:modelValue', 'done')">
        <span class="nav-icon">◎</span> Selesai
        <span class="nav-badge">{{ done }}</span>
      </button>
    </nav>
    <div class="sidebar-stats">
      <div class="stat">
        <span class="stat-value">{{ percent }}%</span>
        <span class="stat-label">Selesai</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: percent + '%' }"></div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    modelValue: String,
    total: Number,
    active: Number,
    done: Number,
    percent: Number,
  },
  emits: ['update:modelValue']
}
</script>