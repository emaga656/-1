const mongoose = require("mongoose")

const PCSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true , "Заголовок не заполнена!"],
        trim: true

    },
    description:{
        type: String,
        required: [true, "Описание не заполнена!"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Цена не указана!"],
        min: 0
    },
    box: {
        type: String , Number,
        require: [true, "Модель не указана!"]
    }
});

module.exports = mongoose.model("PС", PCSchema)