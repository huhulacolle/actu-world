CREATE TABLE favoris (
  author varchar(50) NOT NULL,
  description varchar(999) NOT NULL,
  source varchar(50) NOT NULL,
  title varchar(50) NOT NULL,
  url varchar(50) NOT NULL,
  urlToImage varchar(50) NOT NULL,
);

INSERT INTO favoris (author, description, source, title, url, urlToImage) INTO VALUES ("Delphine DE FREITAS, à Caen", "SHOW - Elles sont 29 candidates pour une couronne. Les prétendantes au titre de reine de beauté des Français se retrouvent ce samedi 11 décembre dès 21h05 en direct sur TF1 pour une cérémonie placée sous le signe des comédies musicales. LCI vous fait vivre le…", "'Www.lci.fr", "EN DIRECT - Miss France 2022 : qui va succéder à Amandine Petit ? Suivez l'événement avec nous - LCI", "https://www.lci.fr/culture/direct-video-miss-france-2022-sur-tf1-favorites-gagnante-portraits-photos-qui-succedera-a-amandine-petit-2204286.html", "https://photos.lci.fr/images/1280/720/miss-france-2022-roi-lion-8b735d-0@1x.jpeg");