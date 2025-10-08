<template>
  <div
    v-if="mostrarModalDireccion"
    class="fixed inset-0 bg-gray-700 bg-opacity-80 flex items-center justify-center z-50 p-4"
  >
    <div
      class="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
    >
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          {{ esEdicionDireccion ? 'Editar' : 'Nueva' }} Dirección
        </h3>

        <form @submit.prevent="guardarDireccion" class="space-y-4">
          <!-- País -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              País *
            </label>
            <select
              v-model="formDireccion.id_pais"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              @change="cargarDepartamentos"
            >
              <option value="" disabled selected>Selecciona un país</option>
              <option
                v-for="pais in paises"
                :key="pais.id_pais"
                :value="pais.id_pais"
              >
                {{ pais.nombre_pais }}
              </option>
            </select>
          </div>

          <!-- Departamento -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Departamento *
            </label>
            <select
              v-model="formDireccion.id_departamento"
              required
              :disabled="!formDireccion.id_pais"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              @change="cargarMunicipios"
            >
              <option value="" disabled selected>
                Selecciona un departamento
              </option>
              <option
                v-for="departamento in departamentos"
                :key="departamento.id_departamento"
                :value="departamento.id_departamento"
              >
                {{ departamento.nombre_departamento }}
              </option>
            </select>
          </div>

          <!-- Municipio -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Municipio *
            </label>
            <select
              v-model="formDireccion.id_municipio"
              required
              :disabled="!formDireccion.id_departamento"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="" disabled selected>
                Selecciona un municipio
              </option>
              <option
                v-for="municipio in municipios"
                :key="municipio.id_municipio"
                :value="municipio.id_municipio"
              >
                {{ municipio.nombre_municipio }}
              </option>
            </select>
          </div>

          <!-- Dirección Completa -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Dirección Completa *
            </label>
            <textarea
              v-model="formDireccion.direccion_completa"
              required
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ej: Colonia Las Flores, zona 5"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Número de Casa -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Número de Casa
              </label>
              <input
                v-model="formDireccion.no_casa"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ej: 25A"
              />
            </div>

            <!-- Número de Calle -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Número de Calle
              </label>
              <input
                v-model="formDireccion.no_calle"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ej: 8-15"
              />
            </div>
          </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex-1"
            >
              {{ esEdicionDireccion ? 'Actualizar' : 'Crear' }}
            </button>
            <button
              type="button"
              @click="cerrarModalDireccion"
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
import { api } from '../axios';
import { mostrarAlertaGlobal } from '../components/contenedorDeAlertas.vue';
export default {
  name: 'direccion',
  data() {
    return {
      formDireccion: {
        id_pais: '',
        id_departamento: '',
        id_municipio: '',
        direccion_completa: '',
        no_casa: '',
        no_calle: '',
      },
      paises: [],
      departamentos: [],
      municipios: [],
    };
  },
  props: {
    mostrarModalDireccion: { Type: Boolean, default: false },
    esEdicionDireccion: { Type: Boolean, default: false },
  },
  watch: {
    mostrarModalDireccion: {
      async handler() {
        try {
          const pais = JSON.parse(localStorage.getItem('pais'));
          if (pais === null || pais === undefined) {
            const apiPais = await api.v1.opcionesGenerales.obtenerPais();
            this.paises = apiPais.data.pais;
            localStorage.setItem('pais', JSON.stringify(this.paises));
          } else {
            this.paises = pais;
          }
          this.formDireccion.id_pais = 1;
        } catch (error) {
          this.mostrarAlertaError('Error al obtner pais');
        }
      },
    },
    'formDireccion.id_pais': {
      /**Al mejorar la direccion se debe remover la logica de guardar en memoria **Podria ser no funcional */
      async handler() {
        try {
          const departamento = JSON.parse(localStorage.getItem('departamento'));
          if (departamento === null || departamento === undefined) {
            const apidepartamento =
              await api.v1.opcionesGenerales.obtenerDepartamento();
            this.departamentos = apidepartamento.data.departamento;
            localStorage.setItem(
              'departamento',
              JSON.stringify(this.departamentos)
            );
          } else {
            this.departamentos = departamento;
          }
        } catch (error) {
          this.mostrarAlertaError('Error al obtener departamento');
        }
      },
    },
    'formDireccion.id_departamento': {
      async handler() {
        try {
          const apimunicipio = await api.v1.opcionesGenerales.obtenerMunicipio(
            this.formDireccion.id_departamento
          );
          this.municipios = apimunicipio.data.obtenerMunicipio;
        } catch (error) {
          this.mostrarAlertaError('Error al obtener departamento');
        }
      },
    },
  },
  methods: {
    mostrarAlertaError(mensaje) {
      mostrarAlertaGlobal(mensaje, 'error', 'sm', 'top-center', 300);
    },
    mostrarAlertaExito(mensaje) {
      mostrarAlertaGlobal(mensaje, 'success', 'sm', 'top-center', 300);
    },
    abrirModalDireccion(editar = false, datos = null) {
      this.esEdicionDireccion = editar;
      if (editar && datos) {
        this.formDireccion = { ...datos };
      } else {
        this.formDireccion = {
          id_pais: '',
          id_departamento: '',
          id_municipio: '',
          direccion_completa: '',
          no_casa: '',
          no_calle: '',
        };
      }
      this.mostrarModalDireccion = true;
    },
    cerrarModalDireccion() {
      this.$emit('cerrar', true);
    },
    guardarDireccion() {
      const enviarDatos = {
        id_pais: this.formDireccion.id_pais,
        id_departamento: this.formDireccion.id_departamento,
        id_municipio: this.formDireccion.id_municipio,
        pais: this.paises.find((a) => a.id_pais === this.formDireccion.id_pais)
          .nombre_pais,
        departamento: this.departamentos.find(
          (b) => b.id_departamento === this.formDireccion.id_departamento
        ).nombre_departamento,
        municipio: this.municipios.find(
          (c) => c.id_municipio === this.formDireccion.id_municipio
        ).nombre_municipio,
        direccion_detallada: this.formDireccion.direccion_completa,
        no_casa: this.formDireccion.no_casa,
        no_calle: this.formDireccion.no_calle,
      };
      this.$emit('guardar', enviarDatos);
      console.log('Dirección guardada:', enviarDatos);
      this.cerrarModalDireccion();
    },
  },
};
</script>
<style scoped>
.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bg-black {
  background-color: #000;
}

