function cargarRutasInicioPublicas() {
  return [
    {
      path: '/',
      name: 'Inicio',
      meta: {
        group: 'General',
        title: 'Inicio',
        icon: 'HomeIcon',
        requiresAuth: false,
        allowed: true,
      },
    },
    {
      path: '/Login',
      name: 'Log In',
      meta: {
        group: 'General',
        title: 'Iniciar Sesión',
        icon: 'LogInIcon',
        requiresAuth: false,
        allowed: true,
      },
    },
    {
      path: '/SignUp',
      name: 'Sign Up',
      meta: {
        group: 'General',
        title: 'Registro',
        icon: 'UserPlusaIcon',
        requiresAuth: false,
        allowed: true,
      },
    },
    {
      path: '/SolicitudResetPassword',
      name: 'Reinicio de Contraseña',
      meta: {
        group: 'General',
        title: 'Reiniciar Contraseña',
        icon: 'KeyIcon',
        requiresAuth: false,
        allowed: true,
      },
    },
  ];
}
export { cargarRutasInicioPublicas };
