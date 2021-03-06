var map = generateMap();

    // Current observation Layer: leaflet layer type
var currentLayer; 

// Current observation geoJson:  type object
var myGeoJson;

var compteurLegend = 0; // compteur pour ne pas rajouter la légende à chaque fois


	// Diplay limit of the territory
	var communeLayer = L.geoJson(communeGeoJson, {
		style : function(){
			return {
				fillColor: 'blue',
				opacity: 1,
				weight: 2,
				color: 'black',
				dashArray: '3',
				fillOpacity: 0
			}
		}
	}).addTo(map);

	var bounds = L.latLngBounds([]);
	var layerBounds = communeLayer.getBounds();
	bounds.extend(layerBounds);
	map.fitBounds(bounds);

	// Display the 'x' last observations
		// MAILLE
	if (configuration.AFFICHAGE_MAILLE){
		displayMailleLayerLastObs(observations)
	  }
		// POINT
	else{
	displayMarkerLayerPointLastObs(observations);

	}

	// Diplay legend

	htmlLegendMaille = "<i style='border: solid 1px red;'> &nbsp; &nbsp; &nbsp;</i> Maille comportant au moins une observation <br> <br>" +
						"<i style='border-style: dotted;'> &nbsp; &nbsp; &nbsp;</i> Limite de la commune <br> <br>"+
						"<i style='border: solid 2px blue;'> &nbsp; &nbsp; &nbsp;</i> Limite du "+configuration.STRUCTURE;

	htmlLegendPoint = "<i style='border-style: dotted;'> &nbsp; &nbsp; &nbsp;</i> Limite de la commune <br> <br>"+
						"<i style='border: solid 2px blue;'> &nbsp; &nbsp; &nbsp;</i> Limite du "+configuration.STRUCTURE

	htmlLegend = configuration.AFFICHAGE_MAILLE ? htmlLegendMaille : htmlLegendPoint;
// General Legend
	generateLegende(htmlLegend);





// display observation on click

function displayObsTaxon(insee, cd_ref){
	$.ajax({
  url: configuration.URL_APPLICATION+'/api/observations/'+insee+'/'+cd_ref, 
  dataType: "json",
    beforeSend: function(){
    $('#loadingGif').show();
    $('#loadingGif').attr("src", configuration.URL_APPLICATION+'/static/images/loading.svg');
  }
	}).done(function(observations){
		$('#loadingGif').hide();
		map.removeLayer(currentLayer);
		if(configuration.AFFICHAGE_MAILLE){
			
		}else {
			displayMarkerLayerPointCommune(observations);
		}


	});
}

function displayObsTaxonMaille(insee, cd_ref){
	$.ajax({
	  url: configuration.URL_APPLICATION+'/api/observationsMaille/'+insee+'/'+cd_ref, 
	  dataType: "json",
	  beforeSend: function(){
	  	$('#loadingGif').show();
	    $('#loadingGif').attr("src", configuration.URL_APPLICATION+'/static/images/loading.svg');
  	}
	}).done(function(observations){
		$('#loadingGif').hide();
		map.removeLayer(currentLayer);
		displayMailleLayerCommune(observations);
	});
}

$(document).ready(function(){
	if(configuration.MYTYPE == 1){

		$(".taxonRow").click(function(){
			     $(this).siblings().removeClass('current');
		         $(this).addClass('current');

			if(configuration.AFFICHAGE_MAILLE){
				displayObsTaxonMaille($(this).attr('insee'), $(this).attr('cdRef'));
			}else{
				displayObsTaxon($(this).attr('insee'), $(this).attr('cdRef'));
			}
			var name = ($(this).find('.name').html());
			$('#titleMap').fadeOut(500, function(){
				$(this).html("Observations du taxon:"+ name).fadeIn(500);
			})
		});
	}
});

