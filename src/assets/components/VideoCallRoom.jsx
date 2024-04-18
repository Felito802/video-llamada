import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCallRoom() {
      const roomID = getUrlParams().get('roomID') || randomID(5);
      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
      const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SECRET_KEY;
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));


     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });


  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
////////////////////////////////////////////////////////////////////////
function generarEnlaceVideollamada(idCita) {
  // Crear un ID de reunión único.
  const idReunion = require('uuid').v4();
 
  // Crear un objeto de configuración de la reunión.
  const configReunion = {
    appId:  VITE_ZEGOCLOUD_APP_ID,
    secretKey:VITE_ZEGOCLOUD_SECRET_KEY,
    meetingId: idReunion,
    tokenExpiredTime: 3600,
  };
 
  // Crear un cliente ZegoCloud.
  const zegoClient = new ZegoCloud(configReunion);
 
  // Generar un enlace de videollamada.
  const enlaceVideollamada = zegoClient.generateMeetingLink();
 
  return enlaceVideollamada;
 }