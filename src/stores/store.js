import { defineStore } from 'pinia'

export const useDatosGoogleStore = defineStore('datosGoogle', {
  state: () => ({
    correo: ''
  }),
  actions: {
    setCorreo(correo) {
      this.correo = correo
    }
  }
})
