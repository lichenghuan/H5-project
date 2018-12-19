const localStorage = window.localStorage;
const sessionStorage = window.sessionStorage;

const TIME_EXPIRED = 1   // 默认一天内有效
/**
 * 将系统中cookie、localstorage、sessionStorage給封装起来，合理分配使用
 * */
export const jCookie = {
  get(key) {
    let arr = document.cookie.split(';')
    for (let i = 0; i < arr.length; i++) {
      let arr2 = arr[i].trim().split('=');
      if (arr2[0] === key) {
        return arr2[1]
      }
    }
    return ''
  },
  setDefault(key, value) {
    this.set(key, value, TIME_EXPIRED)
  },
  set(key, value, day) {
    let setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (let i in setting) {
        let oDate = new Date()
        oDate.setDate(oDate.getDate() + day)
        document.cookie = i + '=' + setting[i] + ';expires=' + oDate + ';path=/'
      }
    } else {
      let oDate = new Date()
      oDate.setDate(oDate.getDate() + day)
      document.cookie = key + '=' + value + ';expires=' + oDate + ';path=/'
    }
  },
  remove(key) {
    let setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Array') {
      setting.forEach(key => {
        this.set(key, '', -1)
      })
    } else {
      this.set(key, '', -1)
    }

  }
}

export const jLocalStorage = {
  get(key) {
    if (key) return JSON.parse(localStorage.getItem(key))
    return null
  },
  set(key, val) {
    const setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (const i in setting) {
        localStorage.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      localStorage.setItem(key, JSON.stringify(val))
    }
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  }
}

export const jSession = {
  get(key) {
    if (key) return JSON.parse(sessionStorage.getItem(key))
    return null
  },
  set(key, val) {
    const setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (const i in setting) {
        sessionStorage.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      sessionStorage.setItem(key, JSON.stringify(val))
    }
  },
  remove(key) {
    sessionStorage.removeItem(key)
  },
  clear() {
    sessionStorage.clear()
  }
}
