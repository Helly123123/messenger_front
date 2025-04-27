<template>
  <div v-if="activeChat" class="chat-header">
    <div class="chat-info">
      <img :src="activeChat.avatar" :alt="activeChat.name" class="avatar" />
      <div class="user-data">
        <h2 class="name">{{ activeChat.name }}</h2>
        <span class="in-net">В сети</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activeChat: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped>
.chat-header {
  padding: var(--space-md);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background-color: var(--color-bg);
  display: flex;
  align-items: center;
}

.chat-info {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-full);
  object-fit: cover;
}

.user-data {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
}

.name {
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.in-net {
  font-size: var(--font-size-sm);
  font-weight: 400;
  color: rgb(56, 155, 226);
}
</style>
