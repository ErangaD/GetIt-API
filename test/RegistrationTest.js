var supertest = require("supertest");
var should = require("should");
// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3001");
describe("registration check",function () {
    var id = localStorage.jwtToken;
    it('registering to new account',function (done) {
        var userDetails={
            email:'erangadulshan10@gmail.com',
            name:'eranga',
            telNo:'0915622006',
            userName:'erangaD',
            password:'1994',
            password2:'1994'
        }
        server.post("/api/buyerRegistration")
            .send({userDetails})
            .expect(200)
            .end(function (err,res) {
                res.status.should.equal(200);
                res.errors.email.should.equal('Email exists');
                done();
            })
    })
})