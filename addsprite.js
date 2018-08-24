;( function(window, document)
{
  'use strict';

  var file = './svg/symbol_sprite.html';
  var revision = 1;

  if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) {
    return true;
  }

  var isLocalStorage = false;
  var request;
  var data;
  var insertIT = function() {
    document.body.insertAdjacentHTML('afterbegin', data);
  };
  var insert = function() {
  if(document.body) insertIT();
  else document.addEventListener('DOMContentLoaded', insertIT);
  };

  if(isLocalStorage && localStorage.getItem('inlineSVGrev') == revision)
  {
    data = localStorage.getItem('inlineSVGdata');
    if(data)
    {
      insert();
      return true;
    }
  }

  try
  {
    request = new XMLHttpRequest();
    request.open('GET', file, true);
    request.onload = function() {
      if(request.status >= 200 && request.status < 400)
      {
        data = request.responseText;
        insert();
        if(isLocalStorage)
        {
          localStorage.setItem('inlineSVGdata', data);
          localStorage.setItem('inlineSVGrev', revision);
        }
      }
    }
    request.send();
  }
  catch( e ){}

}( window, document ) );
