class Auth {
  userProfile

  login = () => {
    window.location = process.env.REACT_APP_LOGIN_URL
  }

  get token() {
    return sessionStorage.getItem('jwt')
  }

  handleAuthentication = jwt => {
    sessionStorage.setItem('jwt', jwt)

    window.location = '/'
  }

  logout = () => {
    sessionStorage.removeItem('jwt')

    window.location = '/'
  }

  getHeader = () => {
    return {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
    }
  }

  get isAuthenticated() {
    const jwt = sessionStorage.getItem('jwt')

    return !!jwt
  }
}

const auth = new Auth()

export default auth
