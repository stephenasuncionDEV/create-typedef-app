import development from "./dev";
import production from "./prod";
import test from "./test";

export interface SingleConfig {
  serverURL: string;
  clientURL: string;
}

export interface Config {
  development: SingleConfig;
  production: SingleConfig;
  test: SingleConfig;
}

const configs: Config = {
  development,
  production,
  test,
};

const exportedConfig = configs[process.env.NODE_ENV];

export default exportedConfig;
