<script setup></script>

<template><router-view></router-view></template>

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

h2 {
  font-size: var(--font-size-lg);
  font-weight: 600;
}
</style>
