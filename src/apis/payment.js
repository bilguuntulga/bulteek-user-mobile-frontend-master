import request from "utils/request";

export const pay_request = (data) =>
  request.post(`/api/user_backoffice/qpay/request/${data.type}`, data);
export const history = (data) =>
  request.get(`/api/user_backoffice/payment/history`, data);

export const ask_question = (data, option) =>
  request.get(`/api/public_user_backoffice/ask_question`, data, option);

export const plan = (data, option) =>
  request.get(`/api/public_user_backoffice/plan`, data, option);

  export const checkInvoice = (qpay_invoice_id) => request.get(`/api/user_backoffice/qpay/check/${qpay_invoice_id}`)