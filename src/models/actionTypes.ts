export const EMPTY_CART = "empty"
export const UPDATE_CART_QUANTITY = "updateQuantity"
export const ADD_TO_CART = "add"

export interface EmptyCartAction {
    type: typeof EMPTY_CART
  }
  
  export interface UpdateCartAction {
    type: typeof UPDATE_CART_QUANTITY
    quantity: number
    sku: string
  }
  
  export interface AddToCartAction {
    type: typeof ADD_TO_CART
    id: string
    sku: string
  }

export type ActionTypes =
  | EmptyCartAction
  | UpdateCartAction
  | AddToCartAction