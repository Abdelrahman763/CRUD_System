 var productName=document.getElementById('productName');
 var productCategory=document.getElementById('productCategory');
 var productPrice=document.getElementById('productPrice');
 var productDescription= document.getElementById('productDescription');
 var btnAdd=document.getElementById('btnAdd');
 var btnUpdate=document.getElementById('btnUpdate');

 var productsContainer=[]
 if(localStorage.getItem('product')!=null)
 {
    productsContainer=JSON.parse(localStorage.getItem('product'))
    displayProducts();
 }
 function addProduct()
 {
   if(validateName()==true)
    {
      var product={
        Name:productName.value,
        Category:productCategory.value,
        Price:productPrice.value,
        Description:productDescription.value
    }
    productsContainer.push(product);
    localStorage.setItem('product',JSON.stringify(productsContainer))
    console.log(productsContainer);
    displayProducts();
    clearInputs();
   }
   else 
   {
      alert("product name is not valid");
   }
 }
  
 function displayProducts()
 {
    var cartona=``;
    for(var i=0;i<productsContainer.length;i++)
    {
     cartona+=`<tr>
     <td>${i+1}</td>
    <td>${productsContainer[i].Name}</td>
    <td>${productsContainer[i].Category}</td>
    <td>${productsContainer[i].Price}</td>
    <td>${productsContainer[i].Description}</td>
    <td><button onclick="updateOrder(${i})" class="btn btn-warning ">Update</button></td>
    <td><button onclick="deleteItem(${i})" class="btn btn-danger">Delete</button></td>
    </tr>`
    }
    document.getElementById('tbody').innerHTML=cartona;
 }

 function clearInputs()
 {
    productName.value="";
    productCategory.value="";
    productPrice.value="";
    productDescription.value="";
 }

 function deleteItem(Index)
 {
      productsContainer.splice(Index,1);
      displayProducts();
      localStorage.setItem('product',JSON.stringify(productsContainer));   
 }

 function search()
 {
    var searchInput=document.getElementById('searchInput').value;
    var box=``;
    for(var i=0;i<productsContainer.length;i++)
    {
        if(productsContainer[i].Name.toLowerCase().includes(searchInput.toLowerCase()))
         {
              box+=`<tr>
             <td>${i+1}</td>
             <td>${productsContainer[i].Name.replace(searchInput,'<span>'+searchInput+'</span>')}</td>
             <td>${productsContainer[i].Category}</td>
             <td>${productsContainer[i].Price}</td>
             <td>${productsContainer[i].Description}</td>
             <td><button class="btn btn-warning"  >Update</button></td>
             <td><button onclick="deleteItem(${i})" class="btn btn-danger">Delete</button></td>
             </tr>`
         }
         document.getElementById('tbody').innerHTML=box;
    }
 }

 function updateOrder(index)
 {
     btnAdd.classList.replace('d-block','d-none');
     btnUpdate.classList.replace('d-none','d-block');
     productName.value=productsContainer[index].Name;
     productPrice.value=productsContainer[index].Price;
     productCategory.value=productsContainer[index].Category;
     productDescription.value=productsContainer[index].Description;
 }

 function validateName()
 {
   var regex=/^[A-Z][a-z]{2,8}$/
   return regex.test(productName.value);
 }
 