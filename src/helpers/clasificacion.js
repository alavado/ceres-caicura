import skmeans from 'skmeans'

export const clasificarPeces = (datos, nClases) => {
  const datosClone = datos.slice()
  const clases = skmeans(datosClone.map(d => d.largo), nClases, 'kmpp').idxs
  return datos.map((d, i) => ({
    ...d,
    clase: clases[i]
  }))
}