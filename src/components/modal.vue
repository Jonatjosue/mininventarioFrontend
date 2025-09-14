<template>
  <transition name="fade">
    <div
      v-if="abierto"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click="cerrar"
    >
      <div
        class="bg-white rounded-xl shadow-xl p-6 w-80 max-w-full relative z-50"
        @click.stop
      >
        <!-- Título -->
        <h3 class="text-lg font-bold text-gray-800 mb-4">{{ titulo }}</h3>

        <!-- Contenido opcional -->
        <div v-if="$slots.contenido || contenido" class="mb-4">
          <slot name="contenido">{{ contenido }}</slot>
        </div>

        <!-- Botones dinámicos -->
        <div
          :class="[
            'flex gap-2',
            orientacion === 'vertical' ? 'flex-col' : 'flex-row',
          ]"
        >
          <button
            v-for="(btn, index) in botones"
            :key="index"
            v-show="btn.mostrar !== false"
            :class="[
              'flex items-center justify-center rounded font-semibold',
              btn.size === 'sm' ? 'px-3 py-1 text-sm' : 'px-4 py-2 text-base',
              btn.color || 'bg-gray-500',
              btn.hoverColor || 'hover:bg-gray-600',
              btn.textColor || 'text-white',
              btn.fullWidth ? 'w-full' : '',
            ]"
            @click="accionBoton(btn)"
          >
            <span v-if="btn.icon" class="mr-2">
              <component :is="btn.icon" />
            </span>
            {{ btn.texto }}
          </button>
        </div>

        <!-- Botón de cerrar -->
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          @click="cerrar"
        >
          ✕
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    abierto: { type: Boolean, required: true },
    titulo: { type: String, default: 'Modal' },
    contenido: { type: String, default: '' },
    botones: {
      type: Array,
      default: () => [],
    },
    orientacion: {
      type: String,
      default: 'vertical', // vertical u horizontal
    },
  },
  emits: ['update:abierto', 'accion'],
  methods: {
    cerrar() {
      this.$emit('update:abierto', false);
    },
    accionBoton(btn) {
      if (btn.accion && typeof btn.accion === 'function') {
        btn.accion();
      }
      this.$emit('accion', btn);
      this.cerrar();
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
