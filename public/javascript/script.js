const contactForm = document.querySelector('#contact-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let project = document.getElementById('project');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    let formData = {
        name: name.value,
        email: email.value,
        project : project.value,
        message : message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            swal("Email sent", "You clicked the button!", "success");
            name.value = '';
            email.value = '';
            project.value = '';
            message.value = '';
        }else{
            swal("Something went wrong!", "You clicked the button!", "error")
        }
    }

    xhr.send(JSON.stringify(formData));
})

