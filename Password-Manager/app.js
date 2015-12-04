console.log('Starting password-manager');

var storage = require('node-persist');
storage.initSync();
// Following node-persist's official github page - https://github.com/simonlast/node-persist

// Learning note - getItemSync function takes equivalent of a key-value pair as its arguments - the first argument is the key and the second one is the value.

// below is the code for 


function createAccount (account) {
    var accounts = storage.getItemSync('accounts');

    if (typeof accounts === 'undefined') {
        accounts = [];
    }

    accounts.push(account);
    storage.setItemSync('accounts', accounts);

    return account;

}

function getAccount(accountName) {
    var accounts = storage.getItemSync('accounts');
    var matchedAccount;

    accounts.forEach(function(account) {
        if (account.name === accountName) {
            matchedAccount = account;
        }
    });
    return matchedAccount;
}

/*
createAccount({
   name: 'Facebook',
   username: 'example@gmail.com',
   password: '1234'
});*/

var facebookAcct = getAccount('Facebook');
console.log(facebookAcct);
