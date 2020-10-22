---
title: Introduction
description: Documentation Frontend
position: 20
category: Exofront
---

Cette section a pour but de décrire les processus de développement propre au frontend de nos applications web et mobile.

## Philosophie Globale

### Concordance web/mobile
Exobole développe de bout en bout les applications web et mobile de manière similaire. La plateforme s'efface au profit d'une réalisation globale et interopérable dans laquelle seuls les langages et les outils diffèrent.

Par principe, une application développée pour le web ou pour le mobile, en natif, doit pouvoir être portée rapidement sur l'une ou l'autre des plateformes.

Ainsi, nous assurons l'évolutivité des produits que nous livrons.

## Configuration VSCode

### Plugins spécifiques
- Vetur
- Tailwind CSS IntelliSense
- Stylelint
- Dart
- Flutter

### Configuration de stylelint
Pour éviter les conflits de validation de style avec tailwind il est nécessaire de configurer stylelint.

- Créer à la racine du projet un dossier **.vscode**
- Ajouter un fichier **settings.json** :
```json
{
    "css.validate": false,
    "less.validate": false,
    "scss.validate": false
}
```
- Installer la configuration standard de stylelint :
```
npm i stylelint-config-standard -D
```
- Créer à la racine du projet un fichier **stylelint.config.js** :
```javascript
module.exports = {
    extends: ['stylelint-config-recommended'],
    rules: {
        "at-rule-no-unknown": [
            true,
            {
                ignoreAtRules: [
                    "tailwind",
                    "apply",
                    "variants",
                    "responsive",
                    "screen",
                ],
            },
        ],
        "declaration-block-trailing-semicolon": null,
        "no-descending-specificity": null,
    },
};
```

## Liens utiles

### Images

Compression d'images:
- https://www.iloveimg.com/resize-image/resize-png
