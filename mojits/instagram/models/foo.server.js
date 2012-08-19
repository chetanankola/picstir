/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('instagramModelFoo', function(Y, NAME) {

/**
 * The instagramModelFoo module.
 *
 * @module instagram
 */

    /**
     * Constructor for the instagramModelFoo class.
     *
     * @class instagramModelFoo
     * @constructor
     */
    Y.mojito.models[NAME] = {

        init: function(config) {
            this.config = config;
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @param callback {function(err,data)} The callback function to call when the
         *        data has been retrieved.
         */
        getData: function(searchTerm,access_token,callback) {
           //https://api.instagram.com/v1/media/popular?client_id=8f3ceb4a6aba4f9c8e699586de0c62b9
 
            //var numofimages = num ;
            searchTerm = encodeURIComponent(searchTerm);

            //var query = 'https://api.instagram.com/v1/media/popular?client_id=8f3ceb4a6aba4f9c8e699586de0c62b9';
            //var query = 'https://api.instagram.com/v1/tags/search?q='+searchTerm+access_token;

            var query = 'https://api.instagram.com/v1/tags/'+searchTerm+'/media/recent?access_token='+access_token;
            //var query = 'https://api.instagram.com/v1/tags/london/media/recent?client_id=8f3ceb4a6aba4f9c8e699586de0c62b9'+access_token;
            console.log(query);

            function handler(err,response) {
                if(err){
                    console.log('Instagram errror');
                    console.log(err);
                    return callback(err, null);
                } else if(response){
                    console.log('Instagram response');
                    //console.log(response);
                    return callback(null,response);
                }else {
                    console.log('no results or query failed');
                    return callback(null, null);
                }
            }
            try{
                Y.mojito.lib.REST.GET(query, {}, {}, handler);
            }catch (err){
                throw err;
            }

        }

    };

}, '0.0.1', {requires: ['mojito','mojito-rest-lib', 'json-parse','cookie']});
