import { API_URL } from "./api";

export async function login(email, password) {
    // fetch (POST) to /users/login endpoint
    const response = await fetch(
        API_URL + "/users/login",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject
}

export async function logout(authenticationKey) {
    // fetch (POST) to /users/logout endpoint
    const response = await fetch(
        API_URL + "/users/logout",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                authenticationKey
            })
        }
    )

    const APIResponseObject = response.json()

    return APIResponseObject
}

export async function getByAuthenticationKey(authenticationKey) {
    // fetch (GET) /users/by-key/:authkey endpoint
    const response = await fetch(
        API_URL + "/users/by-key/" + authenticationKey,
        {
            method: "GET"
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.user
}



export async function getAllUsers() {
    // GET from the APU /users
    const response = await fetch(
        API_URL + "/users",
        {
            method: "GET"
        }
    )

    const getUsersResponse = await response.json()

    return getUsersResponse.users
}

export async function getUserByID(userID) {
    // GET from the API /users/:id
    const response = await fetch(
        API_URL + "/users/" + userID,
        {
            method: "GET"
        })

    const getUserByIdResponse = await response.json()

    return getUserByIdResponse.user
}
//get all trainers
export async function getAllTrainers() {
    // GET from the APU /users
    const response = await fetch(
        API_URL + "/users/trainers",
        {
            method: "GET"
        }
    )

    const getUsersResponse = await response.json()

    return getUsersResponse.trainers
}

export async function createUser(user) {
    // POST to the API /users
    const response = await fetch(
        API_URL + "/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
    )

    const postCreateUserResponse = await response.json()

    return postCreateUserResponse.user
}
//sign up user
export async function signUpUser(user) {
    const response = await fetch(
        API_URL + "/users/signup",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user)
        }
    )

    const patchUserResult = await response.json()

    return patchUserResult
}

export async function updateUser(user) {
    // PUT to the API /users
    const response = await fetch(
        API_URL + "/users",
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
    )

    const postUpdateUserResponse = await response.json()

    return postUpdateUserResponse.user
}

export async function deleteUser(userID) {
    // DELETE to the API /users
    const response = await fetch(
        API_URL + "/users/"+userID,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            
        }
    )

    const postDeleteUserResponse = await response.json()

    return postDeleteUserResponse.user
}