import mongoose from "mongoose";

export async function dpConnection() {
    await mongoose.connect(process.env.MONGO_URL)
        .then(() => { console.log('connected') })
        .catch((err) => { console.log('FAILED: ', err) })
}