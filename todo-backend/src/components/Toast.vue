<template>
  <transition name="toast">
    <div v-if="show" :class="['toast', type]">
      <span class="toast-icon">{{ type === 'success' ? '✓' : '✕' }}</span>
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
    message: String,
    type: { type: String, default: 'success' }
  }
}
</script>