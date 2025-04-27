<template>
  <!-- <div>
    <input
      v-model="inputValue"
      @input="checkLength"
      :style="inputStyle"
      placeholder="Введите текст (мин. 15 символов)"
    />
    <p v-if="showWarning" style="color: red">
      Минимальная длина - 15 символов!
    </p>
  </div> -->
  <Login />
</template>

<script setup>
import { ref, computed } from "vue";
import Login from "../components/Auth/Login/Login.vue";
const inputValue = ref("");
const inputIsValid = ref(false);

const checkLength = () => {
  inputIsValid.value = inputValue.value.length >= 15;
};

const inputStyle = computed(() => ({
  border: inputIsValid.value ? "2px solid green" : "2px solid red",
  padding: "8px",
  width: "300px",
}));

const showWarning = computed(() => {
  return inputValue.value.length > 0 && !inputIsValid.value;
});
</script>
