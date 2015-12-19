A very simple weather app fetching the city's weather from [openweathermap.org](https://openweathermap.org/) using its API.

Install the app to your computer by cloning it and then from the root directory of the project run ``npm install``.

To get the temperature of your city (assuming its Kolkata, India) run (from the root directory of the project) 
``node app.js --location kolkata``
  
If you don't provide the location option, i.e. no city info is passed while running the above command (i.e. if you just run ``node app.js``), the app will guess that info from the ip address of your computer and accordingly fetch the temperature of that city. 

This ip information is being fetched using the API from [ipinfo.io](https://ipinfo.io/)