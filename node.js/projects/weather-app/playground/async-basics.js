console.log('Starting app');

setTimeout( () => {
  console.log('Inside callback after 2 seconds');
}, 2000 );

setTimeout(() => {
  console.log('Inside callback after 0 seconds');
}, 0);

console.log('Finishing app');
