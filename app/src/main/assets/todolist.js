window.todo = new Object();

//Registration function.
//If the user already exists there is no registration.
//Includes password validations and username.
window.todo.signup = function() {

    //Cleans the field.
    document.getElementById('signup').innerHTML=""
    //Take information.
    var id = Math.floor((Math.random() * 10000) + 1);
    var username = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var cpassword = document.getElementById("cpassword").value;
    var ob = {};

    //if localStorage not empty.
    if(localStorage.getItem("users") != null){
        var data = localStorage.getItem("users");
        var arrItems = [];
        arrItems = JSON.parse(data);
        var size = arrItems.length;
        var flag = 0;

        //Check if a user already exists.
        for(i=0;i<size;i++){
            if(username == arrItems[i].username){
                flag = 1;
            }
        }

        if(flag != 1) {

            //if text With space.
            if(username.indexOf(' ') >= 0 || password.indexOf(' ') >= 0 || cpassword.indexOf(' ') >= 0) {
                todo.resultSignup("שם המשתמש והסיסמה ללא רווחים בבקשה");
            } else {
                //if text is empty
                if(id == "" || username == "" || password == ""){
                    todo.resultSignup("המערכת זקוקה לכל הפרטים");
                } else {
                    //If the passwords not match
                    if(password != cpassword){
                        todo.resultSignup("הסיסמאות לא תואמות");
                    } else {
                        //insert user to localStorage.
                        ob.username = username;
                        ob.password = password;
                        arrItems.push(ob);
                        var users = JSON.stringify(arrItems);
                        localStorage.setItem("users", users);
                        document.getElementById("name").value = "";
                        document.getElementById("password").value = "";
                        document.getElementById("cpassword").value = "";
                        todo.resultSignup("שם המשתמש התקבל בהצלחה.");
                    }
                }
            } 
        } else {
            //User already exists.
            todo.resultSignup("משתמש כבר קיים");
        }                        
    } else {
        //if text With space.
        if(username.indexOf(' ') >= 0 || password.indexOf(' ') >= 0 || cpassword.indexOf(' ') >= 0) {
            todo.resultSignup("שם משתמש וסיסמה ללא רווחים בבקשה");
        } else {
            //if text is empty
            if(id == "" || username == "" || password == ""){
                todo.resultSignup("המערכת זקוקה לכל הפרטים");
            } else {
                //If the passwords not match
                if(password != cpassword){
                    todo.resultSignup("סיסמאות לא תואמות");
                } else {
                    //insert user to localStorage.
                    var arrItems = [];
                    ob.username = username;
                    ob.password = password;
                    arrItems.push(ob);
                    var users = JSON.stringify(arrItems);
                    localStorage.setItem("users", users);
                    document.getElementById("name").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("cpassword").value = "";
                    todo.resultSignup("המשתמש התקבל בהצלחה.");
                }
            }
        }       
    } 
};

//Login function.
//Checks if the user exists and uses the cookie.
window.todo.login = function() {

    //Cleans the field.
    document.getElementById('login').innerHTML="";
    var username = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    if(username == "" && password == "") {
        todo.resultLogin("הכנס שם משתמש וסיסמה בבקשה");
    } else {

        //Cookie
        document.cookie = "name="+username;

        //if localStorage not empty.
        if(localStorage.getItem("users") != null){
            var users = localStorage.getItem("users");
            var arrItems = [];
            arrItems = JSON.parse(users);
            var size = arrItems.length;
            var userexists = 0;

             //Check if a user exists.
            for(i=0;i<size;i++){
                if(username == arrItems[i].username && password == arrItems[i].password){
                    userexists = 1;
                    //if user exists go to add cost item file.
                    location.replace("file:///android_asset/addcostitem.html")
                }
            }
            if(!userexists){
                todo.resultLogin("משתמש לא קיים");
            }
        } else {
            //local storage is empty so user not found.
            todo.resultLogin("משתמש לא קיים");
        }
    }
};

//A function that validates data and passes the information to the addcostitem().
window.todo.handleButtonClickAddCost = function() {

    //Cleans the field.
    document.getElementById('addproduct').innerHTML ="";

    var category = document.getElementById("category").value;
    var title = document.getElementById("title").value;
    var price = document.getElementById("price").value;
    var description = document.getElementById("description").value;

    //if title or description or category or price is empty
    if(title == ""  || description == "" || category == "" || price == ""){
        todo.resultAddProduct("המערכת זקוקה לכל הפרטים");
    } else {

        //if category include space.
        if(category.indexOf(' ') >= 0){
            todo.resultAddProduct("שם הקטגוריה ללא רווחים בבקשה");
        } else {
            var ob = {};
            //id
            ob.id = Math.floor((Math.random() * 10000) + 1);
            //category
            ob.category = category;
            //title
            ob.title = title;
            //price
            ob.price = parseInt(price);
            //date
            var d = new Date();
            ob.month = d.getMonth() + 1;
            ob.year = d.getFullYear();
            //description
            ob.description = description;
            //get cookie by user name.
            var cookie = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((accumulator, [key,value]) =>
            ({...accumulator, [key.trim()]: decodeURIComponent(value) }),
            {});
            ob.username = cookie.name;

            //add cost item.
            todo.addCostItem(ob);
        }
    }

    //Cleans the fields.
    document.getElementById("category").value = "";
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";
};

