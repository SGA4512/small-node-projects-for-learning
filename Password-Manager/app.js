console.log('Starting password-manager');

var storage = require('node-persist');
storage.initSync();
// Following node-persist's official github page - https://github.com/simonlast/node-persist

// Learning note - getItemSync function takes equivalent of a key-value pair as its arguments - the first argument is the key and the second one is the value.

// Code implementing commandline input by user using yergs (https://github.com/bcoe/yargs)
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

}

function saveAccounts(masterPassword) {

}

function createAccount (account, masterPassword) {
    var accounts = storage.getItemSync('accounts');

    if (typeof accounts === 'undefined') {
        accounts = [];
    }

    accounts.push(account);
    storage.setItemSync('accounts', accounts);

    return account;

}

function getAccount(accountName, masterPassword) {
    var accounts = storage.getItemSync('accounts');
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





