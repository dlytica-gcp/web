import axios from "axios";

const qrFetchData = {
  getindivid_qr_derived_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_qr_merchants.merchant_since",
            "dim_qr_merchants.days_since_last_transaction",
          ],
          order: { "dim_qr_merchants.merchant_sk": "asc" },
          filters: [
            {
              member: "dim_qr_merchants.cif_id",
              operator: "equals",
              values: [id],
            },
          ],
          limit: 1,
        },
      },
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_CUBE_API_TOKEN,
        },
      }
    );
    return response.data.data;
  },
  getindivid_qr_merchant_detail_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_qr_merchants.business_registered_org",
            "dim_qr_merchants.business_type",
            "dim_qr_merchants.created_date",
            "dim_qr_merchants.doing_business_as",
            "dim_qr_merchants.email_id",
            "dim_qr_merchants.merchant_category",
            "dim_qr_merchants.merchant_id",
            "dim_qr_merchants.merchant_name",
            "dim_qr_merchants.merchant_subcategory",
            "dim_qr_merchants.stage",
            "dim_qr_merchants.is_vat",
            "dim_qr_merchants.mobile_number",
            "dim_qr_merchants.settlement_level",
            "dim_qr_merchants.status",
            "dim_qr_merchants.user_profile",
            "dim_qr_merchants.pan_number",
            "dim_qr_merchants.reg_mode",
            "dim_qr_merchants.merchant_registration_type",
          ],
          order: { "dim_qr_merchants.business_registered_org": "asc" },
          filters: [
            {
              member: "dim_qr_merchants.cif_id",
              operator: "equals",
              values: [id],
            },
          ],
        },
      },
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_CUBE_API_TOKEN,
        },
      }
    );
    return response.data.data;
  },
  getindivid_qr_submerchant_detail_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_qr_sub_merchants.sub_merchant_id",
            "dim_qr_sub_merchants.sub_merchant_name",
            "dim_qr_sub_merchants.created_date",
            "dim_qr_sub_merchants.stage",
            "dim_qr_sub_merchants.location",
            "dim_qr_sub_merchants.is_default",
            "dim_qr_sub_merchants.pan_number",
            "dim_qr_sub_merchants.status",
            "dim_qr_sub_merchants.address",
          ],
          order: { "dim_qr_sub_merchants.sub_merchant_id": "asc" },
          filters: [
            {
              member: "dim_qr_sub_merchants.cif_id",
              operator: "equals",
              values: [id],
            },
          ],
        },
      },
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_CUBE_API_TOKEN,
        },
      }
    );
    return response.data.data;
  },
  getindivid_qr_terminal_detail_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_qr_terminal.terminal_details_id",
            "dim_qr_terminal.merchant_pan_number",
            "dim_qr_terminal.fonepay_pan_number",
            "dim_qr_terminal.terminal_name",
            "dim_qr_terminal.sub_merchant_id",
            "dim_qr_terminal.created_date",
            "dim_qr_terminal.approved_date",
            "dim_qr_terminal.email",
            "dim_qr_terminal.stage",
            "dim_qr_terminal.is_default",
            "dim_qr_terminal.status",
          ],
          order: { "dim_qr_terminal.terminal_details_id": "asc" },
          filters: [
            {
              member: "dim_qr_terminal.cif_id",
              operator: "equals",
              values: [id],
            },
          ],
        },
      },
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_CUBE_API_TOKEN,
        },
      }
    );
    return response.data.data;
  },
};
export default qrFetchData;