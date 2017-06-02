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
      .assetMap(container.dataset.assetMap)
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
                "searchable": false
            },
            "line": {
                "name": "Line",
                "tags": {},
                "geometry": ["line"],
                "searchable": false
            },
            "vertex": {
                "name": "Vertex",
                "tags": {},
                "geometry": ["vertex"],
                "searchable": false
            },
            "relation": {
                "name": "Relation",
                "tags": {},
                "geometry": ["relation"],
                "searchable": false
            },

            "point": {
                "name": "Assess Damage",
                "tags": {},
                "geometry": ["point"],
                "fields": ["damage"]
            },
            "building_no_damage": {
                "icon": "home",
                "name": "Building - No Damage",
                "tags": { "damage": "none" },
                "geometry": ["point"],
                "fields": ["damage"]
            },
            "building_some_damage": {
                "icon": "home",
                "name": "Building - Some Damage",
                "tags": { "damage": "some" },
                "geometry": ["point"],
                "fields": ["damage"]
            },
            "building_destroyed": {
                "icon": "home",
                "name": "Building - Destroyed",
                "tags": { "damage": "destroyed" },
                "geometry": ["point"],
                "fields": ["damage"]
            },
        },

        "defaults": {
            "area": [],
            "line": [],
            "point": [
                "building_no_damage",
                "building_some_damage",
                "building_destroyed",
                "point"
            ],
            "vertex": [],
            "relation": []
        },

        categories: { },

        fields: {
            "damage": {
                "key": "damage",
                "type": "radio",
                "label": "Building Damage",
                "options": [
                    "none",
                    "some",
                    "destroyed"
                ]
            }
        }
    };

    id.presets().init();


    //
    // override feature filter limits
    //
    var f = id.features().features();
    f.points.currentMax = f.points.defaultMax = 300;
    f.buildings.currentMax = f.buildings.defaultMax = 300;


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
