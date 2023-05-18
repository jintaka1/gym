import { db } from "../database.js";

//blogpost model constructor
export function Blogpost(
    id,
    datetime,
    user_id,
    title,
    content
    ) {
    return {
        id,
        datetime,
        user_id,
        title,
        content
    }
    }

// create a new blogpost
export async function create(blogpost) {
    delete blogpost.id;
    return db
        .query(
            "INSERT INTO blogposts (post_datetime, post_user_id, post_title, post_content) VALUES (?, ?, ?, ?)",
            [
                blogpost.datetime,
                blogpost.user_id,
                blogpost.title,
                blogpost.content
            ]
        )
        .then(([results]) => {
            return {...Blogpost, id: results.insertId};
        });
}

//get all blogposts
export async function getAll() {
    //get the collection of blogposts
    const [allBlogpostsResults] = await db.query(
        "SELECT * FROM blogposts"
    );
    return await allBlogpostsResults.map((blogpost) =>
        Blogpost(
            blogpost.post_id,
            blogpost.post_datetime,
                blogpost.post_user_id,
                blogpost.post_title,
                blogpost.post_content
        )
    );
}

// get all blogposts with user names
export async function getAllBlogpostsWithUserName() {
    // Get the collection of blogposts with user names
    const [allBlogpostsResults] = await db.query(
        `SELECT blogposts.post_id, blogposts.post_datetime, blogposts.post_user_id, blogposts.post_title, blogposts.post_content,
                users.user_firstname, users.user_lastname
         FROM blogposts
         INNER JOIN users ON blogposts.post_user_id = users.user_id
         ORDER BY blogposts.post_datetime DESC`
    );
    return await allBlogpostsResults.map((blogpost) =>
        ({
            id: blogpost.post_id,
            datetime: blogpost.post_datetime,
            user_id: blogpost.post_user_id,
            title: blogpost.post_title,
            content: blogpost.post_content,
            user_firstname: blogpost.user_firstname,
            user_lastname: blogpost.user_lastname
        })
    );
}

//get a blogpost by id
export async function getById(id) {
    const [blogpostResults] = await db.query(
        "SELECT * FROM blogposts WHERE post_id = ?",
        [id]
    );
    if(blogpostResults.length > 0) {
        const blogpost = blogpostResults[0];
        return Promise.resolve(
        Blogpost(
            blogpost.post_id,
            blogpost.post_datetime,
                blogpost.post_user_id,
                blogpost.post_title,
                blogpost.post_content
        )
    );
        }else{
            return Promise.reject("No blogposts found");
        }
}

//update a blogpost
export async function update(blogpost) {
    const [results] = await db.query(
        "UPDATE blogposts SET post_datetime = ?, post_user_id = ?, post_title = ?, post_content = ? WHERE post_id = ?",
        [
            blogpost.datetime,
            blogpost.user_id,
            blogpost.title,
            blogpost.content,
            blogpost.id
        ]
    )
}

//delete a blogpost
export async function remove(blogpostID) {
    return db.query(
        "DELETE FROM blogposts WHERE post_id = ?",
        [blogpostID]
    );
}