-- Change data type of lat and long columns in issues table from integer to numeric

ALTER TABLE issues ALTER COLUMN lat TYPE numeric;
ALTER TABLE issues ALTER COLUMN long TYPE numeric;
