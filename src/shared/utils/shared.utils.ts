import mongoose from "mongoose"

export const parseId = (id: string) => {
    return new mongoose.Types.ObjectId(id)
}

export const toProperCase = (str: string) => {
    return str.split(' ').map((el) => el[0] .toUpperCase()+ el.slice(1).toLowerCase()).join(' ');
}