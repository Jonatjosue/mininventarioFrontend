<!-- AlertContainer.vue -->
<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
    <Alerta
      v-for="(a, i) in alertas"
      :key="i"
      :mensaje="a.mensaje"
      :tipo="a.tipo"
      :tamaño="a.tamaño"
      @cerrar="eliminarAlerta(i)"
    />
  </div>
</template>

<script>
import Alerta from './Alerta.vue';
import { reactive } from 'vue';

export const alertas = reactive([]);

export function mostrarAlertaGlobal(mensaje, tipo = 'info', tamaño = 'base') {
  alertas.push({ mensaje, tipo, tamaño });
}

export default {
  components: { Alerta },
  setup() {
    const eliminarAlerta = (index) => {
      alertas.splice(index, 1);
    };
    return { alertas, eliminarAlerta };
  },
};
</script>