//The addcostitem function saves the product information in the local storage.
window.todo.addCostItem = function(ob) {

    var items = [];

    //if local storage is empty.
    if(localStorage.getItem("data") == null){

        items.push(ob);
        var data = JSON.stringify(items);
        localStorage.setItem("data", data);
        //function result add product.
        todo.resultAddProduct("המוצר התקבל בהצלחה");

    } else {

        //if local storage is not empty.
        var text = localStorage.getItem("data");
        var items = JSON.parse(text);
        items.push(ob);
        var data = JSON.stringify(items);
        localStorage.setItem("data", data);
        //function result add product.
        todo.resultAddProduct("המוצר התקבל בהצלחה");

    }
};

//The getcostitems function takes the products of the specific user from the local storage using the cookie.
window.todo.getCostItems = function() {

    //Cleans the fields
    document.getElementById("empty").innerHTML = "";
    document.getElementById("listitems").innerHTML = "";

    //if local storage is not empty.
    if(localStorage.getItem("data") != null){

        //get cookie by user name.
        var cookie = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key,value]) =>
        ({...accumulator, [key.trim()]: decodeURIComponent(value) }),
        {});

        //get cookie
        var cookieusername = cookie.name;

        //get data from local storage.
        var data = localStorage.getItem("data");
        var arrItems = [];
        var userlist = [];
        arrItems = JSON.parse(data);

        //size of arr items.
        var size = arrItems.length;

        //Just who he is cookie user name.
        for(i=0;i<size;i++){
            if(cookieusername == arrItems[i].username){
                userlist.push(arrItems[i]);
            }
        }
        //If there is no items.
        if( userlist.length == 0 ){

            document.getElementById("empty").innerHTML = "";
            todo.emptyListItem("רשימת המוצרים ריקה");

        } else {

            //Cleans the field.
            document.getElementById("listitems").innerHTML = "";
            var tbody = document.getElementById('listitems');

            //size of user list.
            size = userlist.length;

            //Enter the items information into a table.
            for(i=0;i<size;i++){

                var tr = document.createElement("tr");

                var td_category = document.createElement("td");
                var td_title = document.createElement("td");
                var td_price = document.createElement("td");
//                var td_month = document.createElement("td");
                var td_description = document.createElement("td");
                var td_delete = document.createElement("td");

                var adelete = document.createElement("button");

                var _id = document.createTextNode(userlist[i].id);
                var _category = document.createTextNode(userlist[i].category);
                var _title = document.createTextNode(userlist[i].title);
                var _price = document.createTextNode(userlist[i].price);
//                var _month = document.createTextNode(userlist[i].month);
                var _description = document.createTextNode(userlist[i].description);
                var textdelete = document.createTextNode("Delete");

                td_category.appendChild(_category);
                td_title.appendChild(_title);
                td_price.appendChild(_price);
//                td_month.appendChild(_month);
                td_description.appendChild(_description);

                adelete.appendChild(textdelete);
                adelete.setAttribute("type","button");
                adelete.setAttribute("class","btn btn-danger");
                adelete.onclick = function() { todo.deleteProduct(userlist, _id.data)};

                td_delete.appendChild(adelete);

                tr.appendChild(td_category);
                tr.appendChild(td_title);
                tr.appendChild(td_price);
//                tr.appendChild(td_month);
                tr.appendChild(td_description);
                tr.appendChild(td_delete);

                tbody.appendChild(tr);

            }
        }
    } else {
        //if the list is empty.
        todo.emptyListItem("רשימת המוצרים ריקה");
    }
};

////A function that validates the date number and passes the date to the getCostPerMonth().
window.todo.handleButtonClickMonth = function(){

    //get date by id.
    var date = document.getElementById("date").value;
    var month = date.charAt(0) + date.charAt(1);
    var year = date.charAt(6) + date.charAt(7) + date.charAt(8) + date.charAt(9);

    //if month or year is empty.
    if(month == "" || year == ""){
        todo.emptyListItem("הכנס תאריך");
    } else {
        todo.getCostPerMonth(parseInt(month), parseInt(year));
    }
};

