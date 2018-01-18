/* eslint-disable */

import { firebaseAuth } from '../utils/config'
import './searchBox'

export default function init () {
    var img = [
      3840,  // original width of image
      2160   // original height of image
    ]
    var map = L.map('map', {
      attributionControl:false,
      minZoom: 0,
      maxZoom: 2,
      center: [0, 0],
      zoom: 0,
      
      crs: L.CRS.Simple
    });
    
    // dimensions of the image
    var w = 3860,
        h = 2180,
        url = 'https://i.imgur.com/YADK5Op.jpg';
    
    // calculate the edges of the image, in coordinate space
    var southWest = map.unproject([0, h], map.getMaxZoom()-1);
    var northEast = map.unproject([w, 0], map.getMaxZoom()-1);

    const sw = {lat: -1100, lng: 10}
    const ne = {lat: -10, lng: 2200}
    var bounds = new L.LatLngBounds(sw, ne);
    
    // add the image overlay, 
    // so that it covers the entire map
    L.imageOverlay(url, bounds).addTo(map);

    let items = []




    // Search Control
    L.Control.Search = L.Control.extend({
      options: {
        // topright, topleft, bottomleft, bottomright
        position: 'topleft',
        placeholder: 'Search...'
      },
      initialize: function (options /*{ data: {...}  }*/) {
        // constructor
        L.Util.setOptions(this, options);
      },
      onAdd: function (map) {
        // happens after added to map
        var container = L.DomUtil.create('div', 'header__container');
        this.headerWrapper = L.DomUtil.create('div', 'header__wrapper', container);

        /* Search */  
        this.searchContainer  = L.DomUtil.create('div', 'search__container', this.headerWrapper);
        this.searchWrapper= L.DomUtil.create('div', 'search__wrapper', this.searchContainer);
        this.searchInput = L.DomUtil.create('input', 'search__input', this.searchWrapper);

        this.searchInput.setAttribute("autocomplete", "off")
        this.searchInput.setAttribute("spellcheck", "false")
        this.searchInput.setAttribute("autocorrect", "false")
        this.searchIcon = L.DomUtil.create('div', 'search__icon', this.searchWrapper);

        /* Image */

        this.profile= L.DomUtil.create('div', 'profile', container);
        this.profilePicture= L.DomUtil.create('img', 'profile__picture', this.profile);


        
          /* Image */

        this.profilePicture.src = window.photoURL
        this.profilePicture.onclick = () => {
          firebaseAuth.signOut()
          window.location.reload(true);
        }
        var x = 3
        return container;
      }
    });
    // End Search control

    //Folder Control
    L.Control.Folder = L.Control.extend({
      options: {
        // topright, topleft, bottomleft, bottomright
        position: 'topright',
        placeholder: 'Folder...'
      },
      initialize: function (options /*{ data: {...}  }*/) {
        // constructor
        L.Util.setOptions(this, options);
      },
      onAdd: function (map) {
        // happens after added to map
         /* Blue folder */
         var blueFolderContainer = L.DomUtil.create('div', 'blueFolder__container');
         this.blueFolderWrapper = L.DomUtil.create('div', 'blueFolder__wrapper', blueFolderContainer );
         this.blueFolderBox = L.DomUtil.create('div', 'blueFolder__box', blueFolderContainer );

        return blueFolderContainer;
      }
    });
    // End Folder control


  //Folder Control
  L.Control.Challenge = L.Control.extend({
    options: {
      // topright, topleft, bottomleft, bottomright
      position: 'topleft',
      placeholder: 'Challenge...'
    },
    initialize: function (options /*{ data: {...}  }*/) {
      // constructor
      L.Util.setOptions(this, options);
    },
    onAdd: function (map) {

        /* Challenge container */
        var challengeContainer  = L.DomUtil.create('div', 'challenge__container');

        this.challengeWrapper  = L.DomUtil.create('div', 'challenge__wrapper', challengeContainer );

        this.challengeWrapper1  = L.DomUtil.create('img', 'challenge__1', this.challengeWrapper  );
        this.challengeWrapper2  = L.DomUtil.create('img', 'challenge__2', this.challengeWrapper  );
        this.challengeWrapper3  = L.DomUtil.create('img', 'challenge__3', this.challengeWrapper  );
        this.challengeWrapper4  = L.DomUtil.create('img', 'challenge__4', this.challengeWrapper  );
        this.challengeWrapper5  = L.DomUtil.create('img', 'challenge__5', this.challengeWrapper  );



        // note done
        //code 1 https://i.imgur.com/Q24mwMo.png
        //code 2 https://i.imgur.com/FQfXCwv.png
        //code 3 https://i.imgur.com/PPjvBQl.png
        //code 4 https://i.imgur.com/sFfZ8DU.png
        //code 5 https://i.imgur.com/sFfZ8DU.png


        //code 1 https://i.imgur.com/Tnzujx4.png
        //code 2 https://i.imgur.com/vp5VXcp.png
        //code 3 https://i.imgur.com/zikZBt3.png
        //code 4 https://i.imgur.com/rdioy0g.png
        //code 5 https://i.imgur.com/lvhAJKO.png

/* 

        if (window.challenges.challenge1 == true) {
          window.challenges.challenge1.src = 'https://i.imgur.com/Tnzujx4.png'

        } else {
          window.challenges.challenge1.src = 'https://i.imgur.com/Q24mwMo.png'
        }

        if (window.challenges.challenge2 == true) {
          window.challenges.challenge1.src = 'https://i.imgur.com/Tnzujx4.png'

        } else {
          window.challenges.challenge2.src = 'https://i.imgur.com/FQfXCwv.png'
        }
     */





      return challengeContainer;
    }
  });
  // End Folder control



    L.control.search = function(id, options) {
      return new L.Control.Search(id, options);
    }

    L.control.folder = function(id, options) {
      return new L.Control.Folder(id, options);
    }

    L.control.challenge = function(id, options) {
      return new L.Control.Challenge(id, options);
    }

    L.control.search({
      data: items
    }).addTo(map)

    L.control.folder({
      data: items
    }).addTo(map)

    L.control.challenge({
      data: items
    }).addTo(map)
    
    // tell leaflet that the map is exactly as big as the image
    map.setMaxBounds(bounds);

   


  }
  