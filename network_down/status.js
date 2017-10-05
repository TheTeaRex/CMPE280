window.addEventListener('load', function() {
    function updateOnlineStatus(event) {

          if ( navigator.onLine ) { 
            document.getElementById('popup').style.display = 'none';
          } else {
            document.getElementById('popup').style.display = 'block';
          }
        }

    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});
