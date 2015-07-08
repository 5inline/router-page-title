# Angular UI Router Page Titles

Easily add route-based page titles to your Angular web app.

### Installation
`bower install router-page-title`

Add to your Angular app modules.
```
angular.module('myModule', [
  'routerPageTitle'
])
```

Set your default site title in your Angular app config through the service provider.
```
angular.module('myModule').config(['routerPageTitleProvider', function (routerPageTitleProvider)
{
  routerPageTitleProvider.setTitle('My Website');
});
```

Set your page title in your route state data.
```
.state( 'mystate', {
  url : '/myurl',
  data : {
    pageTitle : 'My Page'
  }
})
```

Add the directive to your index.html file.
```
<html>
<head>
  <title router-page-title></title>
</head>
```
