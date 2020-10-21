---
title: Responsive
description: Méthode et mise en place
position: 21
category: Exofront
---

En accord avec l'utilisation de Tailwind CSS, notre stack front se base sur l'utilisation des breakpoints standards de cette librairie.

## Rappel des breakpoints par défaut

Tailwind CSS défini par défaut 5 breakpoints de largeur :
-  Mobile (**-**) : **< 640px**
-  Large Mobile (**sm**) : **640px < 768px**
-  Tablet (**md**) : **768px < 1024px**
-  Laptop (**lg**) : **1024px < 1280px**
-  Desktop (**xl**) : **> 1280px**

## Configurer Chrome

Dans le but d'améliorer la cohérence lors du développement nous définissons des tailles d'écran par défaut dans l'outil responsive de Google Chrome.

Pour créer ces tailles d'écran il suffit de se rendre dans :
`Outils de développement > Settings > Devices > Add Custom Device`

Nous ajoutons ensuite les configurations suivantes :

**Mobile** :
- `Device Name : 0. Mobile (-)`
- `Largeur : 400`
- `Hauteur : 400`
- `Type : Mobile`

**Large Mobile** :
- `Device Name : 1. Large Mobile (sm)`
- `Largeur : 640`
- `Hauteur : 1024`
- `Type : Mobile`

**Tablet** :
- `Device Name : 2. Tablet (md)`
- `Largeur : 768`
- `Hauteur : 1024`
- `Type : Mobile`

**Laptop** :
- `Device Name : 3. Laptop (lg)`
- `Largeur : 1024`
- `Hauteur : 640`
- `Type : Desktop`

**Desktop** :
- `Device Name : 4. Desktop (xl)`
- `Largeur : 1280`
- `Hauteur : 720`
- `Type : Desktop`