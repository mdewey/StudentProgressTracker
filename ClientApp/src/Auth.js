class Auth {
  userProfile

  login = () => {
    window.location = process.env.REACT_APP_LOGIN_URL
  }

  get token() {
    return localStorage.getItem('jwt')
  }

  handleAuthentication = jwt => {
    localStorage.setItem('jwt', jwt)

    window.location = '/'
  }

  logout = () => {
    localStorage.removeItem('jwt')

    window.location = '/'
  }

  get isAuthenticated() {
    const jwt = localStorage.getItem('jwt')

    return !!jwt
  }
}

const auth = new Auth()

export default auth
