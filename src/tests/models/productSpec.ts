import { ProductStore } from '../../models/product'

const store = new ProductStore()

describe('Product Model', () => {
  beforeAll(async () => {
    await store.deleteAll()
  })

  it('should create a product', async () => {
    const result = await store.create({
      name: 'Test product',
      price: 20.0,
    })
    expect(result).toEqual({
      id: 2,
      name: 'Test product',
      price: 20.0,
    })
  })

  it('should update a product', async () => {
    const result = await store.update({
      id: 2,
      name: 'Test product',
      price: 30.0,
    })
    expect(result).toEqual({
      id: 2,
      name: 'Test product',
      price: 30.0,
    })
  })

  it('should return a list of products', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: 2,
        name: 'Test product',
        price: 30.0,
      },
    ])
  })

  it('should return the correct product', async () => {
    const result = await store.show(2)
    expect(result).toEqual({
      id: 2,
      name: 'Test product',
      price: 30.0,
    })
  })

  it('should delete the product', async () => {
    await store.delete(2)
    const result = await store.index()
    expect(result).toEqual([])
  })
})
