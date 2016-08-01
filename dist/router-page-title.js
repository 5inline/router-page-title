/**
 * Set the page title of a document in Angular using the UI Router.
 * @version  1.0.5
 * {@link }
 * @license MIT License
 */
(function(window,angular) {
'use strict';

angular.module('routerPageTitle', [])
.provider( 'routerPageTitle', routerPageTitleProvider)
.directive( 'routerPageTitle', routerPageTitleDirective)
.directive( 'routerPageDescription', routerPageDescriptionDirective);

function routerPageTitleProvider ()
{
	var pageTitle = {
		siteTitle : 'Website',
		siteSeparator : ' | ',
		pageTitle : '',
		title : '',
		description : '',
		setSite : setSite,
		setSeparator : setSeparator,
		setDescription : setDescription,
		getDescription : getDescription,
		set : set,
		get : get,
		$get : _get,
		on : on,
		_call : _call
	},
	_events = {}
	;

	/**
	 * Set the website title.
	 * @param {string} site
	 */
	function setSite(site)
	{
		this.siteTitle = site;
		this._call.call(this, 'setTitle', site);
	}

	/**
	 * Set title separator.
	 * @param {string} sep
	 */
	function setSeparator(sep)
	{
		this.siteSeparator = sep;
		this._call.call(this, 'setTitle', sep);
	}

	/**
	 * Set the current page title.
	 * @param {string} title
	 */
	function set (title)
	{
		this.pageTitle = title;
		this._call.call(this, 'setTitle', title);
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
	 * Create and return a meta description.
	 * @param {string} description
	 * @return {string}
	 */
	function setDescription (description)
	{
		this.description = description;
		this._call.call(this, 'setDescription', description);
	}

	/**
	 * Return the meta description that has been set.
	 * @return {string}
	 */
	function getDescription ()
	{
		return this.description;
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

	function _call (event, data)
	{
		if( _events[event] ) {
			_events[event].call(this, data);
		}
	}

	function on (event, fn)
	{
		_events[event] = fn;
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

				if( toRoute.data && toRoute.data.pageDescription ) {
					routerPageTitle.setDescription(toRoute.data.pageDescription);
				}
			});

			routerPageTitle.on('setTitle', function (data)
			{
				$document[0].title = routerPageTitle.get();
			});
		}
	}

	return directive;
}

routerPageDescriptionDirective.$inject = ['routerPageTitle','$document'];
function routerPageDescriptionDirective (routerPageTitle, $document)
{
	var directive = {
		restrict: 'A',
		link : function ($scope, $elem, $attr)
		{
			$scope.$on('$stateChangeSuccess', function (event, toRoute, toParams)
			{
				if( toRoute.data && toRoute.data.pageDescription ) {
					routerPageTitle.setDescription(toRoute.data.pageDescription);
				}

				$elem.attr('name','description');
				$elem.attr('content', routerPageTitle.getDescription() );
			});

			routerPageTitle.on('setDescription', function (data)
			{
				$elem.attr('content', routerPageTitle.getDescription() );
			});
		}
	}

	return directive;
}

})(window, angular || global.angular);