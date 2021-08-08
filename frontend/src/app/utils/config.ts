export const Config = {
  currentUserToken: JSON.parse(<string>localStorage.getItem('auth')).token || null
}