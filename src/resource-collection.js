'use strict';
/* global _ */

angular.module('mgcrea.resourceCollection', ['ngResource'])

  .factory('$collection', function($resource, $filter, $q, $timeout) {

    var slice = Array.prototype.slice;
    var splice = Array.prototype.splice;
    var extend = angular.extend;
    var forEach = angular.forEach;

    var CollectionFactory = function(url, paramDefaults, actions) {

      var collection = $resource(url, paramDefaults, actions);
      var parentQuery = collection.query;
      var deferred = $q.defer();
      // var filter = $filter('filter');

      extend(collection, {

        idAttribute: '_id',

        // provide a compatible query() result layer
        $resolved: false,
        $promise: deferred.promise,
        $models: deferred.promise,

        query: function() {
          var self = this;
          parentQuery.apply(this, arguments).$promise
          .then(function(res) {
            self.$resolved = true;
            if(!self.$models.$$v) deferred.resolve(res.$promise);
            else self.$models.$$v = res;
          });
          return this;
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
          return $q.when(collection.$models.$$v || collection.$models, function(models) {
            args.unshift(models);
            return _[method].apply(_, args);
          });
        };
      });

      return collection;

    };

    return CollectionFactory;

  });
