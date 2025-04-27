<script setup>
defineProps({
  chats: {
    type: Array,
    required: true,
  },
  activeChat: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["select-chat"]);
</script>

<template>
  <div class="chat-list">
    <div
      v-for="chat in chats"
      :key="chat.id"
      class="chat-item"
      :class="{ active: chat.id === activeChat?.id }"
      @click="emit('select-chat', chat)"
    >
      <img :src="chat.avatar" :alt="chat.name" class="avatar" />

      <div class="chat-details">
        <div class="chat-header">
          <h3>{{ chat.name }}</h3>
          <span class="time">{{
            chat.messages[chat.messages.length - 1]?.time
          }}</span>
        </div>
        <p class="last-message">{{ chat.lastMessage }}</p>
      </div>

      <div v-if="chat.unread > 0" class="unread-count">
        {{ chat.unread }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-list {
  overflow-y: auto;
  height: 100%;
}

.chat-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--space-md);
  gap: var(--space-md);
  cursor: pointer;
  transition: var(--transition-fast);
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}

.chat-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.chat-item.active {
  background-color: var(--color-primary-light);
  color: white;
}

.chat-item.active .last-message,
.chat-item.active .time {
  color: rgba(255, 255, 255, 0.8);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-full);
  object-fit: cover;
}

.chat-details {
  flex: 1;
  min-width: 0;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xs);
}

h3 {
  font-size: var(--font-size-base);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.time {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.last-message {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unread-count {
  position: absolute;
  right: 13px;
  bottom: 10px;
  background-color: var(--color-accent);
  color: white;
  border-radius: var(--border-radius-full);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: 600;
}
</style>
