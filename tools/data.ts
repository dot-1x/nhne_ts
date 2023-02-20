import { readFile } from "fs/promises"
import { readJsonConfigFile } from "typescript"

const MAX_NINJAS = 15
const MAIN_NINJAS = 3
const DEPLOY_NINJAS = 12
const DEFAULT_TIMES = 7.0

const data = readJsonConfigFile("data.json", (v) => v)