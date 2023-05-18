import { db } from "../database.js";

// activity model constructor
export function Activity(
  id,
  name,
  description,
  duration,

) {
  return {
    id,
    name,
    description,
    duration,

  };
}

// create a new activity
export async function create(activity) {
  delete activity.id;
  return db
    .query(
      "INSERT INTO activities (activity_name, activity_description, activity_duration,activity_exist) VALUES (?, ?, ?,1)",
      [
        activity.name,
        activity.description,
        activity.duration,

      ]
    )
    .then(([results]) => {
      return {...Activity, id: results.insertId};
    });
}

//get all activities
export async function getAll() {

    const [allActivitiesResults] = await db.query(
        "SELECT * FROM activities WHERE activity_exist = 1"
    );
    return await allActivitiesResults.map((activity) =>
        Activity(
        activity.activity_id,
        activity.activity_name,
        activity.activity_description,
        activity.activity_duration
        )
    );
    }

//get an activity by id
export async function getById(activityID) {
    const [activityResults] = await db.query(
        "SELECT * FROM activities WHERE activity_id = ?",
        [activityID]
    );
    if (activityResults.length >0) {
        const activity = activityResults[0];
        return Promise.resolve(
        Activity(
        activity.activity_id,
        activity.activity_name,
        activity.activity_description,
        activity.activity_duration,
    
        )
    );}
    else {
        return Promise.reject("no activity found");}
    }

//update an activity
export async function update(activity) {
    return db.query(
        "UPDATE activities SET activity_name = ?, activity_description = ?, activity_duration = ? WHERE activity_id = ?",
        [
            activity.name,
            activity.description,
            activity.duration,
            activity.id,
        ]
    ).then(() => {
        return getById(activity.id);
    });
}

//delete an activity
export async function remove(activityID) {

    return db.query(
        "UPDATE activities SET activity_exist = 0 WHERE activity_id = ?",
        [activityID]
    ).then(() => {
        return Promise.resolve();
    });
}

