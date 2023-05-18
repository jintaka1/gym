import { API_URL } from "./api.js"

export async function getAllClasses() {
    // GET from the API /classes
    const response = await fetch(
        API_URL + "/classes",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.classes
}

export async function getAllClassInfo() {
    // GET from the API /classes
    const response = await fetch(
        API_URL + "/classes/details",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.classes
}
export async function getClassByID(classID) {
    // GET from the API /classes/:id
    const response = await fetch(
        API_URL + "/classes/" + classID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.classes
}

export async function createClass(newClass) {
    const response = await fetch(
        API_URL + "/classes",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(newClass)
        }
    )

    const postCreateClassResponse = await response.json()

    return postCreateClassResponse
}

export async function updateClass(classobj) {
    const response = await fetch(
        API_URL + "/classes",
        {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(classobj)
        }
    )

    const patchClassResponse = await response.json()

    return patchClassResponse.classobj
}

export async function deleteClass(classID) {
    const response = await fetch(
        API_URL + "/classes/"+ classID,
        {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            },
            
        }
    )

    const deleteClassResponse = await response.json()

    return deleteClassResponse
}