// =================================================================
// API 클라이언트 함수
// =================================================================

/**
 * Presigned URL 생성 요청
 */
export async function getPresignedUrls(
  fileInfos: { fileName: string; fileType: string }[],
): Promise<{ uploadId: string; urls: Array<{ fileName: string; url: string }> }> {
  const response = await fetch('/api/bundles/initiate-upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ files: fileInfos }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Presigned URL 생성에 실패했습니다.' }));
    throw new Error(errorData.message);
  }
  return response.json();
}

/**
 * Presigned URL로 S3 업로드
 */
export async function uploadFileToS3(url: string, file: File) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type || 'application/octet-stream' },
    body: file,
  });
  if (!response.ok) {
    throw new Error(`'${file.name}' 파일 업로드에 실패했습니다.`);
  }
}

/**
 * 모든 파일 업로드 후 최종 등록
 */
export async function finalizeBundleUpload(payload: FormData) {
  const response = await fetch('/api/bundles/finalize-upload', {
    method: 'POST',
    body: payload,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: '번들 최종 등록에 실패했습니다.' }));
    throw new Error(errorData.message);
  }
  return response.json();
}