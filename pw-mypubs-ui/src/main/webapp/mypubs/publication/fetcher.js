(function() {


angular.module('pw.fetcher',[])
.service('PublicationFetcher', function() {

	var ctx = this

	ctx.pub = {}

	ctx.getById = function(pubId) {
		var pub = { // TODO to be fetched
			properties : {
				id             : "700000000",
				type           : "2",
				genre          : "10",
				"collection-title" : "",
				title          : "Publication Title",
				subseries      : "Climate change adaption Series",
				number         : "2012-1234",
				DOI            : "DOI code",
				ISSN           : "ISSN code",
				ISBN           : "ISBN code",
				"chapter-number": "1",
				"sub-chapter-number": "a",
				abstract       : "This is an entry. The quick brown fox jumps over the lazy dog. Sally sells sea shells at the sea shore.",
				language       : "English",
				publisher      : "US Geological Survey",
				"publisher-place" : "Reston, VA",

				"page-first"   : "0",
				"page-last"    : "100",
				"number-of-pages" : "101",

				author         : [
					{
						id:"mm",
						family : "Mastin",
						given  : "Mark",
						email  : "mm@mm.com",
					affiliation: "MM Enterprises",
						order:0,
					},
					{
						id:"je",
						family : "Josberger",
						given  : "Edward",
					affiliation: "JD Edwards",
						order:2,
					},
					{
						id:"usgs",
						"literal": "US Geological Survey",
						order:1,
					}
				],
				editor         : [
					{
						id:"gg",
						family : "Geological",
						given  : "George",
						email  : "gg@gg.com",
					affiliation: "GG Inc",
						order:0,
					},
					{
						id:"cc",
						"literal": "Corp Editor",
						order:1,
					}
				],
			},
			additionalProperties : {
				"index-id"  : "otr8068900",
				"display-to-public-date" :  "2014-05-28T23:28:56.782Z",
				"cost-center" : [{"value":"1","text":"Cost Center 1"},],
				collaboratortion: "ABC",
				"usgs-citation": "This is an entry. The quick brown fox jumps over the lazy dog. Sally sells sea shells at the sea shore.",

				"product-description": "Product description, typically a short string",
				"online-only": "Y",
				"additional-online-files": "N",
				"temporal-start": "2014-05-28", // TODO wrong date format
				"temporal-end": "2014-05-28", // TODO wrong date format
				"Notes": "This is where we put all the notes about this publication",

				links          : [
					{
						id:"a",
						type:"r",
						url :"http://foo/bar.pdf",
						text:"Report A",
						size:"1 kb",
						fileType:"pdf",
						description:"A Test Link",
						order:0,
					},
					{
						id:"b",
						type:"r",
						url :"http://foo/bar.pdf",
						text:"Report B",
						size:"2 kb",
						fileType:"pdf",
						description:"B Test Link",
						order:1,
					},
					{
						id:"c",
						type:"r",
						url :"http://foo/bar.pdf",
						text:"Report C",
						size:"3 kb",
						fileType:"pdf",
						description:"C Test Link",
						order:2,
					}
				],
				contacts       : [
					{
						id : "a",
						link: "https://github.com/USGS-CIDA/Publications-Warehouse",
						link_text: "github home",
						name:"USGS Center for Integrated Data Analytics",
						address1:"8505 Reseach Way",
						address2:"Suite 200",
						address3:"c/o Scott",
						city:"Midleton",
						state:"WI",
						zipcode:"53562",
						website:"http://cida.usgs.gov",
						order:0,
					},
					{
						id : "b",
						link: "https://github.com/USGS",
						link_text: "github home",
						name:"USGS Cartographic Applications and Processing Program",
						address1:"505 Science Drive",
						address2:"Suite 200",
						address3:"c/o Frank",
						city:"Madison",
						state:"WI",
						zipcode:"53711",
						website:"http://www.usgs.gov",
						order:1,
					},
					{
						id : "c",
						link: "https://github.com/USGS-CIDA/Publications-Warehouse",
						link_text: "github home",
						name:"USGS",
						address1:"8505 Reseach Way",
						address2:"Suite 200",
						address3:"c/o Scott",
						city:"Midleton",
						state:"WI",
						zipcode:"53562",
						website:"http://cida.usgs.gov",
						order:2,
					},
					{
						id : "d",
						link: "https://github.com/USGS",
						link_text: "github home",
						name:"CIDA",
						address1:"505 Science Drive",
						address2:"Suite 200",
						address3:"c/o Frank",
						city:"Madison",
						state:"WI",
						zipcode:"53711",
						website:"http://www.usgs.gov",
						order:3,
					},
				],
			}
		}
		ctx.pub = pub
		return pub
	}


	this.get = function() {
		return ctx.pub
	}


	this.getType = function(type) {
		var data = ctx.pub.properties[type]
		if ( angular.isUndefined(data) ) {
			data = ctx.pub.additionalProperties[type]
		}
		return data
	}


	this.getByFilter = function(filter) {
		return {}
	}

})


}) ()

