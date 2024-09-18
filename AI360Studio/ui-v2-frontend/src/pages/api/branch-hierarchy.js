// import Trino from 'trino-client';

// const trinoClient = new Trino({
//     server: 'http://dlytica-kube-vm.eastus.cloudapp.azure.com:32553', // Trino server address and port
//     user: 'admin', // Trino username
//     catalog: 'iceberg', // Trino catalog
//     httpScheme: 'http', // HTTP scheme
//   });

// const executeQuery = async (query) => {
//   return new Promise((resolve, reject) => {
//     trinoClient.query(query, (error, result) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

// export default async function handler(req, res) {
//   try {
//     const query = `
//       SELECT 
//         hub_name,
//         sub_provincial,
//         city_code,
//         branch_description
//       FROM gold_dimensions.dim_branch
//     `;

//     const rows = await executeQuery(query);

//     // Create a dictionary to maintain hierarchy
//     const hierarchy = {};

//     rows.forEach(([hub_name, sub_provincial, city_code, branch_description]) => {
//       if (!hierarchy[hub_name]) {
//         hierarchy[hub_name] = {};
//       }

//       if (!hierarchy[hub_name][sub_provincial]) {
//         hierarchy[hub_name][sub_provincial] = {};
//       }

//       if (!hierarchy[hub_name][sub_provincial][city_code]) {
//         hierarchy[hub_name][sub_provincial][city_code] = [];
//       }

//       hierarchy[hub_name][sub_provincial][city_code].push({
//         branch_description
//       });
//     });

//     // Convert the dictionary to a list of dictionaries
//     const result = Object.entries(hierarchy).map(([hub_name, sub_provincials]) => ({
//       hub_name,
//       sub_provinces: Object.entries(sub_provincials).map(([sub_provincial, cities]) => ({
//         sub_provincial,
//         cities: Object.entries(cities).map(([city_code, branches]) => ({
//           city_code,
//           branches
//         }))
//       }))
//     }));

//     res.status(200).json(result);
//   } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
