# [ngResourceCollection](http://mgcrea.github.com/angular-resource-collection) [![Build Status](https://secure.travis-ci.org/mgcrea/angular-resource-collection.png?branch=master)](http://travis-ci.org/#!/mgcrea/angular-resource-collection)

ngResourceCollection is a thin wrapper over the official 1.2.0+ [ngCollection](https://github.com/angular/angular.js/blob/master/src/ngResource/resource.js).
It adds a few useful methods to work with your `$resource` data, along every underscore/lodash method available:

``` javascript
var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
        'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
        'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
        'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
        'tail', 'drop', 'last', 'without', 'indexOf', 'shuffle', 'lastIndexOf',
        'isEmpty'];
```



## Examples

The main use case it to be able to do:

``` javascript
'use strict';

angular.module('$app')

  .factory('User', function($collection) {
    return $collection(REMOTE_URL + '/users/:userId?login=pocus');
  })

  .controller('NetworkCtrl', function($scope, User) {
    $scope.users = User.query().$promise;
  })

  .controller('NetworkUserCtrl', function($scope, User) {
    $scope.user = User.getById($routeParams.userId); // will used existing data previously fetch by `query()`
    // longer equivalent
    $scope.user = User.find(function(user) {
       return user._id = $routeParams.userId;
    });
  });
```



## Quick start

+ Install the module with [bower](http://bower.io/)

``` bash
$ bower install angular-resource-collection --save
```

+ Include the required libraries (cdn/local):

> The library will work out of the box with AngularJS 1.2.0, for now, it requires the latest revision from master (unstable 1.1.5 won't work)

>
``` html
<script src="components/angular-resource-unstable/angular-resource.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/1.3.1/lodash.min.js"></script>
<!-- or "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js" -->
```

+ Inject the `resourceCollection` module into your app:

>
``` javascript
var app = angular.module('myApp', ['resourceCollection']);
```



## Contributing

Please submit all pull requests the against master branch. If your unit test contains JavaScript patches or features, you should include relevant unit tests. Thanks!



## Authors

**Olivier Louvignes**

+ http://olouv.com
+ http://github.com/mgcrea



## Copyright and license

	The MIT License

	Copyright (c) 2012 Olivier Louvignes

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
