/*
var supertest = require("supertest");
var should = require("should");
// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3001");
describe("registration check",function () {
    var id = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MTljY2Q0NTA4Y2Q5MGI1MDU0ZTgyYiIdXWnT0G79QI";
    it('registering to new account',function (done) {
        var userDetails={
            email:'erangadulshan10@gmail.com',
            name:'eranga',
            telNo:'0915622006',
            userName:'era',
            password:'1994',
            password2:'1994'
        }
        server.post("/api/buyerRegistration")
            .send({userDetails})
            .expect(500)
            .end(function (err,res) {
                console.log(err);
                res.status.should.equal(500);
                //res.errors.email.should.equal('Email exists');
                done();
            })
    })
})*/
