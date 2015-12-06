A very small password management app for storing the individual account names and passwords locally using [node-persist](https://github.com/simonlast/node-persist). 

Used [yargs](https://github.com/bcoe/yargs) for user inputs (of account names, passwords etc) through terminal command line and [crypto-js](https://code.google.com/p/crypto-js/) for encrypting the passwords and other user inputs.

Install the app to your computer by cloning it and then from the root directory run ``npm install``.

The user will have to create a master password (for the first time) when creating an account. For all subsequent account-name and corresponding passwords creation this same master password need to be passed in as one of the argument.

Example command to create an account - ``node app.js create -n paul -u rohanP -p pass123 -m masterP``

``n`` is alias for name  (the example I have used here is "paul")
``u`` is alias for username (the example I have used here is "rohanP")
``m`` is alias for master password (the example I have used here is "masterP")


Example command to fetch the details of an already created account (e.g. the with the below command I shall fetch the account that I have created with the above command)

``node app.js get -n paul -m masterP``