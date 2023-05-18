import {db}from "../database.js";
//user model constructor
export function User(
  id,
  firstName,
  lastName,
  email,
  password,
  role,
  phone,
  address,
  exist,
  authenticationKey
) {
  return {
    id,
    firstName,
    lastName,
    email,
    password,
    role,
    phone,
    address,
    exist,
    authenticationKey
  };
}

// create a new user
export async function create(user) {
  delete user.id;
  return db
    .query(
      "INSERT INTO users (user_firstname, user_lastname, user_email, user_password, user_role, user_phone, user_address,user_exist) VALUES (?, ?, ?, ?,?,?,?,1)",
      [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.role,
        user.phone,
        user.address,
      ]
    )
    .then(([results]) => {
      return { ...User, id: results.insertId };
    });
}

//get all users
export async function getAll() {
  //get the collection of users
  const [allUsersResults] = await db.query(
    "SELECT * FROM users WHERE user_exist = 1"
  );
  return await allUsersResults.map((user) =>
    User(
      user.user_id,
      user.user_firstname,
      user.user_lastname,
      user.user_email,
      user.user_password,
      user.user_role,
      user.user_phone,
      user.user_address,
      user.user_exist,
      user.user_authenticationKey
    )
    
  );
}
//get all trainers
export async function getAllTrainers() {
  //get the collection of users
  const [allUsersResults] = await db.query(
    "SELECT * FROM users WHERE user_exist = 1 AND user_role = 'trainer'"
  );
  return await allUsersResults.map((user) =>({
    trainer_id: user.user_id,
    trainer_firstname: user.user_firstname,
    trainer_lastname: user.user_lastname,
    trainer_email: user.user_email,
    trainer_phone: user.user_phone,
    trainer_address: user.user_address,
    trainer_authenticationKey: user.user_authenticationKey
    
  })
    
      
  );
}


//get a user by id
export async function getByID(userID) {
    const [userResults] = await db.query(
        "SELECT * FROM users WHERE user_id = ?",
        [userID]
    );
    if (userResults.length > 0) {
        const user = userResults[0];
    return Promise.resolve(
        User(
        user.user_id,
        user.user_firstname,
        user.user_lastname,
        user.user_email,
        user.user_password,
        user.user_role,
        user.user_phone,
        user.user_address,
        user.user_exist,
        user.user_authenticationKey
        )
    );
    } else{
        return Promise.reject("no user found");
    }
}

//get a user by email
export async function getByEmail(userEmail) {
    const [userResults] = await db.query(
        "SELECT * FROM users WHERE user_email = ? AND user_exist = 1",
        [userEmail]
    );
    if (userResults.length > 0) {
        const user = userResults[0];
    return Promise.resolve(
        User(
        user.user_id,
        user.user_firstname,
        user.user_lastname,
        user.user_email,
        user.user_password,
        user.user_role,
        user.user_phone,
        user.user_address,
        user.user_exist,
        user.user_authenticationKey
        )
    );
    } else{
        return Promise.reject("no user found");
    }
}

//get a user by authenticationKey
export async function getByAuthenticationKey(userauthenticationKey) {
    const [userResults] = await db.query(
        "SELECT * FROM users WHERE user_authenticationKey = ? AND user_exist = 1",
        [userauthenticationKey]
    );
    if (userResults.length > 0) {
        const user = userResults[0];
    return Promise.resolve(
        User(
        user.user_id,
        user.user_firstname,
        user.user_lastname,
        user.user_email,
        user.user_password,
        user.user_role,
        user.user_phone,
        user.user_address,
        user.user_exist,
        user.user_authenticationKey
        )
    );
    } else{
        return Promise.reject("no user found");
    }
}


//update a user
export async function update(user) {
    return db
        .query(
        "UPDATE users SET user_firstname = ?, user_lastname = ?, user_email = ?, user_password = ?, user_role = ?, user_phone = ?, user_address = ?, user_authenticationKey =? WHERE user_id = ?",
        [
          user.firstName,
          user.lastName,
          user.email,
          user.password,
          user.role,
          user.phone,
          user.address,
          user.authenticationKey,
            user.id,
        ]
        ).then(([results]) => {
            return user;
        })

    }

    // delete a user
    export async function remove(userID) {
        return db.query("UPDATE users SET user_exist = 0 WHERE user_id = ?", [userID]);
    }
    