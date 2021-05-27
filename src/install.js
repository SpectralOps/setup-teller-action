const process = require("process");
const core = require("@actions/core");
const tc = require("@actions/tool-cache");

async function install(version) {
  const cachedPath = tc.find(
    "teller",
     version.version,
  );
  if (cachedPath) {
    core.info(`Using cached Teller installation from ${cachedPath}.`);
    core.addPath(cachedPath);
    return;
  }

  const zip = zipName(version.version);
  const url = `https://github.com/spectralops/teller/releases/download/v${version.version}/${zip}`;

  core.info(`Downloading Teller from ${url}.`);

  const zipPath = await tc.downloadTool(url);
  const extractedFolder = await tc.extractTar(zipPath);

  const newCachedPath = await tc.cacheDir(
    extractedFolder,
    "teller",
     version.version,
  );
  core.info(`Cached Teller to ${newCachedPath}.`);
  core.addPath(newCachedPath);
}

function zipName(version) {
  let arch;
  switch (process.arch) {
    case "arm64":
      arch = "arm64";
      break;
    case "x64":
      arch = "x86_64";
      break;
    default:
      throw new Error(`Unsupported architechture ${process.arch}.`);
  }

  let platform;
  switch (process.platform) {
    case "linux":
      platform = "Linux";
      break;
    case "darwin":
      platform = "Darwin";
      break;
    case "win32":
      platform = "Windows";
      break;
    default:
      throw new Error(`Unsupported platform ${process.platform}.`);
  }

  return `teller_${version}_${platform}_${arch}.tar.gz`;
}

module.exports = {
  install,
};
