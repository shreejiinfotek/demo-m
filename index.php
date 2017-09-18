<?php include("Config/Config.php");?>
<?php include("Config/CommonFunction.php");?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<title>
Practical
</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link rel="stylesheet" href="css/custom.css">
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<link href='http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900,100italic,300italic,400italic,700italic,900italic' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Coustard:400,900' rel='stylesheet' type='text/css'>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="js/common.js" language="javascript"></script>
<script src="js/jquery.bootstrap.newsbox.min.js" type="text/javascript"></script>
</head>
<body>
<div class="container header-part">
  <div class="col-md-6">
    <div class="logo"><h1>Practical</h1></div>
  </div>
  
</div>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<div id="loadingPanel" class="loadingPanel"> &nbsp; </div>
<link rel="stylesheet" href="css/property-style.css">
<div class="container-fluid middle-part">
  <div class="container">
    <div class="col-md-12">
      <div class="pinkhead35">
      
      </div>
      <div class="darkgreylineinner"></div>
      <div class="greytext17">
      
      </div>
      <div class="col-md-6 left-move">
        <div class="searching-top">
          <div class="fluid-fill">
          <form method="get" >
            <div class="input-group">
             <input type="text" class="form-control fix-height" placeholder="Location Name" name="keyword" id="keyword">
              <span class="ui-helper-hidden-accessible"></span> <span class="input-group-btn">
              <button type="submit" class="btn btn-primary fix-height" id="submit"> <i class="fa fa-search"></i> </button>
              </span> </div>
              </form>
          </div>
         
          
        </div>
        <div class="serching-content">
          <ul id="divresults" class="serching-row">
          </ul>
         
        </div>
      </div>
      
      <div class="col-md-6 map-padding-15">
        <div id="property_map" style="width:100%; height:600px;"></div>
        
      </div>
      
    </div>
  </div>
</div>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDi9CoZkxizBOj8YhdIJITw6f2c5LNQOjI&callback=initMap"
    async defer></script>
<script src="js/markerclusterer.js" type="application/javascript"></script>
<script src="js/infobubble.js" type="application/javascript"></script>
<script src="js/CommonScript.js" type="application/javascript"></script>


<script type="text/javascript">

$(function() {
		   
    $( "#search_id" ).autocomplete({
        source: 'Controls/search_location.php',
		 selectFirst: true,
		   autoFocus: true,
		response: function(event, ui) {
        if (!ui.content.length) {
			
        } 
    },
	 select: function( event, ui ) { 
	 var val=ui.item.label.split(' ').join('_');
	 
	 Custom_Search(val);
	 $("#city_val").show();
	 $("#city_val").html(ui.item.label+" <i class='fa fa-times-circle-o'></i>");
	 }
    });
	
});

</script>


<?php include("Controls/footer.php");?>