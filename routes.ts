import http from 'http';

type RequestHandlerProps = {
  req: http.IncomingMessage;
  res: http.ServerResponse;
}

type FormUrlEncodedString = string & { __brand: 'FormUrlEncoded' };

export const requestHandler = ({req, res}: RequestHandlerProps) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Assignment 3</title></head>');
    res.write('<body>');
    res.write('<h1>Please enter a new user.</h1>');
    res.write('<ul>');
    res.write('<li>User 1</li>');
    res.write('<li>User 2</li>');
    res.write('<li>User 3</li>');
    res.write('<li>User 4</li>');
    res.write('</ul>');
    res.write('<form action="/create-user" method="POST"><input name="username"><button>Create User</button></input></form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString() as FormUrlEncodedString;
      const message = new URLSearchParams(parsedBody).get('username') ?? '';
      console.log(message);
      return res.end();
    });
  }
}
