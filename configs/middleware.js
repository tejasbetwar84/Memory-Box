module.exports.setflash=function(req,res,next){
    res.locals.flash={
        'success':req.flash('success'),
        'log_out':req.flash('log_out'),
        'error' :req.flash('error')
    }
    next();
}