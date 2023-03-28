import app from "./app";
import { connectDataBase } from "./database/index";

app.listen(3000, async () => {
    await connectDataBase();
    console.log("Server is running!");
});
