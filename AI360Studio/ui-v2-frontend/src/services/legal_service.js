import axios from "axios";

const legalFetchData = {
  get_basic_derived_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,

      {
        query: {
          dimensions: [
            "dim_customer_legal_entity_details.corporate_name",
            "dim_customer_legal_entity_details.cif_id",
            "dim_customer_legal_entity_details.entity_registration_date",
            "dim_customer_legal_entity_details.nature_of_business",
            "dim_customer_legal_entity_details.type_of_entity",
            "dim_customer_legal_entity_details.registration_number",
            "dim_customer_legal_entity_details.group_name",
            "dim_customer_legal_entity_details.keycontact_personname",
            "dim_customer_legal_entity_details.subsegment",
            "dim_customer_legal_entity_details.business_type",
            "dim_customer_legal_entity_details.sector",
            "dim_customer_legal_entity_details.subsector",
            "dim_customer_legal_entity_details.days_since_entity_registration",
            "dim_customers.cust_relationship_start_days",
            "dim_customers.account_relationship_days",
            "dim_customers.days_since_last_transaction",
          ],
          order: { "dim_customer_legal_entity_details.corporate_name": "asc" },
          filters: [
            {
              member: "dim_customer_legal_entity_details.cif_id",
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
    console.log(response.data.data);
    return response.data.data;
  },
  get_registration_detail_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,
      {
        query: {
          dimensions: [
            "dim_document.document_sk",
            "dim_document.document_description",
            "dim_document.issued_date",
            "dim_document.validity_date",
          ],
          order: { "dim_document.document_description": "asc" },
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
  get_communication_detail_info: async (id) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CUBE_API_URL,
      {
        query: {
          dimensions: [
            "dim_customers.cif_id",
            "dim_communications.phoneno",
            "dim_communications.email",
            "dim_communications.is_preferred",
            "dim_communications.communication_type",
          ],
          order: { "dim_customers.cif_id": "asc" },
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
  get_address_detail_info: async (id) => {
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
            "dim_cust_address.address_line",
            "dim_cust_address.city",
          ],
          order: { "dim_cust_address.address_type": "asc" },
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
};
export default legalFetchData;