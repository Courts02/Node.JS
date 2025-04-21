// Quick check 5.1 What is the name of the function your server calls every time a request is
//  received?
// - The function that’s called after each request is received is a callback function.
//  Because the function doesn’t have an identifying name, it’s also considered to be an anonymous
//  function.

// Quick check 5.2 True or false: Every submitted form sends its full contents in a single chunk
//  of data.
// - False. Data is streamed to the server in chunks, which allows the server to respond
//  based on part of the received data or even the size of the collected data. 

// Quick check 5.3 With what URL do you route requests to the home page?
// The / route represents the home page of the application.