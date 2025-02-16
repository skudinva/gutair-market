export const SERVE_ROOT = 'static';
export const FieldValidate = {
  MinUserNameLength: 1,
  MaxUserNameLength: 15,
  MinPasswordLength: 6,
  MaxPasswordLength: 12,
  MinPostTextLength: 100,
  MaxPostTextLength: 1024,
  MinPostAnnounceLength: 50,
  MaxPostAnnounceLength: 255,
  MinPostNameLength: 20,
  MaxPostNameLength: 50,
  MinPostQuoteTextLength: 20,
  MaxPostQuoteTextLength: 300,
  MaxFileSizeForPost: 1000000,
  MaxFileSizeForAvatar: 500000,
  AllowedImageFileType: '.(jpg|jpeg|png)',
} as const;
