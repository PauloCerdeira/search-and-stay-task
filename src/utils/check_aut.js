export default async function (api, q, router) {
  try {
    await api.get("");
    return true
  } catch (error) {
    q.notify({
      type: "negative",
      icon: "close",
      message: "Failed",
      caption: "Authorization not granted.",
    });
    router.push("/");
  }
}
