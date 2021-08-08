export const Config = {
  currentUserToken: (localStorage.getItem('auth')) ? JSON.parse(<string>localStorage.getItem('auth')).token : null
}