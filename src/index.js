import 'dotenv/config'
import {app} from "./app.js";
import { ConnectDB } from "./db/index.js";


try {
    ConnectDB();
    app.on("error", (error) => {
        console.log(error)
    })
} catch (error) {
    console.log(error)
}

app.listen(3000, () => {
    console.log("listening on port 3000")
})