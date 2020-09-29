import moment from 'moment'

export const fechaInicial = moment('2020-06-27')

export const generarFechasMoment = (dias = 365) => {
  const fechas = [fechaInicial.clone()]
  for (let i = 0; i < dias; i++) {
    fechaInicial.add(1, 'day');
    fechas.push(fechaInicial.clone())
  }
  return fechas
}