// test execution 5

fetch("https://github.com/NotHansCYDIa/Lighthouse/raw/refs/heads/main/bed/sample!.json")
  .then(r => {
    if (!r.ok) {
      throw new Error("[HTTPE]" + r.status);
    }
    return r.json()
  })
  .then(data => {
    console.log("STRING: " + data["string"]);
    console.log("INT: " + data["int"]);
    console.log("FLOAT: " + data["float"]);
    console.log("SUCCESSFUL: " + data["success"]);
  })
  .catch(e => {
    throw new Error("[UE]" + e);
  })
