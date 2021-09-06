const _ = require('lodash');

var users = [
    { 'user': 'barney',  'age': 36 },
    { 'user': 'fred',    'age': 40 },
    { 'user': 'pebbles', 'age': 1 }
  ];
   
  var youngest = _
    .chain(users)
    .sortBy('age')
    .map(function(o) {
      return o.user + ' is ' + o.age;
    })
    // .head() // si lo comento imprmime [ 'pebbles is 1', 'barney is 36', 'fred is 40' ]
    .value();
  // => 'pebbles is 1'

  console.log(youngest);

  //---------------------------------------------------------------------------------------

  var arr1 = [1, 2, [3, 4]];
arr1.flat();
console.log(arr1.flat());
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//----------------------------------------------------------------------------------------
var users = [
    { 'user': 'fred',   'age': 48 },
    { 'user': 'barney', 'age': 36 },
    { 'user': 'fred',   'age': 40 },
    { 'user': 'barney', 'age': 34 }
  ];
   
  _.sortBy(users, [function(o) { return o.user; }]);
  console.log( _.sortBy(users, [function(o) { return o.user; }]));
  // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
  //[
//   { user: 'barney', age: 36 },   
//   { user: 'barney', age: 34 },   
//   { user: 'fred', age: 48 },     
//   { user: 'fred', age: 40 }      
// ]
   
  _.sortBy(users, ['user', 'age']);
  // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
  console.log( _.sortBy(users, ['user', 'age']));
//   [
//     { user: 'barney', age: 34 },
//     { user: 'barney', age: 36 },
//     { user: 'fred', age: 40 },
//     { user: 'fred', age: 48 }
//   ]