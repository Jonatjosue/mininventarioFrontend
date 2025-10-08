<template>
  <div class="">
    <aside
      :class="[
        'fixed top-0 left-0 h-full bg-slate-700 shadow-lg z-40 flex flex-col transition-all duration-300 ease-in-out overflow-hidden',
        esMovil ? (abierto ? 'w-64' : 'w-0') : abierto ? 'bg-black' : '',
      ]"
      :style="!esMovil ? { width: abierto ? '16rem' : '4rem' } : {}"
      :aria-expanded="abierto"
      aria-label="Menú principal"
    >
      <div class="hidden lg:flex items-center justify-end p-2">
        <button
          @click="toggleMenu"
          class="p-2 rounded-md bg-primary text-white shadow-md hover:bg-primary-dark transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          :aria-label="abierto ? 'Cerrar menú' : 'Abrir menú'"
        >
          <Bars3Icon v-if="!abierto" class="w-6 h-6 text-white" />
          <XMarkIcon v-else class="w-6 h-6 text-white" />
        </button>
      </div>

      <!-- Logo/Brand (solo visible cuando está expandido) -->
      <div
        v-if="abierto"
        class="px-4 py-3 border-b border-slate-400 border-dashed hidden lg:block"
      >
        <h1 class="text-xl font-bold text-white">Mininventerio</h1>
      </div>

      <!-- Buscador -->
      <div v-show="abierto" :class="['p-4', esMovil ? 'block mt-5' : 'block']">
        <div class="relative">
          <input
            type="text"
            v-model="busqueda"
            placeholder="Buscar opción..."
            class="input input-bordered w-full pl-9"
            aria-label="Buscar en el menú"
          />
          <span
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <MagnifyingGlassIcon class="w-4 h-4 text-gray-400" />
          </span>
        </div>
      </div>

      <nav
        class="flex-1 overflow-y-auto mt-2"
        aria-label="Navegación principal"
      >
        <div v-for="(rutas, grupo) in rutasAgrupadas" :key="grupo">
          <!-- Separador del grupo -->
          <div
            v-show="abierto"
            class="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide"
          >
            {{ grupo }}
          </div>

          <div
            v-for="ruta in rutas"
            :key="ruta.path"
            class="relative flex items-center mx-2 my-1 transition-colors duration-200"
            :class="{
              'bg-primary/10 rounded-lg': $route.path === ruta.path,
              'hover:bg-gray-200/90 rounded-lg hover:text-black':
                $route.path !== ruta.path,
            }"
          >
            <router-link
              :to="ruta.path"
              class="flex items-center w-full p-2 font-medium transition-colors duration-200"
              :class="{
                'text-secondary': $route.path === ruta.path,
                'text-gray-300  hover:text-black': $route.path !== ruta.path,
              }"
              @click="cerrarEnMovil"
              :aria-current="$route.path === ruta.path ? 'page' : null"
            >
              <!-- Icono -->
              <span class="w-6 h-6 flex justify-center items-center">
                <component
                  v-if="ruta.meta?.icono"
                  :is="ruta.meta.icon ?? DocumentIcon"
                  class="w-5 h-5"
                  :class="{ 'text-primary': $route.path === ruta.path }"
                />
                <span v-else>
                  <DocumentIcon
                    class="w-5 h-5"
                    :class="{ 'text-secondary': $route.path === ruta.path }"
                  />
                </span>
              </span>

              <!-- Texto -->
              <span v-show="abierto" class="ml-3 truncate">
                {{ getRouteTitle(ruta) }}
              </span>
            </router-link>
          </div>
        </div>
      </nav>

      <div
        v-if="usuarioRegistrado"
        class="p-4 border-t border-slate-400 border-dashed"
      >
        <button
          @click="logout"
          class="flex items-center justify-center w-full p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Cerrar sesión"
        >
          <ArrowRightEndOnRectangleIcon class="w-6 h-6" />
          <span v-show="abierto" class="ml-2">Cerrar sesión</span>
        </button>
      </div>
    </aside>

    <!-- Overlay móvil -->
    <div
      v-if="abierto && esMovil"
      @click="cerrarEnMovil"
      class="fixed inset-0 bg-black bg-opacity-40 z-20 transition-opacity duration-300"
      aria-hidden="true"
    ></div>

    <!-- Contenido principal -->
    <div class="border border-e-red-900">
      <!-- Botón hamburguesa SOLO en móvil -->
      <button
        @click="toggleMenu"
        :class="[
          'lg:hidden z-50   bg-primary text-white shadow-md hover:bg-primary-dark transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          abierto
            ? 'bottom-4 right-7 fixed rounded-md p-2'
            : ' fixed  rounded-md bottom-5 left-5 p-2 ',
          !mostrarMensajeYBounce ? 'animate-bounce' : '',
        ]"
        :aria-label="abierto ? 'Cerrar menú' : 'Abrir menú'"
      >
        <Bars3Icon
          v-if="!abierto"
          class="bg-primary rounded-md bottom-6 left-1 bg-opacity-75 h-5 text-white"
        />
        <XMarkIcon v-else class="w-6 h-6 text-white 0" />
      </button>

      <transition name="fade-slide">
        <div
          v-if="!abierto && mostrarMensaje && esMovil"
          :class="[
            ' fixed bottom-14 left-5 bg-gray-800 text-white px-3 py-1 rounded-md shadow-md text-sm',
            !mostrarMensajeYBounce ? 'animate-bounce' : 'animate-fadeoutdown',
          ]"
        >
          Click para ver menú
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.js';
import { storeToRefs } from 'pinia';
import { mostrarAlertaGlobal } from '../components/contenedorDeAlertas.vue';
import { debounce } from 'lodash';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowRightEndOnRectangleIcon,
  DocumentIcon,
  KeyIcon,
} from '@heroicons/vue/24/solid';

