/*OOP*/

/*PROTOTYPE*/
function Product(brand, price, discount){
  //1. make new object
  //2.
  //3.
  this.brand = brand;
  this.price = price;
  this.discount = discount;
  /*this.getPriceWithDiscount = function(){
    return (this.price * (100 - this.discount)) / 100;
  }*/
  //console.log(this);//return all object
}

// How add our function getPriceWithDiscount from Product in prototype of Product
Product.prototype.getPriceWithDiscount = function(){
  return console.log((this.price * (100 - this.discount)) / 100);
}

Product.prototype.setPrice = function(newPrice){
  this.price = newPrice;
}

const apple = new Product('Apple', 100, 15);
const samsung = new Product('Samsung', 200, 10);
console.log(apple);
console.log(samsung);

// rewrite apple price
apple.setPrice(372);
apple.getPriceWithDiscount();

//////////////////////////////////////////////////////////////

/*EXTENDS*/

//Object.create
const protoForObj = {
  sayHello(){
    return `Hello world ${this.firstName}`;
  },
};

//obj extend protoForObj
const obj = Object.create(protoForObj,{
  //how add new value. Descriptor => firstName:{value:value}
  firstName:{
    value: 'Denis',
  },
});
//

//extends example
function User(firstName, lastName){
  this.firstName = firstName;
  this.lastName = lastName;
}

User.prototype.getFullName = function(){
  return `${this.firstName} ${this.lastName}`;
};

User.prototype.sayHello = function(){
  return `Hello ${this.firstName} ${this.lastName}`;
};

const user = new User('Denis', 'Filipov');

//Customer extends User
function Customer(firstName, lastName, membership){
  User.call(this, firstName, lastName);
  //or
  //User.apply(this, arguments);
  this.membership = membership;
}

//How add prototype User in Customer
Customer.prototype = Object.create(User.prototype);
/*
  And now sayHello() avalible for Customer from User prototype.
  We lost Customer.constructor after Customer.prototype = Object.create(User.prototype);
*/
//Return Customer.constructor
Customer.prototype.constructor = Customer;
Customer.prototype.getMembership = function(){
  return this.membership.toUpperCase();
}

const customer = new Customer('Maks', 'Mad', 'standart');
/*
  customer.sayHello() not avalible, becouse sayHello() in proto of User.
  But, if function will be exacli in User, she will be avalible for Customer
*/


/*CLASES ES6*/

const methodName = 'setPrice';

class ProductES{
  constructor(brand, price, discount){
    this._brand = brand;
    this.price = price;
    this.discount = discount;
  }

  get brand(){
    return this._brand;
  }

  set brand(name){
    this._brand = name;
  }

  getPriceWithDiscount(){
    return console.log((this.price * (100 - this.discount)) / 100);
  }

  setPrice(newPrice){
    this.price = newPrice;
  }
  //One more variant how we can make method(calculated)
  /*
  [methodName](newPrice){
    this.price = newPrice;
  }
  or
  ['setPrice'](newPrice){
    this.price = newPrice;
  }
  */

  /*
    We can call this method (static plus) only with our class.
    Static method avalible only with
    newProduct.plus(x, y) => error
    ProductES.plus(x, y) => result
  */
  static plus(x, y){
    return x + y;
  }
}

const newProduct = new ProductES('Samsung', 200, 15);

/*EXTENDS ES6*/
class UserES {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName(){
    return `${this.firstName} ${this.lastName}`;
  };
}

class CustomerES extends UserES {
  constructor(firstName, lastName, membership) {
    //in super we write that param what we get from UserES
    super(firstName, lastName);
    //After we can add new param and methods
    this.membership = membership;
  }

  //If we write new method with old name, aafter call we get new method
  //But we can use old method  in new method? we must call old method in 'super'
  getFullName(){
    console.log('rewrite old method getFullName')
    console.log(super.getFullName())
    //or
    const parentRes = super.getFullName();
    return `${parentRes}, membership: ${this.membership}`;
  }
}

