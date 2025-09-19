<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="$emit('close')"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl p-6 mx-4 max-w-md w-full flex flex-col items-center"
      >
        <div
          class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"
        ></div>

        <p class="text-gray-800 font-medium text-center text-lg mb-2">
          Cargando...
        </p>
        <p class="text-gray-500 text-center text-sm">Por favor espere</p>

        <div class="w-full bg-gray-200 rounded-full h-1.5 mt-4">
          <div
            class="bg-blue-500 h-1.5 rounded-full transition-all duration-200"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'GlobalLoading',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: this.show,
      timeoutId: null,
      progress: 100,
      intervalId: null,
    };
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.activateLoading();
      } else {
        this.deactivateLoading();
      }
    },
  },
  methods: {
    activateLoading() {
      this.visible = true;
      this.progress = 100;

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      this.timeoutId = setTimeout(() => {
        this.deactivateLoading();
        this.$emit('timeout');
      }, 20000);

      this.intervalId = setInterval(() => {
        this.progress -= 0.5;
        if (this.progress <= 0) {
          clearInterval(this.intervalId);
        }
      }, 100);
    },
    deactivateLoading() {
      this.visible = false;

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }

      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }

      this.$emit('update:show', false);
    },
  },
  mounted() {
    if (this.show) {
      this.activateLoading();
    }
  },
  beforeUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
