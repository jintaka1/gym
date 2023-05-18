import { db } from "../database.js";

//class model constructor
export function Class(
    id,
    datetime,
    roomID,
    activityID,
    trainerID,
    
    ) {
    return {
        id,
        datetime,
        roomID,
        activityID,
        trainerID,
       
    }
}

// create a new class
export async function create(newClass) {
    delete newClass.id;
    return db
        .query(
            "INSERT INTO classes (class_datetime, class_room_id, class_activity_id, class_trainer_user_id, class_exist) VALUES (?, ?, ?, ?,1)",
            [
                
                newClass.datetime,
                newClass.roomID,
                newClass.activityID,
                newClass.trainerID
                
            ]
        )
        .then(([results]) => {
            return {...Class, id: results.insertId};
        });
}

//get all classes
export async function getAll() {
    //get the collection of classes
    const [allClassesResults] = await db.query(
        "SELECT * FROM classes WHERE class_exist=1"
    );
    return await allClassesResults.map((classobj) =>
        Class(
            classobj.class_id,
            classobj.class_datetime,
                classobj.class_room_id,
                classobj.class_activity_id,
                classobj.class_trainer_user_id,
        )
        
    );
    
}
// get classes with all details
export async function getAllClassInfo() {
    const query = `
      SELECT cls.class_id, cls.class_datetime, act.activity_name, act.activity_duration,
             r.room_location, r.room_number, 
             u.user_firstname as trainer_first_name, u.user_lastname as trainer_last_name,
                u.user_email as trainer_email, u.user_phone as trainer_phone
      FROM classes cls
      JOIN activities act ON cls.class_activity_id = act.activity_id
      JOIN rooms r ON cls.class_room_id = r.room_id
      JOIN users u ON cls.class_trainer_user_id = u.user_id
        WHERE cls.class_exist = 1
      ORDER BY cls.class_datetime ASC;

    `;
  
    const [allClassInfoResults] = await db.query(query);
    return allClassInfoResults.map((classInfo) => ({
      class_id: classInfo.class_id,
      class_datetime: classInfo.class_datetime,
      activity_name: classInfo.activity_name,
        activity_duration: classInfo.activity_duration,
      room_location: classInfo.room_location,
      room_number: classInfo.room_number,
      trainer_firstname: classInfo.trainer_first_name,
      trainer_lastname: classInfo.trainer_last_name,
        trainer_email: classInfo.trainer_email,
        trainer_phone: classInfo.trainer_phone
    }));
  }

//get a class by id
export async function getById(classID) {
    //get the class
    const [classResults] = await db.query(
        "SELECT * FROM classes WHERE class_id = ?",
        [classID]
    );
    if(classResults.length> 0) {
    const classobj = classResults[0];

    return Promise.resolve(
            Class(
                classobj.class_id,
                classobj.class_datetime,
                    classobj.class_room_id,
                    classobj.class_activity_id,
                    classobj.class_trainer_user_id,
                
            
        )
    );
}else{  
    return Promise.reject("No class found");
}
}
//get class by activity id

//update a class
export async function update(classes) {
    return db
        .query(
            "UPDATE classes SET class_datetime = ?, class_room_id = ?, class_activity_id = ?, class_trainer_user_id = ? WHERE class_id = ?",
            [
                classes.datetime,
                classes.roomID,
                classes.activityID,
                classes.trainerID,
                classes.id,
                
            ]
        )
}

//delete a class
export async function remove(classID) {
    return db
        .query(
            "UPDATE classes SET class_exist = 0 WHERE class_id = ?",
            [classID]
        )
}
