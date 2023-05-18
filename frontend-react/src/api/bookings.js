import { API_URL } from "./api.js"

export async function getAllBookings() {
    // GET from the API /bookings
    const response = await fetch(
        API_URL + "/bookings",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.bookings
}
export async function getAllBookingsWithClassNameAndUserName() {
    // GET from the API /bookings
    const response = await fetch(
        API_URL + "/bookings-with-class-user",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.bookings
}

export async function getBookingByUserID(userID) {
    // GET from the API /booking/:id
    const response = await fetch(
        API_URL + "/bookings-by-user/" + userID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.bookings
}

export async function getBookingDetailsByUserID(userID) {
    // GET from the API /booking/:id
    const response = await fetch(
        API_URL + "/bookingdetails-by-user/" + userID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.bookings
}

export async function getBookingByID(bookingID) {
    // GET from the API /booking/:id
    const response = await fetch(
        API_URL + "/bookings/" + bookingID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.booking
}

export async function createBooking(booking) {
    const response = await fetch(
        API_URL + "/bookings",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(booking)
        }
    )

    const postCreateBookingResponse = await response.json()
    

    return postCreateBookingResponse.booking
    
}

export async function updateBooking(booking) {
    const response = await fetch(
        API_URL + "/bookings",
        {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(booking)
        }
    )

    const patchBookingResponse = await response.json()

    return patchBookingResponse.booking
    
}

export async function deleteBooking(bookingID) {
    const response = await fetch(
        API_URL + "/bookings/"+ bookingID,
        {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            }
        }
    )

    const deleteBookingResponse = await response.json()

    return deleteBookingResponse
}