/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export const parseTime = (time, cFormat) => {
  if (cFormat.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export const getOS = () => {
  const sUserAgent = navigator.userAgent
  const isWin = (navigator.platform === 'Win32') || (navigator.platform === 'Windows')
  const isMac = (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC') || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel')
  if (isMac) return 'Mac'
  const isUnix = (navigator.platform === 'X11') && !isWin && !isMac
  if (isUnix) return 'Unix'
  const isLinux = (String(navigator.platform).indexOf('Linux') > -1)
  if (isLinux) return 'Linux'
  if (isWin) {
    const isWin2K = sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1
    if (isWin2K) return 'Windows 2000'
    const isWinXP = sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1
    if (isWinXP) return 'Windows XP'
    const isWin2003 = sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1
    if (isWin2003) return 'Windows 2003'
    const isWinVista = sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1
    if (isWinVista) return 'Windows Vista'
    const isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1
    if (isWin7) return 'Windows 7'
    const isWin10 = sUserAgent.indexOf('Windows NT 10') > -1 || sUserAgent.indexOf('Windows 10') > -1
    if (isWin10) return 'Windows 10'
  }
  return 'other'
}

export const getBrowserInfo = () => {
  const agent = navigator.userAgent
  const arr = []
  const system = getOS()
  arr.push(system)
  const regStr_edge = /Edge\/[\d.]+/gi
  const regStr_ie = /Trident\/[\d.]+/gi
  const regStr_ff = /Firefox\/[\d.]+/gi
  const regStr_chrome = /Chrome\/[\d.]+/gi
  const regStr_saf = /Safari\/[\d.]+/gi
  const regStr_opera = /Opr\/[\d.]+/gi
  // IE
  if (agent.indexOf('Trident') > 0) {
    arr.push(agent.match(regStr_ie)[0].split('/')[0])
    arr.push(agent.match(regStr_ie)[0].split('/')[1])
    return arr
  }
  // Edge
  if (agent.indexOf('Edge') > 0) {
    arr.push(agent.match(regStr_edge)[0].split('/')[0])
    arr.push(agent.match(regStr_edge)[0].split('/')[1])
    return arr
  }
  // firefox
  if (agent.indexOf('Firefox') > 0) {
    arr.push(agent.match(regStr_ff)[0].split('/')[0])
    arr.push(agent.match(regStr_ff)[0].split('/')[1])
    return arr
  }
  // Opera
  if (agent.indexOf('Opr') > 0) {
    arr.push(agent.match(regStr_opera)[0].split('/')[0])
    arr.push(agent.match(regStr_opera)[0].split('/')[1])
    return arr
  }
  // Safari
  if (agent.indexOf('Safari') > 0 && agent.indexOf('Chrome') < 0) {
    arr.push(agent.match(regStr_saf)[0].split('/')[0])
    arr.push(agent.match(regStr_saf)[0].split('/')[1])
    return arr
  }
  // Chrome
  if (agent.indexOf('Chrome') > 0) {
    arr.push(agent.match(regStr_chrome)[0].split('/')[0])
    arr.push(agent.match(regStr_chrome)[0].split('/')[1])
    return arr
  } else {
    arr.push('请更换主流浏览器，例如chrome,firefox,opera,safari,IE,Edge!')
    arr.push('请更换主流浏览器，例如chrome,firefox,opera,safari,IE,Edge!')
    return arr
  }
}
