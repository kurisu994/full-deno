const kb = 1024;
const mb = 1024 * kb;
const gb = 1024 * mb;
const tb = 1024 * gb;

export const SIZE_UNIT = { kb, mb, gb, tb };


/**
 * 计算文件大小
 * @param {number} length 文件字节长度
 */
export function fileSize(length: number) {
  if (typeof length === 'number' && isNaN(length)) {
    return '-';
  }
  if (length > SIZE_UNIT.tb) {
    return (length / SIZE_UNIT.tb).toFixed(2) + ' TB';
  }
  if (length > SIZE_UNIT.gb) {
    return (length / SIZE_UNIT.gb).toFixed(2) + ' GB';
  }
  if (length > SIZE_UNIT.mb) {
    return (length / SIZE_UNIT.mb).toFixed(2) + ' MB';
  }
  return (length / SIZE_UNIT.kb).toFixed(2) + ' KB';
}

/**
 * 获取文件展示地址
 * @param {string} fid 文件标识
 */
export function getFileURL(fid: string) {
  if (!!fid && (fid.includes('file:') || fid.includes('content:') || fid.includes('http:') || fid.includes('https:'))) {
    return fid;
  }
  return `https://testgate.feewee.cn/file/show?fid=${fid}`;
}