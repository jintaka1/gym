import { API_URL } from "./api.js"

export async function getAllActivities() {
    // GET from the API /activities
    const response = await fetch(
        API_URL + "/activities",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.activities
}

export async function getActivityByID(activityID) {
    // GET from the API/activities/:id
    const response = await fetch(
        API_URL + "/activities/" + activityID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.activity
}

export async function createActivity(activity) {
    const response = await fetch(
        API_URL + "/activities",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(activity)
        }
    )

    const postCreateActiityResponse = await response.json()

    return postCreateActiityResponse.actiity
}

export async function updateActiity(actiity) {
    const response = await fetch(
        API_URL + "/activities",
        {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(actiity)
        }
    )

    const patchActiityResponse = await response.json()

    return patchActiityResponse.Actiity
}

export async function deleteActivity(activityID) {
    const response = await fetch(
        API_URL + "/activities/"+activityID,
        {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            },
            
        }
    )

    const deleteActiityResponse = await response.json()

    return deleteActiityResponse
}