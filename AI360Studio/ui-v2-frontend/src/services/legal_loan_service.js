import axios from "axios";

const legalLoanFetchData = {
  getindivid_loan_details_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_loan_accounts_funded.foracid",
            "dim_product.product_scheme_type",
            "dim_product.product_scheme_description",
            "dim_loan_accounts_funded.ra_unit",
          ],
          order: { "dim_loan_accounts_funded.ra_unit": "asc" },
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
          Authorization:
            process.env.NEXT_PUBLIC_CUBE_API_TOKEN,
        },
      }
    );
    return response.data.data;
  },
  getfunded_loan_basic_derived_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_gam.acid",
            "dim_gam.acct_name",
            "dim_loan_accounts_funded.facility",
            "dim_loan_accounts_funded.ra_unit",
            "dim_customers.cif_id",
            "dim_loan_accounts_funded.nic_asia_product",
            "dim_loan_accounts_funded.sanction_limit",
            "dim_loan_accounts_funded.drwng_power",
            "dim_loan_accounts_funded.limit_sanction_date",
            "dim_loan_accounts_funded.limit_expiry_date",
            "dim_loan_accounts_funded.limit_review_date",
            "dim_loan_accounts_funded.multi_banking_code",
            "dim_loan_accounts_funded.sector_code",
            "dim_loan_accounts_funded.sub_sector_code",
            "dim_loan_accounts_funded.group_name",
            "dim_loan_accounts_funded.groupid_code",
            "dim_loan_accounts_funded.categoryid",
            "dim_loan_accounts_funded.currency",
            "dim_loan_accounts_funded.limit_expiry_date",
            "dim_loan_accounts_funded.limit_review_date",
            "dim_gam.acct_opn_date",
            "dim_loan_accounts_funded.days_between_account_opening_and_loan_sanction",
            "dim_loan_accounts_funded.limit_expiry_days_in",
            "dim_loan_accounts_funded.limit_review_days_in",
          ],
          order: { "dim_loan_accounts_funded.foracid": "asc" },
          filters: [
            {
              member: "dim_loan_accounts_funded.foracid",
              operator: "equals",
              values: [id],
            },
          ],
          limit: 1,
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
  getnon_funded_loan_lc_issuance: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_non_funded_lc_issuance.lc_no",
            "dim_non_funded_lc_issuance.sol_id",
            "dim_non_funded_lc_issuance.date_opnd",
            "dim_non_funded_lc_issuance.expiry_date",
            "dim_non_funded_lc_issuance.actl_crncy_code",
            "dim_non_funded_lc_issuance.issu_party_code",
            "dim_non_funded_lc_issuance.cif_id",
            "dim_non_funded_lc_issuance.applicant_name",
            "dim_non_funded_lc_issuance.shipment_terms",
            "dim_non_funded_lc_issuance.place_of_expiry",
            "dim_non_funded_lc_issuance.port_of_destin",
            "dim_non_funded_lc_issuance.comm_details_text_1",
            "dim_non_funded_lc_issuance.comm_details_text_2",
            "dim_non_funded_lc_issuance.confirmation_reqd_flg",
            "dim_non_funded_lc_issuance.func_code",
            "dim_non_funded_lc_issuance.dc_reg_type",
            "dim_non_funded_lc_issuance.last_ship_date",
            "dim_non_funded_lc_issuance.ra_unit",
            "dim_non_funded_lc_issuance.rm_code",
            "dim_non_funded_lc_issuance.beneficiary",
            "dim_non_funded_lc_issuance.ben_address",
            "dim_non_funded_lc_issuance.bank",
            "dim_non_funded_lc_issuance.bank_branch",
            "dim_non_funded_lc_issuance.lc_value",
            "dim_non_funded_lc_issuance.effective_value",
            "dim_non_funded_lc_issuance.outstanding_value",
          ],
          order: { "dim_non_funded_lc_issuance.sol_id": "asc" },
          filters: [
            {
              member: "dim_non_funded_lc_issuance.cif_id",
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
  getnon_funded_loan_lc_outstanding: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_non_funded_lc_outstanding.lc_no",
            "dim_non_funded_lc_outstanding.sol_id",
            "dim_non_funded_lc_outstanding.dc_b2kid",
            "dim_non_funded_lc_outstanding.date_opnd",
            "dim_non_funded_lc_outstanding.expiry_date",
            "dim_non_funded_lc_outstanding.actl_crncy_code",
            "dim_non_funded_lc_outstanding.issu_party_code",
            "dim_non_funded_lc_outstanding.cif_id",
            "dim_non_funded_lc_outstanding.applicant_name",
            "dim_non_funded_lc_outstanding.shipment_terms",
            "dim_non_funded_lc_outstanding.place_of_expiry",
            "dim_non_funded_lc_outstanding.port_of_destin",
            "dim_non_funded_lc_outstanding.comm_details_text_1",
            "dim_non_funded_lc_outstanding.ra_unit",
            "dim_non_funded_lc_outstanding.rm_unit",
            "dim_non_funded_lc_outstanding.comm_details_text_2",
            "dim_non_funded_lc_outstanding.func_code",
            "dim_non_funded_lc_outstanding.dc_reg_type",
            "dim_non_funded_lc_outstanding.last_ship_date",
            "dim_non_funded_lc_outstanding.name",
            "dim_non_funded_lc_outstanding.address1",
            "dim_non_funded_lc_outstanding.corr_bank",
            "dim_non_funded_lc_outstanding.current_value",
          ],
          order: { "dim_non_funded_lc_outstanding.lc_no": "asc" },
          filters: [
            {
              member: "dim_non_funded_lc_outstanding.cif_id",
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
  getnon_funded_bg_register: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_non_funded_bg_register.bg_srl_num",
            "dim_non_funded_bg_register.issue_date",
            "dim_non_funded_bg_register.bg_type",
            "dim_non_funded_bg_register.cif_id",
            "dim_non_funded_bg_register.ra_unit",
            "dim_non_funded_bg_register.rm_code",
            "dim_non_funded_bg_register.cust_name",
            "dim_non_funded_bg_register.crncy_code",
            "dim_non_funded_bg_register.sol_id",
            "dim_non_funded_bg_register.beneficiary_name",
            "dim_non_funded_bg_register.purpose_of_bg",
            "dim_non_funded_bg_register.bg_expiry_date",
            "dim_non_funded_bg_register.claim_expiry_date",
            "dim_non_funded_bg_register.bg_status",
            "dim_non_funded_bg_register.close_date",
          ],
          order: { "dim_non_funded_bg_register.bg_srl_num": "asc" },
          filters: [
            {
              member: "dim_non_funded_bg_register.cif_id",
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
  getnon_funded_bg_outstanding: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_non_funded_bg_outstanding.bg_srl_num",
            "dim_non_funded_bg_outstanding.issue_date",
            "dim_non_funded_bg_outstanding.bg_type",
            "dim_non_funded_bg_outstanding.cif_id",
            "dim_non_funded_bg_outstanding.bg_status",
            "dim_non_funded_bg_outstanding.cust_name",
            "dim_non_funded_bg_outstanding.crncy_code",
            "dim_non_funded_bg_outstanding.sol_id",
            "dim_non_funded_bg_outstanding.beneficiary_name",
            "dim_non_funded_bg_outstanding.address",
            "dim_non_funded_bg_outstanding.beneficiary_type",
            "dim_non_funded_bg_outstanding.ra_unit",
            "dim_non_funded_bg_outstanding.rm_code",
            "dim_non_funded_bg_outstanding.purpose_of_bg",
            "dim_non_funded_bg_outstanding.bg_expiry_date",
            "dim_non_funded_bg_outstanding.claim_expiry_date",
          ],
          order: { "dim_non_funded_bg_outstanding.bg_srl_num": "asc" },
          filters: [
            {
              member: "dim_non_funded_bg_outstanding.cif_id",
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
export default legalLoanFetchData;