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
    project_image:{
        type : String, 
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
    goal_amount : {
        type : String,
        required: true,
        default : 0
    },
    status :{
        type : String,
        enum : ["In Progress","completed"],
        default : "In progress"
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'   //refers
    }
},{timestamps : true})

const Project = model('Project',projectSchema)

module.exports = {Project};