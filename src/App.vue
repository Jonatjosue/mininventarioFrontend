<script setup>
import PaginaPrincipal from './components/paginaPrincipal.vue';
import ContenedorDeAlertas from './components/contenedorDeAlertas.vue';
import Menu from './components/Menu.vue';
import BotonAyuda from './components/BotonAyuda.vue';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';

const route = useRoute();

const esMovil = ref(false);

function funcionEsMovil(valor) {
  esMovil.value = valor;
}

const mostrarMenu = computed(() => route.meta.requiresAuth !== false);

const mostrarPrincipal = computed(() => route.path === '/');
</script>

<template>
  <div class="flex h-screen" data-theme="dark">
    <!-- Menú lateral -->
    <Menu
      v-if="mostrarMenu"
      :class="esMovil ? 'shrink-0' : 'shrink-0 mr-16'"
      @esMovil="funcionEsMovil"
    />
    <BotonAyuda id="botonAyuda" v-if="mostrarMenu && !esMovil" />
    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col">
      <PaginaPrincipal v-if="mostrarPrincipal" />
      <router-view />
      <ContenedorDeAlertas />
    </div>
  </div>
</template>
