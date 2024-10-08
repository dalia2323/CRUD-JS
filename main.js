let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let tmp;
let mood='create';
//get total
function getTotal(){
if(price.value !=''){
    let result=(+price.value+ +taxes.value + +ads.value)- +discount.value;
    total.innerHTML=result;
    total.style.background='#040';
}
else{
    total.innerHTML='';
    total.style.background='#a00d';
}
}
//create
let dataPro; 
if(localStorage.product!= null){
    dataPro=JSON.parse(localStorage.product);
}
else{
dataPro= [];
}
submit.onclick=function(){
    let newPro={
        title:title.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        price:price.value,
        count:count.value,
        category:category.value,
    }
    // dataPro.push(newPro);
    if(title.value!=''
        && price.value!=''
        &&category.value!=''
        &&count.value<100
    ){
    if(mood==='create'){
        //create depend on count
    if(newPro.count>1){
        for(let i=0;i<newPro.count;i++){
            dataPro.push(newPro);
        }}
        else{
            dataPro.push(newPro);
        }
    }else{
        dataPro[tmp]=newPro;
        mood='create';
        submit.innerHTML='Create';
        count.style.display='block';
    }
    clearInput();
    }
    
    //save in local storage 
    localStorage.setItem('product',JSON.stringify(dataPro));
    showData();
}
//clear input
function clearInput(){
    title.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    price.value='';
    count.value='';
    category.value='';
}
//read
function showData(){
getTotal();
let table='';   
for(let i=0;i<dataPro.length;i++){
    table+=`   <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})">Update</button></td>  
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button> </td>
                    </tr>`
}
document.getElementById('tbody').innerHTML=table;
//delete all
let deleteALL=document.getElementById('deleteAll');
if(dataPro.length>0){
    deleteALL.innerHTML=`
    <button onclick="deleteAll()">Delete ALL (${dataPro.length})</button>
    `;
}else{
    deleteALL.innerHTML='';
}
}
showData();
//Delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showData();
}
//Delete all
function deleteAll(){
localStorage.clear();
dataPro.splice(0);
showData();
}
//update Data
function updateData(i){
title.value=dataPro[i].title;
price.value=dataPro[i].price;
taxes.value=dataPro[i].taxes;
ads.value=dataPro[i].ads;
getTotal();
count.style.display='none';
discount.value=dataPro[i].discount;
category.value=dataPro[i].category;
submit.innerHTML='Update';
tmp=i;
mood='update';
scroll({
    top:0,
    behavior:'smooth',
})
}
//search
let searchMood='title';
function getSearchMood(id){
    let search=document.getElementById('search');
if(id=='searchByTitle'){
    searchMood='title';
}else{
    searchMood='category';
}
search.placeholder='Search By '+searchMood;
search.focus();
search.value='';
showData();
}
function searchData(value){
    let table='';
    for(let i=0;i<dataPro.length;i++){

if(searchMood=='title'){
    if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
        table+=`   <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">Update</button></td>  
    <td><button id="delete" onclick="deleteData(${i})">Delete</button> </td>
    </tr>`;
    }

}else
{
        if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
            table+=`   <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">Update</button></td>  
        <td><button id="delete" onclick="deleteData(${i})">Delete</button> </td>
        </tr>`;
        }


}
}
document.getElementById('tbody').innerHTML=table;

}