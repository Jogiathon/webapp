const Data = require('../models/data');


exports.posts_get_all =  (req, res) => {
    Data.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  };

exports.posts_update = (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  }

exports.post_delete =  (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
}

exports.posts_putPost = (req, res) => {

  const { id, message, secondMessage, date, category, userName} = req.body;
  if ((!id && id !== 0) || !message || !secondMessage || !date || !userName) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  let data = new Data();
  data.message = message;
  data.id = id;
  data.secondMessage = secondMessage;
  data.date = date;
  data.imageData = "No Image";
  data.category = category;
  data.userName = userName;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
}

exports.posts_putData =  (req, res) => {
  let data = new Data();
  const { id, message, secondMessage, date, category, userName} = req.body;
  
  if ((!id && id !== 0) || !message || !secondMessage || !date || !userName) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }

  data.message = message;
  data.id = id;
  data.secondMessage = secondMessage;
  data.date = date;
  data.imageData = req.file.path;
  data.category = category;
  data.userName = userName;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
}

exports.posts_getPost =  (req, res, next) => {
  Data.findById({_id: req.params.postId})
    .exec()
    .then(result => {
      res.status(200).json({
        message: result.message,
        secondMessage: result.secondMessage,
        category: result.category,
        date: result.date
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}