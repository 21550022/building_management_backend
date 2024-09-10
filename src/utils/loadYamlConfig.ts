import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = '../config/config.yaml';

export const loadYamlConfig = () => {
  const config = yaml.load(
    fs.readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
  return config;
};
