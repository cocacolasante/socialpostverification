const {ethers} = require("hardhat")
const {expect} = require("chai")
const request = require('supertest');

const GETProfile = require("../src/app/api/v1/getProfile/route.js")

describe("Api V1", ()=>{
    it("checks the get profile api route", async () =>{
        const address = ethers.utils.getAddress("0x11273F391609BF4C05CA23c6aD29D919a71dc37E")
        const requestRes = request(GETProfile).get("/api/v1/getProfile/").send({address}).expect(200)
        .end((err, res) => {
            if (err) return done(err);
    
            const { body } = res;
            expect(body.message).to.equal('GET request successful');
            expect(body.address).to.equal(address);
            done();
          });
    })
})