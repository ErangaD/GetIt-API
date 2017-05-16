var supertest = require("supertest");
var should = require("should");
// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3001");

/*describe("Admin Report Test",function(){

    // #1 should return home page
    var id=null;
    it("should return a 200 after adding the reply",function(done){
        // calling posts api
        data={id:'456123',reply:'Will see to your complaint!'};
        server
            .post("/api/admin/addReply")
            .send({data,token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MTljY2Q0NTA4Y2Q5MGI1MDU0ZTgyYiIsInVzZXJOYW1lIjoiRXJhbmdhIiwiaWF0IjoxNDk0ODc4NDgwLCJleHAiOjE0OTQ4ODkyODB9.YTtl6i4sh-W4nvJaX9L3hf-BfH1w6m5vcEhy3AKOdes"})
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                done();
            });
    });

});*/