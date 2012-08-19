/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('searchBinderIndex', function(Y, NAME) {

/**
 * The searchBinderIndex module.
 *
 * @module searchBinderIndex
 */

    /**
     * Constructor for the searchBinderIndex class.
     *
     * @class searchBinderIndex
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
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function(node) {
            var me = this;
            this.node = node;
            var self = this;
            var num;



            node.one('#numofImages').set('value',10);


            num = node.one('#numofImages').get('value');
            if(!num && num<=0 && num>20){
                num=8;
            }




            node.one('#search-box').on('keypress',function(){
                num = node.one('#numofImages').get('value');
                if(num===null && num<=0 && num>20){
                    num=8;
                }
                Y.fire('SEARCH_UPDATE', {}, {
                  val:this.get('value'),
                  num:num
                });
            });

            Y.on('key', function(e) {
                num = node.one('#numofImages').get('value');
                if(num===null && num<=0 && num>20){
                    num=8;
                }
                Y.fire('SEARCH_UPDATE', {}, {
                  val: node.one('#search-box').get('value'),
                  num:num
                });
            }, '#search-box', 'press:13');
 

            node.one('#numofImages').on('keyup',function(){
                num = node.one('#numofImages').get('value');
                if(num===null && num<=0 && num>20){
                    num=8;
                }
                Y.fire('SEARCH_UPDATE', {}, {
                  val:node.one('#search-box').get('value'),
                  num:num
                });
            });



        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client','event-key']});
