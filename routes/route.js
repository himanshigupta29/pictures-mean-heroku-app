var uuid = require('uuid');
var aws = require('aws-sdk');

aws.config.update({
  "accessKeyId": "AKIAI5C24EKBOYX3ONAQ",
  "secretAccessKey": "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",
  "region": "ap-south-1"
});

var s3 = new aws.S3();

const Picture = require('../models/picture');

const express = require('express');

const router = express.Router();

router.get('/products/:skip', (req, res, next) => {

  console.log('skip', req.params['skip']);

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
  // sort('-occupation').
   select({ url: 1, tags: 1, _id: 0 }).
  exec(callbackf);

  function callbackf(error, pictures) {
    res.json(pictures);
  }

  // res.send('hihihiihih');
});

router.post('/products', (req, res, next) => {

  let picture = new Picture(req.body);
  console.log('body...... ', req.body);

  picture.save((err, newPicture) => {
    if (err) {
        res.status(500).send(err);
    }
    console.log('newPicture......... ', newPicture);
    res.status(200).send(newPicture);
  });

});

// router.get('/search/:tag', (req, res, next) => {
//
//   res.send({hi: 'hello'});
//
//
// });

function getSignedUrl(req, res, next){

  console.log('============= ', req.query);

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
