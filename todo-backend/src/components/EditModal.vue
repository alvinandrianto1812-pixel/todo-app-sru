<template>
  <transition name="modal">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal">
        <div class="modal-header">
          <h2>Edit Task</h2>
          <button class="modal-close" @click="$emit('close')">✕</button>
        </div>
        <div class="modal-body">
          <label>Judul <span class="required">*</span></label>
          <input v-model="localTitle" placeholder="Judul task" />
          <label>Deskripsi</label>
          <textarea v-model="localDesc" placeholder="Deskripsi (opsional)"></textarea>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="$emit('close')">Batal</button>
          <button class="btn-save" @click="submit">Simpan Perubahan</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: { show: Boolean, title: String, description: String },
  emits: ['close', 'save'],
  data() {
    return { localTitle: this.title, localDesc: this.description }
  },
  watch: {
    title(v) { this.localTitle = v },
    description(v) { this.localDesc = v }
  },
  methods: {
    submit() {
      this.$emit('save', { title: this.localTitle, description: this.localDesc })
    }
  }
}
</script>