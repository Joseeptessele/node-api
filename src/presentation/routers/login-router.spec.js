class LoginRouter {
  route(httpRequest) {
    if(!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError();
    }
    const { email, password } = httpRequest.body
    if(!email) {
      return HttpResponse.badRequest('email');
    }
    if(!password){
      return HttpResponse.badRequest('password');
    }
  }
}

class HttpResponse {
  static badRequest(paramName){
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }
  static serverError(){
    return {
      statusCode: 500
    }
  }
}

class MissingParamError extends Error {
  constructor(paramName){
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

describe('', ()=>{
  test('Should return 400 if no email is provieded', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})

describe('', ()=>{
  test('Should return 400 if no password is provieded', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'any_email@gmail.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
})

describe('', ()=>{
  test('Should return 500 if no httpRequest is provided', () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })
})


describe('', ()=>{
  test('Should return 500 if no httpRequest has no body', () => {
    const sut = new LoginRouter()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})