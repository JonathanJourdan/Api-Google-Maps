var style = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]





function initMap() {
    
    var pau = new google.maps.LatLng(43.296371,-0.370091);
    var markers = [];
    var markerIncident = null;
    
    //creation de la map
    var gmap = new google.maps.Map(
        document.getElementById('googleMaps'), {
            zoom: 16,
            center: pau,
            styles: style,
            disableDefaultUI: true
        }
    );

    
    
    //Création des markers
    for(var i=0; i<heros.length; i++)
            {
                var hero = heros[i];
                
                ajouterMarker(hero);
                
            }
    

    //InfoWindow 
     var infowindow = new google.maps.InfoWindow({
         maxWidth: 200
         
     });
    


     //Fonction pour ajouter des marqueurs
     function ajouterMarker(superHero) {

        var marker = new google.maps.Marker({
             position: superHero.position,
             map: gmap,
             title: superHero.nom,
             icon : {
                url  : superHero.icon,
              // size : new google.maps.Size(151, 171),
                origin	: new google.maps.Point(0, 0),
                anchor	: new google.maps.Point(17, 34),
               // scaledSize	: new google.maps.Size(60, 160),
                labelOrigin : new google.maps.Point(33, 15)
            },
             label : {
               text : superHero.saved.toString(),
	           color : 'black',
	           fontSize	: '11px'
            }


         });

         markers.push(marker);
         
         
         marker.addListener('click', function () {
             
            var content;
             
                    content = document.createElement('div');
                     
                    var title = document.createElement('h3');
                    title.style.paddingBottom = "10px";
                    title.innerHTML = superHero.nom;
                     
                    var couv = document.createElement('img');
                    couv.style.paddingBottom = "10px";
                    couv.setAttribute("src", superHero.couv);
                     
                    var description = document.createElement('p');
                    description.style.textAlign = "justify";
                    description.style.paddingBottom = "10px";
                    description.innerHTML = superHero.content;
                     
                    var sauvetage = document.createElement('p');
                    sauvetage.style.textAlign = "justify";
                    sauvetage.innerHTML = "<strong>Personnes sauvées : </strong>"+superHero.saved;
                     
                    content.appendChild(title);
                    content.appendChild(couv);
                    content.appendChild(description);
                    content.appendChild(sauvetage);
                   

             infowindow.setContent(content);
             infowindow.open(gmap, marker);
             
             if(gmap.getZoom()== 17)
             {
                 gmap.panTo(marker.getPosition());
             }
             else {
                 gmap.setCenter(marker.getPosition());
                 gmap.setZoom(17);
             }
             
             console.log(marker);
             
             
             
             
         });
         
         
     }

    
    
    
    infowindow.addListener('closeclick', function () {
             
                gmap.panTo(pau);
                gmap.setZoom(16);
             
        });
    
    
    
    document.getElementById("formRecherche").addEventListener("submit", function(){ functionRechercher(event) });
    
    document.getElementById("incident").addEventListener("change", function(){ functionRechercher(event); });
    
    
    function functionRechercher(e) {

        e.preventDefault(); 

        var address = document.getElementById("incident").value;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
                'address': address
            },
            function (results, status) {
                if (status == 'OK') {
                    
                    if(!markerIncident)
                    {
                        gmap.setCenter(results[0].geometry.location);
                    markerIncident = new google.maps.Marker({
                        map: gmap,
                        position: results[0].geometry.location,
                        title: "Incident",
                        icon: {
                            url: "img/warning.png",
//                            origin: new google.maps.Point(0, 0),
//                            anchor: new google.maps.Point(17, 34),
                            scaledSize	: new google.maps.Size(60, 60)
                        }

                    });  
                        
                        gmap.panTo(results[0].geometry.location);
                        gmap.setZoom(17);
                            
                    }
                    else {
                        markerIncident.setPosition(results[0].geometry.location);
                        gmap.setCenter(results[0].geometry.location);
                        gmap.setZoom(17);
                    }
                    
                    
                } else {
                    alert('Geocode error: ' + status);
                }
            
            });
    }
    
    
    console.log(markers);
    
    
}


