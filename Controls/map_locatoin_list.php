<?php include("../Config/Config.php");?>
<?php include("../Config/CommonFunction.php");?>

<?php

	
	

		$latitude=20.5937;
		$longitude=78.9629;	
	
// Get the total number of rows in the table

				$sel_property="select * FROM location_tbl WHERE 1=1 ";
					
				if($_GET['keyword']!="")
				{
					$Getkeywordval=$_GET['keyword'];
					$sel_property =$sel_property." AND location_name LIKE '%".$Getkeywordval."%'";
				}
				if($_GET['max_lat']!=0 && $_GET['max_lng']!=0 && $_GET['min_lat']!=0 && $_GET['min_lng']!=0)
				 {
					 $sel_property =$sel_property.' AND latitude>='.$_GET['min_lat'].' AND latitude<='.$_GET['max_lat'].' AND longitude>='.$_GET['min_lng'].' AND longitude<='.$_GET['max_lng'].'';
				 }
				 
				
	$rs_property=mysqli_query($link,$sel_property);
			

		$result =array();
		while($property=mysqli_fetch_array($rs_property))
		{
				extract($property);
						$result[] = array("latitude" => $latitude, 
									  "longitude" => $longitude,
									  "location_name"=>$location_name,
									  ); 
		
		}
	
		echo json_encode($result);
	 ?> 
     
    
	


