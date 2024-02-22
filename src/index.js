import 'dotenv/config'
import {app} from "./app.js";
import { ConnectDB } from "./db/index.js";

ConnectDB()
    .then(() => {
        console.log("Database Connected")
    })
    .catch(error => {
        console.error("Error connecting to database:", error);
    });

    app.on("error", (error) => {
        console.error(error);
    });

app.listen(process.env.PORT||3000, () => {
    console.log(`Server Listening on port ${process.env.PORT||3000}`);
})