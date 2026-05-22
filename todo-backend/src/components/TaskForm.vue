<template>
  <div class="add-card">
    <div class="add-fields">
      <input v-model="title" class="add-title" placeholder="Judul task baru..." @keyup.enter="submit" />
      <input v-model="description" class="add-desc" placeholder="Deskripsi (opsional)" />
    </div>
    <button class="btn-add" @click="submit">
      <span>+</span> Tambah
    </button>
  </div>
</template>

<script>
export default {
  emits: ['submit'],
  data() {
    return { title: '', description: '' }
  },
  methods: {
    submit() {
      this.$emit('submit', { title: this.title, description: this.description })
      this.title = ''
      this.description = ''
    }
  }
}
</script>