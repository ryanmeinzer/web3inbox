// deploy code will go here
require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const {interface, bytecode} = require('./compile')
const myAccountMnemonic = process.env.MY_ACCOUNT_MNEMONIC

const provider = new HDWalletProvider(
    `${myAccountMnemonic}`,
    'https://goerli.infura.io/v3/78389dcce0d54faaa7e109f5111845f0'
)
const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hi there!']})
        .send({gas: '1000000', from: accounts[0]})

    console.log('Contract deployed to', result.options.address)
    // prevent a hanging deployment
    provider.engine.stop()
}

deploy()