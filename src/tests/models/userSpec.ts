import { UserStore } from '../../models/user'

const store = new UserStore()

describe('User Model', () => {
  beforeAll(async () => {
    await store.deleteAll()
  })

  it('should create a user', async () => {
    const result = await store.create({
      first_name: 'yousif',
      last_name: 'abozid',
      password: 'password',
    })
    expect(result.first_name).toEqual('yousif')
  })

  it('should update a user', async () => {
    const result = await store.update({
      id: 2,
      first_name: 'yousif',
      last_name: 'mohamed',
      password: 'password',
    })
    expect(result.last_name).toEqual('mohamed')
  })

  it('should return a list of users', async () => {
    const result = await store.index()
    expect(result.length).toEqual(1)
  })
  //
  it('should return the correct user', async () => {
    const result = await store.show(2)
    expect(result.first_name).toEqual('yousif')
  })

  it('should delete the user', async () => {
    await store.delete(2)
    const users = await store.index()
    expect(users.length).toEqual(0)
  })
})
