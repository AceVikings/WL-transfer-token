const { expect } = require("chai");
const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("LERC Contract",function(){

    let Token;
    let NFT;
    let Quest;

    let Champ;
    let Denari;
    let DenariQuest;
    before(async function() {

        [owner,ace,acadia] = await ethers.getSigners();

        Token = await ethers.getContractFactory("LimitedERC20");
        LERC = await Token.deploy();

    });

    describe("Deployment", function(){
        it("Should set the owner", async function(){
            expect(await LERC.owner()).to.equal(owner.address);
        })
    })

    describe("Minting",function(){
        it("Should should allow owner to mint", async function(){
            await LERC.mint(parseEther('10'),owner.address);
            expect (await LERC.balanceOf(owner.address)).to.equal(parseEther('10'));
        })
        it("Shouldn't allow others to mint",async function(){
            await (expect (LERC.connect(ace).mint(parseEther('10'),ace.address)).to.be.reverted);
        })
    })

    describe("Transfers",function(){
        it("Shouldn't allow non whitelisted to transfer",async function(){
            await LERC.mint(parseEther('10'),owner.address);
            await LERC.transfer(ace.address,parseEther('10'));
            expect (await LERC.balanceOf(ace.address)).to.equal(parseEther('10'));
            await (expect (LERC.connect(ace).transfer(acadia.address,parseEther('10'))).to.be.revertedWith('Neither from or to is whitelisted'));
        })
        it("Should allow transfer to whitelisted address",async function(){
            await (expect (LERC.connect(ace).transfer(owner.address,parseEther('10'))).to.be.not.reverted)
        })

    })


})