.bg-opacity-50 {
  --tw-bg-opacity: 0.5;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.z-50 {
  z-index: 50;
}

.p-4 {
  padding: 1rem;
}

.bg-white {
  background-color: #fff;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.max-w-md {
  max-width: 28rem;
}

.w-full {
  width: 100%;
}

.max-h-\[90vh\] {
  max-height: 90vh;
}

.overflow-y-auto {
  overflow-y: auto;
}

.p-6 {
  padding: 1.5rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.font-semibold {
  font-weight: 600;
}

.text-gray-900 {
  color: #111827;
}

.mb-4 {
  margin-bottom: 1rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.block {
  display: block;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.font-medium {
  font-weight: 500;
}

.text-gray-700 {
  color: #374151;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.w-full {
  width: 100%;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.border {
  border-width: 1px;
}

.border-gray-300 {
  border-color: #d1d5db;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
    calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow:
    var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000);
}

.focus\:ring-orange-500:focus {
  --tw-ring-color: #f97316;
}

.focus\:border-transparent:focus {
  border-color: transparent;
}

.disabled\:bg-gray-100:disabled {
  background-color: #f3f4f6;
}

.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.gap-4 {
  gap: 1rem;
}

.pt-4 {
  padding-top: 1rem;
}

.flex-1 {
  flex: 1 1 0%;
}

.space-x-4 > * + * {
  margin-left: 1rem;
}

.bg-orange-600 {
  background-color: #dc2626;
}

.text-white {
  color: #fff;
}

.hover\:bg-orange-700:hover {
  background-color: #b91c1c;
}

.bg-gray-500 {
  background-color: #6b7280;
}

.hover\:bg-gray-600:hover {
  background-color: #4b5563;
}

.transition {
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke,
    opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.placeholder\:text-gray-400::placeholder {
  color: #9ca3af;
}
</style>
