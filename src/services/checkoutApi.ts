import type { ApiResponse } from "../api/apiResponse";
import { httpUsuario } from "../api/httpUsuario";

import type {
  CheckoutResponseDto,
  ConfirmarCheckoutDto,
  ConfirmarCheckoutResponseDto,
} from "../types/checkout";

export const checkoutApi = {
  obtener: () => httpUsuario.get<ApiResponse<CheckoutResponseDto>>("/Checkout"),

  confirmar: (dto: ConfirmarCheckoutDto) =>
    httpUsuario.post<ApiResponse<ConfirmarCheckoutResponseDto>>(
      "/Checkout/confirmar",
      dto,
    ),

};
