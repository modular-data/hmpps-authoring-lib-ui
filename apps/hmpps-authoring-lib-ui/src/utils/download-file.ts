export const downloadFile = (
  blob: Blob,
  fileName: string,
  blobOptions?: BlobPropertyBag,
) => {
  const objectURL = window.URL.createObjectURL(new Blob([blob], blobOptions));
  const downloadLink = document.createElement('a');

  downloadLink.href = objectURL;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink); // We need to append the element to the dom -> otherwise it will not work in firefox

  downloadLink.click();

  setTimeout(() => {
    // We need to wait some time before garbage collecting blob objectURL, because we need to wait till file download is completed https://stackoverflow.com/a/63111446
    // 40 seconds is not something randomly chosen, it's value picked from the very popular and tested files download lib https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js#L105
    downloadLink.remove();
    window.URL.revokeObjectURL(objectURL);
  }, 4e4);
};
