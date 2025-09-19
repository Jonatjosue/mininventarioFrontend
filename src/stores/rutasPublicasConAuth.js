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
