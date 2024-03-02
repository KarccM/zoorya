export default function prepare(data) {
  const formData = new FormData();
  prepareTranslation(formData, data);
  prepareVideoOrAudio(formData, data);
  return formData;
}

function prepareTranslation(formData, data) {

  formData.append('translations[0][locale]', "ar")
  formData.append('translations[0][title]', data.titleAr)
  formData.append('translations[0][content]', data.contentAr)
  data.metaDataKeywordAr && formData.append('translations[0][metaDataKeyword]', data.metaDataKeywordAr)
  data.metaDataDescriptionAr && formData.append('translations[0][metaDataDescription]', data.metaDataDescriptionAr)

  formData.append('translations[1][locale]', "en")
  formData.append('translations[1][title]', data.titleEn)
  formData.append('translations[1][content]', data.contentEn)
  data.metaDataKeywordEn && formData.append('translations[1][metaDataKeyword]', data.metaDataKeywordEn)
  data.metaDataDescriptionEn && formData.append('translations[1][metaDataDescription]', data.metaDataDescriptionEn)

  if (data.titleFr || data.contentFr || data.metaDataKeywordFr || data.metaDataDescriptionFr)
    formData.append('translations[2][locale]', "fr")
  data.titleFr && formData.append('translations[2][title]', data.titleFr)
  data.contentFr && formData.append('translations[2][content]', data.contentFr)
  data.metaDataKeywordFr && formData.append('translations[2][metaDataKeyword]', data.metaDataKeywordFr)
  data.metaDataDescriptionFr && formData.append('translations[2][metaDataDescription]', data.metaDataDescriptionFr)
}

function prepareVideoOrAudio(formData, data) {
  formData.append("contentType", data.contentType.value)
  !data.externalImage ? formData.append("externalImage", null) : formData.append("externalImage", data.externalImage);
  data.contentType.value !== 'VIDEO' && data?.internalImage?.path && formData.append("internalImage", data?.internalImage);
  data.contentType.value === 'VIDEO' && formData.append("videoVimeoId", data.trailerVimeoId);
}