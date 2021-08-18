import web3 from './web3';
import ExampleContract from '../abis/ExampleContract.json';

const getExampleContract = (networkId) => {
  // Can get networkId from frontend using `const networkId = await web3.eth.net.getId();`
  return new web3.eth.Contract(
    ExampleContract.abi,
    ExampleContract.networks[networkId].address
  );
};

export default getExampleContract;
