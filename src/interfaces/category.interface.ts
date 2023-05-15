export interface CategoryCreatePayload {
  cat_id: string;
  cat_name: string;
  cat_desc: string;
}

export interface CategoryUpdatePayload {
  id: string;
  cat_id: string;
  cat_name: string;
  cat_desc: string;
}
