const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.user_register = (req, res, next) => {

    const { username, password} = req.body;
    if ((!username || !password)) {
      return res.json({
        success: false,
        error: 'INVALID INPUTS',
      });
    }
    var id = new mongoose.Types.ObjectId();
    console.log(id);
    User.find({username})
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: 'Username exists. Please create a different one.'
          });
        } else {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
              username: username,
              password: hash,
              _id: id,
              });
              user
                .save()
                .then(result => {
                  const token = jwt.sign({
                      username: username,
                      userId: user._id
                    }, 
                    process.env.JWT_KEY, 
                    {
                      expiresIn: "1h"
                    }
        
                  );
                  res.set('x-auth-token', token)
                  res.set('access-control-expose-headers', 'x-auth-token')
                  res.status(201).json({
                    message: 'User Created'
                  });
                })
                .catch(err => {
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}

exports.user_login = (req,res,next) => {
    User.findOne({username : req.body.username})
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: 'Auth1 failed no length username'
          });
        }
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (err) {
            return res.status(401).json({
              message: 'Auth failed'
            }); 
          }  
          if (result) {
            const token = jwt.sign({
                username: user,
                userId: user._id
              }, 
              process.env.JWT_KEY, 
              {
                expiresIn: "1h"
              }
  
            );
            //response.setHeader('Content-Type', 'application/json')
            //res.setHeader('x-auth-token', token);
            return res
              .set('x-auth-token', token)
              .set('access-control-expose-headers', 'x-auth-token')
              .status(200).json({
                message: 'Auth Successful',
                token: token
              })
          }
          res.status(401).json({
            message:'Auth failed'
          })
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: 'cool'
        });
      }); 
  }

  exports.user_delete = (req, res, next) => {
    User.remove({_id: req.params.userId})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'User deleted'
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }