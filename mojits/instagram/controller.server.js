/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('instagram', function(Y, NAME) {

/**
 * The instagram module.
 *
 * @module instagram
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.mojito.controllers[NAME] = {

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

            ac.assets.addCss('./index.css');
            var defaultnumofImages  = 10;
            var searchTerm = ac.params.getFromRoute('searchTerm')||'yahoo';
            var numofImages = ac.params.getFromRoute('numofImages')|| defaultnumofImages;

            console.log('access_code_instagram');
            var code = ac.params.getFromUrl('code');


            var instagram_accesstoken_url = 'https://api.instagram.com/oauth/access_token';

            var params = {
                client_id:'8f63cc3549334db9af117974274f2afe',
                client_secret:'e9450c2822b2422c85381e359f70947b',
                grant_type:'authorization_code',
                redirect_uri:'http://localhost:8001/',
                code:code
            };
            console.log('access_token');
            console.log(instagram_accesstoken_url);
            var self = this;
            if(!ac.cookie.get('access_token')){
                Y.mojito.lib.REST.POST(instagram_accesstoken_url, params, {}, function(err,response) {
                    if (err) {
                        console.log(err);
                        ac.done({error:{},login:{}});
                    }
                    else if(response) {
                        var rsp_txt = response._resp.responseText;

                        var access_token = Y.JSON.parse(rsp_txt).access_token;
                        console.log(access_token);
                        ac.cookie.set('access_token',access_token);
                        self.getPhotos(ac,searchTerm,numofImages,access_token);
                    } else {
                        ac.done({error:{msg:'Instagram fail!'}});
                    }
                });

            } else{

                this.getPhotos(ac,searchTerm,numofImages,ac.cookie.get('access_token'));
            }
        },

        getPhotos:function(ac,searchTerm,numofImages,access_token) {
            console.log('cookieACcess_token:'+access_token);
            var self = this;
            ac.models.instagramModelFoo.getData(searchTerm,access_token,function(err, data) {
                if(err){
                    ac.done({error:err});
                }
                else if(data){
                    jsonData = Y.JSON.parse(data._resp.responseText);
                    //console.log(jsonData);
                    var imageData = jsonData.data;


                    imageData = self.processImages(imageData,numofImages);
                    console.log(imageData[0]);

                    ac.done({instagram:imageData});
                } else{
                    ac.done({});
                }
            });
        },

        processImages: function(imgs,n){
            var nimgs = [];
            if(n>=imgs.length)
                return imgs;

            for(i=0;i<n;i++){
                nimgs[i] = imgs[i];
            }
            return nimgs;


        }




    };

}, '0.0.1', {requires: ['mojito', 'instagramModelFoo']});
