var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')
var _ = require('lodash')

module.exports = function(app) {

    app.get('/searchRestaurants', function(req, res) {
        res.render('searchRestaurants')
    })

    app.get('/searchRestaurants/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword;

        var rs = _.filter(restaurants, function(n){
            if(n.name != undefined)
                return _.includes(n.name, keyword);
        });

        // _.filter returns all items in collection that return true for the function
        // _.includes returns true if keyword is in restaurant name

        res.render('listRestaurants.jade', {
            restaurants: rs
        });
    })

    app.get('/searchRestaurants/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x

        var rs = _.filter(restaurants, function(n){
            if(n.attributes["Good For"] != undefined){
                // if(n.attributes["Good For"][x] == true) //test
                //     console.log(n.name);
                return (n.attributes["Good For"][x] == true);
            }
        });        

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/searchRestaurants/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        var rs = _.filter(restaurants, function(n){
            if(n.attributes["Ambience"] != undefined){
                // if(n.attributes["Ambience"][x] == true) //test
                //     console.log(n.name);
                return (n.attributes["Ambience"][x] == true);
            }
        });    

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/searchRestaurants/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x

        if(x == 'Fast-Food')
            x = 'Fast Food';

        var rs = _.filter(restaurants, function(n){
            if(n.categories != undefined){
                // if(_.includes(n.categories, x)) //test
                //     console.log(n.name);
                return (_.includes(n.categories, x));
            }
        });    

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/searchRestaurants/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship

        var rs = _.filter(restaurants, function(n){
            if(n.stars != undefined){
                if(relationship == 'below'){
                    if(n.stars <= number)
                        return true;
                }
                if(relationship == 'above'){
                    if(n.stars >= number)
                        return true;                
                }
            }
        });           

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/searchRestaurants/restaurants/q', function(req, res) {
        var name = req.query.name
        var minStars = req.query.minStars
        var category = req.query.category
        var ambience = req.query.ambience

        console.log('req.query: ', req.query)
        console.log(category)

        // Start out with all restaurants, then go through and
        // filter out the list for each provided query term
        var rs = restaurants;

        if (name){
            rs = _.filter(rs, function(n){
                if(n.name != undefined)
                    return(_.includes(n.name, name));
            })
        }

        if(minStars){
            rs = _.filter(rs, function(n){
                if(n.stars != undefined){
                    if(n.stars >= minStars)
                        return true;                
                }
            });             
        }

        if(category){
            rs = _.filter(rs, function(n){
                if(n.categories != undefined){
                    return (_.includes(n.categories, category));
                }
            });               
        }

        if(ambience){
            rs = _.filter(rs, function(n){
                if(n.attributes["Ambience"] != undefined){
                    return (n.attributes["Ambience"][ambience] == true);
                }
            });               
        }

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })


    app.get('/searchName', function(req, res){
        console.log(req.query.restname);
        
        var name = req.query.restname;

        var rs = _.filter(restaurants, function(n){
            if(n.name != undefined)
                name_new = n.name.toLowerCase()
                name = name.toLowerCase()
                return _.includes(name_new, name);
        });

        // _.filter returns all items in collection that return true for the function
        // _.includes returns true if keyword is in restaurant name

        res.render('listRestaurants.jade', {
            restaurants: rs
        });

    })


    app.get('/searchCity', function(req, res){
        console.log(req.query.restcity);
        
        var city = req.query.restcity;

        var rs = _.filter(restaurants, function(n){
            if(n.city != undefined){
                city_new = n.city.toLowerCase()
                city = city.toLowerCase()
                return _.includes(city_new, city);
            }
        });

        // _.filter returns all items in collection that return true for the function
        // _.includes returns true if keyword is in restaurant name

        res.render('listRestaurants.jade', {
            restaurants: rs
        });

    })


}