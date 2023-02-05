import * as user from '../user'


describe('user handler',() => {
    it('should create a new user', async() =>{
        const req = {body:{username:'hello',password:'hi'}}

        //spy: is a mocked peice of funtionality which tells us
        //when some other piece of code interacted with it
        const res={json({token}){
            expect(token).toBeTruthy()
        }}
        

        await user.createNewUser(req,res,() => {})
    })
    //reads better
})