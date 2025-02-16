export const SERVE_ROOT = 'static';
export const FieldValidate = {
  MinUserNameLength: 1,
  MaxUserNameLength: 15,
  MinPasswordLength: 6,
  MaxPasswordLength: 12,
  MinProductNameLength: 10,
  MaxProductNameLength: 100,
  MinProductDescribeLength: 20,
  MaxProductDescribeLength: 1024,
  MinProductArticleLength: 5,
  MaxProductArticleLength: 40,
  MinProductPrice: 100,
  MaxProductPrice: 1000000,
  MaxFileSizeForProduct: 1000000,
  MaxFileSizeForAvatar: 500000,
  AllowedImageFileType: '.(jpg|jpeg|png)',
} as const;
