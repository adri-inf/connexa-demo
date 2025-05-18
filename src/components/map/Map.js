/**
 * Componente de mapa. No debe estar en el lado del cliente. Cargar con:
 * {typeof window !== 'undefined' && (<Map />)}
 */
'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

function UpdateMapView ({ center, zoom }) {
  const map = useMap() // Devuelve instancia del mapa que lo contiene

  useEffect(() => {
    // Actualiza la vista del mapa cuando cambian las coordenadas o el zoom
    if (map) {
      map.setView(center, zoom, { animate: true })
    }
  }, [center, zoom, map])

  return null
}

export default function Map ({ lat, lon, radius = 0 }) {
  const [center, setCenter] = useState([lat, lon])
  const zoom = 8 // Puedes ajustarlo si lo necesitas
  const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/2776/2776067.png',
    iconSize: [48, 48]
  })

  useEffect(() => {
    // Cada vez que cambie selectedMunicipio, actualiza el centro
    setCenter([lat, lon])
  }, [lat, lon])

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '325px', width: '100%' }} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <UpdateMapView center={center} zoom={zoom} radius={radius} />
      <Marker position={center} icon={customIcon}>
        <Popup>
          Municipio seleccionado: {lat}, {lon}
        </Popup>
      </Marker>
      {/* Círculo con radio de 5km centrado en las coordenadas */}
      <Circle
        center={center}
        radius={radius} // Radio de 5 km en metros
        color='blue' // Color del borde del círculo
        fillColor='blue' // Color de relleno del círculo
        fillOpacity={0.2} // Opacidad del relleno
      />
    </MapContainer>
  )
}
