'use strict';

(function() {
    var profileUsername = document.querySelector('#profile-username') || null
    var apiUrl = appUrl + '/api/:id'
    
    function updateHtmlElement (data, element, userProperty) {
    	element.innerHTML = data[userProperty];
    }
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
        var userObject = JSON.parse(data)
        if (profileUsername !== null) updateHtmlElement(userObject, profileUsername, 'username')
    }))
})()