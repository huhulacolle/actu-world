 ### **Technologie utilisée :** 
 - NodeJS
 - Angular + Ionic (Framework Javascript)
 - Android Studio
 - Typescript (Langage)

 ### **Présentation des frameworks et langages :** 
 
<ul>
  <li><u>Ionic</u> est un framework de développement d’application mobile hybride créé par Drifty. Il permet de construire des applications multiplateformes à partir de : </li>
    <ul>
      <li>une technologie web, qui utilise les langages HTML5, CSS et JavaScript</li>
      <li>un framework, en l’occurrence Apache Cordova ou Capacitor.   </li>
    </ul>
    <br>
    et prend en charge Angular (prend aussi en charge React et Vue depuis la version 5)
  </li>
</ul>

- <u>Angular</u> est un framework côté client, open source, basé sur TypeScript, Il permet la création d’applications Web et est basé sur une architecture du type MVC et permet donc de séparer les données

- <u>Typescript</u> est un langage de programmation libre et open source développé comme un sur-ensemble de Javascript. Le langage introduit des fonctionnalités optionnelles comme le typage ou la programmation orientée objet.


Installation du projet en local :
=============

### **prérequis :** 
- Node JS -> https://nodejs.org/fr/
-  Android Studio -> https://developer.android.com/studio
- Ionic CLI -> ```npm install -g @ionic/cli```

### **Installation :**
- cloner le projet à l'aide de Git ou d'un client Git : <br>
```git clone https://github.com/huhulacolle/actu-world/```
- Ouvrir le terminal dans le répertoire du projet et écrire : <br>
```npm install```

### **Ouvrir l'application sur le navigateur (déconseillé) :**
```ionic serve```
### **généré projet Android Studio via Ionic :**
- générer un projet Android Studio native pour lancer l'application sur émulateur ou généré un fichier apk : <br>
```ionic capacitor sync``` <br>
puis <br>
```ionic capacitor sync Android``` 
- naviguer dans le répertoire suivant : <br> ```actu-world\android\app\src\main\AndroidManifest.xml``` <br>
- tout remplacé par : <br>
```<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.actuworld.fr">

    <application
        android:hardwareAccelerated="true"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
            android:name="com.actuworld.fr.MainActivity"
            android:label="@string/title_activity_main"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

        </activity>

        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths"></meta-data>
        </provider>
    </application>

    <!-- Permissions -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-sdk tools:overrideLibrary="com.google.zxing.client.android" />
    <uses-permission android:name="android.permission.INTERNET" />
</manifest>
```

### **Inséré l'icône de l'application dans le projet Android Studio (Optionnel) :** <br>
- installer "Cordova-Res" -> ```npm install -g cordova-res``` <br>
- écrire la commande : ```cordova-res android --copy --skip-config```

Documentation des Frameworks
=============

- [Angular](https://angular.io/guide/understanding-angular-overview)
- [Ionic](https://ionicframework.com/docs/angular/overview)
