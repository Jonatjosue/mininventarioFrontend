<template>
  <div class="bg-gradiente-personal from-gray-50 to-orange-100">
    <!-- Header -->
    <header class="bg-white shadow-sm rounded-lg mb-6 mx-8">
      <div class="px-4 py-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col md:flex-row gap-1 items-center justify-between"
        >
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex gap-1 items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
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
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Resumen de Inventario
              </h1>
              <p class="text-sm text-gray-600">
                Dashboard con métricas y estadísticas del inventario
              </p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <div class="relative">
              <svg
                class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                type="text"
                placeholder="Buscar..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Generar Reporte
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-full mx-5 md:mx-14">
      <!-- Dashboard Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
        <!-- Card: Total Productos -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-blue-100">
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
              <h2 class="text-sm font-medium text-gray-600">Total Productos</h2>
              <p class="text-2xl font-bold text-gray-900">
                {{ formatoNumero(estadisticas.totalProductos) }}
              </p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center">
              <svg
                v-if="estadisticas.variacionProductos > 0"
                class="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                ></path>
              </svg>
              <svg
                v-else
                class="w-4 h-4 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
              <span
                :class="[
                  'text-xs font-medium ml-1',
                  estadisticas.variacionProductos > 0
                    ? 'text-green-500'
                    : 'text-red-500',
                ]"
              >
                {{ Math.abs(estadisticas.variacionProductos) }}% desde el mes
                pasado
              </span>
            </div>
          </div>
        </div>

        <!-- Card: Valor Total -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-green-100">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-600">Valor Total</h2>
              <p class="text-2xl font-bold text-gray-900">
                {{ formatoMoneda(estadisticas.valorTotal) }}
              </p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center">
              <svg
                v-if="estadisticas.variacionValor > 0"
                class="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                ></path>
              </svg>
              <svg
                v-else
                class="w-4 h-4 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
              <span
                :class="[
                  'text-xs font-medium ml-1',
                  estadisticas.variacionValor > 0
                    ? 'text-green-500'
                    : 'text-red-500',
                ]"
              >
                {{ Math.abs(estadisticas.variacionValor) }}% desde el mes pasado
              </span>
            </div>
          </div>
        </div>

        <!-- Card: Productos Críticos -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-red-100">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-600">
                Productos Críticos
              </h2>
              <p class="text-2xl font-bold text-gray-900">
                {{ estadisticas.productosCriticos }}
              </p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center">
              <span class="text-xs font-medium text-gray-500">
                Stock mínimo alcanzado
              </span>
            </div>
          </div>
        </div>

        <!-- Card: Categorías -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-purple-100">
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-600">Categorías</h2>
              <p class="text-2xl font-bold text-gray-900">
                {{ estadisticas.totalCategorias }}
              </p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center">
              <span class="text-xs font-medium text-gray-500">
                Categorías activas
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Chart: Distribución por Categoría -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">
            Distribución por Categoría
          </h2>
          <canvas id="categoriaChart" class="w-full h-64"></canvas>
        </div>

        <!-- Chart: Evolución de Stock -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">
            Evolución de Stock
          </h2>
          <canvas id="stockChart" class="w-full h-64"></canvas>
        </div>
      </div>

      <!-- Productos con Stock Crítico -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">
            Productos con Stock Crítico
          </h2>
          <p class="text-sm text-gray-600">
            Productos que necesitan reabastecimiento urgente
          </p>
        </div>
        <div class="overflow-x-auto">
          <div class="w-2 md:min-w-full">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Producto
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Categoría
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stock Actual
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stock Mínimo
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="producto in productosCriticos" :key="producto.id">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                        v-if="producto.imagen"
                          class="h-10 w-10 rounded-full object-cover"
                          :src="producto.imagen || ''"
                          alt=""
                        />
                        <svg
                  v-else
                  data-v-0da8fd7f=""
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-8 text-gray-500"
                >
                  <path
                    data-v-0da8fd7f=""
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  ></path>
                </svg>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ producto.nombre }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ producto.codigo }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ producto.categoria }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ producto.stock }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ producto.stock_minimo }}
                  </td>
                  <td class="px-6 py-4">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                    >
                      Crítico
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm font-medium">
                    <button class="text-indigo-600 hover:text-indigo-900 mr-3">
                      Reabastecer
                    </button>
                    <button class="text-gray-600 hover:text-gray-900">
                      Detalles
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="bg-white mb-10 rounded-xl shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">
            Últimos Movimientos
          </h2>
          <p class="text-sm text-gray-600">
            Registro de las últimas entradas y salidas
          </p>
        </div>
        <div class="overflow-x-auto">
          <div class="w-2 md:min-w-full">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fecha
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Producto
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tipo
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cantidad
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Usuario
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="movimiento in ultimosMovimientos"
                  :key="movimiento.id"
                >
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ formatoFecha(movimiento.fecha) }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ movimiento.producto }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ movimiento.codigo }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span
                      :class="[
                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                        movimiento.tipo === 'entrada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800',
                      ]"
                    >
                      {{ movimiento.tipo === 'entrada' ? 'Entrada' : 'Salida' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ movimiento.cantidad }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ movimiento.usuario }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'ResumenInventario',
  data() {
    return {
      estadisticas: {
        totalProductos: 1245,
        variacionProductos: 12.5,
        valorTotal: 154820.75,
        variacionValor: 8.2,
        productosCriticos: 18,
        totalCategorias: 12,
      },
      productosCriticos: [
        {
          id: 1,
          nombre: 'Monitor LED 24"',
          codigo: 'MON-0024',
          categoria: 'Monitores',
          stock: 2,
          stock_minimo: 5,
          imagen: '',
        },
        {
          id: 2,
          nombre: 'Teclado Mecánico',
          codigo: 'TEC-0012',
          categoria: 'Periféricos',
          stock: 3,
          stock_minimo: 10,
          imagen: '',
        },
        {
          id: 3,
          nombre: 'Mouse Inalámbrico',
          codigo: 'MOU-0008',
          categoria: 'Periféricos',
          stock: 4,
          stock_minimo: 8,
          imagen: '',
        },
        {
          id: 4,
          nombre: 'Disco SSD 500GB',
          codigo: 'SSD-0500',
          categoria: 'Almacenamiento',
          stock: 1,
          stock_minimo: 5,
          imagen: '',
        },
      ],
      ultimosMovimientos: [
        {
          id: 1,
          fecha: '2023-05-15',
          producto: 'Monitor LED 24"',
          codigo: 'MON-0024',
          tipo: 'entrada',
          cantidad: 10,
          usuario: 'admin',
        },
        {
          id: 2,
          fecha: '2023-05-14',
          producto: 'Teclado Mecánico',
          codigo: 'TEC-0012',
          tipo: 'salida',
          cantidad: 5,
          usuario: 'vendedor01',
        },
        {
          id: 3,
          fecha: '2023-05-14',
          producto: 'Mouse Inalámbrico',
          codigo: 'MOU-0008',
          tipo: 'salida',
          cantidad: 8,
          usuario: 'vendedor02',
        },
        {
          id: 4,
          fecha: '2023-05-13',
          producto: 'Disco SSD 500GB',
          codigo: 'SSD-0500',
          tipo: 'entrada',
          cantidad: 15,
          usuario: 'admin',
        },
        {
          id: 5,
          fecha: '2023-05-12',
          producto: 'Memoria RAM 8GB',
          codigo: 'RAM-0008',
          tipo: 'salida',
          cantidad: 12,
          usuario: 'vendedor01',
        },
      ],
    };
  },
  methods: {
    formatoMoneda(valor) {
      return new Intl.NumberFormat('es-GT', {
        style: 'currency',
        currency: 'GTQ',
      }).format(valor);
    },
    formatoNumero(valor) {
      return new Intl.NumberFormat('es-GT').format(valor);
    },
    formatoFecha(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES');
    },
  },
  mounted() {
    const categoriaCtx = document
      .getElementById('categoriaChart')
      .getContext('2d');
    new Chart(categoriaCtx, {
      type: 'doughnut',
      data: {
        labels: [
          'Electrónicos',
          'Periféricos',
          'Componentes',
          'Accesorios',
          'Software',
        ],
        datasets: [
          {
            data: [35, 25, 20, 15, 5],
            backgroundColor: [
              '#3B82F6',
              '#10B981',
              '#F59E0B',
              '#8B5CF6',
              '#EC4899',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
      },
    });

    const stockCtx = document.getElementById('stockChart').getContext('2d');
    new Chart(stockCtx, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Entradas',
            data: [120, 150, 180, 90, 130, 160],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.3,
          },
          {
            label: 'Salidas',
            data: [80, 100, 120, 140, 110, 130],
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { beginAtZero: true } },
      },
    });
  },
};
</script>
