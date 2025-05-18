/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  async redirects () {
    return [
      {
        source: '/', // Ruta de origen
        destination: '/home', // Ruta de destino
        permanent: true // Usa "true" si es una redirección permanente (301)
      },

      {
        source: '/home', // Ruta de origen
        destination: '/home/descubre-connexa', // Ruta de destino
        permanent: true // Usa "true" si es una redirección permanente (301)
      },

      {
        source: '/app', // Ruta de origen
        destination: '/app/platform', // Ruta de destino
        permanent: true // Usa "true" si es una redirección permanente (301)
      },

      {
        source: '/app/platform', // Ruta de origen
        destination: '/app/platform/profile', // Ruta de destino
        permanent: true // Usa "true" si es una redirección permanente (301)
      }
    ]
  }
}
export default nextConfig
