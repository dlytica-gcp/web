import axios from "axios";

const cardFetchData = {
  getindivid_debit_card_details_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_cards_debit_card.foracid",
            "dim_cards_debit_card.car_numb",
            "dim_cards_debit_card.card_status",
            "dim_cards_debit_card.car_firs_crea_date"
          ],
          filters: [
            {
              member: "dim_cards_debit_card.cif_id",
              operator: "equals",
              values: [id],
            },
          ],
          order: { "dim_cards_debit_card.cif_id": "asc" },
        },
      },
      {
        headers: {
          Authorization:
            process.env.NEXT_PUBLIC_CUBE_API_TOKEN,
        },
      }
    );
    return response.data.data;
  },
  getindivid_credit_card_details_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_cards_credit_card.car_numb",
            "dim_cards_credit_card.car_firs_crea_date",
            "dim_cards_credit_card.credit_limit",
            "dim_cards_credit_card.foracid",
            "dim_cards_credit_card.car_expi_date_date_part",
            "dim_cards_credit_card.available_balance",
            "dim_cards_credit_card.card_status",
            "dim_cards_credit_card.used_balance",
          ],
          filters: [
            {
              "member": "dim_cards_credit_card.cif_id",
              "operator": "equals",
              "values": [id]
            }
          ],
          order: { "dim_cards_credit_card.blocked_date": "asc" },
        },
      },
      {
        headers: {
          Authorization:
            process.env.NEXT_PUBLIC_CUBE_API_TOKEN,
        },
      }
    );
    return response.data.data;
  },
  getindivid_card_basic_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          measures: [
            "dim_cards_card.total_cards",
            "dim_cards_card.total_transactions",
            "dim_cards_card.total_transactions_amount",
            "dim_cards_card.total_active_cards",
          ],
          filters: [
            {
              member: "dim_cards_card.cif_id",
              operator: "equals",
              values: [id],
            },
          ],
          limit: 1,
          dimensions: ["dim_cards_card.cif_id"],
          order: { "dim_cards_card.total_cards": "desc" },
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
  getindivid_credit_card_breakdown_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        "query":
        {
          "measures":
            ["dim_cards_credit_card.total_cards",
              "dim_cards_credit_card.total_inactive_cards",
              "dim_cards_credit_card.total_ecom_txn_amount",
              "dim_cards_credit_card.total_pos_txn_amount",
              "dim_cards_credit_card.last_created_date",
              "dim_cards_credit_card.total_available_balance",
              "dim_cards_credit_card.total_active_card",
              "dim_cards_credit_card.total_credit_limit",
              "dim_cards_credit_card.total_txn_amounts"],
          "order": { "dim_cards_credit_card.car_prep_date": "asc" },
          "filters": [{
            "member": "dim_cards_credit_card.cif_id",
            "operator": "equals", "values": [id]
          }]
        }
      },
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_CUBE_API_TOKEN,
        },
      }
    );
    return response.data.data;
  },
  getindivid_debit_card_breakdown_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      { "query": { "measures": ["dim_cards_debit_card.total_active_card", "dim_cards_debit_card.total_cards", "dim_cards_debit_card.total_inactive_cards", "dim_cards_debit_card.total_ecom_txn_amount", "dim_cards_debit_card.total_pos_txn_amount", "dim_cards_debit_card.total_atm_txn_amount", "dim_cards_debit_card.total_txn_amounts", "dim_cards_debit_card.last_created_date"], "order": { "dim_cards_debit_card.car_prep_date": "asc" }, "filters": [{ "member": "dim_cards_debit_card.cif_id", "operator": "equals", "values": [id] }] } },
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_CUBE_API_TOKEN,
        },
      }
    );
    return response.data.data;
  },

  get_credit_card_info: async (cif_id, card_id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,
      {
        query: {
          dimensions: [
            "dim_cards_credit_card.blocked_date",
            "dim_cards_credit_card.first_transaction_date",
            "dim_cards_credit_card.last_block_since",
            "dim_cards_credit_card.last_txn_since",
            "dim_cards_credit_card.last_ecom_txn_since",
            "dim_cards_credit_card.last_pos_txn_date",
            "dim_cards_credit_card.car_numb",
            "dim_cards_credit_card.card_activation_from_reg_date",
            "dim_cards_credit_card.card_status",
            "dim_cards_credit_card.last_txn_date",
            "dim_cards_credit_card.activation_date",
            "dim_cards_credit_card.car_firs_crea_date",
            "dim_cards_credit_card.credit_limit",
            "dim_cards_credit_card.foracid",
            "dim_cards_credit_card.available_balance",
            "dim_cards_credit_card.used_balance",
            "dim_cards_credit_card.car_expi_date_date_part",
            "dim_cards_credit_card.payment_option",
            "dim_cards_credit_card.latest_bill_date",
            "dim_cards_credit_card.payment_due_date"
          ],
          filters: [
            {
              member: "dim_cards_credit_card.cif_id",
              operator: "equals",
              values: [cif_id],
            },
            {
              member: "dim_cards_credit_card.car_numb",
              operator: "equals",
              values: [card_id],
            }
          ],
        },
      },
      {
        headers: {
          Authorization:
            process.env.NEXT_PUBLIC_CUBE_API_TOKEN,
        },
      }
    );
    return response.data.data;
  },
  get_debit_card_info: async (cif_id, card_id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,
      {
        "query":
        {
          "dimensions":
            ["dim_cards_debit_card.acc_numb",
              "dim_cards_debit_card.car_numb",
              "dim_cards_debit_card.car_firs_crea_date",
              "dim_cards_debit_card.card_status",
              "dim_cards_debit_card.last_txn_date",
              "dim_cards_debit_card.first_transaction_date",
              "dim_cards_debit_card.card_registration_from_acc_opn_date",
              "dim_cards_debit_card.card_activation_from_reg_date",
              "dim_cards_debit_card.cardtxn_from_reg_date",
              "dim_cards_debit_card.cardtxn_from_reg_date",
              "dim_cards_debit_card.last_ecom_txn_date",
              "dim_cards_debit_card.total_pos_transaction",
              "dim_cards_debit_card.total_atm_transaction",
              "dim_cards_debit_card.total_txn_amount",
              "dim_cards_debit_card.blocked_date",
              "dim_cards_debit_card.last_txn_since",
              "dim_cards_debit_card.last_ecom_txn_since",
              "dim_cards_debit_card.last_pos_txn_since",
              "dim_cards_debit_card.last_block_since"],
          "order": { "dim_cards_debit_card.acc_numb": "asc" },
          "filters": [
            { "member": "dim_cards_debit_card.cif_id", "operator": "equals", "values": [cif_id] },
            { "member": "dim_cards_debit_card.car_numb", "operator": "equals", "values": [card_id] }]
        }
      },
      {
        headers: {
          Authorization:
            process.env.NEXT_PUBLIC_CUBE_API_TOKEN,
        },
      }
    );
    return response.data.data;
  },
};

export default cardFetchData;