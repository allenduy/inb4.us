'use strict';

var validator = require('validator');
var _ = require('lodash');
var db = require('../../../components/database');
var users = db.user;
users.initialize();

// Get friends for user.
exports.index = function(req, res) {
  if(!req.session.username) {
    return res.status(401).jsonp({message: 'Please sign in.'});
  }
  var username = req.session.username;
  // Get user from the database
  users.searchByUsername(username, function (error, reply) {
    if(error) {
      console.log(error);
      return res.status(500).jsonp({message: 'Could not get friends.'});
    }
    // If the user does not exist, throw error.
    if(reply.rows.length === 0) {
      return res.status(400).jsonp({message: 'User does not exist.'});
    }
    var user = reply.rows[0].value;
    // If the user is not active, throw error.
    if(!user.active) {
      return res.status(400).jsonp({message: 'You must activate this account before using it.'});
    }
    // If the user has no friends, return with no results.
    if(user.friends.length === 0) {
      return res.jsonp({message: 'No results.', results: []});
    }
    // Get the friend ids from the friend list.
    var friendIds = user.friends.map(function (friend) {
      return friend.id;
    });
    // Get all the friends from the database to get the friend objects.
    users.getMultipleIds(friendIds, function (error, reply) {
      if(error) {
        console.log(error);
        return res.status(500).jsonp({message: 'Could not get friends.'});
      }
      // Get users from the response
      var usersList = reply.rows.map(function (row) {
        return row.value;
      });
      // Get the user names
      var usernames = usersList.map(function (user) {
        return user.username;
      });
      return res.jsonp({message: 'Results found.', results: usernames});
    });
  });
};