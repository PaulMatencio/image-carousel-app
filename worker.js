(function() {
  importScripts('imageManips.js');

  this.onmessage = function(e) {
    //
    let blob = e.data.blob;
    let transform = e.data.transform;
    let blobType = blob.type;
    let reader = new FileReader();
    reader.readAsArrayBuffer(blob)  ;
    // transform blob to array buffer
    reader.addEventListener("load", function (e) {
      let data = reader.result;
      console.log(data.byteLength);
      //postMessage(new Blob(data,{type: blobType)});
      // this.url = arrayBufferToDataURL(arrayBuffer, 'image/jpeg');
      postMessage(blob);
    })
  }
})();
