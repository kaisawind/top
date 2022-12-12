
import { parseTime, getBrowserInfo } from "./utils/info.js";
import { getIPs } from "./utils/ips.js";
import { GetIP } from "./api/index.js";

const setTime = () => {
  let timestamp = document.getElementById("timestamp");
  let time1 = document.getElementById("time1");
  let time2 = document.getElementById("time2");
  const date = new Date();
  const time = parseTime(date, '{y}{m}{d}{h}{i}{s}');
  const cntime = parseTime(date, '{y}年{m}月{d}日{h}时{i}分{s}秒');

  timestamp.innerText = date.getTime();
  time1.innerText = time;
  time2.innerText = cntime;
}

const system = () => {
  let osVersion = document.getElementById("os-version");
  let browser = document.getElementById("browser");
  let browserVersion = document.getElementById("browser-version");

  let browserInfos = getBrowserInfo();
  if (!browserInfos || browserInfos.length !== 3) {
    browserInfos = ['N/A', 'N/A', 'N/A'];
  }
  osVersion.innerText = browserInfos[0] ?? 'N/A';
  browser.innerText = browserInfos[1] ?? 'N/A';
  browserVersion.innerText = browserInfos[2] ?? 'N/A';
}

const setIps = () => {
  let ipv4 = document.getElementById("ipv4");
  let ipv6 = document.getElementById("ipv6");
  let exIpv4 = document.getElementById("ex-ipv4");
  getIPs((ips) => {
    ipv4.innerText = ips['ipv4']
    ipv6.innerText = ips['ipv6']
  })
  GetIP().then(resp => {
    const { data: { ip } } = resp;
    if (ip) {
      exIpv4.innerText = ip;
    }
  })
}

const setCity = () => {
  let exIpv4 = document.getElementById("ex-ipv4");
  let code = document.getElementById("code");
  let geo = document.getElementById("geo");

  const citySN = window.returnCitySN;
  const { cip, cid, cname } = citySN;
  if (cip) {
    exIpv4.innerText = cip;
  }
  if (cid) {
    code.innerText = cid;
  }
  if (cname) {
    geo.innerText = cname;
  }
}

(function () {
  'use strict'
  setInterval(setTime, 1000)
  system();
  setIps();
  setCity();
})();