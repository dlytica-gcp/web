import { embedDashboard } from "@superset-ui/embedded-sdk";

const supersetService = {
  getToken: async (dashboardId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/guest-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dashboard_id: dashboardId }),
        }
      );
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error("error fetching token:", error);
    }
  },

  embedDashboardWithToken: async (
    dashboardId,
    filters = {},
    dashboardElementId,
    token
  ) => {
    try {
      await embedDashboard({
        id: dashboardId,
        supersetDomain: `${process.env.NEXT_PUBLIC_SUPERSET_API_URL}/`,
        mountPoint: document.getElementById(dashboardElementId),
        fetchGuestToken: () => token,
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: true,
          hideTab: false,
          hideFilters: true,
          urlParams: filters,
        },
      });
    } catch (error) {
      console.error("Error embedding dashboard:", error);
    }
  },
};

export default supersetService;
