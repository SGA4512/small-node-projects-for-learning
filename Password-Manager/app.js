console.log('Starting password-manager');

var storage = require('node-persist');
storage.initSync();
// Following node-persit's official github page - https://github.com/simonlast/node-persist

// Learning note - getItemSync function takes equivalent of a key-value pair as its arguments - the first argument is the key and the second one is the value.
function createAccout (account) {
    var accounts = getItemSync('accounts');

    if (typeof accounts === 'undefined') {
        accounts = [];
    }

    accounts.push(account);
    storage.setItemSync('accounts', accounts);

    return account;

}

function getAccount(accountName) {
    var accounts = getItemSync('accounts');
    var matchedAccount;

    accounts.forEach(function(account) {
        if (account.name === accountName) {
            matchedAccount = account;
        }
    });
    return matchedAccount;
}