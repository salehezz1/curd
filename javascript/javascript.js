let title = document.getElementById("title");
let prise = document.getElementById("prise");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let mood = "creat";
let tmp;
// gettotal
function getTotal(){
    if(prise.value != ''){
        let result = (+prise.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040';
    }else{
        total.innerHTML = '';
        total.style.backgroundColor ='#e70d0d';
    }
}

// creat product
let dataPro;
if(localStorage.product != null){
     dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}
submit.onclick = function(){
    let newPro = {
        title    : title.value.toLowerCase(),
        prise    : prise.value,
        taxes    : taxes.value,
        ads      : ads.value,
        discount : discount.value,
        total    : total.innerHTML,
        count    : count.value,
        category : category.value.toLowerCase(),
    }
    if(title.value != '' && prise.value !='' && category.value != ''){
    if(mood == "creat"){
    if(newPro.count > 1){
        for(let i=0 ; i < newPro.count ; i++){
            dataPro.push(newPro);
            showData()

        }
    }else{
        dataPro.push(newPro);
       clearData();
    
    }

    dataPro[tmp] = newPro;
    mood = "creat";
    submit.innerHTML = "creat";
    count.style.display = "block";
}

    } 
   
    // save at localstorge
    localStorage.setItem('product', JSON.stringify(dataPro));
     showData();
}


// creal inputs
function clearData(){
   title.value = '';
   prise.value = '';
   taxes.value = '';
   ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// read 
//errrrrorrrr
function showData(){
    getTotal();
    let table = '';
    for(let i=0;i < dataPro.length;i++){
        table += `
                     <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].prise}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick= "updateData(${i})" id="update">update</button</td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button</td>
                    </tr>
                    `
        
        
    }
    document.getElementById('tbody').innerHTML=table;
            let btnDelete = document.getElementById('deleteAll');
            if(dataPro.length > 0){
                btnDelete.innerHTML =`
                <button onclick = "deleteAll()">delete all ${dataPro.length}</button
            `
            }else{
                btnDelete.innerHTML = '';
            }
        }
 showData();

// delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}
// update
function updateData(i){
    title.value =dataPro[i].title;
    prise.value =dataPro[i].prise;
    taxes.value =dataPro[i].taxes;
    ads.value =dataPro[i].ads;
    discount.value =dataPro[i].discount;
    getTotal()
    count.style.display = "none";
    category.value = dataPro[i].category;
    submit.innerHTML = "update";
    mood = "update";
    tmp = i;
    submit.onclick = function(){
        let newPro = {
            title    : title.value.toLowerCase(),
            prise    : prise.value,
            taxes    : taxes.value,
            ads      : ads.value,
            discount : discount.value,
            total    : total.innerHTML,
            count    : count.value,
            category : category.value.toLowerCase(),
        }
        if(title.value != '' && prise.value !='' && category.value != ''){
            if(mood == "update"){
                dataPro[tmp] = newPro;
                dataPro.push(newPro);
                
                localStorage.setItem('product', JSON.stringify(dataPro));
                showData();
                clearData();
        
            }
        }
    }
    scroll({
        top: 0,
        behavior: "smooth",
});
}
// search
let searchMood = "title";
function getSearchMood(id){
    if(id == "searchTitle"){
        searchMood = "title";
        search.placeholder = "search by title";
    }else{
        searchMood = "category";
        search.placeholder = "search by category";
    }
    search.focus();
    search.value ='';
    showData();
}
function searchData(value){


    
    let table = '';
    if(searchMood == "title"){
        for(let i=0 ; i < dataPro.length ; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].prise}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick= "updateData(${i})" id="update">update</button</td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button</td>
            </tr>`
            }
        }
    }else{
    
     
        for(let i=0 ; i < dataPro.length ; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                    table += `
                    <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].prise}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick= "updateData(${i})" id="update">update</button</td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button</td>
                    </tr>`
                }   
            }
        
        }

    document.getElementById("tbody").innerHTML = table;
}
// clean data

































/* 
this is test


b();
var a = "hey how are?";
console.log(a)

function b(){
    console.log("be is colled")
}

// variables
// var myDiscount = 100;
// document.getElementById("discount").innerHTML = myDiscount;
// data type
// boolen

var myDiscount = false;
if(myDiscount== false){
    document.getElementById("test").innerHTML = "true";
}else{
    document.getElementById("test").innerHTML = "false";
}

// array
var cars = ['vovo', 'toyota','marsedes'];
document.getElementById('cars').innerHTML = cars[2];
// objects
var myInfo = {firstName: "saleh", lastName: "eaz", phone: "0102890"};
document.getElementById("myInfo").innerHTML =
"firstName = " +  myInfo.firstName + "<br>" +
"lastName = " + myInfo.lastName + "<br>" +
"phone = " + myInfo.phone; 



end test


*/