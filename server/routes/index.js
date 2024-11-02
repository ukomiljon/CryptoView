const workoutRoutes = require('./workouts');
const userPortfolio = require('./userPortfolio');
const transactionsRoutes = require('./Transactions');
const usersRoutes = require('./users');
const transaction = require('./transaction');
const ipfs = require('./ipfs');
const nft = require('./nft');
const requireAuth = require("../middleware/requireAuth");


const registerRoutes = (app) => {

    // Apply requireAuth middleware to all routes
    app.use(requireAuth);

    // Register routes
    app.use(workoutRoutes);
    app.use(userPortfolio);
    app.use(transactionsRoutes);
    app.use(usersRoutes);
    app.use(transaction);
    app.use(ipfs);
    app.use(nft);
};

module.exports = registerRoutes;
