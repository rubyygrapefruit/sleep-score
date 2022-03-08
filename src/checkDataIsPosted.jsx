const postData = async () => {
  return post("/mock_endpoint", {
    durationInBed,
    durationAsleep,
  });
};
