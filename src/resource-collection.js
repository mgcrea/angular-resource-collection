/**
 * ngResourceCollection - Backbone-like collections for AngularJS resources
 * @version v0.2.0 - 2013-06-17
 * @link http://mgcrea.github.com/angular-pull-to-refresh
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

'use strict';
/* global _ */

angular.module('mgcrea.resourceCollection', ['ngResource'])

  .factory('$collection', function($resource, $filter, $q) {

    var slice = Array.prototype.slice;
    var splice = Array.prototype.splice;
    var extend = angular.extend;
    var forEach = angular.forEach;

    var CollectionFactory = function(url, paramDefaults, actions) {

      var collection = $resource(url, paramDefaults, actions);
      var parentQuery = collection.query;
      // var filter = $filter('filter');

      extend(collection, {

        idAttribute: '_id',

        models: [],

        query: function() {
          var value = parentQuery.apply(this, arguments);
          this.models = value.$promise;
          return value;
        },

        getById: function(id) {
          var self = this;
          return this.find(function(v, k) {
            return v[self.idAttribute] === id;
          });
        }

      });

      // Underscore methods that we want to implement on the Collection.
      var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
        'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
        'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
        'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
        'tail', 'drop', 'last', 'without', 'indexOf', 'shuffle', 'lastIndexOf',
        'isEmpty'];

      // Mix in each Underscore/Lodash method as a proxy to Collection#data.
      forEach(methods, function(method) {
        if(!angular.isDefined(_[method])) throw 'Unknown _.' + method + ' method.';
        collection[method] = function() {
          var args = slice.call(arguments);
          return $q.when(collection.models, function(models) {
            args.unshift(models);
            return _[method].apply(_, args);
          });
        };
      });

      return collection;

    };

    return CollectionFactory;

  });