//The getCostPerMonth function takes the products of the specific user from the local storage using the cookie.
//The function only shows the products in the requested date received from the customer.
window.todo.getCostPerMonth = function(month, year) {

    //Cleans the fields.
    document.getElementById("empty").innerHTML = "";
    document.getElementById("listpermonth").innerHTML = "";

    //if local storage is not empty.
    if(localStorage.getItem("data") != null){

        //get cookie by user name.
        var cookie = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key,value]) =>
        ({...accumulator, [key.trim()]: decodeURIComponent(value) }),
        {});

        //get cookie
        var cookieusername = cookie.name;

        var data = localStorage.getItem("data");
        var arrItems = [];
        var userlist = [];
        arrItems = JSON.parse(data);
        var size = arrItems.length;

        //Just who he is cookie user name.
        for(i=0;i<size;i++){
            if(cookieusername == arrItems[i].username){
                userlist.push(arrItems[i]);
            }
        }

        //If there is no items.
        if( userlist.length == 0 ){

            document.getElementById("empty").innerHTML = "";
            todo.emptyListItem("רשימת המוצרים ריקה");

        } else {

            //Cleans the field.
            document.getElementById("listpermonth").innerHTML = "";

            var tbody = document.getElementById('listpermonth');

            //size of user list.
            size = userlist.length;

            //Enter the items information into a table.
            for(i=0;i<size;i++){

                //If the product was created in the desired date then you will see in the table.
                if(userlist[i].month == month && userlist[i].year == year) {

                    var tr = document.createElement("tr");

                    var td_category = document.createElement("td");
                    var td_title = document.createElement("td");
                    var td_price = document.createElement("td");
//                    var td_month = document.createElement("td");
                    var td_description = document.createElement("td");
                    var td_delete = document.createElement("td");

                    var adelete = document.createElement("button");

                    var _id = document.createTextNode(userlist[i].id);
                    var _category = document.createTextNode(userlist[i].category);
                    var _title = document.createTextNode(userlist[i].title);
                    var _price = document.createTextNode(userlist[i].price);
//                    var _month = document.createTextNode(userlist[i].month);
                    var _description = document.createTextNode(userlist[i].description);
                    var textdelete = document.createTextNode("Delete");

                    td_category.appendChild(_category);
                    td_title.appendChild(_title);
                    td_price.appendChild(_price);
//                    td_month.appendChild(_month);
                    td_description.appendChild(_description);

                    adelete.appendChild(textdelete);
                    adelete.setAttribute("type","button");
                    adelete.setAttribute("class","btn btn-danger");
                    adelete.onclick = function() { todo.deleteProductPerMonth(userlist, _id.data)};

                    td_delete.appendChild(adelete);

                    tr.appendChild(td_category);
                    tr.appendChild(td_title);
                    tr.appendChild(td_price);
//                    tr.appendChild(td_month);
                    tr.appendChild(td_description);
                    tr.appendChild(td_delete);

                    tbody.appendChild(tr);
                }
            }

            //If there is no product in the requested date.
            if(document.getElementById('listpermonth').innerHTML == ""){
                todo.emptyListItem("אין מוצרים בתאריך זה");
            }
        }
    } else {
        //If there are no products on the list at all.
        todo.emptyListItem("רשימת המוצרים ריקה");
    }
};

//The function resultSignup get a string and displays it on the screen.
window.todo.resultSignup = function(result) {
    var textresult = document.getElementById('signup');
    var text = document.createTextNode(result);
    textresult.appendChild(text); 
};

//The function resultLogin get a string and displays it on the screen.
window.todo.resultLogin = function(result) {
    var login = document.getElementById('login');
    var text = document.createTextNode(result);
    login.appendChild(text);
};

//The function resultAddProduct get a string and displays it on the screen.
window.todo.resultAddProduct = function(result) {
    var textresult = document.getElementById('addproduct');
    var text = document.createTextNode(result);
    textresult.appendChild(text);    
};

//The function emptyListItem get a string and displays it on the screen.
window.todo.emptyListItem = function(result) {
    document.getElementById('empty').innerHTML="";
    var emptylist = document.getElementById('empty');
    var text = document.createTextNode(result);
    emptylist.appendChild(text);
};

//The function deleteProduct get id and list of products deleted the product
//by id from the local storage.
window.todo.deleteProduct = function(userlist, id) {

    var size = userlist.length;

    //Deleting a product by ID.
    for(i=0;i<size;i++){
        if(parseInt(userlist[i].id) == id){
            userlist.splice(i,1);
        }
    }

    var data = JSON.stringify(userlist); 
    localStorage.setItem("data", data);

    //Cleans the fields
    document.getElementById('listitems').innerHTML = "";
    todo.resultDeleteProduct("המוצר נמחק בהצלחה");
};

////The function deleteProduct get id and list of products with a specific month deleted the product
//by id from the local storage.
window.todo.deleteProductPerMonth = function(userlist, id) {

    var size = userlist.length;

    //Deleting a product by ID.
    for(i=0;i<size;i++){
        if(parseInt(userlist[i].id) == id){
            userlist.splice(i,1); 
        }
    }

    //set to the local storage.
    var data = JSON.stringify(userlist); 
    localStorage.setItem("data", data);

    //Cleans the fields
    document.getElementById('listpermonth').innerHTML = "";
    todo.resultDeleteProduct("המוצר נמחק בהצלחה");
};

//The function deleteProduct get a string and displays it on the screen.
window.todo.resultDeleteProduct = function(result) {
    var textresult = document.getElementById('empty');
    var text = document.createTextNode(result);
    textresult.appendChild(text);   
};


