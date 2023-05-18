import { Router } from "express";
import bcrypt from "bcryptjs";
import { v4 as uuid4 } from "uuid";
import {
  User,
  getAll,
  getByID,
  create,
  remove,
  update,
  getByAuthenticationKey,
  getByEmail,
  getAllTrainers,
} from "../models/users.js";
import { validate } from "../middleware/validator.js";
import auth from "../middleware/auth.js";

const userController = Router();

//get all users
const getAllUsersSchema = {
  type: "object",
  properties: {},
};
userController.get(
  "/users",
  validate({ body: getAllUsersSchema }),
  (req, res) => {
    // #swagger.summary = 'get all users'
    getAll()
      .then((users) => {
        res.status(200).json({
          staus: 200,
          messages: "All users",
          users: users,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

//get all trainers
userController.get("/users/trainers", (req, res) => {
  // #swagger.summary = 'get all trainers'
  getAllTrainers()
    .then((trainers) => {
      res.status(200).json({
        staus: 200,
        messages: "All trainers",
        trainers: trainers,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//get a user by id
const getUserByIdSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
  },
};

userController.get(
  "/users/:id",
  validate({ params: getUserByIdSchema }),
  (req, res) => {
    // #swagger.summary = 'get a user by id'
    const userID = req.params.id;
    getByID(userID)
      .then((user) => {
        res.status(200).json({
          staus: 200,
          messages: "User found",
          user: user,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

//create a new user
const createUserSchema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    role: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    address: {
      type: "string",
    },
  },
  required: [
    "firstName",
    "lastName",
    "email",
    "password",
    "role",
    "phone",
    "address",
  ],
};
userController.post(
  "/users",
  validate({ body: createUserSchema }),
  (req, res) => {
    // #swagger.summary = 'create a new user'
    /* #swagger.requestBody = {
            description: "Adding new user",
            content: {
                'application/json': {
                    schema: {
                        firstName: 'string',
                        lastName: 'string',
                        email: 'string',
                        password: 'string',
                        role: 'string',
                        phone: 'number',
                        address: 'string',
                    },
                    example: {
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'test@abc.com',
                        password: 'password',
                        role: 'member',
                        phone: 012346578,
                        address: '2 green street',
                    }
                }
            }
        } */
    //get the user data from the request body
    const userData = req.body;
    // hash the password
    if (!userData.password.startsWith("$2a$")) {
      userData.password = bcrypt.hashSync(
        userData.password
      );
    }
    // convert the ser data into a user model object
    const user = User(
      null,
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      userData.role,
      userData.phone,
      userData.address,
      null
    );

    //use the create model function to insert the user into the database
    create(user)
      .then((user) => {
        res.status(200).json({
          status: 200,
          message: "User created",
          user: user,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: error,
        });
      });
  }
);

//sign up a new user

const signUpUserSchema = {
  type: "object",
  required: [
    "firstName",
    "lastName",
    "email",
    "password",
    "phone",
    "address",
  ],
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
  },
};
userController.post(
  "/users/signup",
  validate({ body: signUpUserSchema }),
  (req, res) => {
    // Get the user data out of the request
    const userData = req.body;

    // hash the password
    userData.password = bcrypt.hashSync(userData.password);

    // Convert the user data into an User model object
    const user = User(
      null,
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      "member",
      userData.phone,
      userData.address,
      null
    );

    // Use the create model function to insert this user into the DB
    create(user)
      .then((user) => {
        res.status(200).json({
          status: 200,
          message: "Sign up successful",
          user: user,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Sign up failed",
        });
      });
  }
);

//delete a user by id
const deleteUserByIdSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
  },
  required: ["id"],
};
userController.delete(
  "/users/:id",
  [
    
    validate({ params: deleteUserByIdSchema }),
  ],

  (req, res) => {
    // #swagger.summary = 'delete a user by id'
    const userID = req.params.id;
    remove(userID)
      .then((user) => {
        res.status(200).json({
          staus: 200,
          messages: "User deleted",
          user: user,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

//// User login endpoint ////
const postUserLoginSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      pattern: "^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$",
      type: "string",
    },
    password: {
      type: "string",
    },
  },
};

userController.post(
  "/users/login",
  validate({ body: postUserLoginSchema }),
  (req, res) => {
    // #swagger.summary = "Login a user"
    // #swagger.tags = ["Users"]

    const loginData = req.body;

    getByEmail(loginData.email)
      .then((user) => {
        if (
          bcrypt.compareSync(
            loginData.password,
            user.password
          )
        ) {
          // the user's email and password match a user in the database.
          user.authenticationKey = uuid4().toString();
          // Store the updated user back into the database
          update(user).then((result) => {
            // Send the auth key back to the user
            res.status(200).json({
              status: 200,
              message: "user logged in",
              authenticationKey: user.authenticationKey,
            });
          });
        } else {
          // This is the case where the password doesn't match
          res.status(400).json({
            status: 400,
            message: "invalid credentials",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "login failed",
        });
      });
  }
);

//// User logout endpoint ////
const postUserLogoutSchema = {
  type: "object",
  required: ["authenticationKey"],
  properties: {
    authenticationKey: {
      type: "string",
    },
  },
};

userController.post(
  "/users/logout",
  validate({ body: postUserLogoutSchema }),
  (req, res) => {
    // #swagger.summary = "Logout a user"
    // #swagger.tags = ["Users"]
    const authenticationKey = req.body.authenticationKey;
    getByAuthenticationKey(authenticationKey)
      .then((user) => {
        user.authenticationKey = null;
        update(user).then((user) => {
          res.status(200).json({
            status: 200,
            message: "user logged out",
          });
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "failed to logout user",
        });
      });
  }
);

//// Get user by authentication key endpoint
const getUserByAuthenticationKeySchema = {
  type: "object",
  required: ["authenticationKey"],
  properties: {
    authenticationKey: {
      type: "string",
    },
  },
};

userController.get(
  "/users/by-key/:authenticationKey",
  validate({ params: getUserByAuthenticationKeySchema }),
  (req, res) => {
    const authenticationKey = req.params.authenticationKey;

    getByAuthenticationKey(authenticationKey)
      .then((user) => {
        res.status(200).json({
          status: 200,
          message: "Get user by authentication key",
          user: user,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message:
            "Failed to get user by authentication key",
        });
      });
  }
);

// update a user
const updateUserSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "number",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    role: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    address: {
      type: "string",
    },
    exist: {
      type: "number",
    },
    authenticationKey: {
      type: ["string", "null"],
    },
  },
};

userController.patch(
  "/users",
  validate({ body: updateUserSchema }),
  async (req, res) => {
    // Get the user data out of the request
    const userData = req.body;

    // hash the password if it isn't already hashed
    if (
      userData.password &&
      !userData.password.startsWith("$2a")
    ) {
      userData.password = await bcrypt.hashSync(
        userData.password
      );
    }

    // Convert the user data into a User model object
    const user = User(
      userData.id,
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      userData.role,
      userData.phone,
      userData.address,
      userData.exist,
      userData.authenticationKey
    );

    // Use the update model function to update this user in the DB
    update(user)
      .then((user) => {
        res.status(200).json({
          status: 200,
          message: "Updated user",
          user: user,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Failed to update user",
        });
      });
  }
);

export default userController;
