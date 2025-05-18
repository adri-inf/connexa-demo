/**
 * Archivo para juntar todos los middleware.
*/
import { NextResponse } from 'next/server'
// import handleSearchRedirect from './middleware/handleSearchRedirect.js'

export async function middleware (req) {
  // const redirectSearchResponse = handleSearchRedirect(req)
  // // Si se devuelve alguna redirección, se lleva a cabo
  // if (redirectSearchResponse) {
  //   return redirectSearchResponse
  // }

  // const redirectAuthResponse = handleAuthRedirect(req)
  // // Si se devuelve alguna redirección, se lleva a cabo
  // if (redirectAuthResponse) {
  //   return redirectAuthResponse
  // }

  // const redirectAppResponse = handleAppRedirect(req)
  // // Si se devuelve alguna redirección, se lleva a cabo
  // if (redirectAppResponse) {
  //   return redirectAppResponse
  // }

  // const redirectResponse = handleRedirects(req)
  // // Si se devuelve alguna redirección, se lleva a cabo
  // if (redirectResponse) {
  //   return redirectResponse
  // }

  // Si no, el flujo continúa
  return NextResponse.next()
}
