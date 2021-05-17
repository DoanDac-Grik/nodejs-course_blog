class SiteController {
    //[Get] /home
    index(req,res){
        res.render('home');
    }
}

module.exports = new SiteController;
