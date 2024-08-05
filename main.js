const SHA256 = require('crypto-js/sha256')



class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}


class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, '01/01/2024', 'Genesis Block', '0');
  }


  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentblock = this.chain[i];
      const previousblock = this.chain[i - 1];

      if (currentblock.hash !== currentblock.calculateHash()) {
        return false
      }

      if (currentblock.previousHash !== previousblock.hash) {
        return false;
      }
    }
    return true;
  }
}


let jcoin = new Blockchain();
jcoin.addBlock(new Block(1, "10/07/2024", { amount: 59 }));
jcoin.addBlock(new Block(1, "20/3/2020", { amount: 12 }));

console.log('Is blockchain valid? ' + jcoin.isChainValid());

jcoin.chain[1].data = { amount: 2000 };
jcoin.chain[1].hash = jcoin.chain[1].calculateHash();

console.log('Is blockchain valid? ' + jcoin.isChainValid());

//console.log(JSON.stringify(jcoin, null, 2));



