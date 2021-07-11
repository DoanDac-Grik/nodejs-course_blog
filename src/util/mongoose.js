//Cái util này dùng để chuyển mongoose về json để render
const { mongo } = require("mongoose");

module.exports = {
    mutipleMongooseToObject: function (mongoose){
        return mongoose.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }
};
