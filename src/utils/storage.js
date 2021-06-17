import { curry } from "ramda"

export const getFromLocalStorage = curry((key) => {
    const serialized = localStorage.getItem(key)
    const data = JSON.parse(serialized)
    return data
})

export const saveToLocalStorage = curry((key, payload) => {
    const serialized = JSON.stringify(payload)
    localStorage.setItem(key, serialized)
})