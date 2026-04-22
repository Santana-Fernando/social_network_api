import app from './app';
import { AppDataSource } from '../infrastructure/database/data-source';

AppDataSource.initialize()
  .then(() => {

    console.log('Banco conectado 🚀');
  })
  .catch((err) => console.error(err));
  
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});