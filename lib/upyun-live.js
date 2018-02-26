const Choppe = require('./choppe');

class UpYunLive{
  constructor(options) {
    this.choppe = new Choppe(options);
  }


  async createApp (app, stream, bucketName) {
    return await this.choppe.request({
      uri: '/srs/app',
      method: 'post',
      body: {
        bucket_name: bucketName,
        app,
        stream: [stream]
      },
      json: true
    });
  }

  async configLiveshot (bucketName, pushUrl, pullUrl, liveshotBucketName, liveshotPath, notifyUrl, interval) {
    return await this.choppe.request({
      uri: '/srs/stream/liveshot',
      method: 'post',
      body: {
        bucket_name: bucketName,
        stream_url: pushUrl,
        cron: {
          bucket: liveshotBucketName,
          stream: pullUrl,
          save_as: liveshotPath,
          resize: '720x480',
          notify_url: notifyUrl || 'http://example.com',
          interval: interval || 30,
        },
      },
      json: true,
    });
  }

  async configStatusCallback (bucketName, pushUrl, callbackUrl) {
    return await this.choppe.request({
      uri: '/srs/stream/status/callback',
      method: 'put',
      body: {
        bucket_name: bucketName,
        stream_url: pushUrl,
        method: 'POST',
        url: callbackUrl,
        carry: {},
      },
      json: true,
    });
  }

  async detectApp (app, bucketName) {
    return await this.choppe.request({
      uri: '/srs/app/detect',
      method: 'get',
      qs: {
        app,
        bucket_name: bucketName
      }
    });
  }

  async getLiveshotConfig (bucketName, streamUrl) {
    return await this.choppe.request({
      uri: '/srs/stream/liveshot',
      method: 'get',
      qs: {
        bucket_name: bucketName,
        stream_url: streamUrl
      }
    });
  }

  async getStatusCallbackConfig (bucketName, streamUrl) {
    return await this.choppe.request({
      uri: '/srs/stream/status/callback',
      method: 'get',
      qs: {
        bucket_name: bucketName,
        stream_url: streamUrl
      }
    });
  }
}


module.exports = UpYunLive;