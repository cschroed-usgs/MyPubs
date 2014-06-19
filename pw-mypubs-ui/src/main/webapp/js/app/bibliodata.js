(function() {


var mod = angular.module('pw.bibliodata',['pw.dataRow','ngRoute','pw.fetcher'])


mod.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Bibliodata', {
	    	templateUrl: 'templates/bibliodata.html',
	    	controller: 'biblioCtrl'
	    })
	}
])


mod.controller('biblioCtrl', [
'$scope', 'DataRowFieldService', 'PublicationFetcher', '$log',
function ($scope, DataRowFieldService, PublicationFetcher, $log) {

	var pubData = PublicationFetcher.getById('asdf')
	$scope.rows = biblioFields()
	DataRowFieldService.fieldMapper($scope.rows, pubData)


// TODO move to main if this is on all tabs

	$scope.pubslist = {
		name   : "Publications List",
		action : function() {
			// TODO service.doPublicaitonsList
		}
	}
	$scope.reset = {
		name   : "Reset",
		action : function() {
			// TODO service.doReset 
		}
	}
	$scope.release = {
		name   : "Release",
		action : function() {
			// TODO service.doRelease
		}
	}
	$scope.save = {
		name   : "Save Changes",
		action : function() {
			// TODO service.doSave 
		}
	}
	$scope.publish = {
		name   : "Publish",
		action : function() {
			// TODO service.doPublish 
		}
	}

}])


var biblioFields = function() {
	return [
		{
			name   : "pid",
			label  : "Prod ID",
			rowType: "Readonly",
		},
		{
			name   : "idx",
			label  : "Index ID",
			rowType: "Readonly",
		},
		{
			name   : "public_date",
			label  : "Display to Public Date",
			rowType: "Date", 
			elId   : "PublicDate",
		},
		{
			rowType: "Gap",
		},
		{
			name   : "pub_type",
			label  : "Publication Type",
			rowType: "Select",
			options: [{value:"1",text:'USGS Series'},{value:"2",text:'Other Series'},],
			placeholder:"Select a Publication Type",
		},
		{
			name   : "series_title",
			label  : "Series Title",
			rowType: "Select",
			options: [{value:"1",text:'Open File Report'},{value:"2",text:'Book'},],
			placeholder:"Select a Series",
		},
		{
			name   : "subseries",
			label  : "Subseries",
			rowType: "Text",
		},
		{
			name   : "series_num",
			label  : "Series Number",
			rowType: "Text",
		},
		{
			name   : "chapter",
			label  : "Chapter",
			rowType: "Text",
		},
		{
			name   : "subchapter",
			label  : "Subchapter",
			rowType: "Text",
		},
		{
			name   : "title",
			label  : "Title",
			rowType: "Text",
		},
		{
			rowType: "Gap",
		},
		{
			name   : "collaborators",
			label  : "Collaboration/Cooperation",
			rowType: "Text",
		},
		{
			name   : "abstract",
			label  : "Abstract",
			rowType: "Editor",
		},
		{
			name   : "usgs_citation",
			label  : "USGS Citation",
			rowType: "Textbox",
		},
		{
			rowType: "Gap",
		},
		{
			name   : "lang",
			label  : "Language",
			rowType: "Text",
		},
		{
			name   : "publication",
			label  : "Publication",
			rowType: "Text",
		},
		{
			name   : "pub_location",
			label  : "Publication Location",
			rowType: "Text",
		},

	]
}


}) ()
