export const SERVE_ROOT = 'static';
export const FieldValidate = {
  MinUserNameLength: 1,
  MaxUserNameLength: 15,
  MinPasswordLength: 6,
  MaxPasswordLength: 12,
  MinProductTextLength: 100,
  MaxProductTextLength: 1024,
  MinProductAnnounceLength: 50,
  MaxProductAnnounceLength: 255,
  MinProductNameLength: 20,
  MaxProductNameLength: 50,
  MinProductQuoteTextLength: 20,
  MaxProductQuoteTextLength: 300,
  MaxFileSizeForProduct: 1000000,
  MaxFileSizeForAvatar: 500000,
  AllowedImageFileType: '.(jpg|jpeg|png)',
} as const;
