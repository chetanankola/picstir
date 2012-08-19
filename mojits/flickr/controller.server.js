/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('flickr', function(Y, NAME) {

/**
 * The flickr module.
 *
 * @module flickr
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
            var searchTerm = ac.params.getFromRoute('searchTerm') || 'Yahoo';
            var defaultnumofImages  = 10;
            var number = ac.params.getFromRoute('numofImages') || defaultnumofImages;
            ac.assets.addCss('./index.css');


            ac.models.flickrModelFoo.getPics(searchTerm,number, function(err, rsp) {

                var jsonFlickrApi = function(rsp){
                    if(rsp && rsp.stat != "ok"){
                       return ac.done({searchTerm:searchTerm, error:'Flickr! you failed me!! '});
                        
                    } else {
                        if(rsp.photos){
                            var photosArr = rsp.photos.photo;
                            console.log(photosArr);

                            ac.done({searchTerm:searchTerm,photosArr:photosArr});
                        }
                    }
                };

                if (err) {
                    ac.error(err);
                    return;
                }

                if(rsp && rsp._resp && rsp._resp.responseText){
                    console.log(rsp);
                   return eval(rsp._resp.responseText);
                }

                ac.done({
                    searchTerm:searchTerm,
                    error:'Flickr! you failed me!!'
                });
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'flickrModelFoo','json-parse']});
