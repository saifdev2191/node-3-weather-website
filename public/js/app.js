//This is client side js file
// import axios from 'axios';


console.log('client side js file')
// fetch('http://puzzle.mead.io/puzzle').then((res)=>{
//     console.log(res)
//     // console.log(data)
//     res.json().then((data) => console.log(data))
// })
// .catch(()=>{

// })

// fetch('http://localhost:3000/weather?address=aligarh').then((res)=>{
//     res.json().then((data)=>{
//         if(data.error){
//             console.log(error)
//         }
//         else{
//             console.log(data)
//         }
        
//     })
// })

const weatherForm= document.querySelector('form');
const forecast = document.querySelector('.forecast');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = document.getElementById('loc').value;
    console.log(location)

//calling an api from client side js to web server (node.js)
fetch(`/weather?address=${location}`).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            forecast.innerHTML = data.error;
        }
        else{
            console.log(data)
            forecast.innerHTML = data.forecast;
        }
        
    })
})
})
