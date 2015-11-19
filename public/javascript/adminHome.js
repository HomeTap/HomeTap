var httpRequest;
document.getElementByID('something to be determined').onclick = function() {makeRequest()};

function makeRequest(url) {
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert('The test has failed');
    return false;
  }

  httpRequest.onreadystatechange = functionCall;
  httpRequest.open('DELETE', url);


  function functionCall() {
    if (httpRequest.readyState === XMLHttpRequest.DONE){
      alert('the request worked!');
    }
  }
}
