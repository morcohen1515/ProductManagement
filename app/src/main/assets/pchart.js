(function()
{   
    //if local storage is empty.
    if(localStorage.getItem("data") != null){

        //get cookie by user name.
        var cookie = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key,value]) => 
        ({...accumulator, [key.trim()]: decodeURIComponent(value) }),
        {});
        var cookieusername = cookie.name;

        //get data from local storage.
        var data = localStorage.getItem("data");
        var arrItems = [];
        var userlist = [];
        arrItems = JSON.parse(data);

        //Size of arr items.
        var size = arrItems.length;

        //Take the products of the specific user.
        for(i=0;i<size;i++){
            if(cookieusername == arrItems[i].username){
                userlist.push(arrItems[i]);
            }
        }
        //If user list in empty.
        if(userlist.length != 0) {
            //Inserts categories from an array
            var categores = [];
            //Create an array of categories.
            for(i=0;i<userlist.length;i++){
                categores.push(userlist[i].category);
            }
            //Eliminates duplication
            let x = [...new Set(categores)];
            //Array of total price ger category.
            var price = [];
            var totalprice = 0;

            //Each category and its expenses
            for(i=0;i<userlist.length;i++){
                for(j=0;j<userlist.length;j++){
                    if(categores[i] == userlist[j].category){
                        userlist[j].category = "";
                        totalprice += parseInt(userlist[j].price);
                    }
                }
                if(totalprice != 0){
                    price.push(totalprice);
                    totalprice = 0;
                }
            }

            //colors for pie chart
            backgroundcolorscategores = ['red', 'blue', 'green', 'pink', 'Black', 'Purple', 'Brown', 'Grey', 'Silver', 'Orange'];

            //Initialize the data
            DataEC = {
                datasets: [{
                    backgroundColor: backgroundcolorscategores,
                    data: price,
                    borderColor: 'rgba(0,0,0,0.1)',
                    borderWidth: '1'
                }],
                labels: x,
            };
            //initialization Design
            var optionsEC = {
                title: {
                    display: true,
                    text: 'הוצאות לפי קטגוריה',
                    fontSize: '30',
                    fontFamily: "'Roboto', sans-serif"
                },
                legend: {
                    display: true,
                    position: 'right',
                    align: 'center'
                }
            }

            //Creating pie chart
            var pie = document.getElementById('ExpensesByCategory').getContext('2d');
            PieChart = new Chart(pie, {
                type: 'pie',
                data: DataEC,
                options: optionsEC
                });

        } else {
            //If there are no categories
            alert("No Categores In This User.");
        }
    }       
})();