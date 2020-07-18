/*Promise*/
/*
Promise = object
Promise object - status {pending} = declared, but not done yet
*/

/*const promise = new Promise((resolve, reject)=>{
  setTimeout(()=> resolve(Math.random()), 1000);
});
console.log(promise);

promise.then(x => console.log(x));*/

//////////////////////////////////////////////////////////


/*TASK 1*/
function promiseCreator(time, value){
  const prom = new Promise((resolve, reject)=>{
    setTimeout(()=> {return resolve(console.log(value))}, time);
  });
}

promiseCreator(1000, "OK!");
/////////////////////////////////////////////////////////////

/*EXEMPLE*/
/*function getPost(id){
  return new Promise((resolve, reject)=>{

  });
}

function getPostComments(){
  return new Promise((resolve, reject)=>{
    myHttp.get('', (err, res) => {
      if(err){
        reject(err);
      }
      resolve({post, comments: res});
    })
  });
}

function getUserCreatePost(){
  return new Promise((resolve, reject)=>{

  });
}

getPost()
  .then(post => getPostComments())
  .then(comments => getUserCreatePost())
  .then(user => console.log(user))
  .catch(err => console.log(err));*/
////////////////////////////////////////////////////////////

/*FETCH*/
//https://jsonplaceholder.typicode.com/posts

/*Version 1*/
  // fetch('https://jsonplaceholder.typicode.com/posts')
  //  .then(response => {
  //   return response.json();
  //  })
  // .then(posts => console.log(posts))
  // .catch(err => console.log(err));

/*Version 2*/
/*  function getPost(id){
    return new Promise((resolve, reject) => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => response.json())
      .then(post => resolve(post))
      .catch(err => reject(err));
    });
   }

   getPost(1).then(post => console.log(post));*/

/*Version 3*/
// function getPost2(id){
//   const [userType, userId] = id.split('-');
//
//   return fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
//     .then( response => response.json(),
//   );
// }

//getPost2('user-1').then(post => console.log(post)).catch(err => console.log(err));

/*Version 4*/
// function getPost3(id){
//   return Promise.resolve().then(() =>{
//     const [userType, userId] = id.split('-');
//
//     return fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
//       .then( response => response.json(),
//     );
//   });
// }
//
// //Change getPost3(1) = err
// getPost3('user-1').then(post => console.log(post)).catch(err => console.log(err));

////////////////////////////////////////////////////////////////

/*ASYNC AWAIT*/

/*
  async - alweis combeck like promise
  await - if you need to wait until any action is completed
*/

/*VERSION 1*/
// async function getPost(id){
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${id}`
//   );
//   console.log(response);
//
//   const data = await response.json();
//   return data;
// }
//
// getPost(1)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

/*VERSION 2*/
async function getPost1(id){
  try{
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    ).than(res => res.json());

    return response;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

async function getAll(){
  const [res1, res2] = await Promise.all([getPost1(1), getPost1(2)]);
  console.log(res1, res2);
}

getAll();
