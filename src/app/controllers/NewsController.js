class NewsController {
    //[Get] /news
    index(req,res){
        res.render('news');
    }
    //[Get] /news/:slug
    show(req,res){
        res.send('New Details');
    }
}
module.exports = new NewsController;