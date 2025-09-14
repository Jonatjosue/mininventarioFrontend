<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="[
        'fixed p-4 rounded-md shadow-lg flex items-center gap-2 z-50',
        tipoColor.bg,
        tipoColor.text,
        posicionClase,
      ]"
    >
      <!-- Icono según tipo -->
      <component :is="tipoColor.icon" class="w-6 h-6 shrink-0" />

      <!-- Mensaje -->
      <span :class="textSize">{{ mensaje }}</span>

      <!-- Botón de cerrar -->
      <!--
      Comentando por el momento para que las alertas desaparezcan solas
        <button class="ml-auto font-bold" @click="cerrar">✕</button>
      
       -->
    </div>
  </transition>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/solid';

export default {
  name: 'Alerta',
  props: {
    mensaje: { type: String, required: true },
    tipo: { type: String, default: 'info' }, // error, success, warning, info
    tamaño: { type: String, default: 'base' }, // xs, sm, base, lg, xl
    posicion: { type: String, default: 'top-center' }, // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
    duracion: { type: Number, default: 3000 }, // ms antes de desaparecer
  },
  setup(props) {
    const visible = ref(true);

    const cerrar = () => {
      visible.value = false;
    };

    const tipoColor = computed(() => {
      switch (props.tipo) {
        case 'success':
          return {
            bg: 'bg-green-100',
            text: 'text-green-800',
            icon: CheckCircleIcon,
          };
        case 'error':
          return {
            bg: 'bg-red-100',
            text: 'text-red-800',
            icon: ExclamationCircleIcon,
          };
        case 'warning':
          return {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            icon: ExclamationTriangleIcon,
          };
        default:
          return {
            bg: 'bg-blue-100',
            text: 'text-blue-800',
            icon: InformationCircleIcon,
          };
      }
    });

    const textSize = computed(() => {
      switch (props.tamaño) {
        case 'xs':
          return 'text-xs';
        case 'sm':
          return 'text-sm';
        case 'lg':
          return 'text-lg';
        case 'xl':
          return 'text-xl';
        default:
          return 'text-base';
      }
    });

    const posicionClase = computed(() => {
      switch (props.posicion) {
        case 'top-center':
          return 'top-4 left-1/2 -translate-x-1/2';
        case 'bottom-center':
          return 'bottom-4 left-1/2 -translate-x-1/2';
        case 'top-left':
          return 'top-4 left-4';
        case 'top-right':
          return 'top-4 right-4';
        case 'bottom-left':
          return 'bottom-4 left-4';
        case 'bottom-right':
          return 'bottom-4 right-4';
        default:
          return 'top-4 right-4';
      }
    });

    // Desaparecer automáticamente después de duracion
    onMounted(() => {
      if (props.duracion > 0) {
        setTimeout(() => (visible.value = false), props.duracion);
      }
    });

    return { visible, cerrar, tipoColor, textSize, posicionClase };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
