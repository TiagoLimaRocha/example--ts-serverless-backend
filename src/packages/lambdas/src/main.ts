import { makeApp } from 'src/plugins/express';
import { createToken, validateToken } from 'src/repositories/auth';

const token = createToken({ username: 'new_mock_username' });

console.log('CREATE_TOKEN --> ', token);
console.log('VALIDATE_TOKEN --> ', validateToken(token));

const app = makeApp();

app.get('/welcome', (req, res) => {
  res.send({ message: 'Welcome to Pet Store lambdas!' });
});

const port = process.env.EXPRESS_PORT || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on('error', console.error);
