console.log('Starting password-manager');

var storage = require('node-persist');
storage.initSync();
// The above 2 lines following node-persist's official github page - https://github.com/simonlast/node-persist

var crypto = require('crypto-js');

// Learning note - getItemSync function takes equivalent of a key-value pair as its arguments - the first argument is the key and the second one is the value.

// Code implementing commandline input by user (https://github.com/bcoe/yargs)
var argv = require('yargs')
    .command('create', 'Create a new account', function(yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Your account name goes here',
                type: 'string'
            },
            username: {
                demand: true,
                alias: 'u',
                description: 'Your account username or email goes here',
                type: 'string'
            },
            password: {
                demand: true,
                alias: 'p',
                description: 'Your account password goes here',
                type: 'string'
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                description: 'Master Password',
                type: 'string'
            }
        })
            .help('help');
    })
    .command('get', 'Get an existing account', function(yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Your account name goes here',
                type: 'string'
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                description: 'Master Password',
                type: 'string'
            }
        })
            .help('help');
    })
    .help('help')
    .argv;

var command = argv._[0];

function getAccounts(masterPassword) {
    var encryptedAccount = storage.getItemSync('accounts');
    var accounts = [];

    if (typeof encryptedAccount !== 'undefined') {
        var bytes = crypto.AES.decrypt(encryptedAccount, masterPassword);
        // The bytes variable above is an array after the decryption. But we now need to convert that into a javascript array.
        accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
    }
    return accounts;
}

function saveAccounts(accounts, masterPassword) {
    var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
    storage.setItemSync('accounts', encryptedAccounts.toString());
    // My own learning note - per official github page- function setItemSync(key, value) takes an object (a key-value pair) as its argument.

    return accounts;
}


function createAccount (account, masterPassword) {
    var accounts = getAccount(masterPassword);
    accounts.push(account);
    saveAccounts(accounts, masterPassword);
    return account;
}


function getAccount(accountName, masterPassword) {
    var accounts = getAccounts(masterPassword);
    var matchedAccount;

    accounts.forEach(function(account) {
        if (account.name === accountName) {
            matchedAccount = account;
        }
    });
    return matchedAccount;
}

if(command === 'create') {
    var createdAccount = createAccount({
            name: argv.name,
            username: argv.username,
            password: argv.password
        },
        argv.masterPassword);
    console.log('Account Created!');
    console.log(createdAccount);

} else if (command === 'get') {
    var fetchedAccount = getAccount(argv.name, argv.masterPassword);

    if(typeof fetchedAccount === 'undefined') {
        console.log('Account not found');
    } else {
        console.log('Account found!');
        console.log(fetchedAccount);
    }
}





