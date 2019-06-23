export function getIPs(callback) {
  // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
  const RTCPeerConnection = /* window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection
  let IPs = []

  if (RTCPeerConnection) {
    (function() {
      var rtc = new RTCPeerConnection({ iceServers: [] })
      if (1 || window.webkitRTCPeerConnection) { // FF [and now Chrome!] needs a channel/stream to proceed
        rtc.createDataChannel('', { reliable: false })
      }

      rtc.onicecandidate = function(evt) {
        // convert the candidate to SDP so we can run it through our general parser
        // see https://twitter.com/lancestout/status/525796175425720320 for details
        if (evt.candidate) grepSDP('a=' + evt.candidate.candidate)
      }
      rtc.createOffer(function(offerDesc) {
        grepSDP(offerDesc.sdp)
        rtc.setLocalDescription(offerDesc)
      }, function(e) { console.warn('offer failed', e) })

      var addrs = Object.create(null)
      addrs['0.0.0.0'] = false
      function updateDisplay(newAddr) {
        if (newAddr in addrs) return
        else addrs[newAddr] = true
        IPs = Object.keys(addrs).filter((k) => { return addrs[k] })
        callback(IPs)
      }

      function grepSDP(sdp) {
        sdp.split('\r\n').forEach(function(line) { // c.f. http://tools.ietf.org/html/rfc4566#page-39
          if (~line.indexOf('a=candidate')) { // http://tools.ietf.org/html/rfc4566#section-5.13
            const parts = line.split(' ') // http://tools.ietf.org/html/rfc5245#section-15.1
            const addr = parts[4]
            const type = parts[7]
            if (type === 'host') updateDisplay(addr)
          } else if (~line.indexOf('c=')) { // http://tools.ietf.org/html/rfc4566#section-5.7
            const parts = line.split(' ')
            const addr = parts[2]
            updateDisplay(addr)
          }
        })
      }
    })()
  }
}
