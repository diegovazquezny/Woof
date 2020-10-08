const User = require('../models/UserModels');
const Activities  = require('../models/ActivitiesModels');

const matchesController = {};

// FINDING AN ACTIVITIES MATCH FOR THE USER BASED ON USER ID. 

matchesController.userActivities = (req, res, next) => {
  // console.log(`Requesting for user data`);
  const { data } = res.locals;
  // console.log('data ---> ', res.locals)
  User.findById(data._id, (err, user) => {
    if (err) {
      return next({ err });
    }
    const activities = user.preferred_activities;
    // Getting an array of the user's activities
    const activitiesArray = activities.map((activity) => {
      return activity.activity;
    });
    res.locals.activities = activitiesArray;
    // console.log(res.locals.activities)
    // console.log(res.locals.activities);
    next();
  });
};

matchesController.getUniqueIds = (req, res, next) => {
  // console.log(`Requesting for activities array`);
  const { activities } = res.locals;

  // Changing all activities to lowercase
  const activitiesUpdate = activities.map((activity) => activity.toLowerCase()) 

  // const matchesArray = []
  Activities.find({ name: { $in: activitiesUpdate } })
    .then((users) => {
      // Loop through array of activities to extract the ids. Expect to receive an array of IDs that are not duplicates
      // console.log('users -----> ', users);
      const arrayOfIds = [];
      users.forEach((activity) => {
        arrayOfIds.push(activity.users);
      });
      // Return a flattened array of IDs with no duplicates. Save result to res.locals
      const flattenArrayId = arrayOfIds.flat()
      
      const result = [];
      for (let index = 0; index < flattenArrayId.length; index += 1) {
        if (!result.includes(flattenArrayId[index].toString())) result.push(flattenArrayId[index].toString())
      }
      // console.log(arrayOfIds)
      // const uniqueIds =  [...new Set(flattenArrayId)];
      // console.log('uniqueIds1 -->', uniqueIds);
      res.locals.uniqueIds = result;
      // console.log('uniqueIDs --> ', res.locals.uniqueIds);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Return list of users with this array
matchesController.returnMatches = (req, res, next) => {
  // console.log(`Returning Matches`);
  const { uniqueIds } = res.locals;
  // console.log(res.locals.uniqueIds);
  // console.log(typeof res.locals.uniqueIds[0].toString());
  
  // // const idString = uniqueIds.map((id) => id.toString())
  // // console.log(idString)
  
  //Find users based on input ID
  User.find({
    _id: { $in: uniqueIds },
  })
    .then((data) => {
      console.log(data);
      res.locals.matchingUsersInfo = data 
      next()
    })
    .catch((err) => {
      console.log(err);
    });
}


module.exports = matchesController;