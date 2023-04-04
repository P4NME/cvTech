// module trace-utils.js
module.exports = {
  getFileInfoFromStackTrace: function() {
    const trace = new Error().stack.split('\n')[2].trim();
    const fileName = trace.match(/\((.*):\d+:\d+\)/)[1];
    const lineNumber = trace.match(/\d+:\d+/)[0].split(':')[1];
    return {
      fileName: fileName,
      lineNumber: lineNumber
    };
  }
};
