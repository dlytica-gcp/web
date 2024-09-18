import axios from "axios";

const legalMobileFetchData = {
  getindivid_mobile_basic_derived_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_mob_customers.mobile_number",
            "dim_mob_customers.cbs_id",
            "dim_mob_bank_account.account_number",
            "dim_mob_bank_account.added_date",
            "dim_mob_customer_login.first_login_date_date_part",
            "dim_mob_customers.first_txn_date",
            "dim_mob_bank_account.renew_date",
            "dim_mob_customers.has_security_question",
            "dim_mob_customers.renew_since",
            "dim_mob_customers.first_login_since",
            "dim_mob_customers.mob_reg__time_from_acopen",
            "dim_mob_customers.first_txn_from_creation",
            "dim_mob_customers.days_bet_approved_created",
            "dim_mob_customers.first_login_from_creation",
            "dim_mob_customers.first_txn_from_creation",
            "dim_mob_application_user.login_block_remarks",
            "dim_mob_customers.blocked_since",
            "dim_mob_profile.profile_name",
            "dim_mob_application_user.login_block_date",
          ],
          order: { "dim_customers.mobile_number": "asc" },
          filters: [
            {
              member: "dim_mob_customers.cbs_id",
              operator: "equals",
              values: [id],
            },
            {
              member: "dim_customers.cust_type",
              operator: "equals",
              values: ["LEGAL"],
            },
          ],
          limit: 1,
        },
      },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjM1OTMzMjEsImV4cCI6MTcyMzY3OTcyMX0.UeOIIP68_y2oTnSsGJFmSLscxyaBbzyAxC1rFTkLkUY",
        },
      }
    );
    return response.data.data;
  },
};
export default legalMobileFetchData;