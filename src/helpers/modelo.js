import { linearRegression } from 'simple-statistics'

export const calcularModelo = datos => {
  return linearRegression(datos)
}