export default {
  name: 'MenuMejorado',
  components: {
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon,
    ArrowRightEndOnRectangleIcon,
    DocumentIcon,
    KeyIcon,
  },
  data() {
    return {
      mostrarMensaje: true,
      mostrarMensajeYBounce: false,
      busqueda: '',
      abierto: false,
      esMovil: false,
      usuarioRegistrado: false,
      debouncedCheckViewport: null,
    };
  },
  computed: {
    rutasVisibles() {
      const authStore = useAuthStore();
      return Object.values(authStore.mapaPermisos).filter(
        (ruta) => ruta.meta?.allowed === true
      );
    },

    rutasFiltradas() {
      if (!this.busqueda) return this.rutasVisibles;
      const searchTerm = this.busqueda.toLowerCase();
      return this.rutasVisibles.filter((ruta) =>
        this.getRouteTitle(ruta).toLowerCase().includes(searchTerm)
      );
    },

    rutasAgrupadas() {
      const grupos = {};
      this.rutasFiltradas.forEach((ruta) => {
        const grupo = ruta.meta?.group || 'General';
        if (!grupos[grupo]) grupos[grupo] = [];
        grupos[grupo].push(ruta);
      });
      return grupos;
    },
  },
  mounted() {
    this.usuarioRegistrado = true;
    this.checkViewport();
    this.debouncedCheckViewport = debounce(this.checkViewport, 250);
    window.addEventListener('resize', this.debouncedCheckViewport);
    setTimeout(() => {
      this.mostrarMensajeYBounce = true;
    }, 2000);
    this.abierto = false;
  },
  beforeUnmount() {
    if (this.debouncedCheckViewport) {
      window.removeEventListener('resize', this.debouncedCheckViewport);
    }
  },
  watch: {
    mostrarMensajeYBounce(nuevoValor) {
      if (nuevoValor) {
        setTimeout(() => {
          this.mostrarMensaje = false;
        }, 500);
      } else {
        this.mostrarMensaje = true;
      }
    },
  },
  methods: {
    getRouteTitle(ruta) {
      if (ruta.meta?.name) return ruta.meta.name;
      if (ruta.name) return ruta.name;
      if (ruta.path) {
        const parts = ruta.path.split('/').filter((part) => part);
        return parts.length
          ? parts[parts.length - 1].charAt(0).toUpperCase() +
              parts[parts.length - 1].slice(1)
          : 'Inicio';
      }
      return 'Sin título';
    },
    mostrarAlertaError(mensaje) {
      mostrarAlertaGlobal(mensaje, 'error', 'sm', 'top-center', 300);
    },
    mostrarAlertaExito(mensaje) {
      mostrarAlertaGlobal(mensaje, 'success', 'sm', 'top-center', 300);
    },
    async toggleMenu() {
      this.abierto = !this.abierto;

      if (!this.abierto) {
        await setTimeout(() => {
          this.mostrarMensajeYBounce = true;
        }, 2000);
      }
    },
    cerrarEnMovil() {
      if (this.esMovil) this.abierto = false;
    },
    checkViewport() {
      this.esMovil = window.innerWidth < 1024;
      this.$emit('esMovil', this.esMovil);
      if (!this.esMovil && this.abierto === false) {
        this.abierto = true;
      }
      if (this.esMovil && this.abierto) {
        this.abierto = false;
      }
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.usuarioRegistrado = false;
      this.$router.push('/');
      this.mostrarAlertaExito('Has cerrado sesión correctamente.');
    },
  },
};
</script>

<style scoped>
aside {
  transition: width 0.3s ease-in-out;
}

/* Mejora de scroll para navegadores WebKit */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
