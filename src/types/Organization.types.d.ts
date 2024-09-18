export interface IOrganization {
  name: string;
  users: {
    email: string;
    _id: string;
  }[];
  coupons: Coupon[];
}

export interface ICoupon {
  _id: string;
  name: string;
  discount: string;
}
