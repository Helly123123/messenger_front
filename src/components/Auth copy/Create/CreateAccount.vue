<template>
  <div class="register-container">
    <div class="card" :class="{ shake: showError }">
      <h2>Создать аккаунт</h2>

      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <input
            v-model="phone"
            @input="validatePhone"
            type="tel"
            placeholder=" "
            :class="{ invalid: phoneError }"
          />
          <label>Номер телефона</label>
          <span class="error-message" v-if="phoneError">{{ phoneError }}</span>
        </div>

        <div class="input-group">
          <input
            v-model="password"
            @input="validatePassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder=" "
            :class="{ invalid: passwordError }"
          />
          <label>Пароль</label>
          <button
            type="button"
            class="toggle-password"
            @click="showPassword = !showPassword"
          >
            <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
          </button>
          <span class="error-message" v-if="passwordError">{{
            passwordError
          }}</span>
        </div>

        <div class="password-strength" v-if="password.length > 0">
          <div
            class="strength-bar"
            :class="{
              weak: passwordStrength === 1,
              medium: passwordStrength === 2,
              strong: passwordStrength === 3,
            }"
          ></div>
          <span class="strength-text">
            {{ strengthText }}
          </span>
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="!isLoading">Зарегистрироваться</span>
          <div v-else class="loader"></div>
        </button>
      </form>

      <div class="divider">
        <span>или</span>
      </div>

      <div class="social-login">
        <button class="social-btn google">
          <i class="fab fa-google"></i> Google
        </button>
        <button class="social-btn facebook">
          <i class="fab fa-facebook-f"></i> Facebook
        </button>
      </div>

      <p class="login-link">
        Уже есть аккаунт? <router-link to="/login">Войти</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const phone = ref("");
const password = ref("");
const showPassword = ref(false);
const phoneError = ref("");
const passwordError = ref("");
const showError = ref(false);
const isLoading = ref(false);

const passwordStrength = computed(() => {
  if (password.value.length === 0) return 0;
  if (password.value.length < 6) return 1;

  const hasLetter = /[a-zA-Z]/.test(password.value);
  const hasNumber = /\d/.test(password.value);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password.value);

  if (hasLetter && hasNumber && hasSpecial) return 3;
  if (
    (hasLetter && hasNumber) ||
    (hasLetter && hasSpecial) ||
    (hasNumber && hasSpecial)
  )
    return 2;
  return 1;
});

const strengthText = computed(() => {
  switch (passwordStrength.value) {
    case 1:
      return "Слабый";
    case 2:
      return "Средний";
    case 3:
      return "Сильный";
    default:
      return "";
  }
});

const validatePhone = () => {
  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (!phone.value) {
    phoneError.value = "Введите номер телефона";
  } else if (!phoneRegex.test(phone.value)) {
    phoneError.value = "Введите корректный номер";
  } else {
    phoneError.value = "";
  }
};

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = "Введите пароль";
  } else if (password.value.length < 6) {
    passwordError.value = "Минимум 6 символов";
  } else {
    passwordError.value = "";
  }
};

const handleSubmit = async () => {
  validatePhone();
  validatePassword();

  if (phoneError.value || passwordError.value) {
    showError.value = true;
    setTimeout(() => (showError.value = false), 500);
    return;
  }

  isLoading.value = true;
  try {
    // Здесь будет запрос к API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/dashboard");
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #f5f7fa;
}

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  font-family: "Inter", sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 480px;
  transition: transform 0.3s ease;
}

.card.shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-5px);
  }
  40%,
  80% {
    transform: translateX(5px);
  }
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 24px;
}

.input-group {
  position: relative;
  margin-bottom: 25px;
}

input {
  width: 100%;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
  background-color: #f9f9f9;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  background-color: white;
}

input.invalid {
  border-color: #ff6b6b;
}

input.invalid:focus {
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
}

label {
  position: absolute;
  left: 15px;
  top: 15px;
  color: #999;
  pointer-events: none;
  transition: all 0.3s;
  background-color: #f9f9f9;
  padding: 0 5px;
}

input:focus + label,
input:not(:placeholder-shown) + label {
  top: -10px;
  font-size: 12px;
  color: #4a90e2;
  background-color: white;
}

input.invalid:focus + label,
input.invalid:not(:placeholder-shown) + label {
  color: #ff6b6b;
}

.error-message {
  display: block;
  margin-top: 5px;
  color: #ff6b6b;
  font-size: 13px;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 15px;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 16px;
}

.password-strength {
  margin-top: -15px;
  margin-bottom: 20px;
}

.strength-bar {
  height: 4px;
  border-radius: 2px;
  margin-bottom: 5px;
  transition: all 0.3s;
  width: 0;
}

.strength-bar.weak {
  width: 33%;
  background-color: #ff6b6b;
}

.strength-bar.medium {
  width: 66%;
  background-color: #feca57;
}

.strength-bar.strong {
  width: 100%;
  background-color: #1dd1a1;
}

.strength-text {
  font-size: 12px;
  color: #999;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  background-color: #4a90e2;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #3a7bc8;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.loader {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 3px solid white;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.divider {
  display: flex;
  align-items: center;
  margin: 25px 0;
  color: #999;
  font-size: 14px;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #e0e0e0;
}

.divider::before {
  margin-right: 10px;
}

.divider::after {
  margin-left: 10px;
}

.social-login {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.social-btn {
  flex: 1;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.social-btn:hover {
  background-color: #f5f5f5;
}

.social-btn.google {
  color: #db4437;
}

.social-btn.facebook {
  color: #4267b2;
}

.login-link {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.login-link a {
  color: #4a90e2;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
