import { DeployCombo } from "./models/combos";

function checkConnected(deploy: DeployCombo) {
    return deploy.attrs.reduce((prev, current) => prev + current)
}
