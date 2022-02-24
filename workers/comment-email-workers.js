const queue=require('../configs/kue');
const commentsMailer=require('../mailer/comment-mailer');

queue.process('emails',function(job,done){
    console.log('Email worker is processing the data',job.data);
    commentsMailer.NewComment(job.data);
    done();
})


