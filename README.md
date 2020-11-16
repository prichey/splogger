network speed logger. uses [speedtest-net](https://github.com/ddsol/speedtest.net) and [pm2](https://pm2.keymetrics.io/).

`npm run` to check available commands, but:
* `npm run start`
* `npm run stop`
* `npm run once` to perform test once
* `npm run logs` to tail pm2 logs

results will be saved to `db.json` and like this:

```json
{
  "logs": [
    {
      "id": "feea2741-9d28-43ef-b2e6-789d35853357",
      "timestamp": "2020-11-16T15:46:49.000Z",
      "ping": "4ms",
      "down": "591mbps",
      "up": "93.78mbps",
      "packetLoss": 0,
      "url": "https://www.speedtest.net/result/c/feea2741-9d28-43ef-b2e6-789d35853357"
    }
  ]
}
```
