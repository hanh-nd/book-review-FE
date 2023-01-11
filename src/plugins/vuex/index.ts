import { createLogger, createStore } from 'vuex';
import auth from './modules/auth';
import books from './modules/books';
import comments from './modules/comments';
import dialogs from './modules/dialogs';
import notifications from './modules/notifications';
import reports from './modules/reports';
import reviews from './modules/reviews';
import users from './modules/users';

const debug = import.meta.env.NODE_ENV !== 'production';

export default createStore({
    modules: {
        auth,
        books,
        users,
        reviews,
        dialogs,
        comments,
        notifications,
        reports,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
});
