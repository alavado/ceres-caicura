import moment from 'moment'

export const fechaInicial = moment('2020-06-27')

export const generarFechasMoment = (dias = 365) => {
  const fechas = [fechaInicial.clone()]
  for (let i = 1; i <= dias; i++) {
    const fecha = fechaInicial.clone().add(i, 'days');
    fechas.push(fecha)
  }
  return fechas
}