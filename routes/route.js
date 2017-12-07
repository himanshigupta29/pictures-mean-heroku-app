// var uuid = require('uuid');
var aws = require('aws-sdk');

// require('dotenv').config()

aws.config.update({
  "accessKeyId": process.env.S3_KEY || "XXX-XXX-XXX",
  "secretAccessKey": process.env.S3_SECRET || "xxx-xxx-xxx",
  "region": "ap-south-1"
});

var s3 = new aws.S3();

const Picture = require('../models/picture');

const express = require('express');

const router = express.Router();

router.get('/pictures/:skip', (req, res, next) => {

  const skip = Number(req.params['skip']);
  let query = {};

  if(req.query.searchkey && req.query.searchkey !== '') {
    console.log('searchkey', req.query.searchkey);

    query = {tags: req.query.searchkey};
  }

  Picture.
  find(query).
  skip(skip).
  limit(7).
  sort({ _id: -1 }).
  select({ url: 1, tags: 1, _id: 0 }).
  exec(callbackf);

  function callbackf(error, pictures) {
    res.json(pictures);
  }

});

router.post('/pictures', (req, res, next) => {

  let picture = new Picture(req.body);

  picture.save((err, newPicture) => {
    if (err) {
        res.status(500).send(err);
    }
    res.status(200).send(newPicture);
  });

});

function getSignedUrl(req, res, next){

    if(!req.query.name){
      res.send('');
    }

    var params = {
      Bucket: 'himanshigupta',
      Key: 'Pictures/' + req.query.name,
      Expires: 600,
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', params, function(err, signedUrl){
      if(err){
        console.log(err);
        return next(err);
      }
      else {
        res.json({postURL: signedUrl,
        getURL: signedUrl.split('?')[0]});
      }
    });
}
router.get('/get_signed_url', getSignedUrl);

module.exports = router;
