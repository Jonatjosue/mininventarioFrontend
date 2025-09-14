<template>
  <section>
    <div
      class="min-h-screen bg-gradiente-personal from-gray-50 to-blue-100 p-4"
    >
      <!-- Header -->
      <header class="bg-white shadow-sm rounded-lg mb-6">
        <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center"
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-900">
                  Administración de Rutas y Roles
                </h1>
                <p class="text-sm text-gray-600">
                  Gestiona permisos y accesos del sistema
                </p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <button
                @click="exportarConfiguracion"
                class="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  ></path>
                </svg>
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
          <!-- Tabs Mejoradas -->
          <div class="border-b border-gray-200">
            <nav
              class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 px-6"
            >
              <button
                v-for="(tabItem, index) in tabs"
                :key="index"
                @click="tab = tabItem.id"
                :class="[
                  'py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition',
                  tab === tabItem.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                ]"
              >
                <component :is="tabItem.icon" class="w-5 h-5" />
                <span>{{ tabItem.label }}</span>
                <span
                  v-if="tabItem.count !== undefined"
                  class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                >
                  {{ tabItem.count }}
                </span>
              </button>
            </nav>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Rutas -->
            <div v-if="tab === 'rutas'">
              <div
                class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0"
              >
                <h2 class="text-xl font-semibold text-gray-900">
                  Gestión de Rutas del Sistema
                </h2>
                <div class="flex space-x-4">
                  <div class="relative">
                    <input
                      v-model="filtroRutas"
                      type="text"
                      placeholder="Buscar rutas..."
                      class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
                    />
                    <svg
                      class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
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
                  </div>
                  <select
                    v-model="filtroMenu"
                    class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Todos los menús</option>
                    <option
                      v-for="menu in menusUnicos"
                      :key="menu"
                      :value="menu"
                    >
                      Menú {{ menu }}
                    </option>
                  </select>
                </div>
              </div>

              <div
                class="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          @click="ordenarPor('id_opcion')"
                        >
                          ID
                          <span v-if="ordenCampo === 'id_opcion'" class="ml-1">
                            {{ ordenDireccion === 'asc' ? '↑' : '↓' }}
                          </span>
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          @click="ordenarPor('opcion')"
                        >
                          Opción
                          <span v-if="ordenCampo === 'opcion'" class="ml-1">
                            {{ ordenDireccion === 'asc' ? '↑' : '↓' }}
                          </span>
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Descripción
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Endpoint
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          @click="ordenarPor('id_menu')"
                        >
                          Menú
                          <span v-if="ordenCampo === 'id_menu'" class="ml-1">
                            {{ ordenDireccion === 'asc' ? '↑' : '↓' }}
                          </span>
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr
                        v-for="ruta in rutasFiltradasYOrdenadas"
                        :key="ruta.id_opcion"
                        class="hover:bg-gray-50 transition"
                      >
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {{ ruta.id_opcion }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900"
                        >
                          {{ ruta.opcion }}
                        </td>
                        <td
                          class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate"
                        >
                          {{ ruta.descripcion }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-mono"
                        >
                          {{ ruta.endpoint }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span
                            class="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full"
                          >
                            {{ ruta.id_menu }}
                          </span>
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        >
                          <button
                            @click="editarRuta(ruta)"
                            class="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Editar
                          </button>
                          <button
                            @click="mostrarDetallesRuta(ruta)"
                            class="text-green-600 hover:text-green-900"
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div
                  v-if="rutasFiltradasYOrdenadas.length === 0"
                  class="text-center py-12"
                >
                  <svg
                    class="w-16 h-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <p class="text-gray-500 text-lg">No se encontraron rutas</p>
                  <p class="text-gray-400 text-sm">
                    Intenta ajustar los filtros de búsqueda
                  </p>
                </div>
              </div>
            </div>

            <!-- Roles -->
            <div v-if="tab === 'roles'">
              <div
                class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0"
              >
                <h2 class="text-xl font-semibold text-gray-900">
                  Gestión de Roles del Sistema
                </h2>
                <button
                  @click="mostrarModalNuevoRol"
                  class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center space-x-2"
                >
                  <svg
                    class="w-4 h-4"
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
                  <span>Nuevo Rol</span>
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  v-for="rol in roles"
                  :key="rol.id_role"
                  class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                >
                  <div class="flex items-start justify-between mb-4">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">
                        {{ rol.role }}
                      </h3>
                      <p class="text-sm text-gray-500">ID: {{ rol.id_role }}</p>
                    </div>
                    <span
                      :class="[
                        'px-2 py-1 text-xs font-semibold rounded-full',
                        rol.id_estado_registro === '1'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800',
                      ]"
                    >
                      {{
                        rol.id_estado_registro === '1' ? 'Activo' : 'Inactivo'
                      }}
                    </span>
                  </div>

                  <p class="text-sm text-gray-600 mb-4 line-clamp-2">
                    {{ rol.descripcion }}
                  </p>

                  <div class="flex space-x-2 pt-4 border-t border-gray-100">
                    <button
                      @click="editarRol(rol)"
                      class="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-sm font-medium hover:bg-blue-100 transition"
                    >
                      Editar
                    </button>
                    <button
                      @click="cambiarEstadoRol(rol)"
                      :class="[
                        'flex-1 px-3 py-2 rounded text-sm font-medium transition',
                        rol.id_estado_registro === '1'
                          ? 'bg-red-50 text-red-600 hover:bg-red-100'
                          : 'bg-green-50 text-green-600 hover:bg-green-100',
                      ]"
                    >
                      {{
                        rol.id_estado_registro === '1'
                          ? 'Desactivar'
                          : 'Activar'
                      }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Asignación de permisos -->
            <div v-if="tab === 'asignacion'">
              <div
                class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0"
              >
                <h2 class="text-xl font-semibold text-gray-900">
                  Asignación de Permisos
                </h2>
                <div
                  class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                >
                  <div class="relative">
                    <select
                      v-model="rolSeleccionado"
                      class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
                    >
                      <option value="">Seleccione un rol</option>
                      <option
                        v-for="rol in rolesActivos"
                        :key="rol.id_role"
                        :value="rol.id_role"
                      >
                        {{ rol.role }}
                      </option>
                    </select>
                    <svg
                      class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  <button
                    v-if="rolSeleccionado"
                    @click="aplicarPermisosMasivamente"
                    class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Aplicar a todos
                  </button>
                </div>
              </div>

              <div v-if="rolSeleccionado">
                <div class="bg-gray-50 rounded-lg p-4 mb-4">
                  <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-gray-900">
                      Permisos para: {{ rolSeleccionadoNombre }}
                    </h3>
                    <div class="flex space-x-2">
                      <button
                        @click="seleccionarTodos('leer')"
                        class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition"
                      >
                        Seleccionar Leer
                      </button>
                      <button
                        @click="deseleccionarTodos"
                        class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition"
                      >
                        Limpiar
                      </button>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-4">
                  <div
                    v-for="ruta in opciones"
                    :key="'permiso-' + ruta.id_opcion"
                    class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition"
                  >
                    <div class="flex items-start justify-between mb-3">
                      <div>
                        <h4 class="font-semibold text-gray-900">
                          {{ ruta.opcion }}
                        </h4>
                        <p class="text-sm text-gray-500">
                          {{ ruta.descripcion }}
                        </p>
                        <p class="text-xs text-blue-600 font-mono">
                          {{ ruta.endpoint }}
                        </p>
                      </div>
                      <span
                        class="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full"
                      >
                        Menú {{ ruta.id_menu }}
                      </span>
                    </div>

                    <div
                      class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-gray-100"
                    >
                      <label class="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          v-model="
                            permisos[rolSeleccionado][ruta.id_opcion].leer
                          "
                          class="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span class="text-sm font-medium text-gray-900"
                          >Leer</span
                        >
                      </label>
                      <label class="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          v-model="
                            permisos[rolSeleccionado][ruta.id_opcion].insertar
                          "
                          class="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span class="text-sm font-medium text-gray-900"
                          >Insertar</span
                        >
                      </label>
                      <label class="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          v-model="
                            permisos[rolSeleccionado][ruta.id_opcion].actualizar
                          "
                          class="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span class="text-sm font-medium text-gray-900"
                          >Actualizar</span
                        >
                      </label>
                      <label class="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          v-model="
                            permisos[rolSeleccionado][ruta.id_opcion].eliminar
                          "
                          class="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span class="text-sm font-medium text-gray-900"
                          >Eliminar</span
                        >
                      </label>
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex space-x-4">
                  <button
                    @click="guardarPermisos"
                    class="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center space-x-2"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Guardar Permisos</span>
                  </button>
                  <button
                    @click="revertirCambios"
                    class="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
                  >
                    Revertir
                  </button>
                </div>
              </div>

              <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
                <svg
                  class="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                <p class="text-gray-500 text-lg">
                  Selecciona un rol para gestionar permisos
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Notificación Toast -->
      <div
        v-if="mostrarNotificacion"
        class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 z-50"
        :class="notificacionClase"
      >
        <div class="flex items-center space-x-2">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span>{{ mensajeNotificacion }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

// Iconos para las tabs
const RouteIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`,
};

const RoleIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
};

const PermissionIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`,
};

export default {
  name: 'Administracion',
  data() {
    return {
      tab: 'rutas',
      opciones: [
        {
          id_opcion: 1,
          opcion: 'Log In',
          descripcion: 'Página de logueo de usuario',
          id_menu: 3,
          endpoint: '/Login',
        },
        {
          id_opcion: 10,
          opcion: 'Dashboard',
          descripcion: 'Vista principal del sistema',
          id_menu: 2,
          endpoint: '/Dashboard',
        },
        {
          id_opcion: 11,
          opcion: 'Usuarios',
          descripcion: 'Gestión de usuarios del sistema',
          id_menu: 2,
          endpoint: '/Usuarios',
        },
        {
          id_opcion: 12,
          opcion: 'Productos',
          descripcion: 'Gestión de inventario de productos',
          id_menu: 2,
          endpoint: '/GestionProductos',
        },
        {
          id_opcion: 13,
          opcion: 'Proveedores',
          descripcion: 'Administración de proveedores',
          id_menu: 2,
          endpoint: '/GestionProveedores',
        },
        {
          id_opcion: 14,
          opcion: 'Reportes',
          descripcion: 'Generación de reportes del sistema',
          id_menu: 2,
          endpoint: '/Reportes',
        },
      ],
      roles: [
        {
          id_role: 1,
          role: 'ADMIN',
          descripcion: 'Administrador del sistema con acceso total',
          id_estado_registro: '1',
        },
        {
          id_role: 2,
          role: 'SUPERVISOR',
          descripcion: 'Supervisor con permisos de lectura y edición',
          id_estado_registro: '1',
        },
        {
          id_role: 3,
          role: 'USUARIO',
          descripcion: 'Usuario básico con permisos limitados',
          id_estado_registro: '1',
        },
        {
          id_role: 4,
          role: 'INACTIVO',
          descripcion: 'Rol desactivado para pruebas',
          id_estado_registro: '0',
        },
      ],
      rolSeleccionado: '',
      permisos: { eliminar: true },
      filtroRutas: '',
      filtroMenu: '',
      ordenCampo: 'id_opcion',
      ordenDireccion: 'asc',
      mostrarNotificacion: false,
      mensajeNotificacion: '',
      permisosOriginales: JSON.parse(
        JSON.stringify(this.permisos ?? { eliminar: true })
      ),
      tabs: [
        { id: 'rutas', label: 'Rutas del Sistema', icon: RouteIcon, count: 6 },
        { id: 'roles', label: 'Roles', icon: RoleIcon, count: 4 },
        { id: 'asignacion', label: 'Asignar Permisos', icon: PermissionIcon },
      ],
    };
  },
  computed: {
    rutasFiltradas() {
      return this.opciones.filter((ruta) => {
        const coincideBusqueda =
          ruta.opcion.toLowerCase().includes(this.filtroRutas.toLowerCase()) ||
          ruta.descripcion
            .toLowerCase()
            .includes(this.filtroRutas.toLowerCase()) ||
          ruta.endpoint.toLowerCase().includes(this.filtroRutas.toLowerCase());
        const coincideMenu =
          !this.filtroMenu || ruta.id_menu.toString() === this.filtroMenu;
        return coincideBusqueda && coincideMenu;
      });
    },
    rutasFiltradasYOrdenadas() {
      return this.rutasFiltradas.sort((a, b) => {
        let modifier = 1;
        if (this.ordenDireccion === 'desc') modifier = -1;

        if (a[this.ordenCampo] < b[this.ordenCampo]) return -1 * modifier;
        if (a[this.ordenCampo] > b[this.ordenCampo]) return 1 * modifier;
        return 0;
      });
    },
    menusUnicos() {
      return [...new Set(this.opciones.map((ruta) => ruta.id_menu))].sort();
    },
    rolesActivos() {
      return this.roles.filter((rol) => rol.id_estado_registro === '1');
    },
    rolSeleccionadoNombre() {
      const rol = this.roles.find((r) => r.id_role == this.rolSeleccionado);
      return rol ? rol.role : '';
    },
    notificacionClase() {
      return this.mostrarNotificacion ? 'translate-x-0' : 'translate-x-full';
    },
  },
  watch: {
    rolSeleccionado() {
      this.guardarEstadoOriginal();
    },
  },
  mounted() {
    //this.inicializarPermisos();
    this.guardarEstadoOriginal();
  },
  methods: {
    inicializarPermisos() {
      this.roles.forEach((rol) => {
        if (!this.permisos[rol.id_role]) {
          this.$set(this.permisos, rol.id_role, {});
        }
        this.opciones.forEach((ruta) => {
          if (!this.permisos[rol.id_role][ruta.id_opcion]) {
            this.$set(this.permisos[rol.id_role], ruta.id_opcion, {
              leer: Math.random() > 0.5,
              insertar: Math.random() > 0.3,
              actualizar: Math.random() > 0.3,
              eliminar: Math.random() > 0.2,
            });
          }
        });
      });
    },
    guardarEstadoOriginal() {
      this.permisosOriginales = {};
    },
    ordenarPor(campo) {
      if (this.ordenCampo === campo) {
        this.ordenDireccion = this.ordenDireccion === 'asc' ? 'desc' : 'asc';
      } else {
        this.ordenCampo = campo;
        this.ordenDireccion = 'asc';
      }
    },
    async guardarPermisos() {
      try {
        // Simular guardado en API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        this.mostrarNotificacion = true;
        this.mensajeNotificacion = 'Permisos guardados exitosamente';

        this.guardarEstadoOriginal();

        setTimeout(() => {
          this.mostrarNotificacion = false;
        }, 3000);
      } catch (error) {
        console.error('Error al guardar permisos:', error);
        this.mostrarNotificacion = true;
        this.mensajeNotificacion = 'Error al guardar los permisos';
        setTimeout(() => {
          this.mostrarNotificacion = false;
        }, 3000);
      }
    },
    revertirCambios() {
      this.permisos = {};
      this.mostrarNotificacion = true;
      this.mensajeNotificacion = 'Cambios revertidos';
      setTimeout(() => {
        this.mostrarNotificacion = false;
      }, 2000);
    },
    seleccionarTodos(permiso) {
      if (!this.rolSeleccionado) return;

      this.opciones.forEach((ruta) => {
        this.permisos[this.rolSeleccionado][ruta.id_opcion][permiso] = true;
      });
    },
    deseleccionarTodos() {
      if (!this.rolSeleccionado) return;

      this.opciones.forEach((ruta) => {
        Object.keys(
          this.permisos[this.rolSeleccionado][ruta.id_opcion]
        ).forEach((permiso) => {
          this.permisos[this.rolSeleccionado][ruta.id_opcion][permiso] = false;
        });
      });
    },
    aplicarPermisosMasivamente() {
      // Aquí implementarías la lógica para aplicar permisos masivamente
      alert('Funcionalidad de aplicación masiva en desarrollo');
    },
    editarRuta(ruta) {
      console.log('Editar ruta:', ruta);
      // Implementar edición de ruta
    },
    mostrarDetallesRuta(ruta) {
      console.log('Detalles de ruta:', ruta);
      // Implementar modal de detalles
    },
    editarRol(rol) {
      console.log('Editar rol:', rol);
      // Implementar edición de rol
    },
    cambiarEstadoRol(rol) {
      rol.id_estado_registro = rol.id_estado_registro === '1' ? '0' : '1';
      this.mostrarNotificacion = true;
      this.mensajeNotificacion = `Rol ${rol.id_estado_registro === '1' ? 'activado' : 'desactivado'}`;
      setTimeout(() => {
        this.mostrarNotificacion = false;
      }, 2000);
    },
    mostrarModalNuevoRol() {
      // Implementar modal para nuevo rol
      alert('Modal de nuevo rol en desarrollo');
    },
    exportarConfiguracion() {
      const config = {
        roles: this.roles,
        rutas: this.opciones,
        permisos: this.permisos,
      };

      const dataStr = JSON.stringify(config, null, 2);
      const dataUri =
        'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', 'configuracion-permisos.json');
      linkElement.click();
    },
  },
};
</script>
<style scoped>
/* Utilidades de texto */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Transiciones y animaciones */
.transition {
  transition: all 0.3s ease;
}

.transition-slow {
  transition: all 0.5s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.transform {
  animation: slideIn 0.3s ease-out;
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

.pulse {
  animation: pulse 2s infinite;
}

/* Estados de cursor */
.cursor-pointer {
  cursor: pointer;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

/* Efectos de hover y shadow */
.hover\:shadow-sm:hover {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.hover\:shadow-md:hover {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.hover\:shadow-lg:hover {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Estados de focus mejorados */
.focus\:ring-purple-500:focus {
  --tw-ring-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 0 0 3px var(--tw-ring-color);
}

.focus\:ring-blue-500:focus {
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 0 3px var(--tw-ring-color);
}

.focus\:ring-green-500:focus {
  --tw-ring-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 0 0 3px var(--tw-ring-color);
}

/* Estados de disabled */
.disabled\:opacity-50:disabled {
  opacity: 0.5;
}

.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

/* Utilidades para tablas */
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table-fixed {
  table-layout: fixed;
}

.table-auto {
  table-layout: auto;
}

/* Estados de carga */
.loading {
  position: relative;
  overflow: hidden;
}

.loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Badges y tags */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  border-radius: 0.375rem;
}

.badge-sm {
  padding: 0.125rem 0.375rem;
  font-size: 0.6875rem;
}

.badge-lg {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

/* Estados de permisos */
.permission-active {
  background-color: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.permission-inactive {
  background-color: rgba(209, 213, 219, 0.1);
  border: 1px solid rgba(209, 213, 219, 0.2);
}

/* Scrollbar personalizado */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Utilidades para grid */
.grid-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.grid-auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

/* Estados de hover específicos */
.hover-lift {
  transition: all 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Focus states para accesibilidad */
.focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Utilidades para texto */
.text-balance {
  text-wrap: balance;
}

.text-pretty {
  text-wrap: pretty;
}

/* Estados de empty */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
}

.empty-state-icon {
  margin-bottom: 1rem;
  color: #9ca3af;
}

.empty-state-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.empty-state-description {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Responsive utilities */
@media (max-width: 640px) {
  .sm\:stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .sm\:text-center {
    text-align: center;
  }

  .sm\:hidden {
    display: none;
  }
}

@media (max-width: 768px) {
  .md\:stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .md\:text-center {
    text-align: center;
  }
}

/* Dark mode support (opcional) */
@media (prefers-color-scheme: dark) {
  .dark\:bg-gray-900 {
    background-color: #111827;
  }

  .dark\:text-white {
    color: #fff;
  }

  .dark\:border-gray-700 {
    border-color: #374151;
  }
}

/* Utilidades para forms */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input-error {
  border-color: #ef4444;
}

.form-input-error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-error {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Estados de botones */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #4b5563;
}

.btn-success {
  background-color: #10b981;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background-color: #059669;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #d1d5db;
  color: #374151;
}

.btn-outline:hover:not(:disabled) {
  background-color: #f9fafb;
}

/* Utilidades de spacing */
.space-inside > * + * {
  margin-top: 1rem;
}

.space-inside-sm > * + * {
  margin-top: 0.5rem;
}

.space-inside-lg > * + * {
  margin-top: 1.5rem;
}

/* Estados de carga skeleton */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Z-index utilities */
.z-dropdown {
  z-index: 1000;
}

.z-modal {
  z-index: 2000;
}

.z-toast {
  z-index: 3000;
}

.z-tooltip {
  z-index: 4000;
}

/* Print utilities */
@media print {
  .no-print {
    display: none !important;
  }

  .print-break-before {
    page-break-before: always;
  }

  .print-break-after {
    page-break-after: always;
  }

  .print-break-inside-avoid {
    page-break-inside: avoid;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .high-contrast {
    border-width: 2px;
  }

  .high-contrast-text {
    font-weight: 700;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .transition,
  .transform,
  .fade-in,
  .pulse,
  .hover-lift,
  .hover\:scale-102:hover,
  .hover\:scale-105:hover {
    transition: none;
    animation: none;
    transform: none;
  }
}

/* Custom utilities for the admin panel */
.admin-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.admin-card-header {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.admin-card-footer {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.permission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.role-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.role-badge-admin {
  background-color: #fef3c7;
  color: #92400e;
}

.role-badge-supervisor {
  background-color: #dbeafe;
  color: #1e40af;
}

.role-badge-user {
  background-color: #dcfce7;
  color: #166534;
}

.role-badge-inactive {
  background-color: #f3f4f6;
  color: #6b7280;
}

/* Responsive table improvements */
@media (max-width: 1024px) {
  .responsive-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .responsive-table thead {
    display: none;
  }

  .responsive-table tbody tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
  }

  .responsive-table tbody td {
    display: block;
    text-align: right;
    padding: 0.75rem;
    position: relative;
    border-bottom: 1px solid #f3f4f6;
  }

  .responsive-table tbody td::before {
    content: attr(data-label);
    position: absolute;
    left: 0.75rem;
    font-weight: 600;
    text-align: left;
  }

  .responsive-table tbody td:last-child {
    border-bottom: none;
  }
}

/* Custom checkbox styles */
.custom-checkbox {
  position: relative;
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-checkbox .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.5rem;
  width: 1.5rem;
  background-color: #fff;
  border: 2px solid #d1d5db;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.custom-checkbox .checkmark::after {
  content: '';
  position: absolute;
  display: none;
  left: 0.5rem;
  top: 0.25rem;
  width: 0.5rem;
  height: 0.875rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox input:checked ~ .checkmark::after {
  display: block;
}

/* Custom select styles */
.custom-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Loading states */
.loading-spinner {
  border: 2px solid #f3f4f6;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Toast notifications */
.toast {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 3000;
  max-width: 24rem;
}

.toast-content {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  animation: toastIn 0.3s ease-out;
}

.toast-success {
  background-color: #10b981;
  color: white;
}

.toast-error {
  background-color: #ef4444;
  color: white;
}

.toast-warning {
  background-color: #f59e0b;
  color: white;
}

.toast-info {
  background-color: #3b82f6;
  color: white;
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateY(-1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes toastOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-1rem);
  }
}
</style>
