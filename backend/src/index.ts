import { app } from "./app";
import db from './config/database-connection'
import {Constants} from './constants'
const PORT = Constants.APPLICATION_PORT;

db.connect()
.then(() => {
    app.listen(PORT, () => {
        console.log(` Server is running at http://localhost:${PORT}`)
    })
})
