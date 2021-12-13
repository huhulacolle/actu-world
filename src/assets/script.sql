CREATE TABLE IF NOT EXISTS favoris (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url varchar(50) NOT NULL,
  urlToImage varchar(50) NOT NULL,
  source varchar(50) NOT NULL,
  title varchar(50) NOT NULL,
  description varchar(999) NOT NULL
)