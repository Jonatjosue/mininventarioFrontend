
import { defineStore } from "pinia";

export const useFacturaStore = defineStore("factura", {
  state: () => ({
    facturaSeleccionada: null,
   
  }),
  actions: {
    guardarFactura(factura) {
      this.facturaSeleccionada = factura;
    },
    cerrarModal() {
      this.facturaSeleccionada = null;
    },
  },
});
