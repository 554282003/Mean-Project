const {Schema,model} = require('mongoose');

const projectSchema = Schema({
    campaign_id :{
        type : Schema.Types.ObjectId ,
        ref : "campaign"  //refer to the model
    },
    project_title : {
        type : String,
        required : true,
    },
    project_description : {
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

const Project = model('Project',projectSchema)

module.exports = Project;