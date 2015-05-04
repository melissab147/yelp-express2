var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')
var _ = require('lodash')

module.exports = function(app) {

    app.get('/searchDoctors', function(req, res) {
        res.render('searchDoctors')
    })

    app.get('/search/doctors/q', function(req, res) {
        var name = req.query.name
        var minStars = req.query.minStars
        var category = req.query.categories
        var city = req.query.city

        console.log('req.query: ', req.query)
        console.log(city)

        // Start out with all restaurants, then go through and
        // filter out the list for each provided query term
        var rs = doctors;

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

        if (city){
            rs = _.filter(rs, function(n){
                if(n.city != undefined)
                    return(_.includes(n.city, city));
            })
        }


        res.render('listDoctors.jade', {
            doctors: rs
        })
    })

}