import { average, linearRegression, max } from 'simple-statistics'

export const calcularModelo = datos => {
  return linearRegression(datos)
}

export const calcularModeloPromediado = (datos, fechas) => {
  const clases = Array.from(new Set(datos.map(d => d.clase)))
  const modelos = clases.map(clase => {
    const datosClase = datos.filter(d => d.clase === clase)
    const maximoClase = max(datosClase.map(d => d.peso))
    const datosRegresion = [
      ...datosClase.map(d => [d.fecha.unix(), d.peso]),
      ...Array(Math.round(datosClase.length / 2)).fill([fechas[0].unix(), maximoClase]),
      ...Array(Math.round(datosClase.length / 2)).fill([fechas[0].unix() + 24 * 60 * 60 * 70, maximoClase * .25])
    ]
    return calcularModelo(datosRegresion.map(([x, y]) => [x, Math.log(y)]))
  })
  return { m: average(modelos.map(m => m.m)), b: average(modelos.map(m => m.b)) }
}