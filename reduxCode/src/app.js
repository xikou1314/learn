// const helloWorld = React.createElement('div', null, 'Hello World');
// ReactDOM.render(helloWorld, document.getElementById('root'));

// const Hello = function () {
//   return React.createElement('div', null, 'Hello World');
// }

// const helloWorld = React.createElement(Hello, null, null);
// const helloWorld2 = React.createElement(Hello, null, null);
// const regularDiv = React.createElement('div', null, 'I am just a regular div');

// const parent = React.createElement('div', null,
//   helloWorld,
//   helloWorld2,
//   regularDiv,
//   'I am just a text'  
// );
// ReactDOM.render(parent, document.getElementById('root'));

class Hello {
  render() {
    return React.createElement('div', null, 'Hello World');
  }
}

const helloWorld = React.createElement(Hello, null, null);
ReactDOM.render(helloWorld, document.getElementById('root'));