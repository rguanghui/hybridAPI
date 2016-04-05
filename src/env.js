const userAgent = window.navigator.userAgent;

export let version;
if (/rajax|eleme/i.test(userAgent)) {
  const matches = userAgent.match(/Eleme\/([0-9]+)\.([0-9]+)/i);
  version = Number(matches[1]) * 100 + Number(matches[2]);
}

export const legacy = version < 509;
