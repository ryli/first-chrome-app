const cVid = 1452
const cPid = 34065
const hVid = 2131
const hPid = 256
const dVid = 1921
const dPid = 21891

let camera
let hhkb
let disk
let device

let vendorId = dVid
let productId = dPid

let usbConnection

let interfaceId

let connection

function onDeviceFound(devices) {
  this.devices=devices;
  console.log(this, devices)
  if (devices) {
    if (devices.length > 0) {
      device = devices[0]
      console.log("Device(s) found: "+devices.length);

      chrome.usb.openDevice(devices[0], onOpenCallback);
    } else {
      console.log("Device could not be found");
    }
  } else {
    console.log("Permission denied.");
  }
}

chrome.usb.getDevices({"vendorId": vendorId, "productId": productId}, onDeviceFound);

console.log(device)

function onOpenCallback (connection) {
  try {
    if (connection) {
      console.log(connection)
      interfaceId = connection.handle
      usbConnection = connection;

      chrome.usb.listInterfaces(connection, function (c) {
        console.log(c)
      })

      chrome.usb.closeDevice(connection, function (c) {console.log(c)})

      // chrome.usb.findDevices({"vendorId": vendorId, "productId": productId, "interfaceId": interfaceId}, onFindDevices);

      console.log("Device opened.");
    } else {
      console.log("Device failed to open.");
    }
  } catch (e) {
    console.log(e)
  }

}

function onFindDevices (devices) {
  console.log(devices)
}
