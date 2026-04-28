import app from './app';
import connect from '../interfaces/db/connect';

connect()
  
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});