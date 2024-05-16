import mongoose from "mongoose";

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb Connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }}
    export default connection;