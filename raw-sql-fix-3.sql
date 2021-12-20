SELECT
	u.email,
	r.name
FROM users AS u
INNER JOIN roles AS r
	ON u.role_id = r.id
WHERE (
	u.email = 'bruno@example.com' 
		OR 
	r.name = 'Lecteur'
);