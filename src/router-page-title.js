/**
 * Set the page title of a document in Angular using the UI Router.
 * @version  $VERSION
 * {@link }
 * @license MIT License
 */
(function(window,angular) {
'use strict';

angular.module('routerPageTitle', [])
.provider( 'routerPageTitle', routerPageTitleProvider)
.directive( 'routerPageTitle', routerPageTitleDirective);

function routerPageTitleProvider ()
{
	var pageTitle = {
		siteTitle : 'Website',
		siteSeparator : ' | ',
		pageTitle : '',
		title : '',
		setSite : setSite,
		setSeparator : setSeparator,
		set : set,
		get : get,
		$get : _get
	}

	/**
	 * Set the website title.
	 * @param {string} site
	 */
	function setSite(site)
	{
		this.siteTitle = site;
	}

	/**
	 * Set title separator.
	 * @param {string} sep
	 */
	function setSeparator(sep)
	{
		this.siteSeparator = sep;
	}

	/**
	 * Set the current page title.
	 * @param {string} title
	 */
	function set (title)
	{
		this.pageTitle = title;
	}

	/**
	 * Construct and return the full site title.
	 * @return {[type]} [description]
	 */
	function get ()
	{
		var _titles = [];
		if( this.pageTitle ) {
			_titles.push(this.pageTitle);
		}
		if( this.siteTitle ) {
			_titles.push(this.siteTitle);
		}

		this.title = _titles.join(this.siteSeparator);
		return this.title;
	}

	/**
	 * $provider function.
	 * @return {object}
	 */
	function _get ()
	{
		delete pageTitle.$get;
		return pageTitle;
	}

	return pageTitle;
}

routerPageTitleDirective.$inject = ['routerPageTitle','$document'];
function routerPageTitleDirective (routerPageTitle, $document)
{
	var directive = {
		restrict: 'A',
		link : function ($scope, $elem, $attr)
		{
			$document[0].title = routerPageTitle.get();

			$scope.$on('$stateChangeSuccess', function (event, toRoute, toParams)
			{
				if( toRoute.data && toRoute.data.pageTitle ) {
					routerPageTitle.set(toRoute.data.pageTitle);
					$document[0].title = routerPageTitle.get();
				}
			});
		}
	}

	return directive;
}

})(window, angular || global.angular);