
var compteurJson = 0;
var clearHtml = false;




// populate HTML with the selected photos
function generateHtmlPhoto(photos){
	window.lightbox.enable();

	
	if (clearHtml){ 
		if(photos.length == 0){
			htmlPhoto = "<h3> <span style='padding:10px;'> Aucun résultat pour cette recherche </span> </h3>";
		}else{
		htmlPhoto = "";
		}
	} else{
		htmlPhoto = $('#insertPhotos').html()
	}

		if (compteurJson <= photos.length){
	  	 slicePhoto = photos.slice(compteurJson, compteurJson+22);
	  	 compteurJson = compteurJson + 22;
	  		slicePhoto.forEach(function(photo){

	  		if (photo.title.indexOf("'") != -1){
	  			photo.title = photo.title.split("'").join("&#39;");
			}

			onePhoto = "<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12 thumbnail-col photo-espece '> \
						  <div class='zoom-wrapper' > \
					 		<a href='"+photo.path+"' data-lightbox='imageSet' data-title='"+photo.title +" &copy; "+photo.author+"' cdRef='"+photo.cd_ref+"'>\
								<div class='img-custom-medias' style='background-image:url("+photo.path+")' alt='"+photo.name+"'> </div> \
								<div class='stat-medias-hovereffet'> \
						    		 <h2 class='overlay-obs'>"+photo.name+" </br> </br>"+photo.nb_obs+" observations </h2>  <img src='"+configuration.URL_APPLICATION+"/static/images/eye.png'></div> </a> </div> </div> </div>"



			htmlPhoto += onePhoto;
			
		})
	 }
	$('#insertPhotos').html(htmlPhoto);

}




function scrollEvent(photos){
	 $(window).scroll(function(){
	 	clearHtml = false;
	  	if($(window).scrollTop() + $(window).height() >= $(document).height()*0.80){
	  		generateHtmlPhoto(photos)
	 	}
	});
}



// ORDER event
function orderPhotosEvent(photos) {

  		$('body').on('click', "#sort", function() {
  		$('#searchPhotos').val('');	

  		span = $('#orderPhotos').find('span');
  		$(span).toggleClass('glyphicon glyphicon-sort').toggleClass('glyphicon glyphicon-random');
  		$(span).attr("id", "random");
  		$(span).attr("data-original-title", "Trier de manière aléatoire")
  		sortedPhotos = photos.slice().sort(function(a,b){
  			if(a.nb_obs >= b.nb_obs)
				return -1
			if(a.nb_obs < b.nb_obs)
				return 1
			return 0
  		})
			clearHtml = true; compteurJson=0;
			
		generateHtmlPhoto(sortedPhotos);
		$(window).off("scroll");
		scrollEvent(sortedPhotos);

	});
}


function sufflePhotosEvent(photos){
		$('body').on('click', "#random", function() {
		$('#searchPhotos').val('');	
	  	
	  	span = $('#orderPhotos').find('span');
  		$(span).toggleClass('glyphicon glyphicon-sort').toggleClass('glyphicon glyphicon-random');
  		$(span).attr("id", "sort");
  		$(span).attr("data-original-title", "Trier les photos par nombre d'observations");
  		clearHtml = true; compteurJson=0;
  		generateHtmlPhoto(photos)
  		$(window).off("scroll");
		scrollEvent(photos);
	})
}


$(document).ready(function(){
	$.ajax({
		  url: configuration.URL_APPLICATION+'/api/photosGallery',
		  dataType: "json",
		  beforeSend: function(){
		    // $('#loadingGif').attr("src", configuration.URL_APPLICATION+'/static/images/loading.svg')
		  }

          // Count and display number of photos
		  }).done(function(photos) {
		  	 generateHtmlPhoto(photos);
		  	 $('#nbPhotos').html(photos.length + " photos");
		  	 scrollEvent(photos);

		  	 	orderPhotosEvent(photos);	

		  	 	sufflePhotosEvent(photos);


		  	$('#allGroups').click(function(){
		  		$('#searchPhotos').val('');	
		  		$("body").off("click");
		  		orderPhotosEvent(photos);		  	 
		  		sufflePhotosEvent(photos);
				clearHtml = true;
				compteurJson = 0;
				$(window).off("scroll");
				generateHtmlPhoto(photos);
				$('#group').html("");
				$('#nbPhotos').html(photos.length + " photos");
				scrollEvent(photos);
			})

		  	// search a photo by the name of the species
			$('#searchPhotos').on('keyup', function() {
				$(window).off("scroll");
				$("body").off("click");
				$('#group').html("");
				keyString = this.value;
				filterJsonPhoto = photos.filter(function(obj){
					name = obj.name.toLowerCase();
					title = obj.title.toLowerCase();
					author = obj.author.toLowerCase();
					return (name.includes(keyString.toLowerCase()) || title.includes(keyString.toLowerCase()) || author.includes(keyString.toLowerCase()))
				})

				clearHtml = true; compteurJson=0;
				generateHtmlPhoto(filterJsonPhoto);
				$('#nbPhotos').html(filterJsonPhoto.length + " photos");
				scrollEvent(filterJsonPhoto);
		  	 	orderPhotosEvent(photos);	
		  	 	sufflePhotosEvent(photos);

			});

		});

})


$('.INPNgroup').click(function(){
	$('#searchPhotos').val('');	
	compteurJson = 0;
	clearHtml = true;
	group = $(this).attr('alt');
	$(window).off("scroll");
	$("#page").off("click");
	span = $('#orderPhotos').find('span')
	$(span).attr("class", "glyphicon glyphicon-sort");
	$(span).attr("data-original-title", "Trier les photos par nombre d'observations");
	$(span).attr("id", "sort");

	$.ajax({
		  url: configuration.URL_APPLICATION+'/api/photoGroup/'+group,
		  dataType: "json",
		  beforeSend: function(){
		    // $('#loadingGif').attr("src", configuration.URL_APPLICATION+'/static/images/loading.svg')
		    }
            
		  // Count and display number of photos in 1 group
		  }).done(function(photos) {
				generateHtmlPhoto(photos);
				$('#group').html("("+group+")");
				$('#nbPhotos').html(photos.length + " photos");
				clearHtml = false;
				scrollEvent(photos);
		  	 	orderPhotosEvent(photos);	
		  	 	sufflePhotosEvent();

		 })
});


$('.lb-link').click(function(){
	console.log("click");
	location.href= $(this).attr("href");
})