/**
[{
	"id": 32132135,
	"type": "Report",
	"genre": "USGS Numbered Series",
	"collection-title": "Scientific Investigations Report",
	"number": "2014-5083",
	"Subseries-title": "Climate Change Adaption Series",
	"chapter-number": "",
	"sub-chapter-number": "",
	"title": "Monitoring recharge in areas of seasonally frozen ground in the Columbia Plateau and Snake River Plain, Idaho, Oregon, and Washington",
	"abstract": "Seasonally frozen ground occurs over approximately one‑third of the contiguous United States, causing increased winter runoff. Frozen ground generally rejects potential groundwater recharge. Nearly all recharge from precipitation in semi-arid regions such as the Columbia Plateau and the Snake River Plain in Idaho, Oregon, and Washington, occurs between October and March, when precipitation is most abundant and seasonally frozen ground is commonplace. The temporal and spatial distribution of frozen ground is expected to change as the climate warms. It is difficult to predict the distribution of frozen ground, however, because of the complex ways ground freezes and the way that snow cover thermally insulates soil, by keeping it frozen longer than it would be if it was not snow covered or, more commonly, keeping the soil thawed during freezing weather.\n\nA combination of satellite remote sensing and ground truth measurements was used with some success to investigate seasonally frozen ground at local to regional scales. The frozen-ground/snow-cover algorithm from the National Snow and Ice Data Center, combined with the 21-year record of passive microwave observations from the Special Sensor Microwave Imager onboard a Defense Meteorological Satellite Program satellite, provided a unique time series of frozen ground. Periodically repeating this methodology and analyzing for trends can be a means to monitor possible regional changes to frozen ground that could occur with a warming climate.\n\nThe Precipitation-Runoff Modeling System watershed model constructed for the upper Crab Creek Basin in the Columbia Plateau and Reynolds Creek basin on the eastern side of the Snake River Plain simulated recharge and frozen ground for several future climate scenarios. Frozen ground was simulated with the Continuous Frozen Ground Index, which is influenced by air temperature and snow cover. Model simulation results showed a decreased occurrence of frozen ground that coincided with increased temperatures in the future climate scenarios. Snow cover decreased in the future climate scenarios coincident with the temperature increases. Although annual precipitation was greater in future climate scenarios, thereby increasing the amount of water available for recharge over current (baseline) simulations, actual evapotranspiration also increased and reduced the amount of water available for recharge over baseline simulations. The upper Crab Creek model shows no significant trend in the rates of recharge in future scenarios. In these scenarios, annual precipitation is greater than the baseline averages, offsetting the effects of greater evapotranspiration in future scenarios. In the Reynolds Creek Basin simulations, precipitation was held constant in future scenarios and recharge was reduced by 1.0 percent for simulations representing average conditions in 2040 and reduced by 4.3 percent for simulations representing average conditions in 2080. The focus of the results of future scenarios for the Reynolds Creek Basin was the spatial components of selected hydrologic variables for this 92 square mile mountainous basin with 3,600 feet of relief. Simulation results from the watershed model using the Continuous Frozen Ground Index provided a relative measure of change in frozen ground, but could not identify the within-soil processes that allow or reject available water to recharge aquifers. The model provided a means to estimate what might occur in the future under prescribed climate scenarios, but more detailed energy-balance models of frozen-ground hydrology are needed to accurately simulate recharge under seasonally frozen ground and provide a better understanding of how changes in climate may alter infiltration.",
	"language": "English",
	"publisher": "U.S. Geological Survey",
	"publisher-place": "Reston, VA",
	"DOI": "string",
	"ISSN": "string",
	"ISBN": "string",
	"number-of-pages": "Number of Pages",
	"page-first": "Start Page",
	"page-last:": "End Page",

	"author": [
		{
			"family": "Mastin",
			"given": "Mark",
			"suffix": "Jr.",
			"email": "mmastin@usgs.gov",
			"rank": "1",
			"id": "1231",
			"affiliation": {
					"name": "Colorado Ice Science Center",
					"id": "213"
				},
		}, {
			"family": "Josberger",
			"given": "Edward",
			"email": "",
			"rank": "2",
			"id": "2121",
			"affiliation": {
				"name": "University of Colorado, Boulder",
					"id": "221313"
				},
		}, {
			"literal": "US Geological Survey Ice Survey Team",
			"rank": "3",
			"id": "343"
		}
	],
	"editor": [
		{
			"family": "Itor",
			"given": "Ed",
			"email": "eitor@usgs.gov",
			"rank": "1",
			"id": "124123",
			"affiliation": {
				"name": "Colorado Ice Science Center",
				"id": "213"
			},
		}
	],
}, {
	"additionalProperties": {
		"display-to-public-date": "2014-01-01T23:28:56.782Z",
		"indexID": "sir20145083",
		"collaboration": "Written in collaboration with the National Snow and Ice Data Center",
		"usgs-citation": "Mastin, Mark, and Josberger, Edward, 2014, Monitoring recharge in areas of seasonally frozen ground in the Columbia Plateau and Snake River Plain, Idaho, Oregon, and Washington: U.S. Geological Survey Scientific Investigations Report 2014–5083, 64 p., http://dx.doi.org/10.3133/sir20145083",
		"Cost Center": [
			{
				"id": "74",
				"name": "Colorado Ice Science Center"
			}, {
				"id": "115",
				"name": "Earth Resources Observations Center"
			}
		],
		"links": [
			{
				"id": "65163516",
				"rank": "1",
				"type": {
					"value": "3",
					"text": "index page"
				},
				"url": "http://pubs.usgs.gov/sir/2014/5083/",
				"text": "Index Page",
				"size": "14 MB",
				"mime_type": {
					"value": "3",
					"text": "pdf"
				}
			}
		],
		"product-description": "Product description, typically a short string",
		"online-only": "Y",
		"additional-online-files": "N",
		"temporal-start": "1-1-2011",
		"temporal-end": "1-1-2013",
		"Notes": "This is where we put all the notes about this publication"
	}
}]
**/