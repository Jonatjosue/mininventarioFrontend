<template>
  <div
    class="flex flex-col bg-gradiente-personal from-gray-100 to-gray-200 text-center"
  >
    <!-- Header con navegación -->
    <header
      class="bg-gray-800 backdrop-blur-2xl shadow-md rounded-b-lg mb-8 sticky top-0 z-20"
    >
      <div
        class="container px-4 py-3 flex flex-col md:flex-row justify-between items-center"
      >
        <div class="flex items-center flex-row">
          <img
            class="bg-white rounded-sm mr-2 size-8"
            src="../assets/icono-web.png"
            alt="img"
          />
          <div class="flex items-center flex-col mb-1 md:mb-0">
            <h1 class="text-2xl md:text-3xl font-extrabold text-primary">
              Mininventario
            </h1>
            <p class="text-sm text-gray-200">
              Sistema de gestión de inventarios
            </p>
          </div>
        </div>

        <nav class="flex flex-wrap mt-2 justify-center gap-2 md:gap-4">
          <button
            @click="activeTab = 'inicio'"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              activeTab === 'inicio'
                ? 'bg-secondary text-white'
                : 'text-gray-300 hover:bg-gray-100  hover:text-gray-800',
            ]"
          >
            Inicio
          </button>

          <button
            @click="activeTab = 'mision-vision'"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center',
              activeTab === 'mision-vision'
                ? 'bg-secondary text-white'
                : 'text-gray-300 hover:bg-gray-100  hover:text-gray-800',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Misión y Visión
          </button>

          <button
            @click="activeTab = 'contacto'"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center',
              activeTab === 'contacto'
                ? 'bg-secondary text-white'
                : 'text-gray-300 hover:bg-gray-100 hover:text-gray-800',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contacto
          </button>

          <div class="flex gap-2 mt-2 md:mt-0 md:ml-4">
            <button
              @click="Loguearse"
              class="bg-gray-200 hover:bg-gray-300 transition text-gray-800 px-4 py-2 rounded text-sm font-medium"
            >
              Iniciar Sesión
            </button>
            <button
              @click="$router.push('/signup')"
              class="bg-primary hover:bg-secondary-dark transition text-white px-4 py-2 rounded text-sm font-medium"
            >
              Registrarse
            </button>
          </div>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto">
      <div v-if="activeTab === 'inicio'" class="space-y-8">
        <div
          class="relative bg-white rounded-lg shadow-lg mb-8 mx-3 overflow-hidden"
        >
          <img
            class="w-full h-auto object-cover"
            style="height: 85dvh"
            src="../assets/fondoLibreria.png"
            alt="Fondo Librería"
          />
          <div
            class="absolute inset-0 flex flex-col items-center justify-start text-center p-6 bg-black/40"
          >
            <h1
              class="text-4xl md:text-5xl font-extrabold text-primary mt-16 mb-2"
            >
              SHALAH
            </h1>
            <h3 class="text-xl md:text-2xl text-gray-200">
              Donde el conocimiento florece y la creatividad encuentra su camino
            </h3>
            <button
            class="btn mt-3 btn-primary"
              data-tally-open="3jN0KY"
              data-tally-emoji-text="👋"
              data-tally-emoji-animation="wave"
              data-tally-auto-close="3000"
              data-tally-form-events-forwarding="1"
            >
              👋 Responder Cuestionario
            </button>
          </div>
        </div>

        <!-- Sección Quiénes Somos -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-md mx-3">
          <h2 class="text-3xl font-bold text-primary mb-6">¿Quiénes Somos?</h2>
          <p class="text-gray-200 text-lg mb-4 text-left">
            En <span class="font-semibold text-secondary">SHALAH</span>, creemos
            que cada página, cada idea y cada herramienta es una semilla que
            puede transformar vidas. Somos una
            <span class="font-semibold text-secondary">librería</span>, dedicada
            a inspirar a través de libros, útiles escolares, materiales para
            manualidades y mucho más.
          </p>
        </div>

        <!-- Sección de Servicios -->
        <div class="mx-3">
          <div class="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <h2 class="text-3xl font-bold text-primary mb-6">
              Ofrecemos variedad de servicios
            </h2>
            <p class="text-gray-300 mb-2">Entre ellos encontramos:</p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div
              class="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span class="text-sm font-medium">Libros</span>
              <p class="text-xs text-gray-400 mt-1">
                Amplia variedad de textos
              </p>
            </div>

            <div
              class="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z"
                />
              </svg>
              <span class="text-sm font-medium">Impresiones</span>
              <p class="text-xs text-gray-500 mt-1">Calidad profesional</p>
            </div>

            <div
              class="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              <span class="text-sm font-medium">Fotocopias</span>
              <p class="text-xs text-gray-500 mt-1">Rápidas y económicas</p>
            </div>

            <div
              class="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span class="text-sm font-medium">Manualidades</span>
              <p class="text-xs text-gray-500 mt-1">Materiales creativos</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenido de Misión y Visión -->
      <div
        v-if="activeTab === 'mision-vision'"
        class="relative mx-3 bg-[url('../assets/segundoFondo.png')] bg-cover bg-center bg-no-repeat p-6 rounded-lg shadow-md flex items-center justify-center"
        style="height: 80dvh"
      >
        <!-- Overlay oscuro -->
        <div class="absolute inset-0 bg-black/50 rounded-lg"></div>

        <!-- Contenedor del contenido -->
        <div
          class="relative z-10 bg-white/80 rounded-lg p-8 max-w-3xl w-full text-center shadow-lg"
        >
          <h2 class="text-4xl font-bold text-primary mb-6">Misión y Visión</h2>

          <div class="flex flex-col md:flex-row gap-6">
            <!-- Card Misión -->
            <div class="bg-white/90 p-6 rounded-lg shadow-md flex-1">
              <div class="flex items-center justify-center mb-4">
                <svg
                  class="h-10 w-10 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-primary mb-2">
                Nuestra Misión
              </h3>
              <p class="text-gray-700 text-left">
                Proveer útiles, libros y recursos de calidad que fortalezcan la
                educación, la creatividad y los valores, acercando a cada
                persona a un aprendizaje integral con principios inspirados en
                la Palabra.
              </p>
            </div>

            <!-- Card Visión -->
            <div class="bg-white/90 p-6 rounded-lg shadow-md flex-1">
              <div class="flex items-center justify-center mb-4">
                <svg
                  class="h-10 w-10 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-primary mb-2">
                Nuestra Visión
              </h3>
              <p class="text-gray-700 text-left">
                Ser la librería de referencia en la comunidad, reconocida por
                brindar productos que encienden la pasión por el estudio, el
                arte y el conocimiento, impactando de manera positiva
                generaciones futuras.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenido de Contacto -->
      <div
        v-if="activeTab === 'contacto'"
        class="max-w-2xl mx-auto bg-white p-6 rounded-lg border-2 shadow-md border-gray-200"
      >
        <h2 class="text-3xl font-bold text-primary mb-6">Contáctanos</h2>

        <form class="space-y-4 text-left">
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Nombre</label
            >
            <input
              type="text"
              id="name"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Correo electrónico</label
            >
            <input
              type="email"
              id="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label
              for="message"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Mensaje</label
            >
            <textarea
              id="message"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            ></textarea>
          </div>

          <button
            type="submit"
            class="bg-secondary hover:bg-secondary-dark transition text-white px-6 py-3 rounded-md font-medium"
          >
            Enviar mensaje
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-gray-200">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">
            Información de contacto
          </h3>
          <div class="space-y-2 text-gray-600">
            <p class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Dirección: [Ingresa tu dirección aquí]
            </p>
            <p class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Teléfono: [Ingresa tu teléfono aquí]
            </p>
            <p class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email: [Ingresa tu email aquí]
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-1 py-6 bg-gray-800">
      <div class="container mx-auto px-4">
        <p class="text-gray-600 text-sm">
          © {{ new Date().getFullYear() }} SHALAH. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'PaginaPrincipal',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const activeTab = ref('inicio');

    // Se ejecuta cuando el componente se monta
    onMounted(() => {
      const logueado = localStorage.getItem('token');
      if (logueado === null || logueado === undefined) {
        authStore.cargarRutasPublicas();
      }
    });

    // Método para iniciar sesión
    const Loguearse = () => {
      router.push('/login');
    };

    return {
      Loguearse,
      activeTab,
    };
  },
};
</script>

<style scoped>
/* Estilos personalizados si son necesarios */
</style>
