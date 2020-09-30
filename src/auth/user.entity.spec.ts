import { User } from "./user.entity"
import * as bcrypt from 'bcrypt'

describe('UserEntity', () => {
    let user: User

    beforeEach(() => {
        user = new User()
        user.password = 'testPassword'
        user.salt = 'testSalt'
        bcrypt.hash = jest.fn()
    })

    describe('validatePassword', () => {
        it('returns true as password is valid', async () => {
            bcrypt.hash.mockReturnValue('testPassword')
            expect(bcrypt.hash).not.toHaveBeenCalled()
            const result = await user.validatePassword('anyPassword')
            expect(bcrypt.hash).toHaveBeenCalledWith('anyPassword', 'testSalt')
            expect(result).toEqual(true)
        })
        it('returns false as password is invalid', async () => {
            bcrypt.hash.mockReturnValue('wrongPassword')
            expect(bcrypt.hash).not.toHaveBeenCalled()
            const result = await user.validatePassword('wrongPassword')
            expect(bcrypt.hash).toHaveBeenCalledWith('wrongPassword', 'testSalt')
            expect(result).toEqual(false)
        })
    })
})