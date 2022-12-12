export const getIPs = (callback) => {
  if (!callback) return;

  const addrs = {
    ipv4: '0.0.0.0',
    ipv6: '0000:0000:0000:0000:0000:0000:0000:0000',
  };
  callback(addrs);

  const updateDisplay = (type, newAddr) => {
    addrs[type] = newAddr
    callback(addrs);
  }

  const grepSDP = (sdp) => {
    sdp.split('\r\n').forEach((line) => { // c.f. http://tools.ietf.org/html/rfc4566#page-39
      if (~line.indexOf('a=candidate')) { // http://tools.ietf.org/html/rfc4566#section-5.13
        const parts = line.split(' '); // http://tools.ietf.org/html/rfc5245#section-15.1
        const addr = parts[4];
        const type = parts[7];
        if (type === 'host') updateDisplay('ipv6', addr);
      } else if (~line.indexOf('c=')) { // http://tools.ietf.org/html/rfc4566#section-5.7
        const parts = line.split(' ');
        const addr = parts[2];
        updateDisplay('ipv4', addr);
      }
    })
  }

  // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
  const RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

  if (RTCPeerConnection) {
    const rtc = new RTCPeerConnection({ iceServers: [] });
    rtc.createDataChannel('', { reliable: false });
    rtc.onicecandidate = (evt) => {
      // convert the candidate to SDP so we can run it through our general parser
      // see https://twitter.com/lancestout/status/525796175425720320 for details
      if (evt.candidate) grepSDP('a=' + evt.candidate.candidate);
    }
    rtc.createOffer().then((offer) => {
      grepSDP(offer.sdp);
      rtc.setLocalDescription(offer);
    })
  }
}
