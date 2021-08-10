const timeConverter = (time) =>{
    const userLanguage = window.navigator.language ||
    window.navigator.systemLanguage ||
    window.navigator.userLanguage

    const now = new Date()
    const nowTimestamp = Date.parse(now)
    const nowDay = now.getUTCDay()

    const msgTimestamp = Date.parse(time)
    const msgDay = new Date(time).getUTCDay()
    const msgLocal = new Date(time)

    const msgLocalDate = msgLocal.toLocaleDateString(userLanguage, { year: 'numeric', month: 'short', day: 'numeric' })
    const msgLocalHours = msgLocal.getHours()
    const msgLocalMinutes = msgLocal.getMinutes()

    const timeDiff = msgTimestamp - nowTimestamp
  
    return timeDiff < 1000 * 60 * 60 * 24 && nowDay === msgDay
    ? `${msgLocalHours}:${msgLocalMinutes} `
    : `${msgLocalHours}:${msgLocalMinutes} ${msgLocalDate}`
  }

export default timeConverter
