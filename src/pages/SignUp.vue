<template>
  <section
    class="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary to-pink text-white p-6"
  >
    <!-- Caja de Sign Up -->
    <div
      class="bg-white p-10 rounded-2xl border-2 shadow-xl border-gray-200 w-full max-w-5xl"
    >
      <h1 class="text-5xl font-extrabold text-primary mb-10 text-center">
        Crear cuenta
      </h1>

      <!-- Grid para escritorio -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <!-- Primer Nombre -->
        <fieldset class="fieldset relative">
          <legend class="fieldset-legend text-black">Primer Nombre</legend>
          <input
            v-model="form.nombre"
            type="text"
            class="input input-bordered w-full"
            placeholder=""
          />
          <div
            v-if="errores.nombre"
            class="tooltip tooltip-open tooltip-error absolute -top-0 right-1/4 transform -translate-x-1/2"
            :data-tip="errores.nombre"
          ></div>
        </fieldset>

        <!-- Primer Apellido -->
        <fieldset class="fieldset relative">
          <legend class="fieldset-legend text-black">Primer Apellido</legend>
          <input
            v-model="form.apellido"
            type="text"
            class="input input-bordered w-full"
            placeholder=""
          />
          <div
            v-if="errores.apellido"
            class="tooltip tooltip-open tooltip-error absolute -top-0 right-1/4 transform -translate-x-1/2"
            :data-tip="errores.apellido"
          ></div>
        </fieldset>

        <!-- Correo (ocupa 2 columnas) -->
        <fieldset class="fieldset relative md:col-span-2">
          <legend class="fieldset-legend text-black">Correo</legend>
          <input
            v-model="form.email"
            :disabled="deshabilitado"
            type="email"
            class="input input-bordered w-full"
            placeholder="ejemplo@correo.com"
          />
          <div
            v-if="errores.email"
            class="tooltip tooltip-open tooltip-error absolute -top-0 transform -translate-x-1/2"
            :data-tip="errores.email"
            style="right: 20%"
          ></div>
        </fieldset>

        <!-- Género -->
        <fieldset class="fieldset relative">
          <legend class="fieldset-legend text-black">Género</legend>
          <select v-model="form.genero" class="select select-bordered w-full">
            <option disabled selected value="">Seleccione</option>
            <option value="1">Masculino</option>
            <option value="2">Femenino</option>
          </select>
          <div
            v-if="errores.genero"
            class="tooltip tooltip-open tooltip-error absolute -top-0 right-1/4 transform -translate-x-1/2"
            :data-tip="errores.genero"
          ></div>
        </fieldset>

        <!-- Teléfono -->
        <fieldset class="fieldset relative">
          <legend class="fieldset-legend text-black">
            Teléfono (opcional)
          </legend>
          <input
            v-model="form.telefono"
            type="tel"
            class="input input-bordered w-full"
            placeholder="+502 1234-5678"
          />
          <div
            v-if="errores.telefono"
            class="tooltip tooltip-open tooltip-error absolute -top-0 right-1/4 transform -translate-x-1/2"
            :data-tip="errores.telefono"
          ></div>
        </fieldset>

        <!-- Contraseña -->
        <fieldset class="fieldset relative">
          <legend class="fieldset-legend text-black">Contraseña</legend>
          <input
            v-model="form.password"
            type="password"
            class="input input-bordered w-full"
            placeholder="********"
          />
          <div
            v-if="errores.password"
            class="tooltip tooltip-open tooltip-error absolute -top-0 right-1/4 transform -translate-x-1/2"
            :data-tip="errores.password"
          ></div>
        </fieldset>

        <!-- Confirmar Contraseña -->
        <fieldset class="fieldset relative">
          <legend class="fieldset-legend text-black">
            Confirmar Contraseña
          </legend>
          <input
            v-model="form.confirmPassword"
            type="password"
            class="input input-bordered w-full"
            placeholder="********"
          />
          <div
            v-if="errores.confirmPassword"
            class="tooltip tooltip-open tooltip-error absolute -top-0 right-1/4 transform -translate-x-1/2"
            :data-tip="errores.confirmPassword"
          ></div>
        </fieldset>
      </div>

      <!-- Botón -->
      <button
        @click="handleSignUp"
        class="w-full mt-6 bg-primary text-white font-semibold py-3 px-4 rounded-lg shadow hover:bg-blue-800 transition"
      >
        Crear cuenta
      </button>

      <!-- Enlace a login -->
      <p class="text-sm text-gray-600 mt-4 text-center">
        ¿Ya tienes cuenta?
        <router-link
          to="/login"
          class="text-primary font-medium hover:underline"
        >
          Inicia sesión aquí
        </router-link>
      </p>
    </div>
    <GlobalLoading v-model:show="loading" @timeout="handleTimeout" />
  </section>
