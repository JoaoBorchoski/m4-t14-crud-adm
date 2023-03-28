import client from "./config";

const connectDataBase = async (): Promise<void> => {
    await client.connect();
    console.log("Database connect!");
};

export default connectDataBase;
