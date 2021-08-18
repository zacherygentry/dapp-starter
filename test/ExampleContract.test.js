const { assert, should } = require('chai');
const Web3 = require('web3');
let web3 = new Web3('ws://localhost:7545');

const ExampleContract = artifacts.require('./ExampleContract.sol');

require('chai').use(require('chai-as-promised')).should();

contract('ExampleContract', async (accounts) => {
  let contract;

  beforeEach(async () => {
    contract = await ExampleContract.deployed();
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address;

      assert.notEqual(address, '');
      assert.notEqual(address, 0x0);
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  describe('functionality', async () => {
    it('adds to total', async () => {
      await contract.addToTotal(5);
      const total = await contract.total();

      assert.isTrue(total >= 5);
    });

    it('accepts payments and adds payer to payers list', async () => {
      await contract.pay({ value: web3.utils.toWei('0.01', 'ether') });
      let bal = await web3.eth.getBalance(contract.address);
      bal = web3.utils.fromWei(bal, 'ether');

      const payers = await contract.getPayers();

      assert.equal(payers[0], accounts[0]);
      assert.equal(bal, 0.01);
    });
  });
});
