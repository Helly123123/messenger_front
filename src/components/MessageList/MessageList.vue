<script setup>
defineProps({
  messages: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="message-list">
    <div
      v-for="message in messages"
      :key="message.id"
      class="message"
      :class="message.sender"
    >
      <div class="message-content">
        {{ message.text }}
      </div>
      <div class="message-time">
        {{ message.time }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.message {
  max-width: 70%;
  display: flex;
  flex-direction: column;
}

.message.me {
  margin-left: auto;
  align-items: flex-end;
}

.message.other {
  margin-right: auto;
  align-items: flex-start;
}

.message-content {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  line-height: 1.4;
  word-break: break-word;
}

.me .message-content {
  background-color: var(--color-primary);
  color: white;
  border-bottom-right-radius: var(--border-radius-sm);
}

.other .message-content {
  background-color: var(--color-bg);
  border-bottom-left-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
}

.message-time {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  margin-top: var(--space-xs);
  padding: 0 var(--space-sm);
}
</style>
