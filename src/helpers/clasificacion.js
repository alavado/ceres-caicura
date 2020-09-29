import { quantileRankSorted } from 'simple-statistics'
import skmeans from 'skmeans'

export const clasificarPeces = (datos, nClases, metodo) => {
  const datosClone = datos.slice()
  if (metodo === 'automatico') {
    const clases = skmeans(datosClone.map(d => d.largo), nClases, 'kmpp').idxs
    return datos.map((d, i) => ({
      ...d,
      clase: clases[i]
    }))
  }
  else {
    datosClone.sort((d1, d2) => d1.largo > d2.largo ? 1 : -1)
    return datosClone.map((d, i) => ({
      ...d,
      clase: Math.floor(i / (datosClone.length / nClases))
    }))
  }
}