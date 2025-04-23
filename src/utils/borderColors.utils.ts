export function getBorderColor(colorApp: string) {
  // Devuelve el color de borde basado en el valor de colorApp
  return colorApp === 'amber' ? '#F59E0B' :
         colorApp === 'emerald' ? '#059669' :
         colorApp; // Devuelve colorApp si no coincide con 'amber' o 'emerald'
}
