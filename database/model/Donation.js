const {Schema,model} = require('mongoose');

const DonationSchema = Schema({
    campaign_id :{
        type : Schema.Types.ObjectId ,
        ref : "Campaign"  //refer to the model
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
        type : Date.now(),
    }
},{timestamps : true})

const Donation = model('donation',DonationSchema)

module.exports = Donation;