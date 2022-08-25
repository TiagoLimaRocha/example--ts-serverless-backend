import { makeApp } from 'src/plugins/express';
import { UserService } from 'src/handlers/express';

const app = makeApp(UserService);

app.get('/welcome', (req, res) => {
  res.send({ message: 'Welcome to Pet Store lambdas!' });
});

const port = process.env.EXPRESS_PORT || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on('error', console.error);
