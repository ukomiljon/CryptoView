const workoutRoutes = require('./workouts');
const userPortfolio = require('./userPortfolio');
const transactionsRoutes = require('./Transactions');
const usersRoutes = require('./users');
const transaction = require('./transaction'); 
 
const routes = [
    { path: 'workouts', route: workoutRoutes },
    { path: 'portfolio', route: userPortfolio },
    { path: 'transactions', route: transactionsRoutes },
    { path: 'users', route: usersRoutes },
    // { path: '/transaction', route: transaction },
];

const registerRoutes = (app) => {
    // routes.forEach(({ path, route }) => {
    //     app.use(path, route);
    // });

    app.use(transaction);
};

module.exports = registerRoutes;
