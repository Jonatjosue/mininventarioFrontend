function cargarRutasInicioPublicasConAuth() {
  return [
    {
      path: '/Inicio',
      name: 'Bienvenida',
      meta: {
        group: 'Inicio',
        title: 'Bienvenida',
        icon: 'Home',
        requiresAuth: true,
        allowed: true,
      },
    },
    {
      path: '/facturacionCliente',
      name: 'Ventas',
      meta: {
        group: 'Venta',
        title: 'Ventas',
        icon: 'Home',
        requiresAuth: true,
        allowed: true,
      },
    },
    {
      path: '/ActualizacionCliente',
      name: 'Actualizar Datos',
      meta: {
        group: 'Perfil',
        title: 'Perfil',
        icon: 'Home',
        requiresAuth: true,
        allowed: true,
      },
    },
    /*   {
      path: '/IngresoPedidos',
      name: 'Pedidos',
      meta: {
        group: 'Venta',
        title: 'Pedidos',
        icon: 'Home',
        requiresAuth: true,
        allowed: true,
      },
    },*/
  ];
}
export { cargarRutasInicioPublicasConAuth };
