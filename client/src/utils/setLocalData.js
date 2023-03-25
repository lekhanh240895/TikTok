export const setLocalData = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data))
}
