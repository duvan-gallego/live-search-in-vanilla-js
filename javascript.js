(function() {  
  const inputSearch = document.getElementById("inputSearch");
  const wrapper = document.getElementById("wrapper");
  let updown = -1;    

  // Set country selected to span
  function setCountrySelected( country ) {
    const countryElement = document.getElementById('countrySelected');
    countryElement.textContent = country;
    inputSearch.blur();
    return true;
  }

  // Function to make the apiCall
  function doLiveSearch( ev, keywords ) {

    const 
      arrowUp = 38,
      arrowDown = 40,
      MIN_CHARACTERS_FOR_SEARCH = 2;        
    
    if( keywords == '' || 
      ev.keyCode == arrowUp || 
      ev.keyCode == arrowDown ||
      keywords.length < MIN_CHARACTERS_FOR_SEARCH
      ) {
      return false;
    }

    // Delete the old list
    const oldList = document.getElementById("search_results");
    if (oldList) {
      wrapper.removeChild(oldList);
    }

    // In this point I make the search with a filter but in a more real environment, here we put the ajax call
    const results = data.filter(item => item.name.toLowerCase().includes(keywords.toLowerCase()));
    let list = document.createElement('ul');
    list.id = 'search_results';
    let listElement;
    for( var i in results ) {
      listElement = document.createElement('li');      
      listElement.onclick = function() {
        setCountrySelected(this.innerText);                
      }
      listElement.appendChild( document.createTextNode(results[i].name) );
      list.appendChild( listElement );
    }

    // Add the new list
    wrapper.append(list);
    
    return true;
  }

  function upDownEvent( ev ) {    
    const list = document.getElementById("search_results");

    if ( list ) {
      const length = list.childNodes.length - 1;

      // Reset the node
      if( updown != -1 && typeof(list.childNodes[updown]) != 'undefined' ) {        
        list.childNodes[updown].classList.remove('highlighted');        
      }

      // Up pressed
      if( ev.keyCode == 38 ) {
        updown = ( updown > 0 ) ? --updown : updown;
      }
      // Down pressed
      else if( ev.keyCode == 40 ) {
        updown = ( updown < length ) ? ++updown : updown;
      // Try to delete text
      } else if ( ev.keyCode == 8 ) {
        return false;
      }

      if( updown >= 0 && updown <= length ) {
        list.childNodes[updown].className = 'highlighted';        
        // Set text selected to the input
        let text = list.childNodes[updown].innerText;
			  if( typeof(text) == 'undefined' ) {
				  text = list.childNodes[updown].innerText;
        }
        inputSearch.value = new String(text).replace(/(\s\(.*?\))$/, '');        
      }

      return false;      
    }

  }

  // Do live search
  inputSearch.onkeyup = function(ev) {   
    doLiveSearch(ev, this.value); 
  };
  
  // Manage updown events
  inputSearch.onkeydown = function(ev) { 
    upDownEvent(ev, this.value);
  }

  // Try to make the search if the user has values in the input, when gain focus
  inputSearch.onfocus = function(ev) { 
    doLiveSearch(ev, this.value);
  }
  // Hide list when the input lost the focus
  inputSearch.onblur = function(ev) { 
    setTimeout("wrapper.removeChild(document.getElementById('search_results'));updown=0;", 600);         
  }

  document.onkeydown = function(ev) {
    // Search when enter is pressed
    if( ev.keyCode == 13 ) {      
      setCountrySelected(inputSearch.value);
    }
  }

})();