</template>
<script>
import { useDatosGoogleStore } from '../stores/store.js';
import { api } from '../axios.js';
import { mostrarAlertaGlobal } from '../components/contenedorDeAlertas.vue';
import {
  validarTextoSoloLetras,
  validarCorreo,
  validarCampoVacio,
  validarSimilaridadContrasena,
} from '../helper/validators.js';

export default {
  name: 'SignUp',
  data() {
    return {
      loading: false,
      form: {
        nombre: '',
        apellido: '',
        email: '',
        genero: 0,
        telefono: '',
        password: '',
        confirmPassword: '',
      },
      errores: {},
      deshabilitado: false,
    };
  },
  created() {
    const datosGoogleStore = useDatosGoogleStore();
    if (datosGoogleStore.correo) {
      this.form.email = datosGoogleStore.correo;
      this.deshabilitado = true;
    }
  },
  methods: {
    handleTimeout() {
      this.mostrarAlertaError('No se pudo realizar la solicitud');
    },
    mostrarAlertaError(mensaje) {
      mostrarAlertaGlobal(mensaje, 'error', 'sm', 'top-center', 300);
    },
    mostrarAlertaExito(mensaje) {
      mostrarAlertaGlobal(mensaje, 'success', 'sm', 'top-center', 300);
    },
    validarDatosSignUp() {
      this.errores = {};
      // Nombre
      if (!validarCampoVacio(this.form.genero)) {
        this.errores.genero = 'Género es obligatorio.';
      }
      if (!validarCampoVacio(this.form.nombre)) {
        this.errores.nombre = 'Nombre es obligatorio.';
      } else if (!validarTextoSoloLetras(this.form.nombre)) {
        this.errores.nombre = 'Solo letras y mínimo 2 caracteres.';
      }

      if (!validarCampoVacio(this.form.apellido)) {
        this.errores.apellido = 'apellido es obligatorio.';
      } else if (!validarTextoSoloLetras(this.form.apellido)) {
        this.errores.apellido = 'Solo letras y mínimo 2 caracteres.';
      }

      if (!validarCorreo(this.form.email)) {
        this.errores.email = 'Correo inválido.';
      }

      if (
        !validarSimilaridadContrasena(
          this.form.password,
          this.form.confirmPassword
        )
      ) {
        this.errores.confirmPassword = 'contraseñas no coinciden.';
      } else if (!validarCampoVacio(this.form.password)) {
        this.errores.password = 'Contraseña es obligatoria.';
      }

      if (Object.keys(this.errores).length > 0) {
        console.log('Errores de validación:', this.errores);
        return false;
      }
      return true;
    },
    async handleSignUp() {
      if (!this.validarDatosSignUp()) return;
      try {
        this.loading = true;
        const response = await api.v1.auth.SignUp({
          pNombre: this.form.nombre,
          pApellido: this.form.apellido,
          correo: this.form.email,
          genero: Number(this.form.genero),
          telefono: this.form.telefono,
          contrasenia: this.form.password,
          contraseniaConfirmada: this.form.confirmPassword,
        });
        if (response && response.status === 201) {
          this.mostrarAlertaExito(
            'Cuenta creada con éxito. Por favor, inicia sesión.'
          );
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem(
            'usuario',
            JSON.stringify(response.data.usuario)
          );
          this.$router.push('/');
          this.loading = false;
        } else {
          this.loading = false;
          this.mostrarAlertaError(
            response.data.error ||
              'Error al crear la cuenta. Inténtalo de nuevo.'
          );
        }
      } catch (error) {
        this.loading = false;
        console.error('Error en Sign Up:', error);
        const mensajeError =
          error.response?.data?.message ||
          'Error al crear la cuenta. Inténtalo de nuevo.';
        this.mostrarAlertaError(error.response.data.error || mensajeError);
      }
    },
  },
};
</script>
