
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

export interface Api_Action_Upload {
    message: string;
    operation_id: number;
    filename: string;
    temp_name?: string;
}

export interface Api_Action_Initiate {
    message: string;
    operation_id: number;
    bank_name: string;
    tally_name: string;
    voucher_name: string;
}

export interface Api_Action_Complete {
    message: string;
    operation_id: number;
    bank_name: string;
    output_file: string;
    delivery: string;
}
