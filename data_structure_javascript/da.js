console.log('----------------------------------------------------------');
// Array
var arr = ['a', 'b', 'c', 'd', 1, 3, 14, 'aev'];
console.log('Data Structure: Array');
console.log(arr);
console.log('Adding the string \'class\' to the array');
arr.push('class');
console.log(arr);
console.log('Removing the last item which is \'class\' from the array');
arr.pop();
console.log(arr);
console.log('----------------------------------------------------------');

// JSON
var dict = {
  'hello': 'world',
  'part': 1,
  12: 'circle'
};
console.log('Data Structure: JSON');
console.log(dict);
console.log('Adding foo: bar to the dict');
dict.foo = 'bar';
console.log(dict);
console.log('Removing key:value - 12:circle');
delete dict[12];
console.log(dict);
console.log('----------------------------------------------------------');

// Stack (LIFO)
// creating the stack object
function Stack() {
  this.arr = new Array();

  this.push = function(item) {
    this.arr.push(item);
  };

  this.pop = function() {
    return this.arr.pop();
  };
};
var s = new Stack();
console.log('New stack = empty stack');
console.log(s);
console.log('Pushing 1, 2, 3, 4 on stack with 4 pushes');
s.push(1);
s.push(2);
s.push(3);
s.push(4);
console.log('Stack after pushed');
console.log(s.arr);
console.log('Popping once on the stack');
console.log('Popped: ' + s.pop());
console.log(s.arr);
console.log('Popping once on the stack');
console.log('Popped: ' + s.pop());
console.log(s.arr);
console.log('----------------------------------------------------------');

// Queue (FIFO)
// creating the queue object
function Queue() {
  this.arr = new Array();

  this.unshift = function(item) {
    this.arr.unshift(item);
  };

  this.pop = function() {
    return this.arr.pop();
  };
};
var q = new Queue();
console.log('New queue = empty queue');
console.log(q);
console.log('Inserting a, b, c, d on queue with 4 unshifts');
q.unshift('a');
q.unshift('b');
q.unshift('c');
q.unshift('d');
console.log('Queue after unshifted');
console.log(q.arr);
console.log('Popping once on the queue');
console.log('Popped: ' + q.pop());
console.log(q.arr);
console.log('Popping once on the queue');
console.log('Popped: ' + q.pop());
console.log(q.arr);
console.log('----------------------------------------------------------');
