export const getTime = (res) => {
    var data = new Date(res)
    var Y = data.getFullYear()
    var M = data.getMonth() + 1
    var D = data.getDate()
    var H = data.getHours()
    var m = data.getMinutes()
    var s = data.getSeconds()
    if (M < 10) {
        M = '0' + M
    }
    if (D < 10) {
        D = '0' + D
    }
    if (H < 10) {
        H = '0' + H
    }
    if (m < 10) {
        m = '0' + m
    }
    if (s < 10) {
        s = '0' + s
    }
    if (res) {
        return `${Y}-${M}-${D} ${H}:${m}:${s}`
    }
    
}