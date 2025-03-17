import mongoose from "mongoose"

export const parseId = (id) => {
    return new mongoose.Types.ObjectId(id)
}