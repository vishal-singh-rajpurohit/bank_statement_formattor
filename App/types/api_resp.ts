
export interface Api_Login_Types{
    id: number,
    name: string,
    email: string,
    is_verified: boolean,
    is_permium_user: boolean,
    credits_token: number,
}

export interface Api_Create_Order{
    order_id: number;
    receipt: string;
    razorpay_order_id: string;
    amount: number;
    currency: number;
    key: string;
}