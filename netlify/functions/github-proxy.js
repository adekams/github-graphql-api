const axios = require("axios");

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // Masked check for presence of the GitHub token (do not log the token itself)
  const token = process.env.GITHUB_ACCESS_TOKEN;
  console.log(
    "GITHUB_ACCESS_TOKEN present:",
    !!token,
    "length:",
    token ? token.length : 0,
  );

  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "GITHUB_ACCESS_TOKEN is not set in function environment",
      }),
    };
  }

  try {
    const { query } = JSON.parse(event.body);

    const response = await axios({
      method: "POST",
      url: "https://api.github.com/graphql",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { query },
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(
      "Error status:",
      error.response?.status,
      "data:",
      error.response?.data || error.message,
    );
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.response?.data || error.message }),
    };
  }
};
