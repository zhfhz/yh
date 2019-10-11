import OSS from 'ali-oss';

export interface UploadResult {
  name: string;
  url: string;
}

export interface NormalPut {
  (file: File): Promise<UploadResult>;
}

export interface MultipartPut {
  (file: File, progress: (fraction: number) => void): Promise<UploadResult>;
}

export interface OSSExporter {
  putFile: NormalPut;
  putImage: NormalPut;
  putVoice: NormalPut;

  putFileMultipart: MultipartPut;
  putImageMultipart: MultipartPut;
  putVoiceMultipart: MultipartPut;
}

declare const result: OSSExporter;

export default result;
