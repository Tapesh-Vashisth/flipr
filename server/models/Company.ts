import mongoose from "mongoose";

const schema = mongoose.Schema;

const companySchema = new schema({
    companyName: { type: String, required: true },
    data:[
        {
            date:String,
            data:Array
        }
    ]
})

export default mongoose.model('company',companySchema)