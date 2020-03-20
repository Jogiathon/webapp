const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const PostsController = require('../controllers/posts');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/'); // potential error is null, then destination of the file
    },
    filename: function(req, file, cb) {
      console.log(file)
      cb(null, new Date().getTime() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,  
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    //fileFilter : fileFilter,
  });

// this is our get method
// this method fetches all available data in our database

  router.get('/getData', PostsController.posts_get_all);
  
  // this is our update method
  // this method overwrites existing data in our database
  router.post('/updateData', checkAuth, PostsController.posts_update);
  
  // this is our delete method
  // this method removes existing data in our database
  router.delete('/deleteData', checkAuth, PostsController.post_delete);
  
  router.post('/putPost', checkAuth, PostsController.posts_putPost);
  
  // this is our create method
  // this method adds image and body data in our database
  
  var type = upload.single('imageData');
  router.post('/putData', type, checkAuth, PostsController.posts_putData);

  router.post('/getPost/:postId' , checkAuth, PostsController.posts_getPost);
  
  module.exports = router;