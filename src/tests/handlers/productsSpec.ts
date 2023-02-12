import supertest from 'supertest'
import app from '../../index'
import { createJWTToken } from '../../utils/createToken'

const request = supertest(app)
const token: string = createJWTToken(1, 'Test', 'User')

describe('Product handlers: ', () => {
  it('should return a new product after it is created', () => {
    const data = {
      name: 'Test',
      price: 20.0,
    }
    request
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(201)
      .expect({
        id: 1,
        name: 'Test',
        price: '$20.00',
      })
  })

  it('create product should fail if name is not included in parameters', () => {
    const data = {
      name: 'Test',
      price: 20.0,
    }
    request
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(400)
      .expect({
        error: 'Error: Product name is required',
      })
  })

  it('should show all products', () => {
    request
      .get('/api/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({
        id: 1,
        name: 'Test',
        price: 20.0,
      })
  })

  it('should show a product given an id', () => {
    request
      .get('/api/products/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({
        id: 1,
        name: 'Test',
        price: 20.0,
      })
  })

  it('should have an update product endpoint', () => {
    const data = {
      name: 'Test edited',
      price: 30.0,
    }
    request
      .put('/api/products/1')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({
        id: 1,
        name: 'Test edited',
        price: 30.0,
      })
  })

  it('should delete a product given its id', () => {
    request
      .delete('/api/products/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(() => {
        request.get('/api/products').expect({})
      })
  })
})
