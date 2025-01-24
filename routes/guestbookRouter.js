const express = require("express");
const Guestbook_posts = require("../models/guestbook");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const guestbookPosts = await Guestbook_posts.find();

    res.json(guestbookPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getGuestbookPost, (req, res) => {
  res.send(res.gbPost);
});

router.post("/", async (req, res) => {
  const guestbookPost = new Guestbook_posts({
    name: req.body.name,
    message: req.body.message,
  });

  try {
    const newGuestbookPost = await guestbookPost.save();
    res.status(201).json(newGuestbookPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// router.patch("/:id", getGuestbookPost, async (req, res) => {
//   if (req.body.name != null) {
//     res.gbPost.name = req.body.name;
//   }
//   if (req.body.message != null) {
//     res.gbPost.message = req.body.message;
//   }

//   try {
//     const updatedGbPost = await res.gbPost.save();
//     res.json(updatedGbPost);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

router.patch("/:id", getGuestbookPost, async (req, res) => {
  // Log the incoming request body and current guestbook post for debugging purposes
  console.log("Request Body:", req.body);
  console.log("Current GB Post:", res.gbPost);

  // Update the properties if provided in the request body
  if (req.body.name != null) {
    res.gbPost.name = req.body.name;
  }
  if (req.body.message != null) {
    res.gbPost.message = req.body.message;
  }

  try {
    // Save the updated guestbook post to the database
    const updatedGbPost = await res.gbPost.save();

    // Return the updated guestbook post as JSON
    res.json(updatedGbPost);
  } catch (error) {
    // Log the error and return a 400 status with the error message
    console.error("Error saving post:", error);
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getGuestbookPost, async (req, res) => {
  console.log(res.gbPost);
  try {
    await res.gbPost.deleteOne();
    res.json({ message: "Deleted Post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//getPost middleware
async function getGuestbookPost(req, res, next) {
  let gbPost;
  try {
    gbPost = await Guestbook_posts.findById(req.params.id);
    if (gbPost == null) {
      return res.status(404).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.gbPost = gbPost;
  next();
}

module.exports = router;
