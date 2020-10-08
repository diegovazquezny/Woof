const User = require('../models/UserModels');
const Activities = require('../models/ActivitiesModels');

const matchesController = {};

// FINDING AN ACTIVITIES MATCH FOR THE USER BASED ON USER ID.

// matchesController.findMatchingUsers = async (req, res, next) => {
//   console.log(`Requesting for user data`)
//   const { userID } = req.params;

//   try {
//     const queryResult = await User.find(({_id: userID}))
//     console.log(queryResult)
//     res.locals.user = queryResult
//   } catch (err) {
//     console.log(err)
//   }
//   return next()
// }

matchesController.findActivities = (req, res, next) => {
  const { id } = req.params;
  console.log(`Finding activities for ID:`, id);
  Activities.find({name: {$in: []}})


}


matchesController.findMatchingUsers = (req, res, next) => {
  console.log('find user matches',res.locals.data);
  const activitiesArray = res.locals.data.preferred_activities.map(obj => {
    return obj.activity.toLowerCase();
  });
  console.log('activities', activitiesArray);

  const queryResult = Activities.find({name: {$in: activitiesArray}}).exec()
  .then(query => console.log('===> query result',query));
  //console.log('====>',queryResult);
  // const { userID } = req.body;
  // console.log(req.body);
  // User.find([{"_id": userID}], (err, result) => {
  //   console.log("USER FIND QUERY RESULT: ", result)
  //   if (err) {
  //     return next({
  //       log: 'Error in starWarsController.getSpecies. Check messages for details',
  //       message: {error: err}
  //     });
  //   }
  //   res.locals.user = result;
  // })
  return next();
}

module.exports = matchesController;


// Query a user from the database with a given UserID
  //Expect: Access to the woof-users.preferred_activities Array.
    // To do: Loop through array to get access to keys
    //        Retrieve the list of activities in an array --> ['coffee', 'beach']

// Query the activities database
