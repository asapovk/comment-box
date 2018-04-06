var router = require('express').Router();
var mocks = require('./mock');
var assign = require('object-assign');
var jwt = require('jsonwebtoken');


router.get('/article', function (req, res, next) {
    var articles = mocks.articles.map(function (article) {
            return assign({}, article, {
                text: undefined
            })
        }),
        limit = Number(req.query.limit) || articles.length,
        offset = Number(req.query.offset) || 0;

    res.json(articles.slice(offset, limit + offset))
//      res.json(mock.articles);
});

router.get('/article/:id', function (req, res, next) {
    var article = mocks.articles.filter(function (article) {
        return article.id == req.params.id
    })[0];
    if (article) return res.json(article);

    res.status(404).json({error: "not found"});
});

router.post('/article', function (req, res, next) {
    var body = req.body;
    var article = {
        text: body.text,
        id: Date.now().toString(),
        user: body.user,
        date: new Date()
    };
    mocks.articles.push(article);
    res.json(article)
});

function checkToken (req,res,next) {
  var token = req.headers['x-access-token'];
  jwt.verify(token, 'secret', (err, decoced) =>{
    if (err) {
      return res.status(401).send('Invalid token')
    }
    next();
  })
}


router.get('/comment', checkToken,function (req, res, next) {
    var aid = req.query.article;
    /*
    if (aid) {
        var article = mocks.articles.find(function(article) {
            return article.id == aid
        })
        return res.json((article.comments || []).map(function(id) {
            return mocks.comments.find(function(comment) {
                return comment.id == id
            })
        }))
    }
    */
    if (aid) {
      var commentsOfArticle = mocks.comments.filter((comment)=>comment.article == aid)
      console.log(commentsOfArticle);

      return res.json({records: commentsOfArticle} || null)
    }
    //var comments = mocks.comments.filter((comment) => !comment.hasOwnProperty('article') || comment.article == null )
    //console.log(comments.length);
    //console.log(mocks.comments)

    var comments = mocks.comments;
    var limit = Number(req.query.limit) || comments.length,
        offset = Number(req.query.offset) || 0;
    res.json({
        total: comments.length,
        records: comments.slice(offset, limit + offset)
    })
});

router.post('/comment', checkToken,function (req, res, next) {
    var comment = {
        id : req.body.id,
        text : req.body.text,
        date: new Date(),
        user: req.body.user,
        article : req.body.article
    };
  //  console.log(comment)
    mocks.comments.push(comment);
    console.log(mocks.comments.length)
    res.json(comment)
});


router.delete('/comment/:id', checkToken,function (req,res,next){
   const commentId = req.params.id;
   comment = mocks.comments.find((comment)=>comment.id === commentId);
   const index = mocks.comments.indexOf(comment);
   mocks.comments.splice(index,1);
   res.json({id: commentId});
})


router.put('/comment/', checkToken,function (req, res, next) {
  const {id, text} = req.body;
  //console.log(req.body);
  let comment = mocks.comments.find(comment=>comment.id === id);
  console.log(comment)
  if(comment) {
    comment.text = text;
    res.json({comment: comment});
  }
  else {
    res.status(404).send('Comment not found');
  }

})

router.post('/signin', function(req,res,next){
  console.log(mocks.users);
  console.log(req.body);
  const {email, password} = req.body;
  const user =  mocks.users.find((user)=>user.email== email)
  if(user) {
    const token = jwt.sign({id: user.id}, 'secret', {expiresIn: 86400})
    res.json({user, token})
  }
  else res.status(401).send('Auth is failed')
})

router.post('/signup', function(req,res,next){
  const {email, password} = req.body;
  const user =  {
    id: 'kjbefwkbef',
    username: 'Konstantin',
    email: req.body.email,
    password: req.body.password
  }
  mocks.users.push(user);
  res.json({user});
})



router.post('/report', function (req, res) {
    res.json({})
})

module.exports = router;
