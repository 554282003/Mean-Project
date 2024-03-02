const {Schema,model} = require('mongoose');

const projectSchema = Schema({
    campaign_id :{
        type : Schema.Types.ObjectId ,
        ref : "Campaign"  //refer to the model
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    start_date : {
        type : Date,
        default : Date.now(),
        required : true 
    },
    end_date : {
        type : Date,
        default : Date.now(),
        required : true 
    },
    status :{
        type : String,
        enum : ["In Progress","completed"],
        default : "In progress"
    },
},{timestamps : true})

const Project = model('project',projectSchema)

module.exports = Project;