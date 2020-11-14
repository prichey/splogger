const speedTest = require('speedtest-net');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const get = require('lodash.get');
const shortid = require('shortid');

const adapter = new FileSync('db.json');
const db = low(adapter);

const bytesPerMbps = 125000;

const round = (num, precision = 0) => {
  const multiplier = Math.pow(10, precision);
  return Math.round(num * multiplier) / multiplier;
};

const formatResult = (res) => {
  const baseObj = {
    id: get(res, 'result.id', shortid.generate()),
    timestamp: get(res, 'timestamp', Date.now()),
  };

  try {
    return {
      ...baseObj,
      ping: `${round(res.ping.latency)}ms`,
      down: `${round(res.download.bandwidth / bytesPerMbps, 2)}mbps`,
      up: `${round(res.upload.bandwidth / bytesPerMbps, 2)}mbps`,
      packetLoss: res.packetLoss,
      url: res.result.url,
    };
  } catch (err) {
    console.log('Error formatting result', err);

    return {
      ...baseObj,
      error: err,
    };
  }
};

const run = async () => {
  try {
    // make sure db is properly initialized
    db.defaults({ logs: [] }).write();

    console.log('performing speed test...');
    const res = await speedTest({
      acceptLicense: true,
    });
    db.get('logs').push(formatResult(res)).write();

    console.log('success!');
  } catch (err) {
    console.error('failure:', err);
  }
};

run();