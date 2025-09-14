<template>
  <section
    class="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary to-pink text-white p-6"
  >
    <div
      class="bg-white p-10 rounded-2xl border-2 shadow-xl border-gray-200 w-full max-w-2xl"
    >
      <h1 class="text-4xl font-extrabold text-primary mb-6 text-center">
        Nueva Contraseña
      </h1>

      <fieldset class="fieldset relative mb-4">
        <legend class="fieldset-legend text-black">Nueva Contraseña</legend>
        <input
          v-model="form.password"
          type="password"
          class="input input-bordered w-full"
          placeholder="********"
        />
      </fieldset>

      <fieldset class="fieldset relative mb-4">
        <legend class="fieldset-legend text-black">Confirmar Contraseña</legend>
        <input
          v-model="form.confirmPassword"
          type="password"
          class="input input-bordered w-full"
          placeholder="********"
        />
      </fieldset>

      <button
        @click="guardarNuevaPassword"
        class="w-full mt-4 bg-primary text-white font-semibold py-3 px-4 rounded-lg shadow hover:bg-blue-800 transition"
      >
        Guardar Contraseña
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ReinicioContrasenia',
  data() {
    return {
      form: {
        password: '',
        confirmPassword: '',
      },
    };
  },
  mounted() {
    // Verificar si hay token de validación
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/SolicitudResetPassword');
    }
  },
  methods: {
    guardarNuevaPassword() {
      if (
        !this.form.password ||
        this.form.password !== this.form.confirmPassword
      ) {
        alert('Las contraseñas no coinciden');
        return;
      }

      const token = localStorage.getItem('token');

      // 🔹 Aquí llamas al backend con el token
      // POST /api/reset-password/change { password } (Authorization: Bearer token)
 

      // opcional: limpiar token
      localStorage.removeItem('token');

      alert('Contraseña actualizada con éxito');
      this.$router.push('/Login');
    },
  },
};
</script>
