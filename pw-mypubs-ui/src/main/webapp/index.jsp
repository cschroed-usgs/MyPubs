<%@page contentType="text/html" pageEncoding="UTF-8"%>
<html ng-app="pw.mypubs">
<head>

	<title>MyPubs 2.0</title>

	<link rel="icon" type="img/x-icon" href="favicon.ico">
	<link rel="shortcut icon" type="img/x-icon" href="favicon.ico">
	
	<link rel="stylesheet" type="text/css" href="webjars/ng-grid/2.0.11/ng-grid.min.css" />

        <link rel="stylesheet" type="text/css" href="lib/bootstrap/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="lib/angular-bootstrap-datetimepicker/css/datetimepicker.css">
        <link rel="stylesheet" type="text/css" href="lib/select2/select2.css">
        <link rel="stylesheet" type="text/css" href="lib/select2/select2-bootstrap.css">
	<link rel="stylesheet" type="text/css" href="lib/font-awesome-4.1.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="mypubs/main/mypubs.css">
	<link rel="stylesheet" type="text/css" href="mypubs/main/header.css">
	<link rel="stylesheet" type="text/css" href="mypubs/datarow/datarow.css">
	<link rel="stylesheet" type="text/css" href="mypubs/publication/publication.css">
	<link rel="stylesheet" type="text/css" href="mypubs/publication/contacts/contacts.css">
	<link rel="stylesheet" type="text/css" href="mypubs/publication/contributors/contributor.css">
	<link rel="stylesheet" type="text/css" href="mypubs/publication/links/links.css">
	<link rel="stylesheet" type="text/css" href="mypubs/dnd/dragdrop.css">
	<link rel="stylesheet" type="text/css" href="mypubs/list/list.css">
    <link rel="stylesheet" type="text/css" href="css/custom.css">

</head>

<body>

	<div id="main" class="container">

		<div class="navbar navbar-fixed-top banner-area">
			<a class="navbar-brand" href="http://usgs.gov" target="_new">
				<img alt="USGS" src="mypubs/main/img/usgslogo-40.png"></img>
			</a>
			<a class="navbar-brand" href="http://cida.usgs.gov" target="_new" title="Center for Integrated Data Analytics">
				<img alt="CIDA" src="mypubs/main/img/cidalogo-40.png"></img>
			</a>

			<div id="ccsa-area">
				<a href="http://www.usgs.gov/" title="Link to main USGS page">USGS Home</a>
				<a href="http://www.usgs.gov/ask/index.html" title="Link to main USGS contact page">Contact USGS</a>
				<a href="http://search.usgs.gov/" title="Link to main USGS search (not publications search)">Search USGS</a>
			</div>
		</div>


		<div class="container mainContainer" ng-controller="mainCtrl">	    

			<div class="row">

				<div class="col-lg-12">

					<pw:notify></pw:notify>

					<div ng-view id="view"></div>

				</div>
			</div>
		</div>

	</div>
	
	
    <jsp:include page="constants.jsp"></jsp:include>

	<!-- lib dependencies -->
	
	<script type="text/javascript" src="lib/jquery/jquery.1.11.0.js"></script>
	<script type="text/javascript" src="lib/jquery-ui-1.11.0.custom/jquery-ui.js"></script>
	<script type="text/javascript" src="lib/underscore/underscore.1.6.0.js"></script>
	<script type="text/javascript" src="lib/select2/select2.3.4.8.js"></script>
	<script type="text/javascript" src="lib/tinymce/tinymce.4.1.0.min.js"></script>

	<script type="text/javascript" src="lib/angular/angular.1.2.17.js"></script>
	<script type="text/javascript" src="webjars/ng-grid/2.0.11/ng-grid.min.js"></script>
	<script type="text/javascript" src="lib/angular/angular-route.1.2.17.js"></script>
	<script type="text/javascript" src="lib/angular/angular-animate.1.2.17.js"></script>
	<script type="text/javascript" src="lib/angular/ui-select2.js"></script>
	<script type="text/javascript" src="lib/angular/ui-bootstrap-tpls-0.11.0.js"></script>
	<script type="text/javascript" src="lib/angular/ui-tinymce.0.5.x.js"></script>
	<script type="text/javascript" src="lib/ui-sortable-master/src/sortable.js"></script>
        <script type="text/javascript" src="lib/moment/moment.js"></script>
        <script type="text/javascript" src="lib/bootstrap/bootstrap.min.js"></script>

	<!-- mypubs application utils -->
        
        <script type="text/javascript" src="lib/angular-bootstrap-datetimepicker/js/datetimepicker.js"></script>
	<script type="text/javascript" src="mypubs/datarow/datarow.js"></script>
	<script type="text/javascript" src="mypubs/dnd/dragdrop.js"></script>
	<script type="text/javascript" src="mypubs/list/list.js"></script>
        <script type="text/javascript" src="mypubs/dataList/dataList.js"></script>
	<script type="text/javascript" src="mypubs/main/collection.js"></script>
	<script type="text/javascript" src="mypubs/notify/notify.js"></script>
	<script type="text/javascript" src="mypubs/modal/modal.js"></script>

	<!-- login page -->
	<script type="text/javascript" src="mypubs/main/auth.js"></script>

	<!-- home page -->
	<script type="text/javascript" src="mypubs/main/home.js"></script>

	<!-- search page -->
	<script type="text/javascript" src="mypubs/search/search.js"></script>

	<!-- reservation page -->
	<script type="text/javascript" src="mypubs/reservation/reservation.js"></script>

	<!-- publications page -->

	<script type="text/javascript" src="mypubs/publication/publication.js"></script>

	<script type="text/javascript" src="mypubs/publication/fetcher.js"></script>
	<script type="text/javascript" src="mypubs/publication/lookups.js"></script>

	<!-- publications tabs -->
	<script type="text/javascript" src="mypubs/publication/bibliodata/bibliodata.js"></script>
	<script type="text/javascript" src="mypubs/publication/catalog/catalog.js"></script>
	<script type="text/javascript" src="mypubs/publication/contacts/contacts.js"></script>
	<script type="text/javascript" src="mypubs/publication/links/links.js"></script>
	<script type="text/javascript" src="mypubs/publication/contributors/contributor.js"></script>
	
		<!-- main controller -->
	<script type="text/javascript" src="mypubs/main/mypubs.js"></script>


</body>
</html>
