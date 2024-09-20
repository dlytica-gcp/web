import axios from "axios";

const legalDepositFetchData = {
  getSavingDepos: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,
      {
        query: {
          dimensions: [
            "fact_transactions.tran_date_date_part",
            "dim_product.product_scheme_type",
            "dim_product.product_scheme_category",
            "dim_product.product_scheme_sub_category",
          ],
          order: {
            "fact_transactions.total_debit_tran_vol": "desc",
          },
          measures: [
            "fact_transactions.total_debit_tran_vol",
            "fact_transactions.total_credit_tran_vol",
            "fact_transactions.total_debit_tran_count",
            "fact_transactions.total_credit_tran_count",
          ],
          timeDimensions: [
            {
              dimension: "fact_transactions.updated_at",
              dateRange: "This year",
            },
          ],
          filters: [
            {
              member: "dim_customers.cif_id",
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
  getDeposit: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,
      {
        query: {
          dimensions: [
            "dim_product.product_scheme_type",
            "dim_product.product_scheme_category",
            "dim_product.product_scheme_sub_category",
            "dim_gam.acct_opn_date_date_part",
            "dim_product.product_scheme_code",
            "dim_product.product_scheme_description",
            "dim_gam.acct_cls_flg",
            "dim_gam.acid",
            "dim_gam.foracid",
          ],
          order: {
            "fact_transactions.total_debit_tran_vol": "desc",
          },
          measures: [
            "fact_transactions.total_debit_tran_vol",
            "fact_transactions.total_credit_tran_vol",
            "fact_transactions.total_debit_tran_count",
            "fact_transactions.total_credit_tran_count",
          ],
          filters: [
            {
              member: "dim_customers.cif_id",
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

  getsavingdepo_basicinfo_derived: async (foracid, cif, sub_cat) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,
      {
        query: {
          dimensions: [
            "dim_gam.acid",
            "dim_product.product_scheme_type",
            "dim_product.product_scheme_code",
            "dim_gam.acct_opn_date",
            "dim_gam.acct_cls_flg",
            "dim_gam.foracid",
            "dim_gam.account_status",
            "dim_gam.last_transaction_date",
            "dim_gam.last_digital_transaction_date",
            "dim_gam.last_branch_transaction_date",
            "dim_product.product_scheme_description",
            "dim_deposit_accounts.freeze_status",
            "dim_deposit_accounts.freeze_code",
            "dim_deposit_accounts.freeze_reason",
            "dim_deposit_accounts.last_freeze_date",
            "dim_deposit_accounts.last_unfreeze_date",
            "dim_deposit_accounts.first_customer_induced_transaction_date",
            "dim_deposit_accounts.dormant_status",
            "dim_deposit_accounts.dormant_date",
            "dim_product.product_scheme_sub_category",
            "dim_product.product_scheme_category",
            "dim_gam.days_since_last_customer_induced_transaction",
            "dim_gam.days_since_last_digital_transaction",
            "dim_gam.days_since_last_branch_transaction",
            "dim_deposit_accounts.days_since_freeze",
            "dim_deposit_accounts.days_since_dormant",
            "dim_deposit_accounts.days_since_last_unfreeze",
            "dim_customers.account_relationship_days",
            "dim_deposit_accounts.days_since_first_customer_induced_transaction",
            "dim_gam.acct_name",
            "dim_deposit_accounts.minimum_balance",
            "dim_deposit_accounts.available_amount",
            "dim_branch.branch_description",
            // "dim_deposit_accounts.foracid",
            "dim_gam.account_balance",
            "dim_gam.interest_rate",
            "dim_gam.lien_amt",
          ],
          order: {
            "dim_gam.last_digital_transaction_date": "desc",
          },
          // measures: [
          //   "fact_transaction_details.last_digital_transaction_date",
          //   "fact_transaction_details.last_branch_transaction_date",
          //   "fact_transaction_details.last_digital_transaction_since_days",
          //   "fact_transaction_details.last_branch_transaction_since_days",
          //   "fact_transaction_details.last_transaction_since_days",
          //   "fact_transaction_details.last_transaction_date",
          // ],
          filters: [
            {
              member: "dim_gam.foracid",
              operator: "equals",
              values: [foracid],
            },
            {
              member: "dim_customers.cif_id",
              operator: "equals",
              values: [cif],
            },
            {
              member: "dim_customers.cust_type",
              operator: "equals",
              values: ["LEGAL"],
            },
            {
              member: "dim_product.product_scheme_category",
              operator: "equals",
              values: ["Deposit"],
            },
            {
              member: "dim_product.product_scheme_sub_category",
              operator: "equals",
              values: [sub_cat],
            },
          ],
          // limit: 1,
        },
      },
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_CUBE_API_TOKEN,
        },
      }
    );
    return response.data.data;
    // console.log(response.data.data);
  },
  getdeposit_details: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_product.product_scheme_type",
            "dim_product.product_scheme_category",
            "dim_product.product_scheme_sub_category",
            "dim_gam.acct_opn_date_date_part",
            "dim_product.product_scheme_code",
            "dim_product.product_scheme_description",
            "dim_gam.acct_cls_flg",
            "dim_gam.acid",
            "dim_deposit_accounts.available_amount",
            "dim_deposit_accounts.minimum_balance",
          
            "dim_gam.foracid",
            "dim_customers.cif_id",
          ],
          order: {
            "fact_transactions.total_debit_tran_vol": "desc",
          },
          filters: [
            {
              member: "dim_customers.cif_id",
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
  getsaving_deposit_lien_details: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_lien.lien_start_date",
            "dim_lien.lien_expiry_date",
            "dim_lien.lien_remarks",
            "dim_lien.lien_reason_code",
          ],
          order: { "dim_lien.lien_start_date": "asc" },
          filters: [
            { member: "dim_lien.foracid", operator: "equals", values: [id] },
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
  getsaving_deposit_interest_rate_details: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          filters: [
            {
              member: "dim_interest_rate.foracid",
              operator: "equals",
              values: [id],
            },
          ],
          dimensions: [
            "dim_interest_rate.start_date",
            "dim_interest_rate.end_date",
          ],
          order: { "dim_interest_rate.start_date": "asc" },
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
  getsaving_deposit_nominee_details: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          filters: [
            { member: "dim_nominee.foracid", operator: "equals", values: [id] },
          ],
          dimensions: [
            "dim_nominee.nominee_name",
            "dim_nominee.nominee_address",
            "dim_nominee.nominee_id",
          ],
          order: { "dim_nominee.nominee_name": "asc" },
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
  getsaving_deposit_signatories_details: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          filters: [
            {
              member: "dim_signatories.foracid",
              operator: "equals",
              values: [id],
            },
          ],
          dimensions: [
            "dim_signatories.signatory_name",
            "dim_signatories.signatory_relationship_type",
          ],
          order: { "dim_signatories.signatory_name": "asc" },
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
export default legalDepositFetchData;
