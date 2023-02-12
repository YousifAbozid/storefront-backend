import { OrderStore } from '../../models/order'
import { ProductStore } from '../../models/product'
import { UserStore } from '../../models/user'

const orderStore = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()
let productId: number, userId: number

describe('Order Model', () => {
  beforeAll(async () => {
    const product = await productStore.create({
      name: 'good product',
      price: 20.0,
    })
    productId = product.id as number
    const user = await userStore.create({
      first_name: 'yousif',
      last_name: 'abozid',
      password: 'password',
    })
    userId = user.id as number
  })

  afterAll(async () => {
    await productStore.delete(productId)
    await userStore.delete(userId)
  })

  it('should create an order', async () => {
    const result = await orderStore.create({
      user_id: userId,
      status: 'new',
    })
    expect(result).toEqual({
      id: 1,
      user_id: userId,
      status: 'new',
    })
  })

  it('should return a list of orders', async () => {
    const result = await orderStore.index()
    expect(result).toEqual([
      {
        id: 1,
        user_id: userId,
        status: 'new',
      },
    ])
  })

  it('should return the correct order', async () => {
    const result = await orderStore.show(1)
    expect(result).toEqual({
      id: 1,
      user_id: userId,
      status: 'new',
    })
  })

  it('should update order status', async () => {
    const result = await orderStore.update({
      id: 1,
      user_id: userId,
      status: 'used',
    })
    expect(result).toEqual({
      id: 1,
      user_id: userId,
      status: 'used',
    })
  })

  it('should delete the order', async () => {
    await orderStore.delete(1)
    const result = await orderStore.index()
    expect(result).toEqual([])
  })
})
