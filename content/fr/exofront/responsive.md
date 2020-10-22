---
title: Responsive
description: Méthode et mise en place
position: 21
category: Exofront
---

# Web (Vue+Nuxt.js)

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
- `Largeur : 320`
- `Hauteur : 568`
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

## Philosophie Mobile First

Pour maximiser la compatibilité entre les appareils, nous démarrons chaque développement front dans la taille la plus petite d'écran définie. Ainsi, en faisant référence aux tailles ci-dessus nous travaillons d'abord sur le breakpoint **Mobile (-)**.

De manière incrémentale, nous adaptons notre mise en page aux différents écrans de la plus petite à la plus grande.

En accord avec les maquettes établies, l'objectif est de valider les tailles et zones intermédiaires des breakpoints en vérifiant que pour chaque intervalle le contenu s'adapte correctement. 

## Principe de fluidité du conteneur maître

Pour offrir des interfaces modernes, la taille maximale affichée du conteneur maître est celle du viewport soit : **100vw**.

La fluidité du conteneur maître doit respecter certains principes :
- Sur les grandes tailles d'écran (**xl-lg-md**) le conteneur maître ne peut contenir que ***deux** conteneur principaux*
- Sur les tailles inférieure d'écran (**sm et < sm**) le conteneur maître ne doit contenir *qu'**un** seul conteneur principal* 
- La mise en page responsive est toujours supposée par ***flex-wrap***
- Lorsque le conteneur maître contient **2** conteneurs principaux, leur contenu est **absolument centré**
- Lorsque le conteneur maître ne contient qu'un conteneur principal, son contenu doit respecter le principe de ***colonne centrale***. Cette règle ne concerne pas le contenu décoratif ou un quelconque background.

## Colonne centrale d'un conteneur principal

Pour éviter l'imprévisibilité des comportements sur des écrans de grande taille, nous faisons le choix de limiter la largeur du conteneur principal. Ce conteneur est défini comme une colonne centrale.

Pour chaque taille d'écran, cette colonne centrale correspond à :

**Mobile** :
- `Largeur max : 100%`
- `Margin du contenu : 0`

**Large Mobile** :
- `Largeur max : 100%`
- `Margin du contenu : 0`

**Tablet** :
- `Largeur max : 770px`
- `Margin du contenu : 0 2.34082%`

**Laptop** :
- `Largeur max : 770px`
- `Margin du contenu : 0 2.34082%`

**Desktop** :
- `Largeur max : 1440px`
- `Margin du contenu : 0 2.08333%`



# Mobile (Flutter)

La définition des éléments de responsive mobile se fait en fonction de la philosophie appliquée sur le web. Pour la plupart des éléments, les solutions ***Mobile (-) - Large Mobile (sm) - Tablet (md)*** seront les plus souvent transposées. 