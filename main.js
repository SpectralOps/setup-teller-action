const process = require("process");
const core = require("@actions/core");

const { install } = require("./src/install.js");

function exit(message) {
  core.setFailed(message);
  process.exit();
}

async function main() {
  try {
    const ver = core.getInput("teller-version");
    if (ver === null) {
      exit("The passed version is not valid.");
    }

    const version = { version: ver }
    if (version === null) {
      exit("Could not resolve a version for the given range.");
    }

    core.info(
      `Going to install version ${version.version}.`,
    );

    await install(version);

    core.setOutput("teller-version", version.version);

    core.info("Installation complete.");
  } catch (err) {
    core.setFailed(err);
    process.exit();
  }
}

main();
