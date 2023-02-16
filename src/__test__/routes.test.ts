//integration test will test how the route works by actually making a request like a client

import app from "../server";
import supertest from "supertest";


describe('GET/',() =>{

    //it can be async
    it('should send back some data', async() =>{
        const res = await supertest(app)

        // we are doing get request
        .get('/')

        expect(res.body.message).toBe('hello')
    })

})