<template>
  <div
    class=" bg-gradiente-personal from-gray-50 to-orange-100 p-4"
  >
    <!-- Header -->
    <header class="bg-white shadow-sm rounded-lg mb-6">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center"
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Gestión de Ofertas
              </h1>
              <p class="text-sm text-gray-600">
                Administra categorias de ofertas y ofertas activas
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Tabs -->
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6">
            <button
              v-for="(tabItem, index) in tabs"
              :key="index"
              @click="tab = tabItem.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition',
                tab === tabItem.id
                  ? 'border-orange-500 text-orange-600'
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
          <!-- Categorias de Oferta -->
          <div v-if="tab === 'tipos'">
            <div
              class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0"
            >
              <h2 class="text-xl font-semibold text-gray-900">
                Categorias de Oferta
              </h2>
              <button
                @click="mostrarModalTipoOferta"
                class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex items-center space-x-2"
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
                <span>Nuevo Tipo</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="tipo in tiposOferta"
                :key="tipo.id_tipo_oferta"
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
              >
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">
                      {{ tipo.nombre_tipo_oferta }}
                    </h3>
                    <p class="text-sm text-gray-500">
                      ID: {{ tipo.id_tipo_oferta }}
                    </p>
                  </div>
                  <span
                    class="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full"
                  >
                    {{ tipo.ofertas_count || 0 }} ofertas
                  </span>
                </div>

                <p class="text-sm text-gray-600 mb-4 line-clamp-2">
                  {{ tipo.descripcion }}
                </p>

                <div class="flex space-x-2 pt-4 border-t border-gray-100">
                  <button
                    @click="editarTipoOferta(tipo)"
                    class="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-sm font-medium hover:bg-blue-100 transition"
                  >
                    Editar
                  </button>
                  <button
                    v-if="tipo.ofertas_count === 0"
                    @click="eliminarTipoOferta(tipo)"
                    class="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded text-sm font-medium hover:bg-red-100 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>

            <div
              v-if="tiposOferta.length === 0"
              class="text-center py-12 bg-gray-50 rounded-lg"
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
              <p class="text-gray-500 text-lg">
                No hay Categorias de oferta registrados
              </p>
              <p class="text-gray-400 text-sm">
                Comienza creando tu primer Categoria de oferta
              </p>
            </div>
          </div>

          <!-- Ofertas -->
          <div v-if="tab === 'ofertas'">
            <div
              class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0"
            >
              <h2 class="text-xl font-semibold text-gray-900">
                Ofertas Activas
              </h2>
              <div
                class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
              >
                <div class="relative">
                  <input
                    v-model="filtroOfertas"
                    type="text"
                    placeholder="Buscar ofertas..."
                    class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 w-full sm:w-64"
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
                <button
                  @click="mostrarModalOferta"
                  class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex items-center space-x-2"
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
                  <span>Nueva Oferta</span>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="oferta in ofertasFiltradas"
                :key="oferta.id_oferta"
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
              >
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">
                      {{ oferta.nombre }}
                    </h3>
                    <p class="text-sm text-gray-500">
                      ID: {{ oferta.id_oferta }}
                    </p>
                    <p class="text-sm text-gray-500">
                      Categoria:
                      {{ obtenerNombreTipoOferta(oferta.id_tipo_oferta) }}
                    </p>
                  </div>
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-semibold rounded-full',
                      oferta.activa
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800',
                    ]"
                  >
                    {{ oferta.activa ? 'Activa' : 'Inactiva' }}
                  </span>
                </div>

                <div class="space-y-2 mb-4">
                  <div v-if="oferta.valor_oferta_numerico !== null">
                    <p class="text-sm text-gray-600">Valor fijo:</p>
                    <p class="text-xl font-bold text-green-600">
                      Q{{ oferta.valor_oferta_numerico.toLocaleString() }}
                    </p>
                  </div>

                  <div v-if="oferta.valor_oferta_porcentaje !== null">
                    <p class="text-sm text-gray-600">Descuento:</p>
                    <p class="text-xl font-bold text-blue-600">
                      {{ oferta.valor_oferta_porcentaje }}%
                    </p>
                  </div>
                </div>

                <p
                  v-if="oferta.observacion"
                  class="text-sm text-gray-600 mb-4 line-clamp-1"
                >
                  {{ 'Observacion: ' + oferta.observacion }}
                </p>

                <div class="flex space-x-2 pt-4 border-t border-gray-100">
                  <button
                    @click="editarOferta(oferta)"
                    class="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-sm font-medium hover:bg-blue-100 transition"
                  >
                    Editar
                  </button>
                  <button
                    @click="toggleEstadoOferta(oferta)"
                    :class="[
                      'flex-1 px-3 py-2 rounded text-sm font-medium transition',
                      oferta.activa
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-green-50 text-green-600 hover:bg-green-100',
                    ]"
                  >
                    {{ oferta.activa ? 'Desactivar' : 'Activar' }}
                  </button>
                </div>
              </div>
            </div>

            <div
              v-if="ofertasFiltradas.length === 0"
              class="text-center py-12 bg-gray-50 rounded-lg"
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
              <p class="text-gray-500 text-lg">No hay ofertas registradas</p>
              <p class="text-gray-400 text-sm">
                Comienza creando tu primera oferta
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Tipo Oferta -->
    <div
      v-if="mostrarModalTipo"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          {{ esEdicionTipo ? 'Editar' : 'Nuevo' }} Categoria de Oferta
        </h3>

        <form @submit.prevent="guardarTipoOferta" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nombre de Categoria *
            </label>
            <input
              v-model="formTipoOferta.nombre_tipo_oferta"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ej: Descuento por porcentaje"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              v-model="formTipoOferta.descripcion"
              required
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Describe el categoria de oferta..."
            ></textarea>
          </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="submit"
              class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex-1"
            >
              {{ esEdicionTipo ? 'Actualizar' : 'Crear' }}
            </button>
            <button
              type="button"
              @click="cerrarModalTipo"
              class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Oferta -->
    <div
      v-if="mostrarModalOfertaForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          {{ esEdicionOferta ? 'Editar' : 'Nueva' }} Oferta
        </h3>

        <form @submit.prevent="guardarOferta" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Categoria de Oferta *
            </label>
            <select
              v-model="formOferta.id_tipo_oferta"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Seleccione un tipo</option>
              <option
                v-for="tipo in tiposOferta"
                :key="tipo.id_tipo_oferta"
                :value="tipo.id_tipo_oferta"
              >
                {{ tipo.nombre_tipo_oferta }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nombre Oferta
            </label>
            <input
              v-model.number="formOferta.nombre"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ej. Oferta fin"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Valor Numérico
              </label>
              <input
                v-model.number="formOferta.valor_oferta_numerico"
                type="number"
                step="0.01"
                min="0"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Porcentaje
              </label>
              <input
                v-model.number="formOferta.valor_oferta_porcentaje"
                type="number"
                step="0.1"
                min="0"
                max="100"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="0%"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Observaciones
            </label>
            <textarea
              v-model="formOferta.observacion"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Observaciones adicionales..."
            ></textarea>
          </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="submit"
              class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex-1"
            >
              {{ esEdicionOferta ? 'Actualizar' : 'Crear' }}
            </button>
            <button
              type="button"
              @click="cerrarModalOferta"
              class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mostrarAlertaGlobal } from '../components/contenedorDeAlertas.vue';
