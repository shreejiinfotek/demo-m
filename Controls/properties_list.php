<?php include("../Config/Config.php");?>
<?php include("../Config/CommonFunction.php");?>
<?php

//Number of results displayed per page 	by default its 10.
if (!(isset($_GET['page']))) { 
	 $pagenum = 1; 
} else {
	$pagenum = intval($_GET['page']); 		
}


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
				$propety_count =mysqli_num_rows($rs_property);
				$last = ceil($propety_count/PAGINATION);
				//this makes sure the page number isn't below one, or more than our maximum pages 
				if ($pagenum < 1) { 
					$pagenum = 1; 
				} elseif ($pagenum > $last)  { 
					$pagenum = $last; 
				}
				$lower_limit = ($pagenum - 1) * PAGINATION;
				$high_limit = ($pagenum  * PAGINATION);
				if($high_limit > $propety_count)
				{
					$high_limit =$propety_count;
				}

		while($sub_property=mysqli_fetch_array($rs_property))
		{
			 
			?>

<li>
  <div class="serching-item"><h3><?php echo $sub_property["location_name"];?></h3></div>
</li>
<?php }
	 if($propety_count==0)
	 { ?>
<br />
<center>
  <i class="fa fa-ban fa-3x text-faded"></i>
  <p> There are no available spaces that match your criteria.</p>
</center>
<?php }else
	 { ?>
<br />

<?php }
	 ?>
<input type="hidden" id="hdTotalRecord" value="<?php echo $propety_count?>"/>

