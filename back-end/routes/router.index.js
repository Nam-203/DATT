
const commentRouter = require('./api/router.comment');
const adminCommentRouter = require('./admin/route.comment.js');

const initialApp = (app) => {
    // *** Site Route ***
    app.use('/api/comment', commentRouter);

    // *** Admin Route ***
    app.use('/', adminRootRouter);

    // Dashboard Product
    //comment
    app.use('/comment-manager', adminAuth, adminCommentRouter);
};

module.exports = { init: initialApp };
