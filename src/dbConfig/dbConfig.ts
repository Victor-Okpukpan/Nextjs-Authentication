import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);

        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log("MongoDB Connected")
        });
        connection.on('error', (err) => {
            console.log("Error, please connect properly" + err);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong!")
        console.log(error);
    }
}