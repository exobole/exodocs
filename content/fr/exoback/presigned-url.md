---
title: URL présignée d'Amazon
description: Doc sur les URL présignés d'Amazon
position: 90
category: Misc
---

Cette section est destinée à la mise en place d'AWS-S3 pour l'utilsation d'URL préssignés.

# Installation du projet

Dans votre dossier installer un serveur Express dans un dossier.

```bash
yarn add express
```

Ensuite créer un front avec Nuxt.

```bash
yarn create nuxt-app <mon-projet>
```

Vous avez deux fichiers dans la racine de votre dossier. Un dossier contenant Express et l'autre contenant Nuxt.js.

# Installation aws-sdk

Dans votre dossier ./mon-projet/back installer le packages manager AWS SDK, qui s'utilise pour JavaScript et Node.js.

```bash
yarn add aws-sdk
```

Votre dossier devrait ressembler à ça.

![arborescence](../../../static/img/arbo.png)

# Configuration .env

A la source de votre projet créer un fichier .env. Il contiendra l'host et le port de votre adresse, ainsi que les informations relatives à votre Bucket AWS-S3.

```
HOST="localhost"
PORT="8080"

AWS_ACCESS_KEY_ID= "MA CLE"
AWS_SECRET_ACCESS_KEY="MA SUPER CLE SECRETE"
AWS_BUCKET_REGION= "US"
AWS_BUCKET_NAME= "NOM DE MON BUCKET"
```

<alert>

Vous trouverez les informations relatives à votre Bucket lors de la création de ce dernier.

</alert>

# Préparation du front

Dans votre fichier front modifier votre fichier index.vue de façon à avoir un input de type fichier et deux boutons.

```html
<template>
  <div class="container">
    <input type="file" />
    <button>Generate URL</button>
    <button>Upload File</button>
  </div>
</template>

<script>
  export default {};
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
```

Pour le moment cela suffit, on y reviendra ensuite. Vous devriez avoir ceci. Magnifique non ?

![my_ugly_front](../../../static/img/front.png)

<alert>
Libre à vous de pimper un peu plus le front, pour l'exemple nous n'avons pas besoin de plus.
</alert>

# Preparation du back

Dans votre dossier back, à la racine, créons deux fichiers. Le premier index.js et le second generatePresignedURL.js. (Appeller les comme vous voulez !).

generatePresignedURL contiendra la fonction qui permet de créer l'url préssigné tandis que le fichier index.js retournera cet URL.

<code-group>
    <code-block label="index.js" active>

```javascript
//path du fichier: ~/mon-projet/back/index.js

require("dotenv").config({ path: "../.env" });

const cors = require("cors");
const express = require("express");
const { pressignedUrl } = require("./generatePressignedURL");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/pressignedURL", (request, response) => {
  pressignedURL({
    Key: request.body.Key,
    type: request.body.type,
  })
    .then((resp) => {
      response.json(resp);
    })
    .catch((error) => {
      console.log(error);
    });
});
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
}); // Ouverture de notre server (PORT ref au .env)
```

 </code-block>
 <code-block label="generatePresignedURL.js">

```javascript
const AWS = require("aws-sdk");

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
};
AWS.config.update(config);

const S3Bucket = new AWS.S3({
  endpoint: "cellar-c2.services.clever-cloud.com",
});

module.exports = {
  pressignedURL: async (dataFile) => {
    const Key = `images.${dataFile.Key}`; // On récupère
    // le nom du fichier (ex: ma_belle_photo)
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
      Expires: 15 * 60, // durée de l'URL préssigné
      // ici 15 mins (15 est en secondes)
      ContentType: dataFile.type, // On récupère l'extension
      // du fichier (.png/.jpg/etc..)
      ACL: "public-read",
    };
    const url = await S3Bucket.getSignedUrlPromise("putObject", params); // On affecte notre URL
    return { presignedURL: url }; // On récupère notre url préssigné
  },
};
```

 </code-block>
</code-group>

Nous avons la fonction qui nous créer notre Presigned URL ainsi que la route qui nous l'affiche. Maintenant assignons tout ça à nos boutons du front !

# De retour au front

Retournous dans notre somptueux front et plus précisement dans notre index.vue.

Occupons nous du premier bouton Generate URL.

## Generate URL

```html
<template>
  <div class="container">
    <input
      @change="monFichier = $event.target.files[0]"
      type="file"
      name="filename"
      placeholder="filename"
    />
    <!-- On "écoute" le fichier pour lui appliquer 
    les modifications lors de son upload -->
    <button @click="generateURL">Generate URL</button>
    <!-- Au click du bouton notre fonction
     GenerateURL() sera déclanchée -->
    <button>Upload File</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        monFichier: [],
        presignedURL: null,
      };
    },
    methods: {
      generateURL() {
        const meta = {
          Key: this.monFichier.name,
          type: this.monFichier.type, // Ref au fichier
          // generatePresignedURL fileData.Key
          // & fileData.type
        };
        fetch("http://localhost:8080/pressignedURL", {
          method: "post",
          body: JSON.stringify(meta),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            this.pressignedURL = data.presignedURL;
            // Pour vérifier que votre Presigned URL
            // existe bien n'hésitez pas à faire
            // un console.log(data)
          })
          .catch((error) => console.log(error));
      },
    },
  };
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
```

Et voilà. Vous avez votre URL Préssigné. Maintenant on va vouloir l'upload ! On va donc s'occuper du deuxième boutton Upload my File.

## Upload File

```html
<template>
  <div class="container">
    <input
      @change="monFichier = $event.target.files[0]"
      type="file"
      name="filename"
      placeholder="filename"
    />
    <button @click="generateURL">Generate URL</button>
    <button @click="uploadFile">Upload File</button>
    <!-- Au click du bouton notre fonction
     uploadFile() sera déclanchée -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        monFichier: [],
        presignedURL: null,
      };
    },
    methods: {
      generateURL() {
        //cf code précédent
      },
      uploadFile() {
        fetch(this.presignedURL, {
          method: "PUT",
          body: this.monFichier,
          headers: {
            "Content-type": this.monFichier.type,
            "x-amz-acl": "public-read",
          },
        }) // On récupère notre Presigned URL pour
          // communiquer avec S3
          .then((res) => {
            console.log(res);
          })
          .catch((error) => console.log(error));
      },
    },
  };
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
```

# Conclusion

Nous avons fini avec la création et l'upload de nos Presigned URL. Pour cet exemple nous avons découpé le tout en deux boutons. Lors d'une utilisation plus réelle nous n'utiliserions qu'un seul bouton.

Pour résumé. Notre premier bouton Generate URL créer une Presigned URL depuis les informations données par notre fichier, ici des images.
Notre second bouton Upload File lui vient récuperer notre première Presigned URL et vient regarder si elle identique à celle qu'on lui retourne.
