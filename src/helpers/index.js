import store from "store"

const IS_MARTIAN = "isMartian"

export const storeMartian = () => {
  store.set(IS_MARTIAN, true)
}

export const getMartian = () => {
  return store.get(IS_MARTIAN)
}

export const removeMartian = () => {
  store.remove(IS_MARTIAN)
}

export const getIdFromUrl = url => {
  return url.match(/\d+/)
}
