import React, { useEffect, useState } from "react";

function App() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetch(
      "https://publish-p221102-e2272119.adobeaemcloud.com/graphql/execute.json/shieldguard/personal-umbrella",
      {
        cache: "no-cache",

      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Policy Data:", data);
        setPolicies(data?.data?.policydetailsList?.items || []);
      })
      .catch((err) =>
        console.error("Error fetching Policy data:", err)
      );
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Insurance Product Details</h1>

      {policies.length === 0 ? (
        <p>Loading...</p>
      ) : (
        policies.map((policy, index) => {
          console.log("UE resource path:", policy._path);
          console.log("UE variation:", policy._variation);

          return (
            <div
              key={`${policy._path}-${policy._variation || "master"}-${index}`}
              style={{
                marginBottom: "25px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            >
              {/* Title */}
              <h3
                data-aue-resource={`urn:aemconnection:${policy._path};variation=${
                  policy._variation || "master"
                }`}
                data-aue-prop="title"
                data-aue-type="text"
              >
                {policy.title}
              </h3>

              {/* Description */}
              <p
                data-aue-resource={`urn:aemconnection:${policy._path};variation=${
                  policy._variation || "master"
                }`}
                data-aue-prop="description"
                data-aue-type="richtext"
              >
                {policy.description?.plaintext}
              </p>

              {/* Coverage */}
              <p
                data-aue-resource={`urn:aemconnection:${policy._path};variation=${
                  policy._variation || "master"
                }`}
                data-aue-prop="coverage"
                data-aue-type="richtext"
              >
                <strong>Coverage:</strong> {policy.coverage?.plaintext}
              </p>

              {/* Premium */}
              <p
                data-aue-resource={`urn:aemconnection:${policy._path};variation=${
                  policy._variation || "master"
                }`}
                data-aue-prop="premiumPerYear"
                data-aue-type="text"
              >
                <strong>Premium per Year:</strong> ₹{policy.premiumPerYear}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;