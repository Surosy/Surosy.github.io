import fs from 'node:fs';
import YAML from 'yaml';
const [owner,repo]=(process.env.REPOSITORY||'').split('/');
if(!owner||!repo) throw new Error('Missing REPOSITORY');
const config=YAML.parse(fs.readFileSync('quartz.config.yaml','utf8'));
config.configuration.baseUrl=owner+'.github.io'+(repo.toLowerCase()===owner.toLowerCase()+'.github.io'?'':'/'+repo);
fs.writeFileSync('quartz.config.yaml',YAML.stringify(config));
