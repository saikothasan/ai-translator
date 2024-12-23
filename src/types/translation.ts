export interface TranslationRequest {
  text: string;
  source_lang: string;
  target_lang: string;
}

export interface TranslationResponse {
  inputs: TranslationRequest;
  response: {
    translation_text: string;
  };
}
