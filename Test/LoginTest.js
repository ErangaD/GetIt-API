var supertest = require("supertest");
var should = require("should");
// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3001");

describe("Login check",function(){

    // #1 should return home page
    var id=null;
    it("Login to the account",function(done){

        // calling home page api
        var user={
            userName:'rtanga',
            password:'1994'
        }
        server
            .post("/api/authentication")
            .send({user})
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                //console.log(res);
                done();
            });
    });

});