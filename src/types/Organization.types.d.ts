export interface IOrganization {
  name: string;
  users: string[];
  coupons: Coupon[];
}

export interface ICoupon {
  id: number;
  code: string;
  discount: string;
}
