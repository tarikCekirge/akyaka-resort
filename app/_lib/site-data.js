export async function getSiteData(domain) {
  const sites = {
    "localhost:3000": {
      name: "Akyaka Resort",
      description: "Nature Cabins by the River",
    },
    "example.com": {
      name: "Example Resort",
      description: "Demo cabins for testing",
    },
  };

  return (
    sites[domain] || {
      name: "Unknown Resort",
      description: "No site data found",
    }
  );
}
