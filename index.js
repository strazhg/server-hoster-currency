const blockchain_lib = require('blockchain-lib/index.js');

const Blockchain = blockchain_lib.Blockchain;
const Transaction = blockchain_lib.Transaction;
const Wallet = blockchain_lib.Wallet;

var craftcoin = new Blockchain();
var player_wallets = [];

const ScriptServer = require('scriptserver');

const server = new ScriptServer({

	core: {

		jar: 'paper.jar',
		args: ['-Xmx1024M', '-Xms1024M'],
		rcon: {

			port: '25575',
			password: 'Insert rcon password here'

		}

	}

});

server.use(require('scriptserver-event'));
server.use(require('scriptserver-command'));

server.start();

var craftBankWallet = new Wallet(craftcoin, 1);
craftBankWallet.username = 'Put your server admin minecraft username here';
craftBankWallet.totalBalance = 1000000;

player_wallets.push(craftBankWallet);

server.on('login', event => {

	var craftWallet = new Wallet(craftcoin, 3);

	craftWallet.username = event.player;

	for(let i = 0; i < player_wallets.length; i++){

		if(player_wallets[i].username === craftWallet.username) {

			server.send('It looks like you already have a wallet! Aborting wallet creation process...');
			delete craftWallet;
			break;

		} else {

			server.send('It looks like you don\'t have a wallet yet. We will create one for you now.');
			player_wallets.push(craftWallet);
			server.send('Wallet Created! Click here to check your balance -> https://Put your server ip address here/' + craftWallet.username);
			break;

		}

		for(let j = 0; j < player_wallets[i].addressList.length; j++) {

			if(player_wallets[i].username === event.player) {

				var amountToTransfer = (player_wallets[i].totalBalance * 0.05) / player_wallets[i].addressList.length;
				if(craftcoin.createTransaction(new Transaction(craftBankWallet.addressList[0], player_wallets[i].addressList[j], amountToTransfer))) {

					player_wallets[i].updateBalance();
					server.send('Welcome, ${event.player}! You just earned ${amountToTransfer} craftcoin(s)!');
					break;

				}

			}

		}

	}

});
