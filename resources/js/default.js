/*	..........................................................................................
		author: 		Aleem Latif
 		description: 	ALfeeds -> Aleem's jQuery Plugin to read through any newsfeed XML file		
........................................................................................... */

(function($){
 
    //	Attach this new method to jQuery
    $.fn.extend({ 
         
        //	start: ALeeds -> newsfeeds plugin
        ALfeeds: function(options) {
 			
			//	Set the default values
            var defaults = {
                numFeeds: 10,                
                url : 'anyfeeds.xml',
				dataType: "xml"				
            }
            
			// 	Facilitate overriding of default values of the plugin    
            var options =  $.extend(defaults, options);
			
            //	Iterate through the matched objects and retun the flow back to jQuery
            return this.each(function() {
				 	
				 	var o = options;                
					var obj = $(this);              
					obj.html('');			
					$.ajax({
						type: "GET",
						url: o.url,
						dataType: o.dataType,
						success: function(xml) {
										
							$(xml).find('group').each(function(){
															   
								/**
								 	generate group's header html
								*/
								var group_header = jQuery.trim($(this).find('groupHeader').text());
																
								var group_header_html = '<!-- start : .group-header -->\
															<div class="group-header clearfix">\
																  <h2 class="header">'+group_header+'</h2>\
																  <span>&nbsp;</span>\
															</div>\
														<!-- end : .group-header -->';																						
								
								/**
								 	generate group's body html
								*/
																
								var module_header = jQuery.trim($(this).find('moduleHeader').text());
								
								var LIs= '';	
									
								$(this).find('item').each(function(n){		
														   
									if (n < o.numFeeds)	{	// only show desired number of feeds
									
										item_title = jQuery.trim($(this).find('title').text());
										item_url = jQuery.trim($(this).find('url').text()); 	
										
										// generate <li> elements for all newsfeed items	
										LIs = LIs + '<li><a href="'+item_url+'">'+item_title+'</a></li>';							
										
									}
								});	// end each item loop		
								
								var group_body_html = '<div class="group-body clearfix">\
															  <!--  start : .module col-1	-->\
															  <div class="module col-1">\
																<!--  start : .module-header -->\
																<div class="module-header">\
																  <h3>'+module_header+'</h3>\
																</div>\
																<!--  // end : .module-header -->\
																<!--  start : .module-body -->\
																<div class="module-body">\
																  <ol>\
																	'+LIs+'\
																  </ol>\
																</div>\
															  </div>\
															  <!--  // end : .module-body -->\
														</div>';
								
								// complile complete html for feed's group
								var group_html = group_header_html + group_body_html;	
								
								// append group's dynamic html within the feeds container object
								obj.append(group_html);
								
							});	//	end xml -> groups iterations loop from parsed xml file 	
						},
						error: function(){
							alert("Error: could not load XML feed file");
						}
					});  // end $.ajax - jquery ajax function  
             
            }); //	end: ALfeeds -> newsfeeds plugin
        }
    });
     
      
})(jQuery);

//==================================
jQuery(function($) {    

	// call feeds plugin along with the over-riding default settings
    $('#feeds-group').ALfeeds({numFeeds: 5, url : 'feeds.xml'});	
});
