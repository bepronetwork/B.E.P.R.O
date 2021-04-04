var fs = require('fs');
const start = 1000;
const uri_image = 'https://gateway.pinata.cloud/ipfs/QmQ9hspPixpxHynNzydpTTAZyuetY2ttSLzzg1z4HRGykJ/NFT%20B.E.P.R.O/';
const url = "https://bepro.gallery";

let json = {
    id: "1000",
    image : "1000.png",
    name: "art b.e.p.r.o",
    description : "",
    attributes: [
      {
        "trait_type": "Special",
        "value": "Yes"
      }
    ],
    edition: "1"
}

for(var i = 0+start; i < 100+start; i++){
    //do json
    json.id = i;
    json.image = uri_image + i + ".png"
    json.description = i; // TO DO
    json.external_url = url + `/art?id=${i}`
    
    //save under meta

    fs.writeFile(`meta/${i}.json`, JSON.stringify(json), 'utf8', () => {});
}