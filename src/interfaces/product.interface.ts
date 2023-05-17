export interface ProductCreatePayload {
  prod_id: string;
  prod_name: string;
  prod_desc: string;
  prod_qty: number;
  prod_image: string;
  cat_id: string;
}

export interface ProductUpdatePayload {
  id: string;
  prod_name: string;
  prod_desc: string;
  prod_qty: number;
  prod_image: string;
  cat_id: string;
}
