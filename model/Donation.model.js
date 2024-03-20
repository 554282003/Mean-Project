const {Schema,model} = require('mongoose');

const DonationSchema = Schema({
    campaign_id :{
        type : Schema.Types.ObjectId ,
        ref : "campaign"  //refer to the model
    },
    project_id :{
        type : Schema.Types.ObjectId ,
        ref : "project"  //refer to the model
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },
    amount:{
        type : Number,
        required : true,
    },
    current_amount:{
        type : Number,
        default : 0,
    },
    donation_date:{
        type : Date.now(),
    }
},{timestamps : true})

const Donation = model('Donation',DonationSchema)

module.exports = {Donation};