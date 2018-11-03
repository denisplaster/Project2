const router = require("express").Router();
const flash = require('connect-flash');
const User = require("../models").User;


// // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = function (app, passport) {

    // TEST ROUTE
    router.get('/test', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.send("THIS FUCKING WORKS");
    });

    // // Main LogIn Page ========================================================
    router.get('/login/main', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render("login-main");
    });

    // Current Users Login ========================================================
    router.get('/login', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render("login");
    });

    // router.post('/login',
    //     passport.authenticate('local'),
    //     function (req, res) {
    //         // If this function gets called, authentication was successful.
    //         // `req.user` contains the authenticated user.
    //         res.redirect('/test');
    //         //res.redirect('/users/' + req.user.username);
    //     });

    // SignUp Page ========================================================
    router.get('/signup', function (req, res) {
        console.log("sending html");
        res.render("signup");
    });

    //process the signup form
    router.post('/signup', function (req, res) {
        console.log(req.body);
        var body = req.body,
            name = body.name,
            email = body.email,
            username = body.username,
            password = body.password;
        
        // User.findOne({
        //     where: {username: username}
        // })
        // .then(user => {
        //     res.status(500).send('Username already exists');
        // })
        // .catch(err => {})
        
        User.create({name, email, username, password})
        .then(user => {
            console.log("user");
            res.status(200).end();
        })
        .catch(err => {
            console.log("theres an error");
            res.status(500).send('error occured');

        })
        
        // , function (err, doc) {
        //     if (err) {
        //         res.status(500).send('error occured')
        //     } else {
        //         if (doc) {
        //             res.status(500).send('Username already exists')
        //         } else {
        //             User.create({name, email, username, password})
        //             .then((user) => {
        //                 console.log("creating user");
        //                 console.log(user);
        //                 res.status(200);
        //             })
        //             .catch(err => {})
                    
        //         }
        //     }
        // })
    });


    // router.post('/login', passport.authenticate('local', {
    //     failureRedirect: '/login',
    //     successRedirect: '/test',
    // }), function (req, res) {
    //     res.send('hey')
    // })
   


    // Profile Page ========================================================
    // want protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    router.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.handlebars', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // LogOut Page ========================================================
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.use(router);
    
    return router;
};

