$(function () {
    $('#search_id').focus(function () {
        $(this).data('placeholder', $(this).attr('placeholder'))
               .attr('placeholder', '');
    }).blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });
});

function trim(str) 
	{    
		if (str != null) 
		{        
			var i;        
			for (i=0; i<str.length; i++) 
			{           
				if (str.charAt(i)!=" ") 
				{               
					str=str.substring(i,str.length);                 
					break;            
				}        
			}            
			for (i=str.length-1; i>=0; i--)
			{            
				if (str.charAt(i)!=" ") 
				{                
					str=str.substring(0,i+1);                
					break;            
				}         
			}                 
			if (str.charAt(0)==" ") 
			{            
				return "";         
			} 
			else 
			{            
				return str;         
			}    
		}
	}

function clearText(id,value,value2,class_name){
	if($("#"+id).val() == value || $("#"+id).val() == value2){
			$("#"+id).val("");
			$("#"+id).attr('class',class_name);
	}
}
function FillText(id,value,class_name){
	if($("#"+id).val() == ""){
		$("#"+id).val(value);
		$("#"+id).attr('class',class_name);
	}
}



//Contact form js




//Property Enquiry js
function StartLoading() {
    $("#loadingPanel").show();
}

function StopLoading() {
    $("#loadingPanel").hide();
}




