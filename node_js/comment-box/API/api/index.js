var router = require('express').Router();
var mocks = require('./mock');
var assign = require('object-assign');

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

router.get('/comment', function (req, res, next) {
    var aid = req.query.article;
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

    var limit = Number(req.query.limit) || mocks.comments.length,
        offset = Number(req.query.offset) || 0;
    res.json({
        total: mocks.comments.length,
        records: mocks.comments.slice(offset, limit + offset)
    })
});

router.post('/comment', function (req, res, next) {
    var comment = {
        id : req.body.id,
        text : req.body.text,
        date: new Date(),
        user: req.body.user,
        article : req.body.article
    };
    mocks.comments.push(comment);
    res.json(comment)
});


router.delete('/comment/:id', function (req,res,next){
   const commentId = req.params.id;
   comment = mocks.comments.find((comment)=>comment.id === commentId);
   const index = mocks.comments.indexOf(comment);
   mocks.comments.splice(index,1);
   res.json({id: commentId});
})


router.put('/comment/', function (req, res, next) {
  const {id, text} = req.body;
  console.log(req.body);
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

router.post('/report', function (req, res) {
    res.json({})
})

module.exports = router;
