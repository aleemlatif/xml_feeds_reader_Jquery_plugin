/*	..........................................................................................
		author: 		Aleem Latif
 		description: 	ALfeeds -> Aleem's jQuery Plugin to read through any newsfeed XML file		
........................................................................................... */

var ALFeeds = {
	//	Set the default values
    options	 : {        
		numFeeds: 10,                
		url : 'feeds.xml',
		dataType: "xml"
	},
	init : function (numFeeds, url, dataType)	{
		ALFeeds.options.numFeeds = (numFeeds)? numFeeds : ALFeeds.options.numFeeds;
		ALFeeds.options.url = url;
		ALFeeds.options.dataType = dataType;					
		ALFeeds.render();	
	},
	render: function ()	{
			var o = ALFeeds.options;				            
			var obj = $('#feeds-group');              
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
									});	// end find('item') loop		
								
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
								
			});	//	end $.ajax object  	
				
	}		// end : render function		            

}	// end : AlFeeds jQuery Object


//==================================
jQuery(function($) {    

	// call feeds object's init function with over-riding default settings    
	ALFeeds.init(5, 'feeds.xml', 'xml');
});
