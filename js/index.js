const inputSiteName= document.getElementById("siteName") ;
const inputSiteUrl= document.getElementById("siteUrl") ;
const newElement= document.getElementById("btn") ; 


let list=[]; //global  variable 


 window.onload =function(){

if(localStorage.getItem('data')  !==  null){    
  list=JSON.parse(localStorage.getItem("data"));
  displayData(); 
}; 
 } ;
newElement.addEventListener("click"  , function(e){
     e.preventDefault();
  

   // تحقق من صحة URL باستخدام regex أو input.validity
  if (!inputSiteUrl.checkValidity()) {
    inputSiteUrl.classList.add('is-invalid');
  } else {
    inputSiteUrl.classList.remove('is-invalid');
    // ... كمل باقي العمليات (حفظ، عرض، إلخ)
  }


const  data = {
  siteName: inputSiteName.value.trim(),
  siteUrl : inputSiteUrl.value.trim(),
};
//alert   if null inputs  after  click btn
 if(data.siteName === ""  || data.siteUrl ===  ""  ){

  alert("Both   fields  of inputs must  be   fill");

  return;
 }

//   condition to alert   me  if  patterrn  url  not match 
     if(!isValidURL(data.siteUrl)) {
    alert("Please enter a valid URL (e.g. https://example.com)");
    return;
  }






  list.push(data);
  //stringify    used  for   add  data  in local storage 
  var jsonString = JSON.stringify(list);
  localStorage.setItem("data" , jsonString);
   
  displayData(); 
  clearInputs();
    console.log("Data saved:", list);

  

});


function clearInputs() {
  inputSiteName.value ="";
  inputSiteUrl.value  ="";
  
};

// display    data   into  tablebody
function displayData () {

  var  cartona="" ;
  for (let  i = 0;  i < list.length;  i++) {
    
   cartona += `
   
      <tr>
        <td>${i + 1}</td>
        <td>${list[i].siteName}</td>
        <td>${list[i].siteUrl}</td>
        <td><a href="${list[i].siteUrl}" target="_blank" class="btn btn-success btn-sm"> <i class="fa-solid fa-eye"></i>Visit</a></td>
        <td><button onClick="deleteItem(${i})" class="btn btn-danger btn-sm"> <i class="fa-solid fa-eye"></i>   Delete</button></td>
      </tr>
   `
    
  }


document.getElementById("tableBody").innerHTML=cartona; 


  // delete 
}
function    deleteItem(index) {

  list.splice(index ,1 );
//update   list   then display   it   
  localStorage.setItem("data"  , JSON.stringify(list));
   displayData();
  
}; 
// validate   

function isValidURL(string) {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // بداية https:// أو http:// اختيارية
    '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // دومين مثل example.com
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // أو IP
    '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // بورت ومسارات
    '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // استعلامات
    '(\\#[-a-zA-Z\\d_]*)?$','i'); // هاش
  return !!pattern.test(string);
}
