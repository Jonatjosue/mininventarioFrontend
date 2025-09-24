<template>
  <div class="min-h-screen bg-gradiente-personal from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900 flex items-center">
              <span class="text-blue-600">Mini</span>Inventario
              <span
                class="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >v1.0</span
              >
            </h1>
          </div>

          <!-- User info (opcional) -->
          <div class="flex items-center space-x-4" v-if="$store?.auth?.usuario">
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900">
                {{ $store.auth.usuario.nombre }}
              </p>
              <p class="text-xs text-gray-500">{{ $store.auth.usuario.rol }}</p>
            </div>
            <div
              class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <span class="text-blue-600 font-bold">{{
                $store.auth.usuario.nombre?.charAt(0)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section -->
      <section class="mb-8">
        <div class="bg-white rounded-2xl shadow-sm p-6 border">
          <div class="flex items-center justify-between">
            <div>
              <h2
                v-if="!usuarioCliente"
                class="text-2xl font-bold text-gray-900 mb-2"
              >
                ¡Bienvenido de vuelta! 👋
              </h2>
              <h2 v-else class="text-2xl font-bold text-gray-900 mb-2">
                ¡Bienvenido de vuelta a SHALAH! 👋
              </h2>
              <p v-if="!usuarioCliente" class="text-gray-600">
                Gestiona tu inventario de manera eficiente y sencilla
              </p>
              <p v-else class="text-gray-600">
                Gestiona tus compras facil y rapido
              </p>
            </div>
            <div class="hidden md:block">
              <div
                class="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Cards -->
      <section
        v-if="!usuarioCliente"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <div class="bg-white rounded-xl shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Productos</p>
              <p class="text-2xl font-bold text-gray-900">1,248</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">En stock</p>
              <p class="text-2xl font-bold text-gray-900">856</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <svg
                class="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Bajo stock</p>
              <p class="text-2xl font-bold text-gray-900">42</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-3 bg-red-100 rounded-lg">
              <svg
                class="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Agotados</p>
              <p class="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Two columns layout -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Menu Section -->
        <div v-if="!usuarioCliente" class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-sm p-6 border">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Acciones rápidas
            </h3>
          </div>
        </div>

        <!-- Recent Activity / Content Section -->
        <div v-if="!usuarioCliente" class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-sm p-6 border">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">
                Actividad reciente
              </h3>
              <button class="text-blue-600 text-sm font-medium">
                Ver todo
              </button>
            </div>

            <div class="space-y-4">
              <div
                v-for="(activity, index) in recentActivities"
                :key="index"
                class="flex items-start space-x-3"
              >
                <div
                  class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-900">{{ activity.message }}</p>
                  <p class="text-xs text-gray-500">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-600">
            © 2024 MiniInventario. Todos los derechos reservados.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Soporte</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  name: 'Inicio',

  data() {
    return {
      usuarioCliente: false,
      recentActivities: [
        {
          message: 'Nuevo producto "Monitor LED 24" agregado al inventario',
          time: 'Hace 2 minutos',
        },
        {
          message: 'Stock de "Teclado Mecánico" actualizado',
          time: 'Hace 15 minutos',
        },
        {
          message: 'Usuario admin inició sesión',
          time: 'Hace 30 minutos',
        },
      ],
    };
  },

  computed: {
    authStore() {
      return useAuthStore();
    },
  },

  mounted() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario.rol === 'CLIENTE') this.usuarioCliente = true;
  },
};
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
}

.rounded-2xl {
  border-radius: 1rem;
}
</style>
