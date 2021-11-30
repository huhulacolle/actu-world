CREATE TABLE IF NOT EXISTS favoris (
  idUser INTEGER NOT NULL,
  sourceId INTEGER NOT NULL,
  sourceString varchar(50) NOT NULL,
  title varchar(50) NOT NULL,
  description varchar(50) NOT NULL,
  url varchar(50) NOT NULL,
  urlToImage varchar(50) NOT NULL,
  publishAt varchar(50) NOT NULL,
  content varchar(50) NOT NULL,
  PRIMARY KEY (idUser)
);

CREATE TABLE IF NOT EXISTS user (
  id INTEGER NOT NULL,
  nom varchar(50) NOT NULL,
  lastConnect INTEGER NOT NULL,
  PRIMARY KEY (id)
);
