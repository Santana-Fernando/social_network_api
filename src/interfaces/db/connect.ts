import { AppDataSource } from "../../infrastructure/database/data-source";

function connect() {
    AppDataSource.initialize()
        .then(() => {

            console.log('Banco conectado 🚀');
        })
        .catch((err) => console.error(err));
}

export default connect