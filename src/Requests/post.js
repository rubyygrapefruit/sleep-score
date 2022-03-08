const testAPI =
  "https://405e3123-afa2-425a-aa7d-055e1de49dc7.mock.pstmn.io/scores";

const handleResponse = async (response) => {
  const data = await response;

  if (!response.ok) {
    throw new Error("Score not saved");
  }

  return data;
};

const post = async (data) => {
  const response = await fetch(testAPI, {
    method: "POST",
    body: data,
  });

  return handleResponse(response);
};

export default post;
