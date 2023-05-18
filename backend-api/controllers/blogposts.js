import { Router } from "express";
import { validate } from "../middleware/validator.js";
import { Blogpost,getAll, getById, create, remove, update, getAllBlogpostsWithUserName } from "../models/blogposts.js";

const blogpostController = Router();

//get all blogposts

blogpostController.get("/blogposts",
    (req, res) => {
        // #swagger.summary = 'get all blogposts'
        getAll().then((blogposts) => {
            res.status(200).json({
                staus:200,
                messages:"All blogposts",
                blogposts:blogposts});
        }
        ).catch((err) => {
            res.status(500).json(err);
        }
        );
    });

// Get all blogposts with user names
blogpostController.get("/blogposts-with-usernames", (req, res) => {
    // #swagger.summary = 'get all blogposts with user names'
    getAllBlogpostsWithUserName()
      .then((blogposts) => {
        res.status(200).json({
          status: 200,
          messages: "All blogposts with user names",
          blogposts: blogposts,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

//get a blogpost by id
const getBlogpostByIdSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",

        },
    }
    };

blogpostController.get("/blogposts/:id",
validate({params:getBlogpostByIdSchema}),
(req, res) => {
    // #swagger.summary = 'get a blogpost by id'
    const blogpostID = req.params.id;
    getById(blogpostID).then((blogpost) => {
        res.status(200).json({
            staus:200,
            messages:"Blogpost found",
            blogpost:blogpost});
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
}
);

//create a new blogpost
const createBlogpostSchema = {
    type: "object",
    properties: {
       
        userID: {
            type: "number",
        },
        title: {
            type: "string",
        },
        content: {
            type: "string",
        },

    }
};

blogpostController.post("/blogposts",
validate({body:createBlogpostSchema}),
(req, res) => {
    // #swagger.summary = 'create a new blogpost'
     /* #swagger.requestBody = {
            description: "Adding new blogpost",
            content: {
                'application/json': {
                    schema: {
                       userID: 'string',
                        title: 'string',
                        content: 'string',
                    },
                    example: {
                        userID: '1',
                        title: 'My first blogpost',
                        content: 'This is my first blogpost',
                    }
                }
            }
        } */
    const blogpostData = req.body;
    const datetime = new Date();
    const blogpost = Blogpost(
        null,
        datetime,
        blogpostData.userID,
        blogpostData.title,
        blogpostData.content,
    );

    create(blogpost).then((newBlogpost) => {
        res.status(200).json({
            staus:200,
            messages:"Blogpost created",
            blogpost:newBlogpost});
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
}
);

//delete a blogpost
const deleteBlogpostSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
        },
    }
};

blogpostController.delete("/blogposts/:id",
validate({params:deleteBlogpostSchema}),
(req, res) => {

    // #swagger.summary = 'delete a blogpost'
    const blogpostID = req.params.id;
    remove(blogpostID).then((blogpost) => {
        res.status(200).json({
            staus:200,
            messages:"Blogpost deleted",
            blogpost:blogpost});
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
}
);

//update a blogpost
const updateBlogpostSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
        },
        datetime: {
            type: "string",
        },
        userID: {
            type: "string",
        },
        title: {
            type: "string",
        },
        content: {
            type: "string",
        },
    }
};

blogpostController.put("/blogposts/",
validate({body:updateBlogpostSchema}),
(req, res) => {
    // #swagger.summary = 'update a blogpost'
    const blogpost = Blogpost(
        req.body.id,
        req.body.datetime,
        req.body.userID,
        req.body.title,
        req.body.content,
    );
    update(blogpost).then((updatedBlogpost) => {
        res.status(200).json({
            staus:200,
            messages:"Blogpost updated",
            blogpost:updatedBlogpost});
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
}
    )

export default blogpostController;
