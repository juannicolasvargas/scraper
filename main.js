import { response } from "./scraper.js";
import * as fs from 'fs';
const data = await response();
fs.writeFile ("input.json", JSON.stringify(data), function(err) {
  if (err) throw err;
  console.log('writing data to file....');
}
);
console.log("Done!");



