<script setup>
import { ref, onMounted } from "vue";
import ChatList from "../components/ChatList/ChatList.vue";
import MessageList from "../components/MessageList/MessageList.vue";
import MessageInput from "../components/MessageList/MessageInput.vue";
import Header from "../components/MessageList/Header.vue";
const chats = ref([
  {
    id: 1,
    name: "Алексей Петров",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Привет! Как дела?",
    unread: 2,
    messages: [
      { id: 1, text: "Привет!", sender: "other", time: "10:00" },
      { id: 2, text: "Как дела?", sender: "me", time: "10:02" },
      {
        id: 3,
        text: "Отлично, спасибо! А у тебя?",
        sender: "other",
        time: "10:05",
      },
    ],
  },
  {
    id: 2,
    name: "Мария Иванова",
    avatar: "https://i.pravatar.cc/150?img=11",
    lastMessage: "Добрый день!",
    unread: 0,
    messages: [
      { id: 1, text: "Добрый день", sender: "other", time: "09:00" },
      { id: 2, text: "Чем могу помочь?", sender: "me", time: "09:05" },
    ],
  },
  {
    id: 3,
    name: "Команда проекта",
    avatar: "https://i.pravatar.cc/150?img=60",
    lastMessage: "Собрание в 15:00",
    unread: 5,
    messages: [
      { id: 1, text: "Приветствую всех", sender: "other", time: "08:00" },
      { id: 2, text: "Напоминаю про собрание", sender: "other", time: "08:05" },
      { id: 3, text: "Оно в 15:00", sender: "other", time: "08:10" },
    ],
  },
]);

const activeChat = ref(null);

onMounted(() => {
  if (chats.value.length > 0) {
    activeChat.value = chats.value[0];
  }
});

function selectChat(chat) {
  activeChat.value = chat;
  chat.unread = 0;
}

function sendMessage(text) {
  if (!activeChat.value || !text.trim()) return;

  const newMessage = {
    id: activeChat.value.messages.length + 1,
    text: text,
    sender: "me",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  activeChat.value.messages.push(newMessage);
  activeChat.value.lastMessage = text;
}
</script>

<template>
  <div class="messenger">
    <div class="sidebar">
      <ChatList
        :chats="chats"
        :activeChat="activeChat"
        @select-chat="selectChat"
      />
    </div>

    <div class="content">
      <Header :activeChat="activeChat" />

      <MessageList v-if="activeChat" :messages="activeChat.messages" />

      <MessageInput v-if="activeChat" @send-message="sendMessage" />
    </div>
  </div>
</template>

<style scoped>
.messenger {
  display: flex;
  height: 100vh;
  background-color: var(--color-bg-secondary);
}

.sidebar {
  width: 350px;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  background-color: var(--color-bg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

h2 {
  font-size: var(--font-size-lg);
  font-weight: 600;
}
</style>
