<template>
  <section
    class="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-primary to-pink text-white p-6"
  >
    <!-- 🔹 Botón de retroceso fuera de la card -->
    <button
      @click="$router.push('/')"
      class="absolute top-6 left-6 bg-white text-primary font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-200 transition"
    >
      ← Volver
    </button>

    <div
      class="bg-white p-10 rounded-2xl border-2 shadow-xl border-gray-200 w-full max-w-3xl"
    >
      <h1 class="text-4xl font-extrabold text-primary mb-6 text-center">
        Restablecer Contraseña
      </h1>

      <!-- Paso 1: correo + respuesta -->
      <div v-if="paso === 1" class="grid gap-4">
        <fieldset class="fieldset relative">
          <legend class="fieldset-legend text-black">Correo</legend>
          <input
            v-model="form.email"
            type="email"
            class="input input-bordered w-full"
            placeholder="ejemplo@correo.com"
          />
        </fieldset>

        <fieldset class="fieldset relative">
          <legend class="fieldset-legend text-black">Pregunta de seguridad</legend>
          <select v-model="form.pregunta" class="select select-bordered w-full">
            <option disabled value="">Seleccione una pregunta</option>
            <option>¿Nombre de tu primera mascota?</option>
            <option>¿Ciudad donde naciste?</option>
            <option>¿Comida favorita?</option>
          </select>
        </fieldset>

        <fieldset class="fieldset relative">
          <legend class="fieldset-legend text-black">Respuesta</legend>
          <input
            v-model="form.respuesta"
            type="text"
            class="input input-bordered w-full"
            placeholder="Tu respuesta"
          />
        </fieldset>

        <button
          @click="enviarCodigo"
          class="w-full mt-4 bg-primary text-white font-semibold py-3 px-4 rounded-lg shadow hover:bg-blue-800 transition"
        >
          Enviar código al correo
        </button>
      </div>

      <!-- Paso 2: ingresar código -->
      <div v-else-if="paso === 2" class="grid gap-4">
        <p class="text-gray-700 text-center">
          Hemos enviado un código de validación a tu correo
        </p>

        <fieldset class="fieldset relative">
          <legend class="fieldset-legend text-black">Código de validación</legend>
          <input
            v-model="form.codigo"
            type="text"
            class="input input-bordered w-full"
            placeholder="Ingresa el código recibido"
          />
        </fieldset>

        <div class="flex gap-4">
          <!-- Botón de retroceso interno -->
          <button
            @click="retroceder"
            class="flex-1 bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg shadow hover:bg-gray-500 transition"
          >
            ← Regresar
          </button>

          <!-- Botón de validar -->
          <button
            @click="validarCodigo"
            class="flex-1 bg-primary text-white font-semibold py-3 px-4 rounded-lg shadow hover:bg-blue-800 transition"
          >
            Validar Código
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SolicitudResetPassword",
  data() {
    return {
      paso: 1,
      form: {
        email: "",
        pregunta: "",
        respuesta: "",
        codigo: "",
      },
    };
  },
  methods: {
    enviarCodigo() {
      if (!this.form.email || !this.form.respuesta) {
        alert("Debes llenar el correo y la respuesta");
        return;
      }
      console.log("Enviando solicitud:", this.form);
      this.paso = 2;
    },
    validarCodigo() {
      if (!this.form.codigo) {
        alert("Ingresa el código recibido");
        return;
      }
      console.log("Validando código:", this.form.codigo);
      localStorage.setItem("token", "fake-jwt-token");
      this.$router.push("/NuevaContrasenia");
    },
    retroceder() {
      this.paso = 1;
      this.form.codigo = "";
    },
  },
};
</script>
