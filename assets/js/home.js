let todo_list = '<%-todo_list%>'
var arr=[];

function myFunction(id){
    console.log('function called',id)
    if(arr.length>1){
        window.alert('Select one todo Task to edit');
    }
    else{
        window.location.href="/getbyId/?id="+id;
    }
}
//Function to get selected checkbox in case of multiple delete
function checkbox(id){
    var found = arr.find(function (element) {
        return element == id;
    });
    if (!found) {
        arr.push(id);
    } else if (found) {
        const index = arr.indexOf(id);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }
     
    console.log('arr',arr)
}
//Function to filter for getting Todo tasks by its category
function filter(value){
    console.log('value is------',value);
        window.location.href = "/getbycategory/?Category="+value;
}

console.log('my script is loaded');