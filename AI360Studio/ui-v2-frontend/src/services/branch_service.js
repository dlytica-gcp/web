import axios from "axios";
import Cookies from "js-cookie";

const branchServices = {
  get: async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/branch`,
        {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching branch data:", error);
      throw error;
    }
  },
  getById: async () => {
    try {
      const token = Cookies.get("token");
      const id = Cookies.get("user_id");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/branch/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching branch data for ID ${id}:`, error);
      throw error;
    }
  },
};

export default branchServices;
