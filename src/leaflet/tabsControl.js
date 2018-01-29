/* eslint-disable */
import { fetchFacebookPosts } from '../api/index'

export default function tabsControl() {
  // Field Notes Control
  L.Control.Tabs = L.Control.extend({
    options: {
    // topright, topleft, bottomleft, bottomright
      position: 'topright',
    },
    initialize(options) {
      // constructor
      L.Util.setOptions(this, options);
    },
    onAdd() {

      let tabContainer = L.DomUtil.create('div', 'tab__container');
      this.field = L.DomUtil.create('div', 'field', tabContainer);

      /* Options tab */
      this.optionsElement = L.DomUtil.create('div', 'options', tabContainer);
      this.optionsContainerElement= L.DomUtil.create('div', 'options__container options__container_closed', this.optionsElement );

      /* Text in options Tab */
      this.optionsText = L.DomUtil.create('div', 'options__wrapper', this.optionsContainerElement);
      this.optionsText.insertAdjacentHTML('afterbegin', `
        <div class="instructions">
          <div class="cross__wrapper">
            <div class="cross"> </div>
          </div>
          
          <div class="instructions__header"> 
            <div> Options </div>
          </div>
          <div class="instructions__signout">
            <div> Sign out </div>
            <div class="tick"></div>
          </div>
          <div class="instructions__terms">
            <div class="tick"></div>
            <div> Terms and conditions </div>
          </div>
        </div>
      ` )  

      // TODO put this facebook stuff in the OTHER folder, not the options folder     
      const fbBox = L.DomUtil.create('div', 'fb_post_container', this.field );

      fbBox.addEventListener("click", showfield, false); //work around for iOS need to capture click
      this.optionsElement.addEventListener("click", showOptionsTab, false); //work around for iOS need to capture click
 

      this.fieldWrapper = L.DomUtil.create('div', 'field__wrapper field__wrapper-closed', this.field );
      this.fieldWrapper.addEventListener("click", showOptionsTab, false); //work around for iOS need to capture click
      this.fieldWrapper.setAttribute("tabindex", "1")



      self = this;

      function showfield(event){
        //toggle the css class name manually to open or close the tab
        if(self.fieldWrapper.className === 'field__wrapper field__wrapper-open'){
          self.fieldWrapper.className = 'field__wrapper field__wrapper-close'
          fbBox.className = 'fb_post_container fb_post_container__closed'
          map.scrollWheelZoom.enable();
          map.dragging.enable();
        } else {
          self.fieldWrapper.className = 'field__wrapper field__wrapper-open'
          fbBox.className = 'fb_post_container fb_post_container__opened onTop'
          map.scrollWheelZoom.disable();
          map.dragging.disable();
        }
    }

      function showOptionsTab(event){

        if(self.optionsElement.className === 'options__container options__container-open'){
            self.optionsElement.className = 'options__container options__container_close'
            self.optionsElement.className = "options leaflet-control"
       } else if (self.optionsElement.className == "options leaflet-control onTop") {
            self.optionsElement.className = 'options leaflet-control'
       } else {
            self.optionsElement.className = 'options__container options__container-open'
            self.optionsElement.className = "options leaflet-control onTop"
       }
     }

      fbBox.id ='fb-posts-here';
      L.DomEvent.disableClickPropagation(fbBox);
      L.DomEvent.on(fbBox, 'mouseover', function(){
          map.scrollWheelZoom.disable();
      });
      L.DomEvent.on(fbBox, 'mouseout', function(){
          map.scrollWheelZoom.enable();
      });

      let posts = fetchFacebookPosts().then((posts)=> {
        // console.warn(posts);
        posts.forEach(post => {
          fbBox.innerHTML += '<div class="fb-post" data-href="' + post + '" data-width="350"></div>';
          console.warn(post)
        })
        //tell FB to render this
        const element = document.getElementById('fb-posts-here')
        FB.XFBML.parse(element); //this is the important magic call that makes facebook render all the posts out!
      })

      return tabContainer;
    },
  });
  // End Field Notes control
  L.control.Tabs = (id, options) => new L.Control.Tabs(id, options);

  L.control.Tabs().addTo(window.map);
}
