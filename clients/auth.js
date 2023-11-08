import jwt from 'jsonwebtoken'
import cookie from 'cookie'
const AUTH_KEY = 'ap-wallet'

export default secret => ({
  sign(data, config, res) {
    const payload = jwt.sign({ ...data }, secret)

    const cookieData = cookie.serialize(AUTH_KEY, payload, {
      httpOnly: true,
      maxAge: (60 * 60 * 24 * 7) * 52,
      path: '/',
      secure: config.USE_SECURE_COOKIE == '1'
    })
    
    res.header('Set-Cookie', cookieData)

    return payload
  },
  decode(token){
    return jwt.verify(token, secret)
  },
  getToken(request) {
    const parsed = cookie.parse(request.headers.cookie || '')
    return parsed[AUTH_KEY] || null
  },
  verify(token, cb, err) {
    try {
      const payload = jwt.verify(token, secret)
      cb(payload)
    } catch(e) {
      err(e)
    }
  },
  isValid(request) {
    const token = this.getToken(request)
    
    if (!token) {
      return
    }

    try {
      jwt.verify(token, secret)
      return true
    } catch(e) {
      return false
    }
  },
  validate(request) {
    const token = this.getToken(request)
    
    if (!token) {
      Object.assign(request, {
        user: {
          address: null,
          hasAccess: false
        }
      })
      return
    }

    try {
      const payload = jwt.verify(token, secret)
      
      Object.assign(request, {
        user: payload
      })
    } catch(e) {
      console.error(e.message)
      Object.assign(request, {
        user: {
          address: null,
          hasAccess: false
        }
      })
    }
  },
  destroy(res) {
    const cookieData = cookie.serialize(AUTH_KEY, '', {
      maxAge: 0,
      expires: new Date(),
      path: '/',
      secure: true
    })

    res.header('Set-Cookie', cookieData)
  }
})