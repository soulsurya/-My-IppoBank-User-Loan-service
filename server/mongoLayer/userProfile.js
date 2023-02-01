const UserProfilesQueryHolder = {}
//AggregateQuery to get user collection from mongo only the projected fields are returned

const GET_USER_BY_CUSTOMER_ID = [
    {
        '$match': ''
    }, {
        '$lookup': {
            'from': 'PublishedBatchAssessments',
            'localField': 'customerId',
            'foreignField': 'customerId',
            'as': 'accounts'
        }
    }
]


UserProfilesQueryHolder.getUserProfileWithAccounts = (customerId) => {
    console.info(`In UserProfilesQueryHolder.getUserProfileWithAccounts where customerId = ${customerId}`);
    let queryString = JSON.parse(JSON.stringify(GET_USER_BY_CUSTOMER_ID));
    queryString[0]["$match"] = customerId;
    console.info(`In UserMongo.getSubscribedUserByDate queryString = ${JSON.stringify(queryString)}`);
    return queryString;
}


export default UserProfilesQueryHolder;
