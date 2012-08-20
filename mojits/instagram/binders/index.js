/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('instagramBinderIndex', function(Y, NAME) {

/**
 * The instagramBinderIndex module.
 *
 * @module instagramBinderIndex
 */

    /**
     * Constructor for the instagramBinderIndex class.
     *
     * @class instagramBinderIndex
     * @constructor
     */
    Y.namespace('mojito.binders')[NAME] = {

        /**
         * Binder initialization method, invoked after all binders on the page
         * have been constructed.
         */
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *  ***INSTAGTAM****  ***INSTAGTAM****  ***INSTAGTAM****  ***INSTAGTAM****  ***INSTAGTAM****  ***INSTAGTAM****  ***INSTAGTAM****  ***INSTAGTAM***
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function(node) {
            var me = this;
            var args;
            this.node = node;
            Y.on('SEARCH_UPDATE', function(e, search) {
                //alert(search.val);
                console.log('on SEARCH_UPDATE:Instagram'+search.val);
                args = {params: {route: {
                        defer:true,
                        searchTerm:search.val,
                        numofImages:(search.num || 10)}
                }};
                this.mojitProxy.refreshView(args);
            }, this);


            args = {params: {route: {
                    defer:true
            }}};
            this.mojitProxy.refreshView(args);

            /*var scrollview_bookmarked_friends = new Y.ScrollView({
                srcNode:this.node.one('#instagram-farm-container'),
                deceleration: 0.9,
                bounce:0.1,
                flick: {
                    minDistance:10,
                    minVelocity:0.1,
                    axis: "x"
                }
            });
            
            setTimeout(function(){
                scrollview_bookmarked_friends.syncUI();
            },4000);
            scrollview_bookmarked_friends.render();
            Y.on('resize', function (e) {
                scrollview_bookmarked_friends.syncUI();
            });*/

        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client', 'cookie','scrollview','scrollview-base', 'scrollview-paginator']});
