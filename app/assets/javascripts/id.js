//= require iD

/* globals iD */

document.addEventListener("DOMContentLoaded", function() {
  var container = document.getElementById("id-container");

  if (typeof iD === 'undefined' || !iD.Detect().support) {
    container.innerHTML = 'This editor is supported ' +
      'in Firefox, Chrome, Safari, Opera, Edge, and Internet Explorer 11. ' +
      'Please upgrade your browser or use Potlatch 2 to edit the map.';
    container.className = 'unsupported';
  } else {
    var id = iD.Context()
      .embed(true)
      .assetPath("iD/")
      .assetMap(JSON.parse(container.dataset.assetMap))
      .locale(container.dataset.locale, container.dataset.localePath)
      .preauth({
        urlroot: location.protocol + "//" + location.host,
        oauth_consumer_key: container.dataset.consumerKey,
        oauth_secret: container.dataset.consumerSecret,
        oauth_token: container.dataset.token,
        oauth_token_secret: container.dataset.tokenSecret
      });


    //
    // custom presets
    //
    iD.data.presets = {

        presets: {
           "area": {
                "name": "Area",
                "tags": {},
                "geometry": ["area"],
                "searchable": false,
                "matchScore": 0.1
            },
            "line": {
                "name": "Line",
                "tags": {},
                "geometry": ["line"],
                "searchable": false,
                "matchScore": 0.1
            },
            "vertex": {
                "name": "Vertex",
                "tags": {},
                "geometry": ["vertex"],
                "searchable": false,
                "matchScore": 0.1
            },
            "relation": {
                "name": "Relation",
                "tags": {},
                "geometry": ["relation"],
                "searchable": false,
                "matchScore": 0.1
            },

            "point": {
                "name": "Roof damage and type",
                "tags": {},
                "geometry": ["point"],
                "fields": ["damage","roof","material"],
		"matchScore": 0.1
            },

            "building_no_damage": {
                "icon": "home",
                "name": "Building - No Damage",
                "tags": { "damage": "none" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },
            "building_partial_damage": {
                "icon": "home",
                "name": "Building - Partial Roof Damage",
                "tags": { "damage": "partial" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },
	    "building_significant_damage": {
                "icon": "home",
                "name": "Building - Significant Roof Damage",
                "tags": { "damage": "significant" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },

            "building_destroyed": {
                "icon": "home",
                "name": "Building - Walls and roof are down",
                "tags": { "damage": "destroyed" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },
	    "building_unknown": {
                "icon": "home",
                "name": "Building - Damage unknown",
                "tags": { "damage": "unknown" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },

	    "hipped_roof": {
                "icon": "home",
                "name": "Hipped roof",
                "tags": { "roof": "hipped" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },
            "pitch_roof": {
                "icon": "home",
                "name": "Pitch roof",
                "tags": { "roof": "pitch" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },
  	    "flat_roof": {
                "icon": "home",
                "name": "Flat roof",
                "tags": { "roof": "flat" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },
	   "unknown_roof": {
                "icon": "home",
                "name": "Unknown roof",
                "tags": { "roof": "unknown" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },

            "roof_concrete": {
                "icon": "home",
                "name": "Roof - Concrete",
                "tags": { "material": "1" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },
            "roof_tiles": {
                "icon": "home",
                "name": "Roof - tiles",
                "tags": { "material": "2" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },
	    "roof_metal": {
                "icon": "home",
                "name": "Roof - metal",
                "tags": { "material": "3" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },

            "roof_mixed": {
                "icon": "home",
                "name": "Roof - mixed",
                "tags": { "material": "5" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },
	    "roof_unknown": {
                "icon": "home",
                "name": "Roof - unknown",
                "tags": { "material": "4" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },
	   "roof_tiles_metal": {
                "icon": "home",
                "name": "Roof - Potential tiles or metal",
                "tags": { "material": "6" },
                "geometry": ["point"],
                "fields": ["damage","roof","material"]
            },

        },

        defaults: {
            "area": [],
            "line": [],
            "point": [
                "point"
            ],
            "vertex": [],
            "relation": []
        },

        categories: { },

        fields: {
	  "comment": {
    		"key": "comment",
   		"type": "textarea",
    		"label": "Changeset Comment",
   		"placeholder": "Brief description of your contributions (required)"
	  },
	  "hashtags":	{
    		"key": "hashtags",
    		"type": "semiCombo",
    		"label": "Suggested Hashtags",
    		"placeholder": "#example"
	  },
	  "source": {
		"key": "source",
    		"type": "semiCombo",
    		"icon": "source",
    		"universal": true,
    		"label": "Sources",
   		"options": [
       			 "survey",
        		"local knowledge",
        		"gps",
        		"aerial imagery",
        		"streetlevel imagery"
    		]
	  },
          "damage": {
                "key": "damage",
                "type": "radio",
                "label": "Building Damage",
                "options": [
                    "none",
                    "partial",
		    "significant",
                    "destroyed",
		    "unknown"
                ]
            },
           "roof": {
                "key": "roof",
                "type": "radio",
                "label": "Roof type",
                "options": [
                    "hipped",
                    "pitch",
                    "flat",
		    "unknown"
                ]
            },
           "material": {
                "key": "material",
                "type": "radio",
                "label": "Roof material",
                "options": [
		 "1",
		 "2",
		 "3",
		 "5",
		 "6",
		 "4"
		]
           }

        }
    };

    id.presets().init();
 
    //Set minmum zoom level to 16, to allow better overview when filtered
    id.minEditableZoom(16);
    //
    // override feature filter limits
    //
    var f = id.features().features();
    f.points.currentMax = f.points.defaultMax = 300;
    //f.buildings.currentMax = f.buildings.defaultMax = 300;


    id.map().on('move.embed', parent.$.throttle(250, function() {
      if (id.inIntro()) return;
      var zoom = ~~id.map().zoom(),
        center = id.map().center(),
        llz = { lon: center[0], lat: center[1], zoom: zoom };

      parent.updateLinks(llz, zoom);

      // Manually resolve URL to avoid iframe JS context weirdness.
      // http://bl.ocks.org/jfirebaugh/5439412
      var hash = parent.OSM.formatHash(llz);
      if (hash !== parent.location.hash) {
        parent.location.replace(parent.location.href.replace(/(#.*|$)/, hash));
      }
    }));

    parent.$("body").on("click", "a.set_position", function (e) {
      e.preventDefault();
      var data = parent.$(this).data();

      // 0ms timeout to avoid iframe JS context weirdness.
      // http://bl.ocks.org/jfirebaugh/5439412
      setTimeout(function() {
        id.map().centerZoom(
          [data.lon, data.lat],
          Math.max(data.zoom || 15, 13));
      }, 0);
    });

    id.ui()(container);
  }
});
