(function() {  
  const inputSearch = document.getElementById("inputSearch");
  const wrapper = document.getElementById("wrapper");  

  // Function to make the apiCall
  function doLiveSearch( ev, keywords ) {

    const 
      arrowUp = 38,
      arrowDown = 40,
      MIN_CHARACTERS_FOR_SEARCH = 2;

    // Delete the old list
    const oldList = document.getElementById("search_results");
    if (oldList) {
      wrapper.removeChild(oldList);
    }
    
    if( keywords == '' || 
      ev.keyCode == arrowUp || 
      ev.keyCode == arrowDown ||
      keywords.length < MIN_CHARACTERS_FOR_SEARCH
      ) {
      return false;
    }

    // In this point I make the search with a filter but in a more real environment, here we put the ajax call
    const results = data.filter(item => item.name.toLowerCase().includes(keywords.toLowerCase()));
    let list = document.createElement('ul');
    list.id = 'search_results';
    let listElement;
    for( var i in results ) {
      listElement = document.createElement('li');
      listElement.appendChild( document.createTextNode(results[i].name) );
      list.appendChild( listElement );
    }

    // Add the new list
    wrapper.append(list);
    
    return true;
  }

  function upDownEvent( ev, keywords ) {
    console.log('upDownEvent', ev, keywords);
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
    console.log('blur');
  }

  document.onkeydown = function(ev) {
    // Search when enter is pressed
    if( ev.keyCode == 13 ) {
      console.log('press enter');
    }
  }

})();