(function() {
importScripts('imageManips.js');
this.onmessage = function(e) {
  // imageData is a blob
  let imageData = e.data.imageData;
  console.log(imageData);
  let transform = e.data.transform;
  let reader = new FileReader();
  let data = reader.readAsArrayBuffer(imageData)  ;
  let blobType = imageData.type;
  console.log(data);
  try {
   let length = data.length / 4; // number of pixels
   // for (i = j = 0, ref = length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
   for ( var i=0; i < length; i++) {
      r = data[i * 4 + 0];
      g = data[i * 4 + 1];
      b = data[i * 4 + 2];
      a = data[i * 4 + 3];
      pixel = manipulate(transform, r, g, b, a);
      data[i * 4 + 0] = pixel[0];
      data[i * 4 + 1] = pixel[1];
      data[i * 4 + 2] = pixel[2];
      data[i * 4 + 3] = pixel[3];
    }
    postMessage(new Blob(data,blobType));
  } catch (e) {
    function ManipulationException(message) {
      this.name = "ManipulationException";
      this.message = message;
    };
    throw new ManipulationException('Image manipulation error');
    postMessage(imageData);
  }
}
})();
