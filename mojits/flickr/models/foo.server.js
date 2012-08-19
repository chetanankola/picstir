/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('flickrModelFoo', function (Y, NAME) {

/**
 * The flickrModelFoo module.
 *
 * @module flickr
 */

    /**
     * Constructor for the flickrModelFoo class.
     *
     * @class flickrModelFoo
     * @constructor
     */
    Y.namespace('mojito.models')[NAME] = {

        init: function (config) {
            this.config = config;
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @param callback {function(err,data)} The callback function to call when the
         *        data has been retrieved.
         */
        getData: function (callback) {
            callback(null, { some: 'data' });
        },

        getPics: function (searchTerm,num,callback){
            var numofimages = num ;
            searchTerm = encodeURIComponent(searchTerm);
            var query = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2821aea7d2727d35338d0660a0fe7c45&text="+searchTerm+"&per_page="+numofimages+"&format=json";
            console.log(query);


            function handler(err,response) {
                if(err){
                    console.log('error results');
                    return callback(err, null);
                } else if(response){
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