const customerES = new CustomerES('Maks', 'Mad', 'standart');
console.log(customerES);
console.log(customerES.getFullName());


/*ES5 TASKS*/
/*TASK 1*/
function Planet(name) {
    this.name = name;
    this.getName = function () {
        return 'Planet name is ' + this.name;
    }
}

function PlanetWithSatellite(name, satelliteName){
  Planet.call(this, name);
  this.satelliteName = satelliteName;
  /*this.originResult = Planet.prototype.getName.call(this);
  this.getName = function(){
    return `${this.originResult}. The satellite is ${this.satelliteName}`;
  }*/
}
PlanetWithSatellite.prototype = Object.create(Planet.prototype);

const earth = new PlanetWithSatellite('Earth', 'Moon');

earth.getName();
earth.getName = function(){
  let originResult = Planet.prototype.getName.call(this);

  return `${this.originResult}. The satellite is ${this.satelliteName}`;
}


/*TASK 2*/
function Bild(name, floors){
  this.name = name;
  this.floors = floors;
}

function Hous(name, floors, apartFloor){
  Bild.call(this, name, floors);
  this.numApartOnFloor = apartFloor;

  this.getNumFloors = function (){
    return `Floors: ${this.floors}, apartments: ${this.flors * this.numApartOnFloor}`;
  }
}

function Mall(name, floors, shopsFloor){
  Bild.call(this, name, floors);
  this.numShopsOnFloor = shopsFloor;

  this.getNumFloors = function (){
    let objResult = {
      floors: this.floors,
      tatalShop: this.floors * this.numShopsOnFloor
    };

    return objResult;
  }
}

let hous = new Hous('Duplecks', 3, 3);
let mall = new Mall('BigMall', 2, 5);


/*TASK 3*/
function Furniture(name, price){
  this.name = name;
  this.price = price;
}

Furniture.prototype.getInformaftion = function(name, price){
  return `Furniture: ${this.name} Price: ${this.price} `;
}


function OfficeFurniture(name, price, bonusValue){
  Furniture.apply(this, arguments);
  this.value = bonusValue;

  this.getInformaftion = function(){
    return `Furniture: ${this.name} Price: ${this.price} Specification: ${this.value}`;
  }
}

function HomeFurniture(name, price, bonusValue){
  Furniture.apply(this, arguments);
  this.value = bonusValue;

  this.getInformaftion = function(){
    return `Furniture: ${this.name} Price: ${this.price} Specification: ${this.value}`;
  }
}


OfficeFurniture.prototype = Object.create(Furniture.prototype);
OfficeFurniture.prototype.constructor = OfficeFurniture;
HomeFurniture.prototype = Object.create(Furniture.prototype);
HomeFurniture.prototype.constructor = HomeFurniture;


let officeFurniture = new OfficeFurniture('Table', 173.99, 'Computer');
let homeFurniture = new HomeFurniture('Sofa', 453.70, 'Angular');
let furniture = new Furniture('Sit', 320.75);


/*ES6 TASKS*/
/*TASK 1*/
class Component{
  constructor(tagName){
    this.tagName = tagName || 'div';
    this.node = document.createElement(tagName);
  }

  setText(text){
    this.node.textContent = text;
    //return console.log(this.node.textContent);
  }
}
let comp = new Component('span');

/*TASK 2*/
//bad solution
class Calculator{
  constructor(numberUser){
    this.numberUser = +numberUser;
  }
  get actualNumberEnter(){
    return console.log(this.numberUser, this.secondnumber);
  }
  set actualNumber(secondValue){
    this.secondnumber = +secondValue;
  }
  plusNumber(){
    return `Result ${this.numberUser + this.secondnumber}`;
  }
  minusNumber(){
    return `Result ${this.numberUser - this.secondnumber}`;
  }
  multiplyNumber(){
    return `Result ${this.numberUser * this.secondnumber}`;
  }
  shareNumbe(){
    return `Result ${this.numberUser / this.secondnumber}`;
  }
}

let calc = new Calculator(2);
