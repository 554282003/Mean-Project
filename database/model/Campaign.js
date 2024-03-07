const {Schema,model} = require('mongoose')

const campaignSchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type:String,
        required : true,
    },
    goal_amount : {
        type : Number,
        required:true,
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
        enum : ["Active","completed"],
        default : "Active"
    },
},{timestamps : true})

const Campaign = model('Campaign',campaignSchema);

module.exports = Campaign;