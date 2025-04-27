<script setup>
import { ref } from "vue";

const messageText = ref("");
const emit = defineEmits(["send-message"]);

function send() {
  if (messageText.value.trim()) {
    emit("send-message", messageText.value);
    messageText.value = "";
  }
}
</script>

<template>
  <div class="cont">
    <div class="message-input">
      <input
        v-model="messageText"
        @keyup.enter="send"
        placeholder="Напишите сообщение..."
      />
      <button @click="send">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.cont {
  /* flex: 1; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
  /* background-color: white; */
}

.message-input {
  display: flex;
  align-items: center;
  padding: var(--space-md);
  gap: var(--space-md);
  width: 1100px;
  position: absolute;
  bottom: 20px;
}

.message-input input {
  flex: 1;
  padding: 40px 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius-xl);
  font-size: var(--font-size-base);
  transition: var(--transition-fast);
  height: 50px;
}

.message-input input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
}

.message-input button {
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-full);
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
}

.message-input button:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
}

.message-input button svg {
  width: 20px;
  height: 20px;
}
</style>
