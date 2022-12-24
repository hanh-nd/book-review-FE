import { createLogger, createStore } from 'vuex';
import auth from './modules/auth';
import books from './modules/books';
import reviews from './modules/reviews';
import users from './modules/users';

const debug = import.meta.env.NODE_ENV !== 'production';

export default createStore({
    modules: {
        auth,
        books,
        users,
        reviews,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
});
