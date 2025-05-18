/**
 * El servicio de search gestiona las peticiones al backend relacionadas con la búsqueda de usuarios helpers
 */
export const searchService = {

  async searchHelpers (page, limit, favorites, fullName, locations, compatibility) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      status: 200,
      data: {
        users: [
          {
            id: 'bdcaf3e1-e8be-45d1-8220-5e3bc4515dd6',
            profilePicture: '3.webp',
            firstName: 'Pedro',
            lastName: 'García',
            form: {
              location: 'Ciudad Real'
            },
            total_compatibility_percentage: 82.95301779188851,
            favorite: false
          },
          {
            id: 'ea954720-8fbf-4e97-ab9a-54446558be34',
            profilePicture: '6.webp',
            firstName: 'Laura',
            lastName: 'Martínez',
            form: {
              location: 'Olmedilla de Alarcón'
            },
            total_compatibility_percentage: 75.4862245042034,
            favorite: false
          },
          {
            id: '08ea4d88-c20c-4983-91c6-488ac74fc59a',
            profilePicture: '9.webp',
            firstName: 'Fernando',
            lastName: 'López',
            form: {
              location: 'Laguna del Marquesado'
            },
            total_compatibility_percentage: 65.97635252555864,
            favorite: false
          },
          {
            id: '62f3836d-8036-434e-b080-ae185f461ed0',
            profilePicture: '10.webp',
            firstName: 'Alba',
            lastName: 'González',
            form: {
              location: 'Moya'
            },
            total_compatibility_percentage: 50.90537483967977,
            favorite: false
          },
          {
            id: 'c90765af-961a-49bf-8c71-f2efbb14708d',
            profilePicture: '1.webp',
            firstName: 'Alejandro',
            lastName: 'Sánchez',
            form: {
              location: 'Montealegre del Castillo'
            },
            total_compatibility_percentage: 30.861351155317,
            favorite: false
          },
          {
            id: 'bc501ad4-0502-4af3-ab90-24cabf85081a',
            profilePicture: '11.webp',
            firstName: 'Javier',
            lastName: 'Moreno',
            form: {
              location: 'Alcázar de San Juan'
            },
            total_compatibility_percentage: 0.83845957510816,
            favorite: false
          }
        ],
        totalPages: 200,
        totalCount: 5998,
        page: '1'
      }
    }
  }

}
