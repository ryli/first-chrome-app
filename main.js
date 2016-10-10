chrome.app.runtime.onLaunched.addListener(function() {
  const screenWidth = screen.availWidth
  const screenHeight = screen.availHeight
  const width = 320
  const height = 500

  chrome.app.window.create('index.html', {
    id: 'helloWorldId',
    outerBounds: {
      width: width,
      height: height,
      left: Math.round((screenWidth - width) / 2),
      top: Math.round((screenHeight - height) / 2)
    }
  })

  var device
  var camera
  var hhkb

  chrome.usb.getDevices({"vendorId": 1452, "productId": 34065}, onDeviceFound)

  function onDeviceFound(devices) {
    this.devices=devices;
    if (devices) {
      console.log(devices)
      device = devices[0]
      if (devices.length > 0) {
        console.log("Device(s) found: "+devices.length);
      } else {
        console.log("Device could not be found");
      }
    } else {
      console.log("Permission denied.");
    }
  }

})
