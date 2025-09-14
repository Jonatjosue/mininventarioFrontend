<template>
  <div class="flex h-screen relative overflow-hidden">
    <!-- Fondo -->
    <div
      class="absolute inset-0 bg-gradiente-personal filter blur-xl scale-110 z-0"
      aria-hidden="true"
    ></div>

    <!-- Formulario -->
    <div
      class="relative z-10 w-full md:w-1/2 flex items-center justify-center p-8"
    >
      <div
        class="bg-white/90 backdrop-blur-md rounded-xl shadow-xl max-w-md w-full p-10"
      >
        <h1 class="text-4xl font-bold mb-3 text-primary">Bienvenido</h1>

        <div class="space-y-6">
          <!-- Email -->
          <div>
            <label class="label">
              <span class="label-text text-black">Correo electrónico</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="Ingresa tu correo"
              class="input input-bordered w-full"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="label">
              <span class="label-text text-black">Contraseña</span>
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="********"
              class="input input-bordered w-full"
            />
          </div>

          <!-- Código inicial para empleados -->
          <div v-if="accesoEmpleado">
            <label class="label">
              <span class="label-text text-black">Código de empleado</span>
            </label>
            <input
              v-model="codigoEmpleado"
              type="text"
              placeholder="Ingresa tu código"
              class="input input-bordered w-full"
            />
          </div>

          <!-- Botón normal -->
          <button @click="login" type="submit" class="btn btn-primary w-full">
            Iniciar sesión
          </button>

          <!-- Separador -->
          <div v-if="!accesoEmpleado" class="flex items-center my-4">
            <hr class="flex-grow border-gray-300" />
            <span class="mx-2 text-gray-400 text-sm">o</span>
            <hr class="flex-grow border-gray-300" />
          </div>

          <!-- Botón Google -->
          <div v-show="!accesoEmpleado" id="googleButton"></div>
        </div>

        <div class="text-center space-y-4 mt-6 text-sm">
          <p class="text-gray-700">
            ¿Aún no tienes cuenta?
            <router-link
              to="/signUp"
              :class="
                alertarDeSignUP
                  ? 'text-black font-bold blink-and-bigger bg-warning'
                  : 'link link-secondary'
              "
              >Regístrate aquí</router-link
            >
          </p>

          <!-- Dropdown de más opciones -->
          <button
            class="btn btn-outline text-black text-xs"
            @click="modalAbierto = true"
          >
            Mas Opciones
          </button>
          <Modal
            v-model:abierto="modalAbierto"
            :titulo="'Mas opciones'"
            :botones="botonesModal"
            orientacion="vertical"
            @accion="handleAccion"
          >
            <template #contenido>
              <p class="text-gray-600 text-sm mb-2"></p>
            </template>
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '../components/modal.vue';
import { mostrarAlertaGlobal } from '../components/contenedorDeAlertas.vue';
import { api } from '../axios.js';
import { validarCorreo, validarCampoVacio } from '../helper/validators.js';
import { useDatosGoogleStore } from '../stores/store.js';
import { useAuthStore } from '../stores/auth.js';
export default {
  name: 'paginaPrincipal',
  components: {
    Modal,
  },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  data() {
    return {
      modalAbierto: false,
      email: '',
      password: '',
      codigoEmpleado: '',
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      dropdownAbierto: false,
      accesoEmpleado: false, // indica si se activó acceso empleado
      botonesModal: [],
      esLgoinGoogle: false,
      tokenGoogle: null,
      alertarDeSignUP: false,
    };
  },
  mounted() {
    this.renderizarBotonGoogle();
  },
  created() {
    // Verifica si el usuario ya está logueado
    if (localStorage.getItem('usuario')) {
      this.$router.push('/Inicio');
    }
    this.cargarBotonesModal();
  },
  methods: {
    cargarBotonesModal() {
      this.botonesModal = [
        {
          texto: 'Ir al inicio',
          color: 'bg-secondary',
          mostrar: true,
          botonEjectuado: 'inicio',
          hoverColor: 'hover:bg-yellow-600',
          textColor: 'text-white',
          icon: null,
          size: 'base',
          fullWidth: true,
          accion: () => null,
        },
        {
          texto: 'Restablecer contraseña',
          botonEjectuado: 'restablecer',
          color: 'bg-gray-200', // gris neutro
          mostrar: true,
          hoverColor: 'hover:bg-gray-400',
          textColor: 'text-gray-800', // texto más oscuro pero menos llamativo
          icon: null,
          size: 'base',
          fullWidth: true,
          accion: () => null,
        },
        {
          texto: 'Acceder como empleado',
          botonEjectuado: 'empleado',
          color: 'bg-gray-200',
          mostrar: !this.accesoEmpleado,
          hoverColor: 'hover:bg-gray-400',
          textColor: 'text-gray-800',
          icon: null,
          size: 'base',
          fullWidth: true,
          accion: () => null,
        },
        {
          texto: 'Acceder como Cliente',
          botonEjectuado: 'cliente',
          color: 'bg-gray-200',
          mostrar: this.accesoEmpleado,
          hoverColor: 'hover:bg-gray-400',
          textColor: 'text-gray-800',
          icon: null,
          size: 'base',
          fullWidth: true,
          accion: () => null,
        },
      ];
    },
    handleAccion(btn) {
      console.log('Botón presionado:', btn.texto);
      if (btn.botonEjectuado === 'inicio') {
        this.$router.push('/');
      } else if (btn.botonEjectuado === 'restablecer') {
        this.$router.push('/solicitudResetPassword');
      } else if (btn.botonEjectuado === 'empleado') {
        this.activarAccesoEmpleado();
      } else if (btn.botonEjectuado === 'cliente') {
        this.activarAccesoEmpleado();
      }
    },
    renderizarBotonGoogle() {
      window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleButton'),
        { theme: 'outline', size: 'large', width: '100%' }
      );
    },
    activarAccesoEmpleado() {
      this.accesoEmpleado = !this.accesoEmpleado;
      this.dropdownAbierto = !this.dropdownAbierto;
      this.cargarBotonesModal();
    },
    mostrarAlerta(mensaje) {
      mostrarAlertaGlobal(mensaje, 'error', 'sm', 'top-center', 300);
    },
    mostrarAlertaExito(mensaje) {
      mostrarAlertaGlobal(mensaje, 'success', 'sm', 'top-center', 300);
    },
    login() {
      if (!validarCampoVacio(this.email)) {
        this.mostrarAlerta('Ingresa tu correo electrónico.');
        return;
      }
      if (!validarCampoVacio(this.password)) {
        this.mostrarAlerta('Ingresa tu contraseña.');
        return;
      }
      if (
        this.accesoEmpleado &&
        (this.codigoEmpleado === null || this.codigoEmpleado === '')
      ) {
        this.mostrarAlerta(
          'Ingresa el código de empleado para acceder como empleado.'
        );
        return;
      }
      this.realizarLogin(
        this.email,
        this.password,
        this.accesoEmpleado ? this.codigoEmpleado : null
      );
    },
    guardarCorreoGoogle(response) {
      const datosGoogleStore = useDatosGoogleStore();
      datosGoogleStore.setCorreo(response.data.correo);
    },
    async realizarLogin(email, password, codigoEmpleado = null) {
      try {
        const response = await api.v1.auth.login({
          correo: email,
          password,
          codigoUsuario: codigoEmpleado,
          esEmpleado: this.accesoEmpleado,
          esLoginGoogle: this.esLgoinGoogle,
          tokenGoogle: this.tokenGoogle,
        });
        if (response.data.googleSignUp) {
          this.mostrarAlerta(
            'Parece que es tu primer inicio de sesión con Google. Por favor, regístrate primero.'
          );
          this.guardarCorreoGoogle(response);
          this.$router.push('/signUp');
          return;
        }
        if (response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem(
            'usuario',
            JSON.stringify(response.data.usuario)
          );

          this.$router.push('/inicio');
          await this.authStore.cargarRutasProtegidasAutenticadas();
          this.mostrarAlertaExito('Credenciales correctas.');
        } else {
          const mensajeError =
            response.data.mensaje || 'Credenciales Incorrectas.';
          if (response.data.clienteSignUp) {
            this.mostrarSignUp();
          }
          this.mostrarAlerta(mensajeError);
        }
      } catch (error) {
        this.mostrarAlerta('Error al iniciar sesión. Inténtalo de nuevo.');
      }
    },
    mostrarSignUp() {
      this.alertarDeSignUP = true;
      setTimeout(() => {
        this.alertarDeSignUP = false;
      }, 1000);
      this.alertarDeSignUP = true;
      setTimeout(() => {
        this.alertarDeSignUP = false;
      }, 1000);
    },
    async solicitudarPagindaDefault() {
      try {
        const response = await api.cargaInicial.paginasDefault();
        if (response.data && response.data.length > 0) {
          this.$store.commit('setPaginasDefault', response.data);
        } else {
          console.warn('No se encontraron páginas por defecto.');
        }
      } catch (error) {
        console.error('Error al cargar las páginas por defecto:', error);
      }
    },
    handleCredentialResponse(response) {
      this.esLgoinGoogle = response.credential ? true : false;
      this.tokenGoogle = response.credential;
      this.realizarLogin(
        this.email,
        this.password,
        this.accesoEmpleado ? this.codigoEmpleado : null
      );
    },
  },
};
</script>
<style scoped>
.blink-and-bigger {
  animation: blink 0.5s infinite;
  font-weight: bold;
  font-size: 1em;
  color: black;
}
</style>
