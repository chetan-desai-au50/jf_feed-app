const express = require("express");
const app = express();
require("./db/config");

//cors used to fix backend issues or erros thats why its important 
const cors = require('cors');
app.use(cors())

//models
const User = require("./db/schema/user.js")
const Post = require("./db/schema/posts.js")


app.use(express.json())//its a middleware ,its used parse incoming json data from http requests

//signup
app.post('/signup', async (req, res) => {
    console.log(req.body)
    try {
        const { username, password, email, phone } = req.body;

        const user = await User.findOne({ username });
        const useremail = await User.findOne({ email });
        const userphone = await User.findOne({ phone });

        if (user) {
            console.log("Username already exist...")
            return res.status(400).json({ error: "Username already exist..." })

        }

        if (useremail) {
            console.log("Email already exist...")
            return res.status(400).json({ error: "Email already exist..." })

        }

        if (userphone) {
            console.log("Phone alredy exist...")
            return res.status(400).json({ error: "Phone Number already exist..." })

        }

        const newUser = new User({

            username,
            password,
            email,
            phone,
        })

        if (newUser) {
            await newUser.save()
            res.status(201).json({
                _id: newUser.id,
                username: newUser.username,
                phone: newUser.phone,
                email: newUser.email,
                role: newUser.role
            })

        } else {
            res.status(400).json({ error: "invaild user data..." })
        }

    } catch (err) {
        console.log("error in signup server...", err.message)
        res.status(500).json({ error: "internal server error" })
    }
})

//login
app.post('/login', async (req, res) => {

    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const pass = await User.findOne({ password });

        if (!user || !pass) {
            return res.status(400).json({ error: "invaild username and password..." })
        }
        console.log("from login-----:", user._id)

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role
        })
    }
    catch (error) {
        console.log("error in LOGIN server...", error.message)
        res.status(500).json({ error: "internal server error" })
    }


})

//this api for allPost component to create feed
app.post("/post", async (req, res) => {
    let post = new Post(req.body);

    let result = await post.save();
    result = result.toObject();// toObject convert data into the object
    res.send(result)
})

//this api for allPost component to get all feed
app.get("/posts", async (req, res) => {
    // const userId=req.params
    let mypost = await Post.find()
    if (mypost.length > 0) {
        res.send(mypost)
    } else {
        res.send("No users found...")
    }

})

//this use used in AllPost component to get all pending posts that are not approved
app.get("/notApprovePost/:isapprove", async (req, res) => {
    const isapprove = req.params.isapprove
    console.log(isapprove)

    const result = await Post.find({ isapprove: req.params.isapprove })
    if (result.length > 0) {
        res.send(result);
    } else {
        res.send("No posts found...");
    }
})

//this api is used for approve posts used in AllPost component
app.put("/update_isapprove/:id", async (req, res) => {

    let result = await Post.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )

    res.send(result)


})

//this api used for to get approved posts by admin in mypost component..... in user account(it will get only that particular user approved posts)
app.get("/isApprove_yes/:id", async (req, res) => {
    let approvedada = await Post.find({ isapprove: "yes", userId: req.params.id })
    if (approvedada.length > 0) {
        res.send(approvedada)
    } else {
        res.send("No post found...")
    }
})

//this api used for to get approved posts by admin in ApprovedByAdmin component..... in Admin account(it will get only that particular Admin approved posts)
app.get("/approveByAdmin/:id", async (req, res) => {
    let approvedada = await Post.find({ isapprove: "yes", adminId: req.params.id })
    if (approvedada.length > 0) {
        res.send(approvedada)
    } else {
        res.send("No post found...")
    }
})

//its used to get all users except current logged in user
app.get("/users/:id", async (req, res) => {
    id = req.params.id
    let users = await User.find({ _id: { $ne: id } }).select("-password")
    if (users.length > 0) {
        res.send(users)
    } else {
        res.send("No users found...")
    }
})

//its used to change role of an user to admin and admin to user
app.put("/role_user/:id", async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )

    res.send(result)
})

// this api used in Allposts component to delete particular user
app.delete("/posts/:id", async (req, res) => {
    const id = req.params.id; // Access id from request parameters
    console.log(id);

    const result = await Post.deleteOne({ _id: req.params.id });
    res.send(req.params.id);

})

//its used to get post of that particular user(in my post component)
app.get("/mypost/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    let mypost = await Post.find({ userId: id });
    if (mypost.length > 0) {
        res.send(mypost);
    } else {
        res.send("No posts found...");
    }
});

//this api used in my post component to delete particular post
app.delete("/mypost/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);

    const result = await Post.deleteOne({ _id: req.params.id });
    res.send(req.params.id);
})


//this api used in mypost component to update particular post
app.put("/mypostupdate/:id", async (req, res) => {
    let result = await Post.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )

    res.send(result)
})

//this api is used for to get single post data for update that post (mypost component)
app.get("/getSinglePost/:id", async (req, res) => {
    let result = await Post.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No Record Found" })
    }
})


// all approved post
app.get("/approvedPost", async (req, res) => {
    let result = await Post.find({ isapprove: "yes" });
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No Record Found" })
    }
})



app.listen(5000, () => {
    console.log("server is running on port 5000...")
})