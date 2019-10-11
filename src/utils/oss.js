import OSS from 'ali-oss';
import uuid from 'uuid/v1';

const imgBucket = 'img-emake-cn';
const voiceBucket = 'voi-emake-cn';
const region = 'oss-cn-shanghai';
const accessKeyId = 'LTAIjK54yB5rocuv';
const accessKeySecret = 'T0odXNBRpw2tvTffxcNDdfcHlT9lzD';

const useFetch = !window.navigator.userAgent.includes('MQQBrowser');
const imgClient = new OSS({
  bucket: imgBucket,
  region,
  accessKeyId,
  accessKeySecret,
  useFetch,
});

const voiceClient = new OSS({
  bucket: voiceBucket,
  region,
  accessKeyId,
  accessKeySecret,
  useFetch,
});

function calculateName(file, subDir) {
  const [mainType, subType] = file.type.split('/');
  let postfix;
  if (mainType === 'image' && subType) {
    postfix = subType;
  } else {
    const index = (file.name || '').lastIndexOf('.');
    postfix = index === -1 ? '' : file.name.substring(index + 1);
  }
  return `${subDir}/${uuid()}${postfix ? '.' : ''}${postfix}`;
}

function put(file, subDir, client) {
  return client.put(calculateName(file, subDir), file);
}

async function putMultipart(file, subDir, client, progress) {
  const result = await client.multipartUpload(calculateName(file, subDir), file, { progress });
  return {
    ...result,
    url: `https://${result.bucket}.${region}.aliyuncs.com/${result.name}`,
  };
}

export default {
  putFile: file => put(file, 'files', voiceClient),
  putVoice: file => put(file, 'mqtt', voiceClient),
  putImage: file => put(file, 'images', imgClient),

  putFileMultipart: (file, progress) => putMultipart(file, 'files', voiceClient, progress),
  putVoiceMultipart: (file, progress) => putMultipart(file, 'mqtt', voiceClient, progress),
  putImageMultipart: (file, progress) => putMultipart(file, 'images', imgClient, progress),
};
