import axios from "axios";

const posFetchData = {
  getindivid_pos_derived_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_cards_merchant.merchant_since",
            "dim_cards_merchant.days_since_last_transaction",
            "dim_cards_merchant.days_bet_acc_opn_mer_crea",
          ],
          order: { "dim_cards_merchant.merchant_since": "asc" },
          filters: [
            {
              member: "dim_cards_merchant.cif_id",
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
  getindivid_pos_merchant_detail_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_cards_merchant.merchant_code",
            "dim_cards_merchant.merchant_identity",
            "dim_cards_merchant.merchant_name",
            "dim_cards_merchant.currency",
            "dim_cards_merchant.mcc",
            "dim_cards_merchant.merchant_status",
            "dim_cards_merchant.company_type",
            "dim_cards_merchant.mer_crea_date",
            "dim_cards_merchant.mer_comm_effe_date",
            "dim_cards_merchant.mer_last_paym_date",
            "dim_cards_merchant.mer_last_status_date",
            "dim_cards_merchant.mer_location",
            "dim_cards_merchant.account_number",
          ],
          order: { "dim_cards_merchant.merchant_code": "asc" },
          filters: [
            {
              member: "dim_cards_merchant.cif_id",
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
  getindivid_pos_terminal_detail_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_pos_terminal.pte_code",
            "dim_pos_terminal.pte_appl_vers_numb",
            "dim_pos_terminal.pte_iden",
            "dim_pos_terminal.pte_labe",
            "dim_pos_terminal.terminal_status",
            "dim_pos_terminal.default_currency",
            "dim_pos_terminal.merchant_code",
          ],
          order: { "dim_pos_terminal.pte_code": "asc" },
          filters: [
            {
              member: "dim_pos_terminal.cif_id",
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
export default posFetchData;