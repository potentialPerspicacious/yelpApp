Yelp - a food application.
This project is a yelp food application prototype. The repository consists of both <br >
frontend and backend code of the application. <br >
<br >
To Run the project perform the following steps. <br >
This readme assumes you have node already installed. <br />

-   In Backend/config.js add your MongoDB connection string. 
-   Open three terminals and redirect into Backend, Frontend and kafka-backend folders respectively. 
-   Run npm install in each of the terminal.
-   Create list of kafka topics- <br>
    addEvents <br>
    cart <br>
    cus2resMsg <br>
    cusOrders <br>
    menu <br>
    messages <br>
    placeOrder <br>
    registerEvents <br>
    registerevents <br>
    res2cusMessage <br>
    res2cusMsg <br>
    resOrders <br>
    response_topic <br>
    search <br>
-   Run the following commands to start the application. 
    -   ~Backend node index.js
    -   ~kafka-backend node server.js
    -   ~Frontend npm start
-   Open localhost:3000/ in your browser.  

