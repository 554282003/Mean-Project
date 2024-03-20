const {Schema,model} = require('mongoose');

const DonationSchema = Schema({
    campaign_id :{
        type : Schema.Types.ObjectId ,
        ref : "Campaign"  //refer to the model
    },
    project_id :{
        type : Schema.Types.ObjectId ,
        ref : "Project"  //refer to the model
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    amount:{
        type : Number,
        required : true,
    },
    donation_date:{
        type : Date,
        default : Date.now(),
    }
},{timestamps : true})

const Donation = model('Donation',DonationSchema)

module.exports = {Donation};