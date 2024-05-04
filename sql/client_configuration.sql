CREATE TABLE mxcel_clients (
  client_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  client_key VARCHAR(255) NOT NULL,
  client_secret VARCHAR(255) NOT NULL,
  callback_url VARCHAR(255) NULL,
  added_on TIMESTAMP NULL,
  updated_on TIMESTAMP NULL,
  added_by INT NOT NULL DEFAULT 0,
  status TINYINT(1) DEFAULT 1,
  PRIMARY KEY (client_id),
  UNIQUE KEY client_key (client_key),
  INDEX(status),
  INDEX(added_by)
);

CREATE TABLE request_logs (
  id INT(10) NOT NULL AUTO_INCREMENT,
  method VARCHAR(45) NOT NULL,
  status_code VARCHAR(45) NOT NULL,
  request LONGTEXT NOT NULL,
  response LONGTEXT NOT NULL,
  url VARCHAR(1024) NOT NULL,
  client_id INT(11) NULL,
  added_on TIMESTAMP NULL,
  updated_on TIMESTAMP NULL,
  added_by INT NOT NULL DEFAULT 0,
  status TINYINT(1) DEFAULT 1,
  PRIMARY KEY (id),
  INDEX(status),
  INDEX(added_by)
);