CREATE TABLE IF NOT EXISTS favoris (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url varchar(50),
  urlToImage varchar(50),
  source varchar(50),
  title varchar(50),
  description varchar(999),
  content varchar(999)
)