import { api } from '../axios';
const TypeIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`,
};
const OfferIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
};
export default {
  name: 'GestionOfertas',

  data() {
    return {
      tab: 'tipos',
      tiposOferta: [],
      ofertas: [],
      filtroOfertas: '',
      mostrarModalTipo: false,
      mostrarModalOfertaForm: false,
      esEdicionTipo: false,
      esEdicionOferta: false,
      formTipoOferta: {
        id_tipo_oferta: null,
        nombre_tipo_oferta: '',
        descripcion: '',
      },
      formOferta: {
        nombre: null,
        id_oferta: null,
        id_tipo_oferta: '',
        valor_oferta_numerico: null,
        valor_oferta_porcentaje: null,
        observacion: '',
        activa: true,
      },
      tabs: [
        { id: 'tipos', label: 'Categorias de Oferta', icon: TypeIcon },
        { id: 'ofertas', label: 'Ofertas', icon: OfferIcon },
      ],
    };
  },
  computed: {
    ofertasFiltradas() {
      return this.ofertas.filter((oferta) => {
        const tipoNombre =
          this.obtenerNombreTipoOferta(oferta.id_tipo_oferta) || '';
        return (
          tipoNombre.toLowerCase().includes(this.filtroOfertas.toLowerCase()) ||
          (oferta.observacion || '')
            .toLowerCase()
            .includes(this.filtroOfertas.toLowerCase())
        );
      });
    },
  },
  mounted() {
    this.cargarDatosIniciales();
  },
  methods: {
    mostrarAlertaError(mensaje) {
      mostrarAlertaGlobal(mensaje, 'error', 'sm', 'top-center', 300);
    },
    mostrarAlertaExito(mensaje) {
      mostrarAlertaGlobal(mensaje, 'success', 'sm', 'top-center', 300);
    },
    async obtenerTiposOferta() {
      try {
        const tiposOfertaReponse = await api.v1.inventario.obtenerTiposOferta();
        this.tiposOferta = tiposOfertaReponse.data.tiposOferta;
      } catch (error) {
        this.mostrarAlertaError('Error al cargar categorias de oferta');
      }
    },
    async obtenerOfertas() {
      try {
        const ofertaReponse = await api.v1.inventario.obtenerOfertas();
        console.log(ofertaReponse);
        this.ofertas = ofertaReponse.data.ofertas;
      } catch (error) {
        this.mostrarAlertaError('Error al cargar ofertas');
      }
    },
    async cargarDatosIniciales() {
      try {
        await this.obtenerTiposOferta();
        await this.obtenerOfertas();
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    },

    obtenerNombreTipoOferta(idTipo) {
      const tipo = this.tiposOferta.find((t) => t.id_tipo_oferta === idTipo);
      return tipo ? tipo.nombre_tipo_oferta : 'Desconocido';
    },

    mostrarModalTipoOferta() {
      this.esEdicionTipo = false;
      this.formTipoOferta = {
        id_tipo_oferta: null,
        nombre_tipo_oferta: '',
        descripcion: '',
      };
      this.mostrarModalTipo = true;
    },

    editarTipoOferta(tipo) {
      this.esEdicionTipo = true;
      this.formTipoOferta = { ...tipo };
      this.mostrarModalTipo = true;
    },

    async guardarTipoOferta() {
      try {
        if (this.esEdicionTipo) {
          const index = this.tiposOferta.findIndex(
            (t) => t.id_tipo_oferta === this.formTipoOferta.id_tipo_oferta
          );
          const tipoOfertaActualizacion = {
            id_tipo_oferta: this.formTipoOferta.id_tipo_oferta,
            nombre_tipo_oferta: this.formTipoOferta.nombre_tipo_oferta,
            descripcion: this.formTipoOferta.descripcion,
          };
          const tipoOfertaPOst = await api.v1.inventario.actualizarTipoOferta({
            tipoOfertaActualizacion,
          });
          if (index !== -1) {
            this.tiposOferta[index] = { ...this.formTipoOferta };
          }
        } else {
          const nuevoTipoOferta = await api.v1.inventario.crearTipoOferta({
            ...this.formTipoOferta,
          });
          const nuevoId =
            Math.max(...this.tiposOferta.map((t) => t.id_tipo_oferta), 0) + 1;
          this.tiposOferta.push({
            ...this.formTipoOferta,
            id_tipo_oferta: nuevoId,
            ofertas_count: 0,
          });
        }

        this.cerrarModalTipo();

        this.mostrarAlertaExito(
          this.esEdicionTipo
            ? 'Categoria de oferta actualizado'
            : 'Categoria de oferta creado'
        );
      } catch (error) {
        console.error('Error guardando tipo:', error);
        this.mostrarAlertaError('Error al guardar el categoria de oferta');
      }
    },

    async eliminarTipoOferta(tipo) {
      if (
        !confirm(
          `¿Estás seguro de eliminar el tipo "${tipo.nombre_tipo_oferta}"?`
        )
      ) {
        return;
      }

      try {
        // Verificar si tiene ofertas asociadas
        const tieneOfertas = this.ofertas.some(
          (o) => o.id_tipo_oferta === tipo.id_tipo_oferta
        );

        if (tieneOfertas) {
          this.mostrarAlertaError(
            'No se puede eliminar, tiene ofertas asociadas'
          );
          return;
        }

        const tipoOfertaBorrado = await api.v1.inventario.eliminarTipoOferta(
          tipo.id_tipo_oferta
        );

        this.tiposOferta = this.tiposOferta.filter(
          (t) => t.id_tipo_oferta !== tipo.id_tipo_oferta
        );
        this.mostrarAlertaExito('Categoria de oferta eliminado');
      } catch (error) {
        console.error('Error eliminando tipo:', error);

        this.mostrarAlertaError('Error al eliminar el categoria de oferta');
      }
    },

    mostrarModalOferta() {
      this.esEdicionOferta = false;
      this.formOferta = {
        id_oferta: null,
        id_tipo_oferta: '',
        valor_oferta_numerico: null,
        valor_oferta_porcentaje: null,
        observacion: '',
        activa: true,
      };
      this.mostrarModalOfertaForm = true;
    },

    editarOferta(oferta) {
      this.esEdicionOferta = true;
      this.formOferta = { ...oferta };
      this.mostrarModalOfertaForm = true;
    },

    async guardarOferta() {
      try {
        if (
          this.formOferta.valor_oferta_numerico === null &&
          this.formOferta.valor_oferta_porcentaje === null
        ) {
          this.mostrarAlertaError(
            'Debe ingresar al menos un valor numérico o porcentaje'
          );
          return;
        }

        if (this.esEdicionOferta) {
          const index = this.ofertas.findIndex(
            (o) => o.id_oferta === this.formOferta.id_oferta
          );
          const payloadActualizacionOferta = {
            id_oferta: this.formOferta.id_oferta,
            valor_numerico: this.formOferta.valor_oferta_numerico,
            valor_porcentaje: this.formOferta.valor_oferta_porcentaje,
            observacion: this.formOferta.observacion,
            id_tipo_oferta: this.formOferta.id_tipo_oferta,
            oferta: this.formOferta.nombre,
          };

          const actualizacionOferta = await api.v1.inventario.actualizarOferta(
            payloadActualizacionOferta
          );

          if (!actualizacionOferta.data?.oferta) return;
          if (index !== -1) {
            this.ofertas[index] = { ...this.formOferta };
          }
        } else {
          const payload = {
            valor_numerico: this.formOferta.valor_oferta_numerico,
            valor_porcentaje: this.formOferta.valor_oferta_porcentaje,
            observacion: this.formOferta.observacion,
            id_tipo_oferta: this.formOferta.id_tipo_oferta,
            oferta: this.formOferta.nombre,
          };
          const nuevaOferta = await api.v1.inventario.crearOferta(payload);

          if (!nuevaOferta.data?.oferta)
            return this.mostrarAlertaError('No se pudo crear la oferta');
          const nuevoId =
            Math.max(...this.ofertas.map((o) => o.id_oferta), 0) + 1;
          this.ofertas.push({
            ...this.formOferta,
            id_oferta: nuevoId,
          });

          // Actualizar contador en catogria de oferta
          const tipoIndex = this.tiposOferta.findIndex(
            (t) => t.id_tipo_oferta === this.formOferta.id_tipo_oferta
          );
          if (tipoIndex !== -1) {
            this.tiposOferta[tipoIndex].ofertas_count =
              (this.tiposOferta[tipoIndex].ofertas_count || 0) + 1;
          }
        }

        this.cerrarModalOferta();

        this.mostrarAlertaExito(
          this.esEdicionOferta ? 'Oferta actualizada' : 'Oferta creada'
        );
      } catch (error) {
        console.error('Error guardando oferta:', error);
        this.mostrarAlertaError('Error al guardar la oferta');
      }
    },

    async toggleEstadoOferta(oferta) {
      try {
        const ofertaActiva = await api.v1.inventario.eliminarOferta(
          oferta.id_oferta
        );

        if (
          ofertaActiva.data.mensaje !==
          'Oferta desactivada/activada correctamente'
        )
          return this.mostrarAlertaError('No se pudo actualizar la oferta');

        const index = this.ofertas.findIndex(
          (o) => o.id_oferta === oferta.id_oferta
        );
        if (index !== -1) {
          this.ofertas[index].activa = !this.ofertas[index].activa;

          this.mostrarAlertaExito(
            this.ofertas[index].activa
              ? 'Oferta activada'
              : 'Oferta desactivada'
          );
        }
      } catch (error) {
        console.error('Error cambiando estado:', error);
        this.mostrarAlertaError('Error al cambiar el estado');
      }
    },

    cerrarModalTipo() {
      this.mostrarModalTipo = false;
    },

    cerrarModalOferta() {
      this.mostrarModalOfertaForm = false;
    },
  },
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.transition {
  transition: all 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.transform {
  animation: slideIn 0.3s ease-out;
}
</style>
