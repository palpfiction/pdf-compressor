/**
 * Ghostscript WASM Web Worker
 * 
 * Based on work by Laurent Meyer
 * Source: https://github.com/laurentmmeyer/ghostscript-pdf-compress.wasm
 * License: AGPL-3.0
 * 
 * The gs-worker.js and gs-worker.wasm files are from the same repository,
 * which uses the Ghostscript WASM build by ochachacha:
 * https://github.com/nicholascm90/nicholascm90.github.io.ps-wasm
 * 
 * Modified to support configurable quality settings.
 */

function loadScript() {
  import("./gs-worker.js");
}

var Module;

function _GSPS2PDF(
  dataStruct,
  responseCallback,
) {
  // first download the ps data
  var xhr = new XMLHttpRequest();
  xhr.open("GET", dataStruct.psDataURL);
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    console.log('onload')
    // release the URL
    self.URL.revokeObjectURL(dataStruct.psDataURL);
    //set up EMScripten environment
    Module = {
      preRun: [
        function () {
          self.Module.FS.writeFile("input.pdf", new Uint8Array(xhr.response));
        },
      ],
      postRun: [
        function () {
          var uarray = self.Module.FS.readFile("output.pdf", { encoding: "binary" });
          var blob = new Blob([uarray], { type: "application/octet-stream" });
          var pdfDataURL = self.URL.createObjectURL(blob);
          responseCallback({ pdfDataURL: pdfDataURL, url: dataStruct.url });
        },
      ],
      arguments: [
        "-sDEVICE=pdfwrite",
        "-dCompatibilityLevel=1.4",
        "-dPDFSETTINGS=" + (dataStruct.quality || "/ebook"),
        "-dNOPAUSE",
        "-dQUIET",
        "-dBATCH",
        "-sOutputFile=output.pdf",
        "input.pdf",
      ],
      print: function (text) {},
      printErr: function (text) {},
      totalDependencies: 0,
      noExitRuntime: 0
    };
    // Always load fresh - worker is terminated after each file anyway
    self.Module = Module;
    loadScript();
  };
  xhr.send();
}


self.addEventListener('message', function({data:e}) {
  console.log("message", e)
  // e.data contains the message sent to the worker.
  if (e.target !== 'wasm'){
    return;
  }
  console.log('Message received from main script', e.data);
  _GSPS2PDF(e.data, ({pdfDataURL}) => self.postMessage(pdfDataURL))
});

console.log("Worker ready")
