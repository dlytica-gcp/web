import axios from "axios";
import { sanitizeSearchInput } from "@/lib/utils/filter_search";
const individualCustomerFetchData = {
  get_aggregatedinsights: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,
      {
        query: {
          dimensions: [
            "fact_transactions.cif_id",
            "fact_transactions.tran_channel_type",
            "fact_transactions.tran_date_date_part",
          ],
          order: {
            "fact_transactions.txn_count": "desc",
          },
          measures: [
            "fact_transactions.txn_count",
            "fact_transactions.tran_amt_vol",
          ],
          timeDimensions: [
            {
              dimension: "fact_transactions.tran_date_timestamp",
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
  getStatistic: async ({
    cus_type,
    searchQuery = "",
    selectedHub = "",
    selectedSubProvince = "",
    selectedCity = "",
    selectedBranch = "",
    limit,
    offset,
  } = {}) => {
    try {
      const filters = [
        {
          member: "dim_customers.cust_type",
          operator: "equals",
          values: [cus_type],
        },
        {
          member: "dim_branch.hub_name",
          operator: "contains",
          values: [selectedHub],
        },
        {
          member: "dim_branch.sub_provincial",
          operator: "contains",
          values: [selectedSubProvince],
        },
        {
          member: "dim_branch.city_code",
          operator: "contains",
          values: [selectedCity],
        },
        {
          member: "dim_customers.home_branch",
          operator: "contains",
          values: [selectedBranch],
        },
      ];

      if (searchQuery) {
        searchQuery = sanitizeSearchInput(searchQuery);
        const hasNumber = /\d/.test(searchQuery);
        if (hasNumber) {
          filters.push({
            member: "dim_customers.cif_id",
            operator: "contains",
            values: [searchQuery],
          });
        } else {
          filters.push({
            member: "dim_customers.full_name",
            operator: "contains",
            values: [searchQuery],
          });
        }
      }
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CUBE_API_URL,
        {
          query: {
            dimensions: [
              "dim_customers.full_name",
              "dim_customers.age",
              "dim_customers.gender",
              "dim_customers.cif_id",
              "dim_customers.home_branch",
              "dim_customers.cust_relationship_start_date",
            ],
            order: { "dim_customers.full_name": "asc" },
            limit,
            offset,
            filters,
          },
        },
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_CUBE_API_TOKEN,
          },
        }
      );
      return response.data.data; // Return the paginated data
    } catch (error) {
      console.error("Error fetching individual data:", error);
      return [];
    }
  },

  // Fetch total count of items matching filters
  getTotalCount: async ({
    cus_type,
    searchQuery = "",
    selectedHub = "",
    selectedSubProvince = "",
    selectedCity = "",
    selectedBranch = "",
  } = {}) => {
    try {
      const filters = [
        {
          member: "dim_customers.cust_type",
          operator: "equals",
          values: [cus_type],
        },
        {
          member: "dim_branch.hub_name",
          operator: "contains",
          values: [selectedHub],
        },
        {
          member: "dim_branch.sub_provincial",
          operator: "contains",
          values: [selectedSubProvince],
        },
        {
          member: "dim_branch.city_code",
          operator: "contains",
          values: [selectedCity],
        },
        {
          member: "dim_customers.home_branch",
          operator: "contains",
          values: [selectedBranch],
        },
      ];

      if (searchQuery) {
        searchQuery = sanitizeSearchInput(searchQuery);
        const hasNumber = /\d/.test(searchQuery);
        if (hasNumber) {
          filters.push({
            member: "dim_customers.cif_id",
            operator: "contains",
            values: [searchQuery],
          });
        } else {
          filters.push({
            member: "dim_customers.full_name",
            operator: "contains",
            values: [searchQuery],
          });
        }
      }
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CUBE_API_URL,
        {
          query: {
            dimensions: [
              "dim_customers.full_name",
              "dim_customers.gender",
              "dim_customers.cif_id",
              "dim_customers.home_branch",
            ],
            filters,
          },
        },
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_CUBE_API_TOKEN,
          },
        }
      );

      // Calculate the total count from the response
      const totalCount = response.data.data.length>0?response.data.data.length:0;
      return totalCount;
    } catch (error) {
      console.error("Error fetching total count:", error);
      return 0;
    }
  },

  getindivid_basicinfo_derived: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,
      {
        query: {
          dimensions: [
            "dim_customers.cust_first_name",
            "dim_customers.cust_middle_name",
            "dim_customers.cust_last_name",
            "dim_customers.full_name",
            "dim_customers.introducername",
            "dim_customers.education",
            "dim_customers.cust_dob",
            "dim_customers.gender",
            "dim_customers.employment_status",
            "dim_customers.employersname",
            "dim_customers.home_branch",
            "dim_customers.marital_status",
            "dim_customers.occupation",
            "dim_customers.nationality",
            "dim_customers.riskrating",
            "dim_customers.marital_status",
            "dim_customers.occupation",
            "dim_customers.blacklisted",
            "dim_customers.createdbysystemid",
            "dim_customers.staffflag",
            "dim_customers.customerminor",
            "dim_customers.customernreflg",
            "dim_customers.cust_relationship_start_date",
            "dim_customers.staffemployeeid",
            "dim_customers.tds_tbl",
            "dim_customers.cust_community",
            "dim_customers.cust_hlth",
            "dim_customers.pan",
            "dim_customers.status",
            "dim_customers.constitution_code_desc",
            "dim_customers.constitution_code",
            "dim_customers.segmentation_class",
            "dim_customers.introd_status",
            "dim_customers.purgeremarks",
            "dim_customers.card_holder",
            "dim_customers.introducerid",
            "dim_customers.introducername",
            "dim_customers.cust_relationship_start_days",
            "dim_customers.days_since_last_kyc_review",
            "dim_customers.account_relationship_days",
            "dim_customers.days_since_last_transaction",
            "dim_customers.cif_id",
            "dim_customers.address_line",
          ],
          order: {
            "dim_customers.cust_first_name": "asc",
          },
          filters: [
            {
              member: "dim_customers.cif_id",
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

  getindivid_registration: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_document.issued_date",
            "dim_document.issued_by",
            "dim_document.validity_date",
            "dim_document.document_description",
          ],
          order: {
            "dim_document.document_type": "asc",
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
  getindivid_communication: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          filters: [
            {
              member: "dim_customers.cif_id",
              operator: "equals",
              values: [id],
            },
          ],
          dimensions: [
            "dim_communications.email",
            "dim_communications.phoneno",
            "dim_communications.is_preferred",
            "dim_communications.communication_type",
          ],
          order: {
            "dim_communications.communication_type": "asc",
          },
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
  getindivid_relation: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          filters: [
            {
              member: "dim_customers.cif_id",
              operator: "equals",
              values: [id],
            },
          ],
          dimensions: [
            "dim_indiv_relationship.name",
            "dim_indiv_relationship.relation",
          ],
          order: {
            "dim_indiv_relationship.name": "asc",
          },
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
  getindivid_address: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          filters: [
            {
              member: "dim_customers.cif_id",
              operator: "equals",
              values: [id],
            },
          ],
          dimensions: [
            "dim_cust_address.address_type",
            "dim_cust_address.province",
            "dim_cust_address.city",
            "dim_cust_address.address_line",
          ],
          order: {
            "dim_cust_address.address_type": "asc",
          },
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

export default individualCustomerFetchData;