import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    botonPresionado: false,
  }),
  actions: {
    presionarBoton() {
      this.botonPresionado = true;
      setTimeout(() => (this.botonPresionado = false), 500); // opcional
    },
  },
});
